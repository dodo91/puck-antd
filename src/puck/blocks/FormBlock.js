import React from "react";
import { Form } from "antd";

/**
 * @typedef {Object} FormBlockProps
 * @property {"horizontal"|"vertical"|"inline"} layout
 * @property {string} name
 * @property {{ renderDropZone: Function, isEditing: boolean }} puck
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
    const editingClass = puck.isEditing ? " form-block--editing" : "";
    return (
      <div className={`form-block${editingClass}`}>
        {puck.isEditing ? (
          <div className="form-block-handle">Form</div>
        ) : null}
        <Form layout={layout} name={name || undefined}>
          {puck.renderDropZone({
            zone,
            allow: [
              "FormItem",
              "Button",
              "Row",
              "Col",
              "Stack",
              "Tabs",
              "Typography",
              "Card",
            ],
          })}
        </Form>
      </div>
    );
  },
};

export default FormBlock;
