import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "shared/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithState = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Открыть модалку</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3>Содержимое модального окна</h3>
          <p>Кликните вне окна или нажмите кнопку для закрытия</p>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWithState />,
};
