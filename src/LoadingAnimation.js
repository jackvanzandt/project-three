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
      maxTime: {type: Number}
    };
  }

  static get styles() {
    return css`

    .loading-bar {
        height: 50px;
        background: linear-gradient(to right, yellow, orange);
        transition: width 0.1s linear;
        border-radius: 5px;
        z-index: 1;
        position: relative;
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
        height: 60px;
        width: 100%;
        padding: 5px;
    }

    .loading-endpoint {
        position: absolute;
        height: 50px;
        background: rgba(128, 128, 128, 0.3);
        border-radius: 5px;
        left: 5px;
        top: 5px;
        bottom: 5px;
        width: auto;
        
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
    const endpointWidth = ((this.tabTime - this.time) / this.tabTime) * 100;
    return html`
      <div class="loading-bar" style="width: ${this.progress}%;"></div>
      <div class="loading-endpoint" style="right: ${endpointWidth}%;"></div>
      <div class="loading-time">${this.formatTime(this.seconds)}</div>
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


displayTime() {
    if (this.time < 1) {
      return `${(this.seconds * 1000).toFixed(0)} ms`;
    }
        return `${this.seconds.toFixed(1)} s`;
  }


formatTime(seconds) {
    return seconds < 1 ? `${(seconds * 1000).toFixed(0)} ms` : `${seconds.toFixed(2)} s`;
  }
}

customElements.define(LoadingAnimation.tag, LoadingAnimation);