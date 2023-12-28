import { LitElement, html, css } from "lit-element";

export class TimerComponent extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html` <div>Timer:</div> `;
  }
}

window.customElements.define("timer-component", TimerComponent);
