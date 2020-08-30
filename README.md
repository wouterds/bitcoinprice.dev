# bitcoinprice.dev

## Setup

```bash
cp .env.example .env
yarn
```

### VSCode

#### Plugins

- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### Workspace settings

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.validate": [
    "javascript", "typescript",
  ],
}
```

## Linting

```bash
yarn lint
yarn lint:fix
```

## Running

```bash
yarn dev
```
