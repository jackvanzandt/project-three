import { LitElement, html, css } from 'lit';
import './LoadingAnimation.js';
import { loadingTimes } from './LoadingTimes.js';

export class LoadingBars extends LitElement {
  static get tag() {
    return 'loading-bars';
  }

  static get properties() {
    return{
        tabTimes: {type: Array},
    };
  }

constructor() {
    super();
    this.tabTimes = loadingTimes[0];
}

  static styles = css`
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 70%;
    margin-top: 30px;
  }
  .loading-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }
  .loading-label {
    color: gray;
    font-size: 14px;
    text-align: right;
    flex-basis: 40%;
  }
  .loading {
    flex-grow: 1;
    height: 20px;
    background-color: #f3f3f3;
    position: relative;
    overflow: hidden;
    border: 1px solid black;
    border-radius: 5px;
  }
  .loading-bar {
    height: 20px;
    position: absolute;
    border-radius: 5px;
  }
`;

setTabTimes(tabIndex) {
    this.tabTimes = loadingTimes[tabIndex];
    this.requestUpdate();
  }

render() {
    return html`
      <div class="loading-container">
        ${this.tabTimes.map(item => html`
          <div class="loading-row">
            <div class="loading-label">${item.name}</div>
            <div class="loading">
              <loading-animation time="${item.time}"></loading-animation>
            </div>
          </div>
        `)}
      </div>
    `;
  }
  
}

customElements.define(LoadingBars.tag, LoadingBars);