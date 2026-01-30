import React from "react";
import { Table } from "antd";

/**
 * @typedef {{title: string, dataIndex: string, key: string}} TableColumn
 * @typedef {Record<string, string>} TableRecord
 * @typedef {Object} TableBlockProps
 * @property {TableColumn[]|string} columns
 * @property {TableRecord[]|string} dataSource
 * @property {boolean} pagination
 */

const normalizeColumns = (columns) => {
  if (Array.isArray(columns)) {
    return columns
      .filter((column) => column && column.title && column.dataIndex)
      .map((column, index) => ({
        title: String(column.title),
        dataIndex: String(column.dataIndex),
        key: column.key ? String(column.key) : String(column.dataIndex || index),
      }));
  }
  return [];
};

const normalizeDataSource = (dataSource) => {
  if (Array.isArray(dataSource)) {
    return dataSource.map((row, index) => ({ key: row.key || String(index + 1), ...row }));
  }
  return [];
};

const TableBlock = {
  label: "Table",
  fields: {
    columns: {
      type: "array",
      arrayFields: {
        title: { type: "text" },
        dataIndex: { type: "text" },
        key: { type: "text" },
      },
    },
    dataSource: {
      type: "array",
      arrayFields: {
        key: { type: "text" },
        name: { type: "text" },
        status: { type: "text" },
        owner: { type: "text" },
      },
    },
    pagination: {
      type: "radio",
      options: [
        { label: "Off", value: false },
        { label: "On", value: true },
      ],
    },
  },
  defaultProps: {
    columns: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Status", dataIndex: "status", key: "status" },
      { title: "Owner", dataIndex: "owner", key: "owner" },
    ],
    dataSource: [
      { key: "1", name: "Project Atlas", status: "Active", owner: "Maria" },
      { key: "2", name: "Project Nimbus", status: "Review", owner: "Leo" },
    ],
    pagination: false,
  },
  /**
   * @param {TableBlockProps} props
   */
  render: ({ columns, dataSource, pagination }) => (
    <Table
      columns={normalizeColumns(columns)}
      dataSource={normalizeDataSource(dataSource)}
      pagination={pagination ? { pageSize: 5 } : false}
    />
  ),
};

export default TableBlock;
