# bitcoinprice.dev

![version](https://img.shields.io/github/v/tag/wouterds/bitcoinprice.dev?color=orange&label=version)
![release](https://github.com/wouterds/bitcoinprice.dev/workflows/release/badge.svg)
![linting](https://github.com/wouterds/bitcoinprice.dev/workflows/linting/badge.svg)
![dependencies](https://img.shields.io/david/wouterds/bitcoinprice.dev)
![nginx image](https://img.shields.io/docker/image-size/wouterds/bitcoinprice.dev/nginx?label=nginx%20image)
![node image](https://img.shields.io/docker/image-size/wouterds/bitcoinprice.dev/node?label=node%20image)

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
