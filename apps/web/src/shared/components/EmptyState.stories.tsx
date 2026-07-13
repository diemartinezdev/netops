import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchOffIcon from "@mui/icons-material/SearchOffOutlined";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Shared/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box sx={{ width: 480, border: 1, borderColor: "divider", borderRadius: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    title: "No sites match your filters",
    description: "Try clearing filters or changing the search term.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Nothing found",
    description: "Your search didn't return any results.",
    icon: <SearchOffIcon fontSize="inherit" />,
  },
};

export const WithAction: Story = {
  args: {
    title: "No incidents",
    description: "All quiet on the network.",
    action: (
      <Button variant="outlined" size="small">
        Refresh
      </Button>
    ),
  },
};
