import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "widgets/Footer",
  component: Footer,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
