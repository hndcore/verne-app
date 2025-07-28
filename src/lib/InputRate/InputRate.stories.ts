import type { Meta, StoryObj } from "@storybook/react-vite";
import InputRate from "./InputRate";

const meta = {
  title: "VerneUI/InputRate",
  component: InputRate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
      description: "Current rating value",
      table: { type: { summary: "number" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the rating stars",
      table: { type: { summary: "string" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the rating input",
      table: { type: { summary: "boolean" } },
    },
    onChange: {
      action: "changed",
      description: "Function called when the rating value changes",
      table: { type: { summary: "function" } },
    },
    editable: {
      control: "boolean",
      description: "Allow the user to change the rating",
      table: { type: { summary: "boolean" } },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: { type: { summary: "string" } },
    },
    testId: {
      control: "text",
      description: "Test ID for the component",
      table: { type: { summary: "string" } },
    },
    label: {
      control: "text",
      description: "Aria label for the rating input",
      table: { type: { summary: "string" } },
    },
  },
  args: {},
} satisfies Meta<typeof InputRate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    editable: true,
    size: "md",
    disabled: false,
    className: "",
    testId: "input-rate",
  },
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    editable: false,
    size: "md",
    disabled: false,
    className: "",
    testId: "input-rate-readonly",
  },
};
