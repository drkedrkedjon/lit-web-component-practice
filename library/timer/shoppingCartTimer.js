import { LitElement, css, html } from "lit";

export class ShoppingCartTimer extends LitElement {
  constructor() {
    super();
    // this.handlePlayTimer = this.handlePlayTimer.bind(this);
  }

  static properties = {
    title: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.handlePlayTimer, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.handlePlayTimer, true);
  }

  handlePlayTimer(event) {
    console.log("Child PLAY");
  }

  render() {
    return html` <p>${this.title}</p> `;
  }
}

window.customElements.define("shopping-cart-timer", ShoppingCartTimer);
