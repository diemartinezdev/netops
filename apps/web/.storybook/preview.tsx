import type { Preview, Decorator } from "@storybook/react-vite";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/shared/theme/theme";

const withTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "centered",
    a11y: {
      config: { rules: [{ id: "color-contrast", enabled: true }] },
    },
  },
  decorators: [withTheme],
};

export default preview;
