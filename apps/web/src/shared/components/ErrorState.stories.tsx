import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { ErrorState } from "./ErrorState";

const meta: Meta<typeof ErrorState> = {
  title: "Shared/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <Box sx={{ width: 520 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};

export const WithRetry: Story = {
  args: {
    title: "Couldn't load sites",
    message: "The API returned an error. Try again in a moment.",
    onRetry: () => {},
  },
};

export const CustomMessage: Story = {
  args: {
    title: "Network unreachable",
    message: "We can't reach the API right now. Check your connection.",
  },
};
