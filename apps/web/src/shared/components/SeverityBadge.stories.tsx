import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "@mui/material/Stack";
import { SeverityBadge } from "./SeverityBadge";

const meta: Meta<typeof SeverityBadge> = {
  title: "Shared/SeverityBadge",
  component: SeverityBadge,
  tags: ["autodocs"],
  argTypes: {
    severity: {
      control: { type: "select" },
      options: ["low", "medium", "high", "critical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SeverityBadge>;

export const Low: Story = { args: { severity: "low" } };
export const Medium: Story = { args: { severity: "medium" } };
export const High: Story = { args: { severity: "high" } };
export const Critical: Story = { args: { severity: "critical" } };

export const AllSeverities: Story = {
  render: () => (
    <Stack direction="row" spacing={1}>
      <SeverityBadge severity="low" />
      <SeverityBadge severity="medium" />
      <SeverityBadge severity="high" />
      <SeverityBadge severity="critical" />
    </Stack>
  ),
};
