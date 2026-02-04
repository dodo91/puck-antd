import React from "react";
import { Col } from "antd";

/**
 * @typedef {Object} ColBlockProps
 * @property {number} span
 * @property {number} offset
 * @property {string} flex
 * @property {{ renderDropZone: Function }} puck
 * @property {string} id
 */

const ColBlock = {
  label: "Col",
  inline: true,
  fields: {
    span: { type: "number", min: 1, max: 24 },
    offset: { type: "number", min: 0, max: 24 },
    flex: { type: "text" },
  },
  defaultProps: {
    span: 12,
    offset: 0,
    flex: "",
  },
  /**
   * @param {ColBlockProps} props
   */
  render: ({ span, offset, flex, puck, id }) => {
    const zone = `col-${id}-content`;
    return (
      <Col
        ref={puck.dragRef}
        className="col-block"
        span={span}
        offset={offset}
        flex={flex || undefined}
      >
        {puck.renderDropZone({
          zone,
          disallow: ["Col"],
          className: "col-dropzone",
        })}
      </Col>
    );
  },
};

export default ColBlock;
