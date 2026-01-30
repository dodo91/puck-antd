import React from "react";
import { Puck } from "@measured/puck";
import { Button, Card, DatePicker, Form, Input, Select, Table, Typography } from "antd";
import "@measured/puck/dist/puck.css";
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const sampleColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
];

const sampleData = [
  {
    key: "1",
    name: "Project Atlas",
    status: "Active",
    owner: "Maria",
  },
  {
    key: "2",
    name: "Project Nimbus",
    status: "Review",
    owner: "Leo",
  },
];

const config = {
  components: {
    Section: {
      fields: {
        title: { type: "text" },
        description: { type: "text" },
        content: { type: "slot" },
      },
      render: ({ title, description, content }) => (
        <Card style={{ marginBottom: 16 }}>
          {title ? <Title level={3}>{title}</Title> : null}
          {description ? <Text type="secondary">{description}</Text> : null}
          <div style={{ marginTop: 16 }}>{content}</div>
        </Card>
      ),
    },
    Button: {
      fields: {
        label: { type: "text" },
        type: {
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Dashed", value: "dashed" },
            { label: "Text", value: "text" },
            { label: "Link", value: "link" },
          ],
        },
        block: {
          type: "radio",
          options: [
            { label: "Inline", value: false },
            { label: "Block", value: true },
          ],
        },
      },
      render: ({ label, type, block }) => (
        <Button type={type} block={block}>
          {label || "Action"}
        </Button>
      ),
    },
    Table: {
      fields: {
        title: { type: "text" },
        showBorder: {
          type: "radio",
          options: [
            { label: "No border", value: false },
            { label: "Bordered", value: true },
          ],
        },
      },
      render: ({ title, showBorder }) => (
        <div style={{ marginBottom: 16 }}>
          {title ? <Title level={4}>{title}</Title> : null}
          <Table
            columns={sampleColumns}
            dataSource={sampleData}
            pagination={false}
            bordered={showBorder}
          />
        </div>
      ),
    },
    Form: {
      fields: {
        layout: {
          type: "select",
          options: [
            { label: "Vertical", value: "vertical" },
            { label: "Horizontal", value: "horizontal" },
            { label: "Inline", value: "inline" },
          ],
        },
        content: { type: "slot" },
      },
      render: ({ layout, content }) => (
        <Form layout={layout || "vertical"} style={{ marginTop: 8 }}>
          {content}
        </Form>
      ),
    },
    FormItem: {
      fields: {
        label: { type: "text" },
        name: { type: "text" },
        inputType: {
          type: "select",
          options: [
            { label: "Text", value: "text" },
            { label: "Select", value: "select" },
            { label: "Date", value: "date" },
          ],
        },
        options: {
          type: "text",
          label: "Select options (comma separated)",
        },
      },
      render: ({ label, name, inputType, options }) => {
        let input = <Input placeholder={label ? `Enter ${label}` : "Enter value"} />;
        if (inputType === "select") {
          const selectOptions = (options || "Option A,Option B")
            .split(",")
            .map((option) => ({
              label: option.trim(),
              value: option.trim(),
            }));
          input = <Select options={selectOptions} placeholder={label || "Select"} />;
        }
        if (inputType === "date") {
          input = <DatePicker style={{ width: "100%" }} />;
        }
        return (
          <Form.Item label={label || "Label"} name={name || label || "field"}>
            {input}
          </Form.Item>
        );
      },
    },
  },
};

const initialData = {
  content: [
    {
      type: "Section",
      props: {
        title: "Customer Intake",
        description: "Drag Ant Design components into sections to build layouts.",
        content: [
          {
            type: "Form",
            props: {
              layout: "vertical",
              content: [
                {
                  type: "FormItem",
                  props: {
                    label: "Full name",
                    name: "fullName",
                    inputType: "text",
                  },
                },
                {
                  type: "FormItem",
                  props: {
                    label: "Status",
                    name: "status",
                    inputType: "select",
                    options: "New,Active,Churned",
                  },
                },
                {
                  type: "FormItem",
                  props: {
                    label: "Start date",
                    name: "startDate",
                    inputType: "date",
                  },
                },
              ],
            },
          },
          {
            type: "Button",
            props: {
              label: "Submit",
              type: "primary",
              block: true,
            },
          },
        ],
      },
    },
    {
      type: "Section",
      props: {
        title: "Projects",
        description: "Tables can be dropped anywhere to preview data layouts.",
        content: [
          {
            type: "Table",
            props: {
              title: "Active Projects",
              showBorder: true,
            },
          },
        ],
      },
    },
  ],
};

export default function App() {
  return (
    <div className="app">
      <Puck config={config} data={initialData} />
    </div>
  );
}
