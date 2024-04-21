# Underground Duel - Frontend

## Setting up a typescript project

### First time
- Use node.js .gitignore
- `npm install -g typescript`
- `tsc --init --sourceMap --rootDir src --outDir dist`
- Create 'src' directory
- Create index.ts in 'src' directory
- Create a launch.json file (node.js) (from the vscode Run and Debug menu)
    - Change program field to `"program": "${workspaceFolder}/dist/index.js"`
- `npm i --save-dev typescript`
- Press F1 and run 'Tasks: Configure Default Build Task'
    - 'tsc: watch - tsconfig.json'

### Each time launching vscode
- Ctrl+Shift+B (or Press F1 and run 'Tasks: Run Build Task')