import React from "react";
import { Input } from "antd";

/**
 * @typedef {Object} InputBlockProps
 * @property {"text"|"password"|"search"|"textarea"} inputType
 * @property {string} placeholder
 * @property {"small"|"middle"|"large"} size
 * @property {"default"|"warning"|"error"} status
 * @property {boolean} disabled
 * @property {boolean} allowClear
 * @property {number} maxLength
 * @property {boolean} showCount
 * @property {number} rows
 * @property {boolean} enterButton
 * @property {{ dragRef: Function }} puck
 */

const InputBlock = {
  label: "Input",
  inline: true,
  fields: {
    inputType: {
      type: "select",
      options: [
        { label: "Text", value: "text" },
        { label: "Password", value: "password" },
        { label: "Search", value: "search" },
        { label: "Text area", value: "textarea" },
      ],
    },
    placeholder: { type: "text" },
    size: {
      type: "select",
      options: [
        { label: "Small", value: "small" },
        { label: "Middle", value: "middle" },
        { label: "Large", value: "large" },
      ],
    },
    status: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Warning", value: "warning" },
        { label: "Error", value: "error" },
      ],
    },
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
    maxLength: { type: "number", min: 0, max: 500 },
    showCount: {
      type: "radio",
      options: [
        { label: "Off", value: false },
        { label: "On", value: true },
      ],
    },
    rows: { type: "number", min: 2, max: 12 },
    enterButton: {
      type: "radio",
      options: [
        { label: "Icon", value: false },
        { label: "Button", value: true },
      ],
    },
  },
  defaultProps: {
    inputType: "text",
    placeholder: "Enter text",
    size: "middle",
    status: "default",
    disabled: false,
    allowClear: true,
    maxLength: 0,
    showCount: false,
    rows: 4,
    enterButton: false,
  },
  /**
   * @param {InputBlockProps} props
   */
  render: ({
    inputType,
    placeholder,
    size,
    status,
    disabled,
    allowClear,
    maxLength,
    showCount,
    rows,
    enterButton,
    puck,
  }) => {
    const commonProps = {
      placeholder: placeholder || undefined,
      size: size && size !== "middle" ? size : undefined,
      status: status && status !== "default" ? status : undefined,
      disabled,
      allowClear,
      maxLength: Number.isFinite(maxLength) && maxLength > 0 ? maxLength : undefined,
    };

    const resolvedType = inputType || "text";

    if (resolvedType === "textarea") {
      return (
        <div className="input-block" ref={puck.dragRef}>
          <Input.TextArea
            {...commonProps}
            showCount={showCount || undefined}
            rows={Number.isFinite(rows) ? Math.max(2, rows) : 4}
          />
        </div>
      );
    }

    if (resolvedType === "password") {
      return (
        <div className="input-block" ref={puck.dragRef}>
          <Input.Password {...commonProps} />
        </div>
      );
    }

    if (resolvedType === "search") {
      return (
        <div className="input-block" ref={puck.dragRef}>
          <Input.Search {...commonProps} enterButton={enterButton} />
        </div>
      );
    }

    return (
      <div className="input-block" ref={puck.dragRef}>
        <Input {...commonProps} showCount={showCount || undefined} />
      </div>
    );
  },
};

export default InputBlock;
