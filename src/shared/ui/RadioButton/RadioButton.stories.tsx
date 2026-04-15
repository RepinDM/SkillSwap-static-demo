import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "shared/RadioButton",
  component: RadioButton,
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    hint: { control: "text" },
  },
  args: {
    name: "storybook-radio",
    value: "option",
    label: "Подпись",
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Checked: Story = {
  args: {
    label: "Выбрано",
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: "Не выбрано",
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Отключено",
    checked: true,
    disabled: true,
  },
};

export const WithHint: Story = {
  args: {
    label: "С подсказкой",
    checked: true,
    hint: "Дополнительный текст под полем",
  },
};

export const WithError: Story = {
  args: {
    label: "С ошибкой",
    checked: false,
    error: "Выберите значение",
  },
};

export const Group: Story = {
  render: function GroupStory() {
    const [value, setValue] = useState<"a" | "b" | "c">("b");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 320,
        }}
      >
        <RadioButton
          name="storybook-radio-group"
          value="a"
          label="Вариант A"
          checked={value === "a"}
          onChange={() => setValue("a")}
        />
        <RadioButton
          name="storybook-radio-group"
          value="b"
          label="Вариант B"
          checked={value === "b"}
          onChange={() => setValue("b")}
        />
        <RadioButton
          name="storybook-radio-group"
          value="c"
          label="Вариант C"
          checked={value === "c"}
          onChange={() => setValue("c")}
        />
      </div>
    );
  },
};
