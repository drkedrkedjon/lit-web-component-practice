import { LitElement, css, html } from "lit";

export class EventTimer extends LitElement {
  constructor() {
    super();
  }

  render() {
    return html` <p>Event Timer</p> `;
  }
}

window.customElements.define("event-timer", EventTimer);
