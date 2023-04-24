import { LitElement, html } from 'lit';
import '@lrnwebcomponents/simple-progress/simple-progress.js';

export class LoadingAnimation extends LitElement {
  static get tag() {
    return 'loading-animation';
  }

  static get properties() {
    return {
      percent: { type: Number },
    };
  }

  constructor() {
    super();
    this.percent = 0;
  }

  render() {
    return html`
      <simple-progress
        class="loading-bar"
        .percent="${this.percent}"
        display="inside"
        gradient color="yellow"
        end-color="orange"
      ></simple-progress>
    `;
  }
}

customElements.define(LoadingAnimation.tag, LoadingAnimation);
