import React from "react";
import { Tabs } from "antd";

/**
 * @typedef {{ title: string }} TabItem
 * @typedef {Object} TabsBlockProps
 * @property {number} tabCount
 * @property {number} editingTab
 * @property {TabItem[]} tabs
 * @property {"line"|"card"} type
 * @property {"top"|"right"|"bottom"|"left"} tabPosition
 * @property {"small"|"middle"|"large"} size
 * @property {boolean} centered
 * @property {boolean} destroyOnHidden
 * @property {{ renderDropZone: Function, isEditing: boolean }} puck
 * @property {string} id
 */

const MIN_TAB_COUNT = 1;
const MAX_TAB_COUNT = 12;

const normalizeTabCount = (value) => {
  if (!Number.isFinite(value)) {
    return MIN_TAB_COUNT;
  }

  const rounded = Math.round(value);
  return Math.min(MAX_TAB_COUNT, Math.max(MIN_TAB_COUNT, rounded));
};

const normalizeTabIndex = (value, tabCount) => {
  if (!Number.isFinite(value)) {
    return MIN_TAB_COUNT;
  }

  const rounded = Math.round(value);
  return Math.min(tabCount, Math.max(MIN_TAB_COUNT, rounded));
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
  }));
};

const hasSameTabs = (tabsA, tabsB) => {
  if (!Array.isArray(tabsA) || !Array.isArray(tabsB) || tabsA.length !== tabsB.length) {
    return false;
  }

  return tabsA.every((tab, index) => {
    const left = normalizeTabLabel(tab?.title, index);
    const right = normalizeTabLabel(tabsB[index]?.title, index);
    return left === right;
  });
};

const TabsBlock = {
  label: "Tabs",
  fields: {
    tabCount: { type: "number", min: MIN_TAB_COUNT, max: MAX_TAB_COUNT },
    editingTab: { type: "number", min: MIN_TAB_COUNT, max: MAX_TAB_COUNT },
    tabs: {
      type: "array",
      arrayFields: {
        title: { type: "text" },
      },
    },
    type: {
      type: "select",
      options: [
        { label: "Line", value: "line" },
        { label: "Card", value: "card" },
      ],
    },
    tabPosition: {
      type: "select",
      options: [
        { label: "Top", value: "top" },
        { label: "Right", value: "right" },
        { label: "Bottom", value: "bottom" },
        { label: "Left", value: "left" },
      ],
    },
    size: {
      type: "select",
      options: [
        { label: "Small", value: "small" },
        { label: "Middle", value: "middle" },
        { label: "Large", value: "large" },
      ],
    },
    centered: {
      type: "radio",
      options: [
        { label: "No", value: false },
        { label: "Yes", value: true },
      ],
    },
    destroyOnHidden: {
      type: "radio",
      options: [
        { label: "Keep pane state", value: false },
        { label: "Destroy hidden", value: true },
      ],
    },
  },
  defaultProps: {
    tabCount: 2,
    editingTab: 1,
    tabs: [{ title: "Tab 1" }, { title: "Tab 2" }],
    type: "line",
    tabPosition: "top",
    size: "middle",
    centered: false,
    destroyOnHidden: false,
  },
  resolveData: (data) => {
    const props = data?.props || {};
    const normalizedTabCount = normalizeTabCount(props.tabCount);
    const normalizedEditingTab = normalizeTabIndex(props.editingTab, normalizedTabCount);
    const normalizedTabs = normalizeTabs(props.tabs, normalizedTabCount);

    if (
      props.tabCount === normalizedTabCount &&
      props.editingTab === normalizedEditingTab &&
      hasSameTabs(props.tabs, normalizedTabs)
    ) {
      return data;
    }

    return {
      props: {
        ...props,
        tabCount: normalizedTabCount,
        editingTab: normalizedEditingTab,
        tabs: normalizedTabs,
      },
    };
  },
  /**
   * @param {TabsBlockProps} props
   */
  render: ({
    tabCount,
    editingTab,
    tabs,
    type,
    tabPosition,
    size,
    centered,
    destroyOnHidden,
    puck,
    id,
  }) => {
    const normalizedTabCount = normalizeTabCount(tabCount);
    const normalizedEditingTab = normalizeTabIndex(editingTab, normalizedTabCount);
    const normalizedTabs = normalizeTabs(tabs, normalizedTabCount);
    const [activeKey, setActiveKey] = React.useState(String(normalizedEditingTab));

    React.useEffect(() => {
      setActiveKey(String(normalizedEditingTab));
    }, [normalizedEditingTab]);

    React.useEffect(() => {
      const activeTab = Number(activeKey);

      if (
        !Number.isFinite(activeTab) ||
        activeTab < MIN_TAB_COUNT ||
        activeTab > normalizedTabCount
      ) {
        setActiveKey(String(normalizedEditingTab));
      }
    }, [activeKey, normalizedTabCount, normalizedEditingTab]);

    const items = normalizedTabs.map((tab, index) => {
      const tabIndex = index + 1;
      const zone = `tabs-${id}-tab-${tabIndex}-content`;

      return {
        key: String(tabIndex),
        label: tab.title,
        children: (
          <div className="tabs-panel-content">
            {puck.renderDropZone({
              zone,
              className: "tabs-panel-dropzone",
              minEmptyHeight: 48,
            })}
          </div>
        ),
      };
    });

    return (
      <div className="tabs-block">
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          type={type || "line"}
          tabPosition={tabPosition || "top"}
          size={size || "middle"}
          centered={centered}
          destroyOnHidden={destroyOnHidden}
          items={items}
        />
      </div>
    );
  },
};

export default TabsBlock;
