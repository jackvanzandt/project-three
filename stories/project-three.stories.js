import { html } from 'lit';
import '../src/project-three.js';

export default {
  title: 'ProjectThree',
  component: 'project-three',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <project-three
      style="--project-three-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </project-three>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
