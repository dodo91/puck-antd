import React from "react";
import { Form } from "antd";

/**
 * @typedef {Object} FormItemBlockProps
 * @property {string} label
 * @property {string} name
 * @property {boolean} required
 * @property {string} help
 * @property {{ renderDropZone: Function }} puck
 * @property {string} id
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
  render: ({ label, name, required, help, puck, id }) => {
    const zone = `form-item-${id}-content`;
    return (
      <Form.Item
        label={label || undefined}
        name={name || label || undefined}
        required={required}
        help={help || undefined}
      >
        {puck.renderDropZone({
          zone,
          allow: ["Input", "Select", "DatePicker", "Stack"],
        })}
      </Form.Item>
    );
  },
};

export default FormItemBlock;
