import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import InputLov, { type Option } from "./InputLov";

const meta = {
  title: "VerneUI/InputLov",
  component: InputLov,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    loadOptions: {
      action: "loadOptions",
      description: "Async function to load options",
      table: { type: { summary: "function" } },
    },
    onChange: {
      action: "changed",
      description: "Called when selection changes",
      table: { type: { summary: "function" } },
    },
    onCreateOption: {
      action: "createOption",
      description: "Called when creating new option",
      table: { type: { summary: "function" } },
    },
    value: {
      control: { type: "object" },
      description: "Selected option",
      table: { type: { summary: "Option | null" } },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the input",
      table: { type: { summary: "sm | md | lg" }, defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    isClearable: {
      control: "boolean",
      description: "Show clear button",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: { type: { summary: "string" }, defaultValue: { summary: "Search..." } },
    },
    noOptionsMessage: {
      control: "text",
      description: "Message when no options found",
      table: { type: { summary: "string" }, defaultValue: { summary: "No results found" } },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: { type: { summary: "string" } },
    },
    testId: {
      control: "text",
      description: "Test ID for the input element",
      table: { type: { summary: "string" }, defaultValue: { summary: "input-lov-input" } },
    },
  },
  args: {
    placeholder: "Search...",
    size: "md",
    disabled: false,
    isClearable: true,
    noOptionsMessage: "No results found",
    value: null,
    loadOptions: async (_: string) => {
      return new Promise(resolve => {
        setTimeout(() => resolve([]), 500);
      });
    },
  },
} satisfies Meta<typeof InputLov>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockTechnologies: Option[] = [
  { label: "React", value: "react" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Node.js", value: "node" },
  { label: "Ruby", value: "ruby" },
  { label: "Python", value: "python" },
  { label: "Golang", value: "golang" },
];

const mockUsers: Option[] = [
  { label: "Homer Simpson", value: "homer.simpson" },
  { label: "Ned Flanders", value: "ned.flanders" },
  { label: "Montgomery Burns", value: "montgomery.burns" },
  { label: "Nelson Muntz", value: "nelson.muntz" },
  { label: "Milhouse Van Houten", value: "milhouse.van.houten" },
];

const StoryWrapper = ({ mockData, delay = 800, allowCreate = false, ...args }: any) => {
  const [selectedValue, setSelectedValue] = useState<Option | null>(args.value || null);

  const loadOptions = async (inputValue: string): Promise<Option[]> => {
    await new Promise(resolve => setTimeout(resolve, delay));

    if (!inputValue.trim()) return [];

    return mockData.filter((option: Option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const handleChange = (option: Option | null) => {
    setSelectedValue(option);
    if (args.onChange) {
      args.onChange(option);
    }
    console.log("Selected:", option);
  };

  const handleCreateOption = allowCreate
    ? (inputValue: string) => {
        const newOption: Option = {
          label: inputValue,
          value: inputValue.toLowerCase().replace(/\s+/g, "-"),
        };
        mockData.push(newOption);
        setSelectedValue(newOption);
        if (args.onCreateOption) {
          args.onCreateOption(inputValue);
        }
        console.log("Created:", newOption);
      }
    : undefined;

  return (
    <div style={{ width: "400px" }}>
      <InputLov
        {...args}
        value={selectedValue}
        loadOptions={loadOptions}
        onChange={handleChange}
        onCreateOption={handleCreateOption}
      />

      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          backgroundColor: "#fffaf6ff",
          borderRadius: "6px",
          fontSize: "14px",
          border: "1px solid #d1d5db",
        }}
      >
        <strong>CURRENT VALUE:</strong>
        <pre
          style={{
            margin: "8px 0 0 0",
            fontSize: "12px",
            background: "#ffffff",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #e5e7eb",
          }}
        >
          {selectedValue ? JSON.stringify(selectedValue, null, 2) : "null"}
        </pre>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: args => <StoryWrapper {...args} mockData={mockTechnologies} delay={800} />,
  args: {
    placeholder: "Search technology...",
    noOptionsMessage: "No technologies found",
  },
};

export const WithCreateOption: Story = {
  render: args => (
    <StoryWrapper {...args} mockData={[...mockTechnologies]} delay={600} allowCreate={true} />
  ),
  args: {
    placeholder: "Search or create technology...",
    noOptionsMessage: "No technologies found",
  },
  parameters: {
    docs: {
      description: {
        story:
          'When no results are found and there is text written, the option to "Add [text]" appears.',
      },
    },
  },
};

export const UserSearch: Story = {
  render: args => <StoryWrapper {...args} mockData={mockUsers} delay={400} allowCreate={true} />,
  args: {
    placeholder: "Search user...",
    noOptionsMessage: "User not found",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Example with different data (users) and faster delay.",
      },
    },
  },
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "400px" }}>
      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#374151" }}
        >
          Small
        </label>
        <StoryWrapper {...args} size="sm" mockData={mockTechnologies} />
      </div>
      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#374151" }}
        >
          Medium (Default)
        </label>
        <StoryWrapper {...args} size="md" mockData={mockTechnologies} />
      </div>
      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#374151" }}
        >
          Large
        </label>
        <StoryWrapper {...args} size="lg" mockData={mockTechnologies} />
      </div>
    </div>
  ),
  args: {
    placeholder: "Different sizes...",
  },
  parameters: {
    docs: {
      description: {
        story: "Comparison of available sizes: sm, md, lg.",
      },
    },
  },
};

export const SlowAPI: Story = {
  render: args => (
    <StoryWrapper {...args} mockData={mockTechnologies} delay={2000} allowCreate={true} />
  ),
  args: {
    placeholder: "Slow API (2s delay)...",
    noOptionsMessage: "No results found",
  },
  parameters: {
    docs: {
      description: {
        story: "Simulates a slow API to test loading states and spinners.",
      },
    },
  },
};
