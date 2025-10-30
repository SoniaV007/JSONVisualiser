# JSON Tree Visualizer

A web application that converts JSON data into an interactive tree visualization.

## Features

- Parse and visualize JSON data as a tree structure
- Search nodes by JSON path notation
- Light and dark theme support
- Interactive node tooltips showing path and type information
- Automatic layout with zoom and pan controls

## Usage

1. Paste your JSON data in the input textarea on the left
2. Click "Visualise JSON" to generate the tree
3. Use the search bar to find nodes by path (e.g., $.user.name or $.items[0])
4. Hover over nodes to see their path and type
5. Use the theme toggle button to switch between light and dark modes
6. Click "Clear" to reset the input and tree

## Search Path Format

Use JSON path notation to search for nodes:

- Root: $
- Object properties: $.property or $.parent.child
- Array elements: $.array[0] or $.parent.array[1]

## Technologies Used

- React
- Vite
- ReactFlow
- Zustand
