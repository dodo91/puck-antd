import React, { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { Puck, Render } from "@measured/puck";
import config from "./puck/config";
import initialData from "./puck/initialData";
import { generatePageCode } from "./puck/codegen";
import "@measured/puck/puck.css";
import "antd/dist/reset.css";

export default function App() {
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [publishedData, setPublishedData] = useState(initialData);
  const [publishedCode, setPublishedCode] = useState("");
  const renderData = useMemo(() => publishedData, [publishedData]);
  const hasCode = publishedCode.trim().length > 0;

  const handleDownload = () => {
    if (!hasCode) {
      return;
    }

    const blob = new Blob([publishedCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Page.jsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!hasCode || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(publishedCode);
  };

  return (
    <div className="app">
      <Puck
        config={config}
        data={initialData}
        onPublish={(data) => {
          setPublishedData(data);
          setPublishedCode(generatePageCode(data));
          setIsPublishOpen(true);
        }}
      />
      <Modal
        open={isPublishOpen}
        onCancel={() => setIsPublishOpen(false)}
        footer={null}
        width="100%"
        style={{ top: 0, paddingBottom: 0 }}
        bodyStyle={{ height: "100vh", padding: 0 }}
        destroyOnClose
      >
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ fontWeight: 600 }}>Published Preview</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={handleCopy} disabled={!hasCode}>
                Copy code
              </Button>
              <Button onClick={handleDownload} disabled={!hasCode} type="primary">
                Download Page.jsx
              </Button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
            <Render config={config} data={renderData} />
            {hasCode ? (
              <pre
                style={{
                  marginTop: 24,
                  background: "#f7f7f7",
                  padding: 16,
                  borderRadius: 8,
                  whiteSpace: "pre-wrap",
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                {publishedCode}
              </pre>
            ) : null}
          </div>
        </div>
      </Modal>
    </div>
  );
}
