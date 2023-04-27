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
      intervalId: { type: Number, attribute: false },
    };
  }

  static get styles() {
    return css`
      simple-progress {
        --simple-progress-color: linear-gradient(to right, orange, yellow, red);
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
      <simple-progress max="100" value="${this.progress}"></simple-progress>
    `;
  }

  firstUpdated() {
    console.log(this.time)
    this.startLoading();
  }

  updated(changedProperties) {
    if (changedProperties.has('time')) {
      this.resetLoading();
      this.startLoading();
    }
  }

  startLoading() {
    this.intervalId = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.stopLoading();
      }
    }, this.time * 10);
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
