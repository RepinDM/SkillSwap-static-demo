import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExchangeSuccessModal } from "./ExchangeSuccessModal";
import { useState } from "react";

const meta: Meta<typeof ExchangeSuccessModal> = {
  title: "features/ExchangeSuccessModal",
  component: ExchangeSuccessModal,
};

export default meta;
type Story = StoryObj<typeof ExchangeSuccessModal>;

const ModalWithState = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Показать модалку успеха</button>
      <ExchangeSuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
