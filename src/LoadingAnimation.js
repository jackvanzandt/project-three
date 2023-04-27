import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-progress/simple-progress.js';

export class LoadingAnimation extends LitElement {
  static get tag() {
    return 'loading-animation';
  }

  static get properties() {
    return {
      time: { type: Number },
      progress: { type: Number },
      intervalId: { type: Object },
      tabId: {type: String}
    };
  }

  static get styles() {
    return css`
      .loading-bar {
        height: 20px;
        width: 100%;
        background: linear-gradient(to right, orange, yellow, red);
        transition: width 0.1s linear;
      }
    `;
  }

  constructor() {
    super();
    this.time = 0;
    this.progress = 0;
    this.intervalId = null;
  }

  render() {
    return html`
      <div class="loading-bar" style="width: ${this.progress}%;"></div>
    `;
  }

  firstUpdated() {
    console.log('First Updated Time: ',this.time)
    this.startLoading();
  }

  updated(changedProperties) {
    if (changedProperties.has('tabId')) {
      this.resetLoading();
      this.startLoading();
    }
  }

startLoading() {
  const increment = 100 / (this.time * 10);
  const maxProgress = this.time * 10;

  console.log('Interval Time:', this.time * 10);
  console.log('Increment:', increment);

  this.intervalId = setInterval(() => {
    this.progress += increment;
    if (this.progress >= maxProgress) {
      this.stopLoading();
    }

    this.requestUpdate();
  }, 100);
}


  stopLoading() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resetLoading() {
    this.stopLoading();
    this.progress = 0;
  }
}

customElements.define(LoadingAnimation.tag, LoadingAnimation);
