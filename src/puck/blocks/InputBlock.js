import React from "react";
import { Input } from "antd";

/**
 * @typedef {Object} InputBlockProps
 * @property {string} placeholder
 * @property {boolean} disabled
 * @property {boolean} allowClear
 */

const InputBlock = {
  label: "Input",
  fields: {
    placeholder: { type: "text" },
    disabled: {
      type: "radio",
      options: [
        { label: "Enabled", value: false },
        { label: "Disabled", value: true },
      ],
    },
    allowClear: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
  },
  defaultProps: {
    placeholder: "Enter text",
    disabled: false,
    allowClear: false,
  },
  /**
   * @param {InputBlockProps} props
   */
  render: ({ placeholder, disabled, allowClear }) => (
    <Input placeholder={placeholder} disabled={disabled} allowClear={allowClear} />
  ),
};

export default InputBlock;
