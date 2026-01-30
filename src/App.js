import React from "react";
import { Puck } from "@measured/puck";
import config from "./puck/config";
import initialData from "./puck/initialData";
import "@measured/puck/dist/puck.css";
import "antd/dist/reset.css";

export default function App() {
  return (
    <div className="app">
      <Puck config={config} data={initialData} />
    </div>
  );
}
