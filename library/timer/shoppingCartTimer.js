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
    this.startInSeconds = null;
    this.timer = null;
  }
  static properties = {
    reverse: { type: Boolean },
    autoreset: { type: Boolean },
    autostart: { type: Boolean },
    start: { type: Number },
    limit: { type: Number },
    dobledigits: { type: Boolean },
  };
  // What happens when the component is mounted
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("play", this.handlePlayTimer, true);
    window.addEventListener("pause", this.handlePauseTimer, true);
    window.addEventListener("reset", this.handleResetTimer, true);
  }

  firstUpdated() {
    if (this.reverse) {
      this.startInSeconds = this.start;
    } else if (!this.reverse) {
      this.startInSeconds = 0;
    }
    // this.renderDisplay(this.startInSeconds); PENDIENTE

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

  // What happens when the component is unmounted
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("play", this.handlePlayTimer, true);
    window.removeEventListener("pause", this.handlePauseTimer, true);
    window.removeEventListener("reset", this.handleResetTimer, true);
  }
  // when we want to update the DOM before the component is rendered
  updated() {
    this.minutesElement = this.shadowRoot.getElementById("minutes");
    this.secondsElement = this.shadowRoot.getElementById("seconds");
  }
  // Function that renders data to display
  renderDisplay = (time) => {
    const minutesValue = Math.floor(time / 60);
    const secondsValue = time % 60;

    this.minutesElement.textContent =
      this.dobledigits && minutesValue < 10 ? `0${minutesValue}` : minutesValue;
    this.secondsElement.textContent =
      this.dobledigits && secondsValue < 10 ? `0${secondsValue}` : secondsValue;
  };
  // Function that handles the timer PLAY event
  handlePlayTimer = () => {
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
          this.startInSeconds = this.start;
          this.renderDisplay(this.startInSeconds);

          //  AUTORESET
          if (this.autoreset) {
            this.handlePlayTimer();
          }
          return;
        }
        this.startInSeconds--;
        this.renderDisplay(this.startInSeconds);
      }, 1000);
    } else {
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
          this.dispatchEvent(event);
          this.startInSeconds = 0;
          this.renderDisplay(this.startInSeconds);
          //  AUTORESET
          if (this.autoreset) {
            this.handlePlayTimer();
          }
          return;
        }
        this.startInSeconds++;
        this.renderDisplay(this.startInSeconds);
      }, 1000);
    }
  };
  // Function that handles the timer PAUSE event
  handlePauseTimer = () => {
    clearInterval(this.timer);
  };
  // Function that handles the timer RESET event
  handleResetTimer = () => {
    clearInterval(this.timer);
    if (this.reverse) {
      this.startInSeconds = this.start;
    } else if (!this.reverse) {
      this.startInSeconds = 0;
    }
    this.renderDisplay(this.startInSeconds);
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
