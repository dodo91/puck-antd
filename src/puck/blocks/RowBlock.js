import React from "react";
import { Row } from "antd";

/**
 * @typedef {Object} RowBlockProps
 * @property {number} gutter
 * @property {"top"|"middle"|"bottom"} align
 * @property {"start"|"center"|"end"|"space-between"|"space-around"|"space-evenly"} justify
 * @property {boolean} wrap
 * @property {{ renderDropZone: Function }} puck
 * @property {string} id
 */

const RowBlock = {
  label: "Row",
  fields: {
    gutter: { type: "number", min: 0, max: 64 },
    align: {
      type: "select",
      options: [
        { label: "Top", value: "top" },
        { label: "Middle", value: "middle" },
        { label: "Bottom", value: "bottom" },
      ],
    },
    justify: {
      type: "select",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Space between", value: "space-between" },
        { label: "Space around", value: "space-around" },
        { label: "Space evenly", value: "space-evenly" },
      ],
    },
    wrap: {
      type: "radio",
      options: [
        { label: "Wrap", value: true },
        { label: "No wrap", value: false },
      ],
    },
  },
  defaultProps: {
    gutter: 16,
    align: "top",
    justify: "start",
    wrap: true,
  },
  /**
   * @param {RowBlockProps} props
   */
  render: ({ gutter, align, justify, wrap, puck, id }) => {
    const zone = `row-${id}-content`;
    return (
      <Row gutter={gutter} align={align} justify={justify} wrap={wrap}>
        {puck.renderDropZone({ zone, allow: ["Col"] })}
      </Row>
    );
  },
};

export default RowBlock;
