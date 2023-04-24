import { LitElement, html, css } from 'lit';
import { LoadingAnimation } from './LoadingAnimation.js';

export class LoadingBars extends LitElement {
  static get tag() {
    return 'loading-bars';
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

render() {
    return html`
    <div class="loading-container">
      <div class="loading-row">
        <div class="loading-label">Rspack</div>
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
      </div>
      <div class="loading-row">
        <div class="loading-label">Webpack (with SWC)</div>
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
      </div>
      <div class="loading-row">
        <div class="loading-label">Webpack (with babel)</div>
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
      </div>
    </div>
    `;
  }
  
}

customElements.define(LoadingBars.tag, LoadingBars);