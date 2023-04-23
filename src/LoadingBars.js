import { LitElement, html, css } from 'lit';

export class LoadingBars extends LitElement {
  static get tag() {
    return 'loading-bars';
  }

  static styles = css`
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
  }

  .loading {
    width: 50%;
    height: 16px;
    background-color: #f3f3f3;
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    border: 1px solid black;
    border-radius: 8px;
  }

  .loading-bar {
    width: 0;
    height: 8px;
    background-color: #4CAF50;
    position: absolute;
    animation: loading 2s linear infinite;
    border-radius: 8px;
  }

  @keyframes loading {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

render() {
    return html`
      <div class="loading-container">
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
      </div>
    `;
  }
  
}

customElements.define(LoadingBars.tag, LoadingBars);