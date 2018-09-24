import {LitElement, html} from '@polymer/lit-element';
import 'jquery/dist/jquery.min.js';
import '@polymer/iron-form/iron-form.js';

/**
 * `sdl-srch-bar`
 * Basic Search Bar Element that uses a slot
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SdlSrchBar extends LitElement {

  constructor() {
    super();

    this.addEventListener('rendered', async (e) => {
      var me = this;

      if ( typeof this.onchangeonly != 'undefined' && this.onchangeonly.match(/^t/i) ) {
        this.addEventListener("change", this.sendEventOrAjax, false);
      } else {
        this.addEventListener("change", this.sendEventOrAjax, false);
        this.addEventListener("keyup", this.sendEventOrAjax, false);
      }

      if ( typeof this.autoload != 'undefined' && this.autoload.match(/^t/i) ) {
        if (typeof this.initform != 'undefined') {
          setTimeout(function(){ 
            try {
                var formData = JSON.parse(me.initform);
                var form = me.shadowRoot.querySelector('#main-form');
                Object.keys(formData).forEach(function(key) {
                  var selector = "[name='"+key+"']";
                  var element = document.querySelector(selector);
                  element.value = formData[key];
              });
              me.sendAjax(formData);
            } catch(e) {
              console.log("ERROR:  parsing initform JSON string! ",this.initform,e);
            }

          }, 1000);


        } else {
          this.sendAjax("");
        }
      }

    });
  }

  firstUpdated(properties) {
    console.log("updated...");
    this.dispatchEvent(new CustomEvent('rendered'));  
  }

  _didRender(props, changedProps, prevProps) {
    console.log('_didRender');
    this.dispatchEvent(new CustomEvent('rendered'));  
  }

  renderComplete() {
    console.log("completed render...")
  }

  sendEventOrAjax(event) {
    var me = this;

    if (typeof event != 'undefined') {
      event.cancelBubble = true;
      if( event.stopPropagation ) event.stopPropagation();
    }
  
    var form = this.shadowRoot.querySelector('#main-form');
    var formData = {};
    formData.xaction = "read";

    if (typeof this.ajaxobjname !== 'undefined' && this.ajaxobjname !== null && this.ajaxobjname !== "") {
      var formArray = [];      
      var formObj = form.serializeForm();
      formArray.push(formObj);
      formData[this.ajaxobjname] = JSON.stringify(formArray);
    } else {
      var formData = form.serializeForm();
    }
  
    if (typeof this.ajaxurl === 'undefined') {
      // Create a new event that has the formData in it.
      me.dispatchEvent(new CustomEvent('changed', {
        bubbles: true,
        composed: true,
        detail: {
          target: this,
          formData: formData
        }
      }));    
  
    } else {
      this.sendAjax(formData);
    }
  }
  

  sendAjax(formData) {
    var me = this;

    // Kill the last XHR request if it still exists.
    me.lastXHR && me.lastXHR.abort && me.lastXHR.abort();
    me.lastXHR = $.ajax({
       type: "GET",
       url: me.ajaxurl,
       data: $.param(formData),
       success: function(response){
 
        if (typeof response.payload == 'undefined') {
          var resp = $.parseJSON(response);
        } else {
          var resp = response;
        }
        
        me.dispatchEvent(new CustomEvent('changed', {
          bubbles: true,
          composed: true,
          detail: {
            target: me,
            formData: formData,
            payload: resp.payload
          }
        }));
     }
    });
 }

  static get properties() { 
    return { 
      ajaxurl: {
        type: String
      },
      ajaxobjname: {
        type: String
      }, 
      autoload: {
        type: String
      },
      onchangeonly: {
        type: String
      },
      initform: {
        type: String
      }
    }
  }

  render() {
      return html`
      <style>
        :host {
          display: block;
        }
      </style>

      <iron-form id="main-form">
        <slot></slot>
      </iron-form>
    `;
  }

}

window.customElements.define('sdl-srch-bar', SdlSrchBar);









