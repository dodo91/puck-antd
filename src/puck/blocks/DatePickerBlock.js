import React from "react";
import { DatePicker } from "antd";

/**
 * @typedef {Object} DatePickerBlockProps
 * @property {string} placeholder
 * @property {"date"|"week"|"month"|"quarter"|"year"} picker
 * @property {boolean} disabled
 */

const DatePickerBlock = {
  label: "Date Picker",
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
  render: ({ placeholder, picker, disabled }) => (
    <DatePicker placeholder={placeholder} picker={picker} disabled={disabled} />
  ),
};

export default DatePickerBlock;
