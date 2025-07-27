import type { Meta, StoryObj } from "@storybook/react-vite";
import InputText from "./InputText";

const meta = {
  title: "VerneUI/InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Value of the input",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
      table: { type: { summary: "string" } },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input",
      table: { type: { summary: "string" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
      table: { type: { summary: "boolean" } },
    },
    readOnly: {
      control: "boolean",
      description: "Make the input read-only",
      table: { type: { summary: "boolean" } },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: { type: { summary: "string" } },
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Type of the input",
      table: { type: { summary: "string" } },
    },
    onChange: {
      action: "changed",
      description: "Function called when the input value changes",
      table: { type: { summary: "function" } },
    },
    onFocus: {
      action: "focused",
      description: "Function called when the input is focused",
      table: { type: { summary: "function" } },
    },
    onBlur: {
      action: "blurred",
      description: "Function called when the input loses focus",
      table: { type: { summary: "function" } },
    },
    onKeyDown: {
      action: "keyDown",
      description: "Function called when a key is pressed down in the input",
      table: { type: { summary: "function" } },
    },
    testId: {
      control: "text",
      description: "Test ID for the input element",
      table: { type: { summary: "string" }, defaultValue: { summary: "input" } },
    },
  },
  args: {},
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Enter text",
    size: "md",
    disabled: false,
    readOnly: false,
    type: "text",
  },
};

export const Disabled: Story = {
  args: {
    value: "Disabled input",
    placeholder: "Cannot edit this",
    size: "md",
    disabled: true,
  },
};
