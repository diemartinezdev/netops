import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import { LoadingSkeleton } from "./LoadingSkeleton";

const meta: Meta<typeof LoadingSkeleton> = {
  title: "Shared/LoadingSkeleton",
  component: LoadingSkeleton,
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
type Story = StoryObj<typeof LoadingSkeleton>;

export const Default: Story = {};

export const ShortList: Story = {
  args: { rows: 2, height: 40 },
};

export const LongList: Story = {
  args: { rows: 8, height: 40 },
};

export const Tall: Story = {
  args: { rows: 3, height: 96 },
};
