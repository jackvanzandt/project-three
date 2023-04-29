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
        tabId: {type: Number},
    };
  }

constructor() {
    super();
    this.tabTimes = loadingTimes[0];
    this.tabId = 0;
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
    height: 50px;
    background-color: #f3f3f3;
    position: relative;
    overflow: hidden;
    border: 1px solid black;
    border-radius: 5px;
  }
  .loading-bar {
    height: 30px;
    position: absolute;
    border-radius: 5px;
    min-width: 5%;
  }
`;

totalTabTime() {
    return this.tabTimes.reduce((total, item) => total + item.time, 0);
  }

setTabTimes(tabIndex) {
    this.tabTimes = loadingTimes[tabIndex];
    this.tabId = Date.now();
    this.requestUpdate();
  }

  firstUpdated() {
    this.startObserving();
  }
  
  startLoadingAnimations() {
    this.shadowRoot.querySelectorAll('loading-animation').forEach(animation => animation.startLoading());
  }
  
  resetLoadingAnimations() {
    this.shadowRoot.querySelectorAll('loading-animation').forEach(animation => animation.resetLoading());
  }

  startObserving() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startLoadingAnimations();
          } else {
            this.resetLoadingAnimations();
          }
        });
      });
      
      observer.observe(this);
    } else {
      this.startLoadingAnimations();
    }
  }
  
  

  render() {
    return html`
    <div class="loading-container">
      ${this.tabTimes.map((item, index) => html`
        <div class="loading-row">
          <div class="loading-label">${item.name}</div>
          <div class="loading">
            <loading-animation .time="${item.time}" .tabId="${this.tabId}" .tabTime="${this.totalTabTime()}"></loading-animation>
            <div class="loading-time"></div>
          </div>
        </div>
      `)}
    </div>
    `;
  }
  
}

customElements.define(LoadingBars.tag, LoadingBars);