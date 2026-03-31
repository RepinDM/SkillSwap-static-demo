import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { NavDropdown } from "./NavDropdown";

const meta: Meta<typeof NavDropdown> = {
  title: "widgets/NavDropdown",
  component: NavDropdown,
  args: {
    isOpen: true,
    onClose: () => {},
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ position: "relative" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavDropdown>;

export const Open: Story = {
  args: { isOpen: true },
};

export const Closed: Story = {
  args: { isOpen: false },
};
