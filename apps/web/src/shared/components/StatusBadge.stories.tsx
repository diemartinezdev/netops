import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "@mui/material/Stack";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Shared/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["online", "degraded", "offline", "maintenance"],
    },
    size: {
      control: { type: "inline-radio" },
      options: ["small", "medium"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Online: Story = { args: { status: "online" } };
export const Degraded: Story = { args: { status: "degraded" } };
export const Offline: Story = { args: { status: "offline" } };
export const Maintenance: Story = { args: { status: "maintenance" } };

export const AllStatuses: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <StatusBadge status="online" />
      <StatusBadge status="degraded" />
      <StatusBadge status="offline" />
      <StatusBadge status="maintenance" />
    </Stack>
  ),
};
