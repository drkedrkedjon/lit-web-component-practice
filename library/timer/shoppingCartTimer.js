import { LitElement, css, html } from "lit";

export class ShoppingCartTimer extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html` <p>Shopping Cart Timer</p> `;
  }
}

window.customElements.define("shopping-cart-timer", ShoppingCartTimer);
