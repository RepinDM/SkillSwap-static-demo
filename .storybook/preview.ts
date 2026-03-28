import type { Preview } from "@storybook/react-vite";
import "@/styles/global.scss";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
