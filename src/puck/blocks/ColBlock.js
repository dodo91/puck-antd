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
    const normalizedSpan = Number.isFinite(span)
      ? Math.min(24, Math.max(1, span))
      : 24;
    const normalizedOffset = Number.isFinite(offset)
      ? Math.min(24, Math.max(0, offset))
      : 0;
    const spanPercent = `${(normalizedSpan / 24) * 100}%`;
    const offsetPercent = `${(normalizedOffset / 24) * 100}%`;
    const hasFlex = typeof flex === "string" && flex.trim().length > 0;
    const style = {
      display: "inline-block",
      verticalAlign: "top",
      width: hasFlex ? undefined : spanPercent,
      maxWidth: hasFlex ? undefined : spanPercent,
      marginLeft: normalizedOffset > 0 ? offsetPercent : undefined,
    };

    return (
      <Col
        ref={puck.dragRef}
        className="col-block"
        span={span}
        offset={offset}
        flex={flex || undefined}
        style={style}
      >
        {puck.renderDropZone({
          zone,
          disallow: ["Col"],
          className: "col-dropzone",
          collisionAxis: "dynamic",
          minEmptyHeight: 64,
        })}
      </Col>
    );
  },
};

export default ColBlock;
