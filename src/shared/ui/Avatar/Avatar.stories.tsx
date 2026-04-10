import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import avatarExample from "@/shared/image/png/Avatar-example.png";

const meta: Meta<typeof Avatar> = {
  title: "shared/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: { type: "number" } },
    src: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default48: Story = {
  args: { size: 48 },
};

export const Small48: Story = {
  args: { size: 48 },
};

export const Medium100: Story = {
  args: { size: 100 },
};

export const Large244: Story = {
  args: { size: 244 },
};

export const WithPhoto100: Story = {
  args: { src: avatarExample, size: 100 },
};

export const BrokenImage100: Story = {
  args: { src: "https://invalid-url.com/photo.jpg", size: 100 },
};
