# Puck + Ant Design Builder

A simple React app that uses [`@measured/puck`](https://github.com/measuredco/puck) with Ant Design components to build layouts via drag and drop. The editor ships with reusable components for forms, grid layout, inputs, tables, and tabs.

## Requirements

- Node.js 18+
- npm 9+

## Getting started

```bash
npm install
```

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## Notes

- Drag components from the left panel into the canvas.
- Form items are designed to be placed inside a Form component.
- Table content uses sample data to demonstrate layout.
- Tabs support per-tab drop zones, tab count, editable tab titles, and an editing tab selector.

## Share as static files (no npm on receiver machine)

This project is configured with `"homepage": "."`, so production assets use relative paths.

1. Build and zip:

```bash
npm run build
```

```powershell
Compress-Archive -Path ".\\build\\*" -DestinationPath ".\\puck-antd-build.zip" -Force
```

2. Share `puck-antd-build.zip`.
3. Receiver unzips and opens `index.html` directly.
