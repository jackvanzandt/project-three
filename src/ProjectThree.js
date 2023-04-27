import { LitElement, html, css } from 'lit';
import './LoadingBars.js';

export class ProjectThree extends LitElement {
    static get tag() {
        return 'project-three'
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
  background: linear-gradient(to right, yellow, orange,);
  color: transparent;
}
p {
  font-size: 60px;
  background: linear-gradient(to right, yellow, orange);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
.tabcontent {
  display: none;
  }
@keyframes loading {
  0% { left: -100%; }
  100% { left: 100%; }
    }
.tablinks.active {
  color: orange;
  border-bottom: 2px solid orange;
}
`;

render() {
  return html`
    <body>
      <div class="spacer">
        <p>Scroll Down</p>
      </div>
      <div class="fade-text">
        <h1>Blazing fast build speed</h1>
      </div>
      <div class="intro-text">
        <h2>Combining TypeScript and Rust with a parallelized architecture to bring you the ultimate developer experience.</h2>
      </div>
      <div class="tabs">
        <button class="tablinks" @click=${(e) => this.openTab(e, 'cold-start', 0)}>Cold Start</button>
        <button class="tablinks" @click=${(e) => this.openTab(e, 'hmr-root', 1)}>HMR (root changed)</button>
        <button class="tablinks" @click=${(e) => this.openTab(e, 'hmr-leaf', 2)}>HMR (leaf changed)</button>
        <button class="tablinks" @click=${(e) => this.openTab(e, 'cold-build', 3)}>Cold Build</button>
      </div>
      <div id="cold-start" class="tabcontent">
        <loading-bars id="loading-bars-cold-start"></loading-bars>
        <div class="content"></div>
      </div>
      <div id="hmr-root" class="tabcontent">
        <loading-bars id="loading-bars-hmr-root"></loading-bars>
        <div class="content"></div>
      </div>
      <div id="hmr-leaf" class="tabcontent">
        <loading-bars id="loading-bars-hmr-leaf"></loading-bars>
        <div class="content"></div>
      </div>
      <div id="cold-build" class="tabcontent">
        <loading-bars id="loading-bars-cold-build"></loading-bars>
        <div class="content"></div>
      </div>
    </div>
  `;
}

firstUpdated() {
  const firstTabButton = this.shadowRoot.querySelector(".tablinks");
  this.openTab({ currentTarget: firstTabButton }, 'cold-start', 0);
}

openTab(e, tabName, tabIndex) {
  const tabcontent = this.shadowRoot.querySelectorAll(".tabcontent");
  const tablinks = this.shadowRoot.querySelectorAll(".tablinks");
  const currentTab = this.shadowRoot.getElementById(tabName);

  // Hide all tabs
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all buttons
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Display the current tab and add the "active" class to the clicked button
  currentTab.style.display = "block";
  e.currentTarget.classList.add("active");

  // Get the loading-bars component in the current tab and update its tabTimes
  const loadingBarsElement = this.shadowRoot.querySelector(`#loading-bars-${tabName}`);
  loadingBarsElement.setTabTimes(tabIndex);
}

}


  customElements.define(ProjectThree.tag, ProjectThree);