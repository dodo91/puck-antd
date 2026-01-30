const initialData = {
  content: [
    {
      type: "Form",
      props: {
        layout: "vertical",
        name: "customerForm",
        content: [
          {
            type: "FormItem",
            props: {
              label: "Full name",
              name: "fullName",
              required: true,
              content: [
                {
                  type: "Input",
                  props: {
                    placeholder: "Enter full name",
                    allowClear: true,
                  },
                },
              ],
            },
          },
          {
            type: "FormItem",
            props: {
              label: "Status",
              name: "status",
              content: [
                {
                  type: "Select",
                  props: {
                    placeholder: "Select status",
                    options: [
                      { label: "New", value: "new" },
                      { label: "Active", value: "active" },
                      { label: "Churned", value: "churned" },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "FormItem",
            props: {
              label: "Start date",
              name: "startDate",
              content: [
                {
                  type: "DatePicker",
                  props: {
                    placeholder: "Pick a date",
                  },
                },
              ],
            },
          },
          {
            type: "Button",
            props: {
              text: "Submit",
              type: "primary",
              htmlType: "submit",
            },
          },
        ],
      },
    },
    {
      type: "Table",
      props: {
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
};

export default initialData;
