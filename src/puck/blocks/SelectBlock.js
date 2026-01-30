import React from "react";
import { Select } from "antd";

/**
 * @typedef {{label: string, value: string}} SelectOption
 * @typedef {Object} SelectBlockProps
 * @property {string} placeholder
 * @property {"single"|"multiple"} mode
 * @property {SelectOption[]|string} options
 * @property {boolean} allowClear
 * @property {boolean} disabled
 */

const normalizeOptions = (options) => {
  if (Array.isArray(options)) {
    return options
      .filter((option) => option && option.label && option.value)
      .map((option) => ({ label: String(option.label), value: String(option.value) }));
  }
  if (typeof options === "string" && options.trim().length > 0) {
    return options.split(",").map((item) => {
      const value = item.trim();
      return { label: value, value };
    });
  }
  return [];
};

const SelectBlock = {
  label: "Select",
  fields: {
    placeholder: { type: "text" },
    mode: {
      type: "select",
      options: [
        { label: "Single", value: "single" },
        { label: "Multiple", value: "multiple" },
      ],
    },
    options: {
      type: "array",
      arrayFields: {
        label: { type: "text" },
        value: { type: "text" },
      },
    },
    allowClear: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    disabled: {
      type: "radio",
      options: [
        { label: "Enabled", value: false },
        { label: "Disabled", value: true },
      ],
    },
  },
  defaultProps: {
    placeholder: "Select an option",
    mode: "single",
    options: [
      { label: "Option A", value: "option-a" },
      { label: "Option B", value: "option-b" },
    ],
    allowClear: false,
    disabled: false,
  },
  /**
   * @param {SelectBlockProps} props
   */
  render: ({ placeholder, mode, options, allowClear, disabled }) => (
    <Select
      placeholder={placeholder}
      mode={mode === "multiple" ? "multiple" : undefined}
      options={normalizeOptions(options)}
      allowClear={allowClear}
      disabled={disabled}
    />
  ),
};

export default SelectBlock;
