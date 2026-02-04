import React from "react";

/**
 * @typedef {Object} StackBlockProps
 * @property {"horizontal"|"vertical"} direction
 * @property {"start"|"center"|"end"|"stretch"} align
 * @property {"start"|"center"|"end"|"space-between"|"space-around"|"space-evenly"} justify
 * @property {number} gap
 * @property {boolean} wrap
 * @property {{ renderDropZone: Function }} puck
 * @property {string} id
 */

const alignItemsMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
};

const justifyContentMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
};

const StackBlock = {
  label: "Stack",
  fields: {
    direction: {
      type: "select",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
    },
    gap: { type: "number", min: 0, max: 64 },
    align: {
      type: "select",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
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
    direction: "horizontal",
    gap: 8,
    align: "start",
    justify: "start",
    wrap: true,
  },
  /**
   * @param {StackBlockProps} props
   */
  render: ({ direction, gap, align, justify, wrap, puck, id }) => {
    const zone = `stack-${id}-content`;
    return puck.renderDropZone({
      zone,
      className: "stack-dropzone",
      collisionAxis: direction === "horizontal" ? "x" : "y",
      style: {
        display: "flex",
        width: "100%",
        flexDirection: direction,
        flexWrap: wrap ? "wrap" : "nowrap",
        gap: `${Number.isFinite(gap) ? gap : 0}px`,
        alignItems: alignItemsMap[align] || "flex-start",
        justifyContent: justifyContentMap[justify] || "flex-start",
      },
    });
  },
};

export default StackBlock;
