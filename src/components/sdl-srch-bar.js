import {LitElement, html} from '@polymer/lit-element';
import 'jquery/dist/jquery.min.js';
import '@polymer/iron-form/iron-form.js';

/**
 * `sdl-srch-bar`
 * Basic Search Bar Element
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SdlSrchBar extends LitElement {

  constructor() {
    super();

    this.autoLoad = true;

    this.addEventListener('rendered', async (e) => {
      this.addEventListener("change", this.sendEventOrAjax, false);
      this.addEventListener("keyup", this.sendEventOrAjax, false);

      if (this.autoLoad == true) {
        //this.sendAjax("");
      }

    });
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
  
    var form = this._root.querySelector('#main-form');
    var formData = form.serializeForm();
  
    if (typeof this.ajaxUrl === 'undefined') {
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
       url: me.ajaxUrl,
       data: $.param(formData),
       success: function(response){
 
        var resp = $.parseJSON(response);
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
      ajaxUrl: {
        type: String
      }
    }
  }

  _render(props) {
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







