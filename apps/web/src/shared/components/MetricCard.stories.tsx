import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import HubIcon from "@mui/icons-material/HubOutlined";
import WarningIcon from "@mui/icons-material/WarningAmberOutlined";
import { MetricCard } from "./MetricCard";

const meta: Meta<typeof MetricCard> = {
  title: "Shared/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box sx={{ width: 280 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    tone: {
      control: { type: "inline-radio" },
      options: ["default", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: { title: "Total sites", value: 15 },
};

export const WithHint: Story = {
  args: { title: "Online", value: 10, hint: "of 15 sites", tone: "success" },
};

export const WithIcon: Story = {
  args: {
    title: "Total sites",
    value: 15,
    icon: <HubIcon />,
  },
};

export const WarningTone: Story = {
  args: {
    title: "Degraded / offline",
    value: 4,
    hint: "3 degraded · 1 offline",
    tone: "warning",
    icon: <WarningIcon />,
  },
};

export const PercentageValue: Story = {
  args: { title: "Average uptime", value: "92.02%" },
};
