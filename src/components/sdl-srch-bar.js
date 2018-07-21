import {LitElement, html} from '@polymer/lit-element';
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
    //this.ajaxUrl = 'testing/123'
    //console.log("sdl-srch-bar constructor called...")
    this.addEventListener("change", sendEventOrAjax, false);
    this.addEventListener("keyup", sendEventOrAjax, false);
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


function sendEventOrAjax(event) {
  var me = this;

  event.cancelBubble = true;
  if( event.stopPropagation ) event.stopPropagation();

  var form = this._root.querySelector('#main-form');
  var formData = form.serializeForm();

  if (typeof this.ajaxUrl === 'undefined') {
    //console.log("dispatching 'changed' event");
    // Create a new event that has the formData in it.
    me.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: {
        target: me,
        formData: formData
      }
    }));    

  } else {

    // Send off the ajax and put the response into the return event.detail.payload
    get(this.ajaxUrl).then(function(response) {
      var resp = JSON.parse(response);
        me.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          target: me,
          formData: formData,
          payload: resp.payload
        }
      }));  
    }, function(error) {
      alert("AJAX Failed!", error);
    });
  }
}


function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}
