import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "shared/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      defaultValue: "primary",
    },
    disabled: { control: "boolean" },
    iconLeft: { control: "text" },
    iconRight: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Tertiary",
    variant: "tertiary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "primary",
    disabled: true,
  },
};

export const WithIcons: Story = {
  args: {
    children: "С иконками",
    iconLeft: "←",
    iconRight: "→",
  },
};
