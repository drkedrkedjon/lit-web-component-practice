import { LitElement, css, html } from "lit";

export class ShoppingCartTimer extends LitElement {
  static get styles() {
    return css`
      .display {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-block: 2rem;
        gap: 0.2rem;
        font-size: 2rem;
      }
      .minutes,
      .seconds,
      .separador {
        display: grid;
        place-content: center;
        padding: 0.1rem;
        line-height: 1;
      }
    `;
  }

  constructor() {
    super();
    this.startInSeconds = 0;
    this.timer = null;
  }

  static properties = {
    title: { type: String },
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    dobledigits: { type: Boolean },
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.handlePlayTimer, true);
    window.addEventListener("pause", this.handlePauseTimer, true);
    window.addEventListener("reset", this.handleResetTimer, true);

    // AUTOSTART
    if (this.autostart) {
      this.handlePlayTimer();
      const event = new CustomEvent("timer-autostart", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.handlePlayTimer, true);
    window.removeEventListener("pause", this.handlePauseTimer, true);
    window.removeEventListener("reset", this.handleResetTimer, true);
  }
  updated() {
    this.minutesElement = this.shadowRoot.getElementById("minutes");
    this.secondsElement = this.shadowRoot.getElementById("seconds");
  }
  renderDisplay = (time) => {
    const minutesValue = Math.floor(time / 60);
    const secondsValue = time % 60;

    // this.minutesElement.textContent = minutesValue;
    this.minutesElement.textContent =
      this.dobledigits && minutesValue < 10 ? `0${minutesValue}` : minutesValue;
    this.secondsElement.textContent =
      this.dobledigits && secondsValue < 10 ? `0${secondsValue}` : secondsValue;
    // this.secondsElement.textContent = secondsValue;
  };

  handlePlayTimer = () => {
    if (this.startInSeconds === 0) {
      this.startInSeconds = this.start;
    }

    if (this.reverse) {
      this.timer = setInterval(() => {
        if (this.startInSeconds <= 0) {
          clearInterval(this.timer);

          // EVENT END TIMER
          const event = new CustomEvent("timer-end", {
            detail: {
              message: "Timer ended",
            },
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);

          //  AUTORESET
          if (this.autoreset) {
            this.startInSeconds = this.start;
            this.renderDisplay(this.startInSeconds);
            this.handlePlayTimer();
          }
          return;
        }
        this.startInSeconds--;
        this.renderDisplay(this.startInSeconds);
      }, 1000);
    } else {
      this.startInSeconds = 0;
      this.timer = setInterval(() => {
        if (this.startInSeconds >= this.limit) {
          clearInterval(this.timer);
          const event = new CustomEvent("timer-end", {
            detail: {
              message: "Timer ended",
            },
            bubbles: true,
            composed: true,
          });
          if (this.autoreset) {
            this.startInSeconds = 0;
            this.renderDisplay(this.startInSeconds);
            this.handlePlayTimer();
          }
          return;
        }
        this.startInSeconds++;
        this.renderDisplay(this.startInSeconds);
      }, 1000);
    }
  };

  handlePauseTimer = () => {
    clearInterval(this.timer);
  };
  handleResetTimer = () => {
    console.log("Child RESET");
  };

  render() {
    return html`
      <div class="display">
        <div
          id="minutes"
          class="minutes"
        >
          00
        </div>
        <div
          id="separador"
          class="separador"
        >:</div>
          <div
            id="seconds"
            class="seconds"
          >
            00
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("shopping-cart-timer", ShoppingCartTimer);
