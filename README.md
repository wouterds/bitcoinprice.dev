# bitcoinprice.dev

![version](https://img.shields.io/github/v/tag/wouterds/bitcoinprice.dev?color=orange&label=version)
![release](https://github.com/wouterds/bitcoinprice.dev/workflows/release/badge.svg)
![linting](https://github.com/wouterds/bitcoinprice.dev/workflows/linting/badge.svg)
![dependencies](https://img.shields.io/david/wouterds/bitcoinprice.dev)
![nginx image](https://img.shields.io/docker/image-size/wouterds/bitcoinprice.dev/nginx?label=nginx%20image)
![node image](https://img.shields.io/docker/image-size/wouterds/bitcoinprice.dev/node?label=node%20image)

## Setup

### Environment

```bash
cp .env.example .env
```

### Dependencies

```bash
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
```

### Automatic fixing of linting errors

```bash
yarn lint:fix
```

## Running

### Development

```bash
yarn dev
```

#### Tickers

```bash
npx ts-node -r ./src/bootstrap.ts ./src/scripts/binance-ticker.ts
npx ts-node -r ./src/bootstrap.ts ./src/scripts/bitfinex-ticker.ts
npx ts-node -r ./src/bootstrap.ts ./src/scripts/bitstamp-ticker.ts
npx ts-node -r ./src/bootstrap.ts ./src/scripts/coinbase-ticker.ts
npx ts-node -r ./src/bootstrap.ts ./src/scripts/kraken-ticker.ts
```

### Production

```bash
yarn start
```

#### Tickers

```bash
yarn ticker:binance
yarn ticker:bitfinex
yarn ticker:bitstamp
yarn ticker:coinbase
yarn ticker:kraken
```

![Screenshot](https://i.imgur.com/7ME6ykK.jpg)

![Screenshot](https://i.imgur.com/cYDYzr1.jpg)

![Screenshot](https://i.imgur.com/l0CKKy1.jpg)
