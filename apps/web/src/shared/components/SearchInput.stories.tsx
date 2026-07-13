import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "Shared/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: { type: "inline-radio" },
      options: ["small", "medium"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

function Controlled(args: React.ComponentProps<typeof SearchInput>) {
  const [value, setValue] = useState(args.value ?? "");
  return <SearchInput {...args} value={value} onChange={setValue} />;
}

export const Empty: Story = {
  render: (args) => <Controlled {...args} />,
  args: { placeholder: "Search sites...", ariaLabel: "Search sites" },
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: "paris",
    placeholder: "Search sites...",
    ariaLabel: "Search sites",
  },
};

export const WithLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: "Search", placeholder: "Type something..." },
};
