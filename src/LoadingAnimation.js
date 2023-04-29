import { LitElement, html, css } from 'lit';
import '@lrnwebcomponents/simple-progress/simple-progress.js';

export class LoadingAnimation extends LitElement {
  static get tag() {
    return 'loading-animation';
  }

  static get properties() {
    return {
      time: { type: Number },
      tabTime: {type: Number},
      progress: { type: Number },
      intervalId: { type: Object },
      tabId: {type: String},
      seconds: {type: Number},
    };
  }

  static get styles() {
    return css`

    .loading-bar {
        height: 50px;
        width: 100%;
        background: linear-gradient(to right, orange, yellow, red);
        transition: width 0.1s linear;
    }

    .loading-time {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        padding-right: 10px;
    }
        
    .loading-bar-container {
        height: 50px;
        width: 100%;
        position: relative;
    }
`;
}

  constructor() {
    super();
    this.time = 0;
    this.progress = 0;
    this.intervalId = null;
    this.seconds = 0;
  }

  render() {
    return html`
      <div class="loading-bar" style="width: ${this.progress * 0.9}%;"></div>
    <div class="loading-time">${this.seconds.toFixed(1)}s</div>
    `;
  }

  firstUpdated() {
    console.log('First Updated Time: ',this.time)
  }

  updated(changedProperties) {
    if (changedProperties.has('tabId')) {
      this.resetLoading();
      this.startLoading();
    }
  }


  startLoading() {
    const increment = 100 / (this.tabTime * 10);

    this.intervalId = setInterval(() => {
      this.progress += increment;
      this.seconds += 0.1;
      
      if (this.progress >= (this.time / this.tabTime) * 100 || this.seconds >= this.time) {
        this.progress = (this.time / this.tabTime) * 100;
        this.seconds = this.time;
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
    this.seconds = 0;
  }
}

customElements.define(LoadingAnimation.tag, LoadingAnimation);