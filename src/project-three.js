import { LitElement, html, css } from 'lit';


export class ProjectThree extends LitElement {
  static get tag() {
    return 'project-three';
  }

  static styles = css`
  body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  text-align: center;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, yellow, orange);
  -webkit-background-clip: text;
  color: transparent;
}

.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;
}

.spacer {
  height: 100vh;
}

.fade-text {
  text-align: center;
}

.intro-text {
  text-align: center;
  font-size: 18px;
  color:#6b6b6b;
}

.tablinks {
  border: none;
}

.tabs button {
  border-bottom: 2px solid gray;
  color: gray;
  font-size: 16px;
}

.loading {
      width: 100%;
      height: 4px;
      background-color: #f3f3f3;
      position: relative;
      overflow: hidden;
    }

    .loading-bar {
      width: 0;
      height: 4px;
      background-color: #4CAF50;
      position: absolute;
      animation: loading 2s linear infinite;
    }

    @keyframes loading {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    `;

render() {
  return html`
  <body>
    <div class="spacer"></div>
    <div class="fade-text">
      <h1>Blazing fast build speed</h1>
    </div>
    <div class="intro-text">
      <h2>Combining TypeScript and Rust with a parallelized architecture to bring you the ultimate developer experience.</h2>
    </div>
    <div class="tabs">
      <button class="tablinks" onclick="openTab(event, 'cold-start')">Cold Start</button>
      <button class="tablinks" onclick="openTab(event, 'hmr-root')">HMR (root changed)</button>
      <button class="tablinks" onclick="openTab(event, 'hmr-leaf')">HMR (leaf changed)</button>
      <button class="tablinks" onclick="openTab(event, 'cold-build')">Cold Build</button>
    </div>
    <div id="cold-start" class="tabcontent">
    <div class="loading">
      <div class="loading-bar"></div>
    </div>
    <div class="content"></div>
  </div>
  <div id="hmr-root" class="tabcontent">
    <div class="loading">
      <div class="loading-bar"></div>
    </div>
    <div class="content"></div>
  </div>
  <div id="hmr-leaf" class="tabcontent">
    <div class="loading">
      <div class="loading-bar"></div>
    </div>
    <div class="content"></div>
  </div>
  <div id="cold-build" class="tabcontent">
    <div class="loading">
      <div class="loading-bar"></div>
    </div>
    <div class="content"></div>
  </div>
  `;
  
}

  
    }


customElements.define('project-three', ProjectThree);