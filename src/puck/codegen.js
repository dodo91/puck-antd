const indent = (level) => "  ".repeat(level);

const MIN_TAB_COUNT = 1;
const MAX_TAB_COUNT = 12;

const normalizeTabCount = (value) => {
  if (!Number.isFinite(value)) {
    return MIN_TAB_COUNT;
  }

  const rounded = Math.round(value);
  return Math.min(MAX_TAB_COUNT, Math.max(MIN_TAB_COUNT, rounded));
};

const normalizeTabLabel = (value, index) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  return `Tab ${index + 1}`;
};

const normalizeTabs = (tabs, tabCount) => {
  const source = Array.isArray(tabs) ? tabs : [];

  return Array.from({ length: tabCount }, (_, index) => ({
    title: normalizeTabLabel(source[index]?.title, index),
    key: String(index + 1),
  }));
};

const zoneNameForItem = (item) => {
  if (!item || !item.props || !item.props.id) {
    return null;
  }

  const id = item.props.id;

  switch (item.type) {
    case "Form":
      return `form-${id}-content`;
    case "FormItem":
      return `form-item-${id}-content`;
    case "Row":
      return `row-${id}-content`;
    case "Col":
      return `col-${id}-content`;
    case "Card":
      return `card-${id}-content`;
    case "Stack":
      return `stack-${id}-content`;
    default:
      return null;
  }
};

const getZoneItems = (data, itemId, zone) => {
  if (!zone || !data || !data.zones) {
    return [];
  }

  const zoneCompound = `${itemId}:${zone}`;

  return data.zones[zoneCompound] || data.zones[zone] || [];
};

const getZoneContent = (data, item) => {
  const zone = zoneNameForItem(item);
  if (!zone || !item || !item.props || !item.props.id) {
    return [];
  }

  return getZoneItems(data, item.props.id, zone);
};

const getTabsForItem = (item, data) => {
  if (!item || item.type !== "Tabs" || !item.props) {
    return [];
  }

  const id = item.props.id;
  const tabCount = normalizeTabCount(item.props.tabCount);
  const tabs = normalizeTabs(item.props.tabs, tabCount);

  if (!id) {
    return tabs.map((tab) => ({ ...tab, children: [] }));
  }

  return tabs.map((tab, index) => {
    const zone = `tabs-${id}-tab-${index + 1}-content`;

    return {
      ...tab,
      children: getZoneItems(data, id, zone),
    };
  });
};

const formatJSXValue = (value, level) => {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return `{${value}}`;
  }

  if (value === null) {
    return "{null}";
  }

  if (Array.isArray(value) || typeof value === "object") {
    const json = JSON.stringify(value, null, 2);
    const indented = json
      .split("\n")
      .map((line) => `${indent(level + 1)}${line}`)
      .join("\n");
    return `\n${indent(level)}{\n${indented}\n${indent(level)}}`;
  }

  return `{${JSON.stringify(value)}}`;
};

const formatProps = (props, level) => {
  const entries = Object.entries(props || {}).filter(([, value]) => value !== undefined);
  if (!entries.length) {
    return "";
  }

  const formatted = entries.map(([key, value]) => {
    const formattedValue = formatJSXValue(value, level + 1);
    return {
      key,
      value: formattedValue,
      multiline: formattedValue.includes("\n"),
    };
  });

  const multiline = formatted.some((entry) => entry.multiline);

  if (!multiline) {
    return ` ${formatted.map((entry) => `${entry.key}=${entry.value}`).join(" ")}`;
  }

  return `\n${formatted
    .map((entry) => `${indent(level + 1)}${entry.key}=${entry.value}`)
    .join("\n")}\n${indent(level)}`;
};

const renderItems = (items, level, data) =>
  items.map((item) => renderItem(item, level, data)).join("\n");

const renderChildren = (items, level, data) => {
  if (!items.length) {
    return "";
  }

  return `\n${renderItems(items, level + 1, data)}\n${indent(level)}`;
};

const renderTag = (tag, props, children, level) => {
  const propsString = formatProps(props, level);
  if (!children) {
    return `${indent(level)}<${tag}${propsString} />`;
  }

  return `${indent(level)}<${tag}${propsString}>${children}</${tag}>`;
};

const buildProps = (item) => {
  const props = item.props || {};

  switch (item.type) {
    case "Form":
      return {
        layout: props.layout || undefined,
        name: props.name || undefined,
      };
    case "FormItem":
      return {
        label: props.label || undefined,
        name: props.name || props.label || undefined,
        required: props.required ? true : undefined,
        help: props.help || undefined,
      };
    case "Row":
      return {
        gutter: typeof props.gutter === "number" ? props.gutter : undefined,
        align: props.align || undefined,
        justify: props.justify || undefined,
        wrap: props.wrap === false ? false : undefined,
      };
    case "Col":
      return {
        span: typeof props.span === "number" ? props.span : undefined,
        offset: props.offset ? props.offset : undefined,
        flex: props.flex || undefined,
      };
    case "Card":
      return {
        title: props.title || undefined,
        size: props.size && props.size !== "default" ? props.size : undefined,
        bordered: props.bordered === false ? false : undefined,
      };
    case "Input":
      return {
        inputType: props.inputType && props.inputType !== "text" ? props.inputType : undefined,
        placeholder: props.placeholder || undefined,
        size: props.size && props.size !== "middle" ? props.size : undefined,
        status: props.status && props.status !== "default" ? props.status : undefined,
        disabled: props.disabled ? true : undefined,
        allowClear: props.allowClear ? true : undefined,
        maxLength:
          typeof props.maxLength === "number" && props.maxLength > 0 ? props.maxLength : undefined,
        showCount:
          (props.inputType === "textarea" || !props.inputType || props.inputType === "text") &&
          props.showCount
            ? true
            : undefined,
        rows:
          props.inputType === "textarea" && typeof props.rows === "number" ? props.rows : undefined,
        enterButton:
          props.inputType === "search" && props.enterButton ? true : undefined,
      };
    case "Select":
      return {
        placeholder: props.placeholder || undefined,
        mode: props.mode === "multiple" ? "multiple" : undefined,
        options: props.options || [],
        allowClear: props.allowClear ? true : undefined,
        disabled: props.disabled ? true : undefined,
      };
    case "DatePicker":
      return {
        placeholder: props.placeholder || undefined,
        picker: props.picker && props.picker !== "date" ? props.picker : undefined,
        disabled: props.disabled ? true : undefined,
      };
    case "Button":
      return {
        type: props.type || undefined,
        htmlType: props.htmlType && props.htmlType !== "button" ? props.htmlType : undefined,
        disabled: props.disabled ? true : undefined,
      };
    case "Table":
      return {
        columns: props.columns || [],
        dataSource: props.dataSource || [],
        pagination: props.pagination === false ? false : undefined,
      };
    case "Typography":
      return {
        variant: props.variant || "text",
        text: props.text || "",
        level: typeof props.level === "number" ? props.level : 3,
        type: props.type || "",
        strong: !!props.strong,
      };
    case "Stack":
      return {
        direction: props.direction || "horizontal",
        gap: typeof props.gap === "number" ? props.gap : 0,
        align: props.align || "start",
        justify: props.justify || "start",
        wrap: props.wrap !== false,
      };
    case "Tabs":
      return {
        type: props.type && props.type !== "line" ? props.type : undefined,
        tabPosition:
          props.tabPosition && props.tabPosition !== "top" ? props.tabPosition : undefined,
        size: props.size && props.size !== "middle" ? props.size : undefined,
        centered: props.centered ? true : undefined,
        destroyOnHidden: props.destroyOnHidden ? true : undefined,
      };
    default:
      return Object.keys(props).reduce((acc, key) => {
        if (key !== "id") {
          acc[key] = props[key];
        }
        return acc;
      }, {});
  }
};

const renderTypography = (props, level) => {
  const text = props.text || "";

  if (props.variant === "paragraph") {
    return `${indent(level)}<Typography.Paragraph>${text}</Typography.Paragraph>`;
  }

  if (props.variant === "text") {
    const textProps = {
      type: props.type || undefined,
      strong: props.strong ? true : undefined,
    };
    return renderTag("Typography.Text", textProps, text, level);
  }

  return renderTag("Typography.Title", { level: props.level || 3 }, text, level);
};

const renderStack = (props, children, level) => {
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

  const style = {
    display: "flex",
    width: "100%",
    flexDirection: props.direction === "vertical" ? "column" : "row",
    flexWrap: props.wrap ? "wrap" : "nowrap",
    gap: `${props.gap}px`,
    alignItems: alignItemsMap[props.align] || "flex-start",
    justifyContent: justifyContentMap[props.justify] || "flex-start",
  };

  return renderTag("div", { style }, children, level);
};

const renderTabs = (item, level, data) => {
  const tabPanes = getTabsForItem(item, data)
    .map((tab) => {
      const paneChildren = renderChildren(tab.children, level + 1, data);
      return renderTag(
        "Tabs.TabPane",
        {
          tab: tab.title,
          key: tab.key,
        },
        paneChildren,
        level + 1
      );
    })
    .join("\n");

  const children = `\n${tabPanes}\n${indent(level)}`;

  return renderTag("Tabs", buildProps(item), children, level);
};

const renderInput = (props, level) => {
  const normalizedProps = { ...props };
  const inputType = normalizedProps.inputType || "text";

  delete normalizedProps.inputType;

  if (inputType === "textarea") {
    delete normalizedProps.enterButton;
    return renderTag("Input.TextArea", normalizedProps, null, level);
  }

  if (inputType === "password") {
    delete normalizedProps.enterButton;
    delete normalizedProps.rows;
    delete normalizedProps.showCount;
    return renderTag("Input.Password", normalizedProps, null, level);
  }

  if (inputType === "search") {
    delete normalizedProps.showCount;
    delete normalizedProps.rows;
    return renderTag("Input.Search", normalizedProps, null, level);
  }

  delete normalizedProps.enterButton;
  delete normalizedProps.rows;
  return renderTag("Input", normalizedProps, null, level);
};

const renderItem = (item, level, data) => {
  if (!item) {
    return "";
  }

  const children = getZoneContent(data, item);
  const childMarkup = renderChildren(children, level, data);

  switch (item.type) {
    case "Form":
      return renderTag("Form", buildProps(item), childMarkup, level);
    case "FormItem":
      return renderTag("Form.Item", buildProps(item), childMarkup, level);
    case "Row":
      return renderTag("Row", buildProps(item), childMarkup, level);
    case "Col":
      return renderTag("Col", buildProps(item), childMarkup, level);
    case "Card":
      return renderTag("Card", buildProps(item), childMarkup, level);
    case "Stack":
      return renderStack(buildProps(item), childMarkup, level);
    case "Tabs":
      return renderTabs(item, level, data);
    case "Button":
      return renderTag(
        "Button",
        buildProps(item),
        item.props?.text || "Button",
        level
      );
    case "Input":
      return renderInput(buildProps(item), level);
    case "Select":
      return renderTag("Select", buildProps(item), null, level);
    case "DatePicker":
      return renderTag("DatePicker", buildProps(item), null, level);
    case "Table":
      return renderTag("Table", buildProps(item), null, level);
    case "Typography":
      return renderTypography(buildProps(item), level);
    default:
      return renderTag(item.type, buildProps(item), childMarkup, level);
  }
};

const collectTypes = (items, data, set) => {
  items.forEach((item) => {
    set.add(item.type);

    if (item.type === "Tabs") {
      const tabs = getTabsForItem(item, data);
      tabs.forEach((tab) => {
        if (tab.children.length) {
          collectTypes(tab.children, data, set);
        }
      });
      return;
    }

    const children = getZoneContent(data, item);
    if (children.length) {
      collectTypes(children, data, set);
    }
  });
};

const getImports = (data) => {
  const types = new Set();
  const content = (data && data.content) || [];
  collectTypes(content, data, types);

  const mapping = {
    Form: "Form",
    FormItem: "Form",
    Input: "Input",
    Select: "Select",
    DatePicker: "DatePicker",
    Button: "Button",
    Row: "Row",
    Col: "Col",
    Card: "Card",
    Table: "Table",
    Tabs: "Tabs",
    Typography: "Typography",
  };

  const imports = new Set();

  types.forEach((type) => {
    const mapped = mapping[type];
    if (mapped) {
      imports.add(mapped);
    }
  });

  return Array.from(imports).sort();
};

export const generatePageCode = (data) => {
  const content = (data && data.content) || [];
  const imports = getImports(data);

  const body =
    content.length === 1
      ? renderItem(content[0], 2, data)
      : `${indent(2)}<div>\n${renderItems(content, 3, data)}\n${indent(2)}</div>`;

  const importLine = imports.length
    ? `import { ${imports.join(", ")} } from "antd";\n`
    : "";

  return `import React from "react";\n${importLine}\nfunction Page() {\n  return (\n${body}\n  );\n}\n\nexport default Page;\n`;
};
