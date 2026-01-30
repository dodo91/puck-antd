import React from "react";
import { Typography } from "antd";

/**
 * @typedef {Object} TypographyBlockProps
 * @property {"title"|"text"|"paragraph"} variant
 * @property {string} text
 * @property {number} level
 * @property {"secondary"|"success"|"warning"|"danger"} type
 * @property {boolean} strong
 */

const TypographyBlock = {
  label: "Typography",
  fields: {
    variant: {
      type: "select",
      options: [
        { label: "Title", value: "title" },
        { label: "Text", value: "text" },
        { label: "Paragraph", value: "paragraph" },
      ],
    },
    text: { type: "text" },
    level: { type: "number", min: 1, max: 5 },
    type: {
      type: "select",
      options: [
        { label: "Default", value: "" },
        { label: "Secondary", value: "secondary" },
        { label: "Success", value: "success" },
        { label: "Warning", value: "warning" },
        { label: "Danger", value: "danger" },
      ],
    },
    strong: {
      type: "radio",
      options: [
        { label: "Normal", value: false },
        { label: "Strong", value: true },
      ],
    },
  },
  defaultProps: {
    variant: "title",
    text: "Heading",
    level: 3,
    type: "",
    strong: false,
  },
  /**
   * @param {TypographyBlockProps} props
   */
  render: ({ variant, text, level, type, strong }) => {
    if (variant === "paragraph") {
      return <Typography.Paragraph>{text}</Typography.Paragraph>;
    }
    if (variant === "text") {
      return (
        <Typography.Text type={type || undefined} strong={strong}>
          {text}
        </Typography.Text>
      );
    }
    return <Typography.Title level={level}>{text}</Typography.Title>;
  },
};

export default TypographyBlock;
