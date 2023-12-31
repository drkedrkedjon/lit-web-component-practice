import { LitElement, html, css } from "lit-element";
// import { ShoppingCartTimer } from "./shoppingCartTimer";
// import { EventTimer } from "./eventTimer";

export class TimerComponent extends LitElement {
  static styles = css`
    .timer-container {
      display: flex;
      flex-direction: column;
      margin-block: 3rem;
      background-color: var(--text-color);
      color: var(--neutral-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
    }
    .btn-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 1rem;
    }
    button {
      background-color: var(--primary-color);
      border: none;
      padding: 0.7rem 1.8rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s ease-in-out;
    }
    button:hover {
      scale: 1.03;
      box-shadow: 0 0 0.2rem var(--primary-color);
    }
  `;
  static properties = {
    event: { type: Boolean },
    title: { type: String },
    btnPause: { type: Boolean },
    btnPlay: { type: Boolean },
    btnReset: { type: Boolean },
  };

  constructor() {
    super();
    this.event = false;
    this.title = "--";
    this.btnPause = false;
    this.btnPlay = false;
    this.btnReset = false;
  }

  playTimer = () => {
    const playEvent = new CustomEvent("play", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(playEvent);
  };

  pauseTimer = () => {
    const pauseEvent = new CustomEvent("pause", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(pauseEvent);
  };

  resetTimer = () => {
    const resetEvent = new CustomEvent("reset", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(resetEvent);
  };

  render() {
    return html`
      <div class="timer-container">
        ${this.event
          ? html`<event-timer></event-timer>`
          : html`<shopping-cart-timer
              .title=${this.title}
            ></shopping-cart-timer>`}
        <div class="btn-container">
          ${this.btnPause
            ? html`<button @click=${this.pauseTimer}>Pause</button>`
            : html``}
          ${this.btnPlay
            ? html`<button @click=${this.playTimer}>Play</button>`
            : html``}
          ${this.btnReset
            ? html`<button @click=${this.resetTimer}>Reset</button>`
            : html``}
        </div>
      </div>
    `;
  }
}

window.customElements.define("timer-component", TimerComponent);

// <button @click=${this.pauseTimer}>Pause</button>
// <button @click=${this.playTimer}>Play</button>
// <button @click=${this.resetTimer}>Reset</button>
