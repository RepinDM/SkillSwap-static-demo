import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "shared/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    hint: { control: "text" },
  },
  args: {
    label: "Подпись",
    onChange: () => undefined,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Checked: Story = {
  args: {
    label: "Отмечено",
    checked: true,
    indeterminate: false,
  },
};

export const Unchecked: Story = {
  args: {
    label: "Не отмечено",
    checked: false,
    indeterminate: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Частичный выбор",
    checked: false,
    indeterminate: true,
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
    error: "Нужно отметить пункт",
  },
};

export const Toggle: Story = {
  render: function ToggleStory() {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ maxWidth: 320 }}>
        <Checkbox
          label="Нажмите, чтобы переключить"
          checked={checked}
          indeterminate={false}
          onChange={() => setChecked((v) => !v)}
        />
      </div>
    );
  },
};
