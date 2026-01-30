import React from "react";
import { Button } from "antd";

/**
 * @typedef {Object} ButtonBlockProps
 * @property {string} text
 * @property {"primary"|"default"|"dashed"|"link"|"text"} type
 * @property {"button"|"submit"|"reset"} htmlType
 * @property {boolean} disabled
 */

const ButtonBlock = {
  label: "Button",
  fields: {
    text: { type: "text" },
    type: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Primary", value: "primary" },
        { label: "Dashed", value: "dashed" },
        { label: "Link", value: "link" },
        { label: "Text", value: "text" },
      ],
    },
    htmlType: {
      type: "select",
      options: [
        { label: "Button", value: "button" },
        { label: "Submit", value: "submit" },
        { label: "Reset", value: "reset" },
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
    text: "Submit",
    type: "primary",
    htmlType: "button",
    disabled: false,
  },
  /**
   * @param {ButtonBlockProps} props
   */
  render: ({ text, type, htmlType, disabled }) => (
    <Button type={type} htmlType={htmlType} disabled={disabled}>
      {text || "Button"}
    </Button>
  ),
};

export default ButtonBlock;
