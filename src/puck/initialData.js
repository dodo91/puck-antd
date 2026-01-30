const initialData = {
  content: [
    {
      type: "Form",
      props: {
        id: "form-1",
        layout: "vertical",
        name: "customerForm",
      },
    },
    {
      type: "Table",
      props: {
        id: "table-1",
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
    },
  ],
  zones: {
    "form-1-content": [
      {
        type: "FormItem",
        props: {
          id: "form-item-1",
          label: "Full name",
          name: "fullName",
          required: true,
        },
      },
      {
        type: "FormItem",
        props: {
          id: "form-item-2",
          label: "Status",
          name: "status",
        },
      },
      {
        type: "FormItem",
        props: {
          id: "form-item-3",
          label: "Start date",
          name: "startDate",
        },
      },
      {
        type: "Button",
        props: {
          id: "button-1",
          text: "Submit",
          type: "primary",
          htmlType: "submit",
        },
      },
    ],
    "form-item-1-content": [
      {
        type: "Input",
        props: {
          id: "input-1",
          placeholder: "Enter full name",
          allowClear: true,
        },
      },
    ],
    "form-item-2-content": [
      {
        type: "Select",
        props: {
          id: "select-1",
          placeholder: "Select status",
          options: [
            { label: "New", value: "new" },
            { label: "Active", value: "active" },
            { label: "Churned", value: "churned" },
          ],
        },
      },
    ],
    "form-item-3-content": [
      {
        type: "DatePicker",
        props: {
          id: "date-picker-1",
          placeholder: "Pick a date",
        },
      },
    ],
  },
};

export default initialData;
