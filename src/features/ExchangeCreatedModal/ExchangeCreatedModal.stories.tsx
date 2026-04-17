import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExchangeCreatedModal } from "./ExchangeCreatedModal";
import { useState } from "react";

const meta: Meta<typeof ExchangeCreatedModal> = {
  title: "features/ExchangeCreatedModal",
  component: ExchangeCreatedModal,
};

export default meta;
type Story = StoryObj<typeof ExchangeCreatedModal>;

const ModalWithState = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Показать модалку успеха</button>
      <ExchangeCreatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWithState />,
};

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
