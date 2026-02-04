import React from "react";
import { DatePicker } from "antd";

/**
 * @typedef {Object} DatePickerBlockProps
 * @property {string} placeholder
 * @property {"date"|"week"|"month"|"quarter"|"year"} picker
 * @property {boolean} disabled
 * @property {{ dragRef: Function }} puck
 */

const DatePickerBlock = {
  label: "Date Picker",
  inline: true,
  fields: {
    placeholder: { type: "text" },
    picker: {
      type: "select",
      options: [
        { label: "Date", value: "date" },
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
        { label: "Quarter", value: "quarter" },
        { label: "Year", value: "year" },
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
    placeholder: "Select a date",
    picker: "date",
    disabled: false,
  },
  /**
   * @param {DatePickerBlockProps} props
   */
  render: ({ placeholder, picker, disabled, puck }) => (
    <span className="inline-control" ref={puck.dragRef}>
      <DatePicker placeholder={placeholder} picker={picker} disabled={disabled} />
    </span>
  ),
};

export default DatePickerBlock;
