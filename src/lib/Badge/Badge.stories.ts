import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";

const meta = {
  title: "VerneUI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      description: "Visual variant of the badge",
      table: {
        type: { summary: "string" },
      },
      options: ["primary", "secondary", "outline", "ghost", "danger", "success"],
    },
    size: {
      control: "select",
      options: ["sm", "lg"],
      description: "Size of the badge",
      table: { type: { summary: "string" } },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: { type: { summary: "string" } },
    },
    children: {
      control: "text",
      description: "Content of the badge",
      table: { type: { summary: "ReactNode" } },
    },
    icon: {
      control: "text",
      description: "Icon to display in the badge",
      table: { type: { summary: "ReactNode" } },
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon relative to the badge text",
      table: {
        type: { summary: "string" },
      },
    },
  },
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Badge",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Badge",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Badge",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Badge",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Badge",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    icon: "⭐",
    children: "Badge with Icon",
  },
};

export const SmallBadge: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Small Badge",
  },
};

export const LargeBadge: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Large Badge",
  },
};
