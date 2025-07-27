import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "VerneUI/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: {
      action: "clicked",
      description: "Button click handler",
      table: { type: { summary: "function" } },
    },
    variant: {
      control: "select",
      description: "Visual variant of the button",
      table: {
        type: { summary: "string" },
      },
      options: ["primary", "secondary", "outline", "ghost", "danger", "success"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the button",
      table: { type: { summary: "string" } },
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon relative to the button text",
      table: {
        type: { summary: "string" },
      },
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
      table: { type: { summary: "boolean" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
      table: { type: { summary: "boolean" } },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: { type: { summary: "string" } },
    },
    icon: {
      control: "text",
      description: "Icon to display in the button",
      table: { type: { summary: "ReactNode" } },
    },
    children: {
      control: "text",
      description: "Button label or content",
      table: { type: { summary: "ReactNode" } },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Button",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Button",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Button",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: "🔍",
    iconPosition: "left",
    children: "Search",
  },
};

export const WithLoading: Story = {
  args: {
    variant: "primary",
    loading: true,
    children: "Loading...",
  },
};
