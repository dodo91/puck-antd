import React from "react";
import { Input } from "antd";

/**
 * @typedef {Object} InputBlockProps
 * @property {string} placeholder
 * @property {boolean} disabled
 * @property {boolean} allowClear
 * @property {{ dragRef: Function }} puck
 */

const InputBlock = {
  label: "Input",
  inline: true,
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
  render: ({ placeholder, disabled, allowClear, puck }) => (
    <span className="inline-control" ref={puck.dragRef}>
      <Input placeholder={placeholder} disabled={disabled} allowClear={allowClear} />
    </span>
  ),
};

export default InputBlock;
