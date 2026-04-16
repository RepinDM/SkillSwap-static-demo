import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TSkillCard } from "@/entities/skill/types";
import { ExchangeSuggestedModal } from "./ExchangeSuggestedModal";
import { useState } from "react";

const mockCard: TSkillCard = {
  id: 1,
  user: {
    id: 10,
    name: "Анна",
    city: { name: "Москва" },
  },
  teachSkill: {
    id: 1,
    userId: 10,
    subcategory: {
      id: 1,
      name: "Подкатегория",
      category: { id: 1, name: "Категория", slug: "demo" },
    },
    title: "Демо-навык",
    description: "Описание для Storybook",
    skillType: "teach",
    createdDate: new Date(),
  },
  learnSkills: [],
};

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
      <ExchangeSuggestedModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        card={mockCard}
      />
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
    card: mockCard,
  },
};
