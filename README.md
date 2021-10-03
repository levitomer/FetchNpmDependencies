# FetchNpmDependencies

Fetch NPM registry dependencies

## Requirements
* Node & Node Package Manager - install the LTS version via official [nodejs](https://nodejs.org/en/) installation.
* Docker - official [docker](https://docs.docker.com/get-docker/) installation

## Usage

Using with docker:
```bash
sudo docker-compose up --build
```

Using locally:
```bash
npm i && npm run build && npm run start
```

Using development:

```bash
npm i && npm run dev
```

Checking dependency vulnerability:
```bash
npm i && npm run snyk
```

Running Tests:
```bash
npm i && npm run test
```
