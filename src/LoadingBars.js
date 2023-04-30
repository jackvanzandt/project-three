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
        moduleCounts: {type: Array},
        currentTabIndex: {type: Number},
    };
  }

constructor() {
    super();
    this.tabTimes = loadingTimes[0];
    this.tabId = 0;
    this.moduleCounts = [50000, 10000, 10000, 50000];
    this.currentTabIndex = 0;
}

  static styles = css`

.main-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

.loading-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 70%;
    margin-top: 30px;
  }
  .loading-row {
    display: flex;
    align-items: center;
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
    height: 60px;
    background-color: #f3f3f3;
    position: relative;
    overflow: hidden;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px 0px 5px 5px;
    box-sizing: border-box;
  }
  .loading-bar {
    height: 30px;
    position: absolute;
    border-radius: 5px;
    min-width: 5%;
  }

  .module-count {
    color: #656363;
    font-size: 20px;
    text-align: center;
    
  }

  .module-count-container {
  width: 100%;
  padding-top: 20px;
  justify-content: center;
}
`;

totalTabTime() {
    return this.tabTimes.reduce((total, item) => total + item.time, 0);
  }

setTabTimes(tabIndex) {
    this.tabTimes = loadingTimes[tabIndex];
    this.tabId = Date.now();
    this.currentTabIndex = tabIndex;
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
    <div class="main-container">
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
      <div class="module-count-container">
        <div class="module-count">Module Count: ${this.moduleCounts[this.currentTabIndex]}</div>
      </div>
    </div>
    `;
  }
  
}

customElements.define(LoadingBars.tag, LoadingBars);