import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExchangeSuggestedModal } from "./ExchangeSuggestedModal";
import { useState } from "react";

const meta: Meta<typeof ExchangeSuggestedModal> = {
  title: "features/ExchangeSuggestedModal",
  component: ExchangeSuggestedModal,
};

export default meta;
type Story = StoryObj<typeof ExchangeSuggestedModal>;

const ModalWithState = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Показать модалку успеха</button>
      <ExchangeSuggestedModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
