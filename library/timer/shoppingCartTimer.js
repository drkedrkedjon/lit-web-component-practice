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
    window.addEventListener("pause", this.handlePauseTimer, true);
    window.addEventListener("reset", this.handleResetTimer, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.handlePlayTimer, true);
    window.removeEventListener("pause", this.handlePauseTimer, true);
    window.removeEventListener("reset", this.handleResetTimer, true);
  }

  handlePlayTimer(event) {
    console.log("Child PLAY");
  }
  handlePauseTimer(event) {
    console.log("Child PAUSE");
  }
  handleResetTimer(event) {
    console.log("Child RESET");
  }

  render() {
    return html` <p>${this.title}</p> `;
  }
}

window.customElements.define("shopping-cart-timer", ShoppingCartTimer);
