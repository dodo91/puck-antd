import React from "react";
import { Form } from "antd";

/**
 * @typedef {Object} FormBlockProps
 * @property {"horizontal"|"vertical"|"inline"} layout
 * @property {string} name
 * @property {React.ReactNode} content
 */

const layoutOptions = [
  { label: "Vertical", value: "vertical" },
  { label: "Horizontal", value: "horizontal" },
  { label: "Inline", value: "inline" },
];

const FormBlock = {
  label: "Form",
  fields: {
    layout: {
      type: "select",
      options: layoutOptions,
    },
    name: { type: "text" },
    content: { type: "slot" },
  },
  defaultProps: {
    layout: "vertical",
    name: "",
  },
  /**
   * @param {FormBlockProps} props
   */
  render: ({ layout, name, content }) => (
    <Form layout={layout} name={name || undefined}>
      {content}
    </Form>
  ),
};

export default FormBlock;
