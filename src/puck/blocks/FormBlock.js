import React from "react";
import { Form } from "antd";

/**
 * @typedef {Object} FormBlockProps
 * @property {"horizontal"|"vertical"|"inline"} layout
 * @property {string} name
 * @property {{ renderDropZone: Function }} puck
 * @property {string} id
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
  },
  defaultProps: {
    layout: "vertical",
    name: "",
  },
  /**
   * @param {FormBlockProps} props
   */
  render: ({ layout, name, puck, id }) => {
    const zone = `form-${id}-content`;
    return (
      <Form layout={layout} name={name || undefined}>
        {puck.renderDropZone({
          zone,
          allow: ["FormItem", "Button", "Row", "Col", "Typography", "Card"],
        })}
      </Form>
    );
  },
};

export default FormBlock;
