import React from "react";
import { Form } from "antd";

/**
 * @typedef {Object} FormItemBlockProps
 * @property {string} label
 * @property {string} name
 * @property {boolean} required
 * @property {string} help
 * @property {React.ReactNode|React.ReactNode[]} content
 */

const FormItemBlock = {
  label: "Form Item",
  fields: {
    label: { type: "text" },
    name: { type: "text" },
    required: { type: "radio", options: [
      { label: "Optional", value: false },
      { label: "Required", value: true },
    ] },
    help: { type: "text" },
    content: { type: "slot" },
  },
  defaultProps: {
    label: "Field",
    name: "",
    required: false,
    help: "",
  },
  /**
   * @param {FormItemBlockProps} props
   */
  render: ({ label, name, required, help, content }) => {
    const child = Array.isArray(content) ? content[0] : content;
    return (
      <Form.Item
        label={label || undefined}
        name={name || label || undefined}
        required={required}
        help={help || undefined}
      >
        {child}
      </Form.Item>
    );
  },
};

export default FormItemBlock;
