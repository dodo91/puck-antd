import React from "react";
import { Card } from "antd";

/**
 * @typedef {Object} CardBlockProps
 * @property {string} title
 * @property {"default"|"small"} size
 * @property {boolean} bordered
 * @property {{ renderDropZone: Function }} puck
 * @property {string} id
 */

const CardBlock = {
  label: "Card",
  fields: {
    title: { type: "text" },
    size: {
      type: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Small", value: "small" },
      ],
    },
    bordered: {
      type: "radio",
      options: [
        { label: "Bordered", value: true },
        { label: "Borderless", value: false },
      ],
    },
  },
  defaultProps: {
    title: "Card title",
    size: "default",
    bordered: true,
  },
  /**
   * @param {CardBlockProps} props
   */
  render: ({ title, size, bordered, puck, id }) => {
    const zone = `card-${id}-content`;
    return (
      <Card title={title || undefined} size={size} bordered={bordered}>
        {puck.renderDropZone({ zone })}
      </Card>
    );
  },
};

export default CardBlock;
