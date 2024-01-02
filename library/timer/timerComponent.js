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
    h3 {
      text-align: center;
      margin-block: 0;
      color: var(--primary-color);
    }
  `;
  static properties = {
    eventtimer: { type: Boolean },
    title: { type: String },
    btnpause: { type: Boolean },
    btnplay: { type: Boolean },
    btnreset: { type: Boolean },
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    playDisabled: { type: Boolean },
    pauseDisabled: { type: Boolean },
    resetDisabled: { type: Boolean },
    dobledigits: { type: Boolean },
  };
  constructor() {
    super();
    this.eventtimer = false;
    this.title = "--";
    this.btnpause = false;
    this.btnplay = false;
    this.btnreset = false;
    this.reverse = false;
    this.autoreset = false;
    this.autostart = false;
    this.start = 0;
    this.limit = 0;
    this.playDisabled = false;
    this.pauseDisabled = true;
    this.resetDisabled = false;
    this.dobledigits = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("timer-end", this.handleTimerEnd);
    window.addEventListener("timer-autostart", this.handleAutoplayTimer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("timer-end", this.handleTimerEnd);
    window.removeEventListener("timer-autostart", this.handleAutoplayTimer);
  }

  updated() {
    this.alerta = this.shadowRoot.getElementById("alerta");
  }

  handleTimerEnd = (event) => {
    if (this.autoreset) {
      return;
    }
    this.alerta.textContent = event.detail.message;
    this.playDisabled = false;
    this.pauseDisabled = true;
  };

  handleAutoplayTimer = () => {
    this.playDisabled = true;
    this.pauseDisabled = false;
  };

  playTimer = () => {
    const playEvent = new CustomEvent("play", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(playEvent);
    this.playDisabled = true;
    this.pauseDisabled = false;
  };
  pauseTimer = () => {
    const pauseEvent = new CustomEvent("pause", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(pauseEvent);
    this.playDisabled = false;
    this.pauseDisabled = true;
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
        <h3 id="alerta">Timer</h3>
        ${this.eventtimer
          ? html`<event-timer></event-timer>`
          : html`<shopping-cart-timer
              .title=${this.title}
              .reverse=${this.reverse}
              .autoreset=${this.autoreset}
              .autostart=${this.autostart}
              .start=${this.start}
              .limit=${this.limit}
              .dobledigits=${this.dobledigits}
            ></shopping-cart-timer>`}
        <div class="btn-container">
          ${this.btnpause
            ? html`<button
                ?disabled=${this.pauseDisabled}
                @click=${this.pauseTimer}
              >
                Pause
              </button>`
            : html``}
          ${this.btnplay
            ? html`<button
                ?disabled=${this.playDisabled}
                @click=${this.playTimer}
              >
                Play
              </button>`
            : html``}
          ${this.btnreset
            ? html`<button
                ?disabled=${this.resetDisabled}
                @click=${this.resetTimer}
              >
                Reset
              </button>`
            : html``}
        </div>
      </div>
    `;
  }
}

window.customElements.define("timer-component", TimerComponent);
