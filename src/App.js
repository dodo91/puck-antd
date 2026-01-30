import React from "react";
import { Puck } from "@measured/puck";
import "@measured/puck/dist/puck.css";
import "antd/dist/reset.css";
import config from "./puck/config";
import initialData from "./puck/initialData";

export default function App() {
  return (
    <div className="app">
      <Puck config={config} data={initialData} />
    </div>
  );
}
