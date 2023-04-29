# Niolesk

Edit **diagrams** from **textual** descriptions! : A [kroki](https://kroki.io/) interface.

* Application : https://niolesk.top/
* Project page : https://github.com/webgiss/niolesk/
* Container image : `ghcr.io/webgiss/niolesk` (static site served by nginx)

## Description

Provide an interface for https://kroki.io/

Just add any kroki url after the url of niolesk followed by `#` and you'll be able to edit the diagram, and export again a new url after change.

## Example

![Diagram](https://kroki.io/svgbob/svg/eNpdzLEJADEMA8A-U6j7PMFO71kMyga_gIeP3L5BUnFg4H_kWK4tfKAabj4bYo9CNtTkKyh7cGwhUoDcTQp5zPSmEMgLdawUdw==)

[Edit this diagram](https://niolesk.top/#https://kroki.io/svgbob/svg/eNpdzLEJADEMA8A-U6j7PMFO71kMyga_gIeP3L5BUnFg4H_kWK4tfKAabj4bYo9CNtTkKyh7cGwhUoDcTQp5zPSmEMgLdawUdw==)

## Docker

To start a demo site:

```
docker run -d --rm=true -p 8017:80 ghcr.io/webgiss/niolesk
```

Then go to http://127.0.0.1:8017/ and it's running.

### Unprivileged images

Standard images are based on nginx:latest image. If you need unprivileged images, you can use 
* `ghcr.io/webgiss/niolesk:unprivileged` instead of `ghcr.io/webgiss/niolesk:latest`
* `ghcr.io/webgiss/niolesk:unprivileged-`{version} instead of `ghcr.io/webgiss/niolesk:`{version}

Those images are based on image provided by https://github.com/nginxinc/docker-nginx-unprivileged

Note: The port in the container isn't 80 but 8080 (as 80 is only accessible to privileged user).

So the standard demo site becomes:

```
docker run -d --rm=true -p 8017:8080 -u 1037:1037 ghcr.io/webgiss/niolesk:unprivileged
```

### Docker platforms

Image is currently available for various platforms:
* linux/amd64
* linux/arm64
* linux/386
* linux/arm/v7

### Advanced usage

If you want your niolesk docker instance to be linked to your kroki docker instance (hosted at https://kroki.example.com/) just start with command line:

```
docker run -d --rm=true -e "NIOLESK_KROKI_ENGINE=https://kroki.example.com/" -p 8017:80 ghcr.io/webgiss/niolesk
```

### docker-compose example

If you use `docker-compose` here is a docker-compose example:

```yaml
version: "3.5"
services:
  niolesk:
    image: "ghcr.io/webgiss/niolesk"
    ports:
      - "8017:80"
    hostname: "niolesk"
    restart: "always"
    environment:
      - "NIOLESK_KROKI_ENGINE=https://kroki.example.com/"
```

## Development

The storybook of the project from the latest tag is accessible at https://niolesk.top/storybook

Help for [compilation](compilation.md) of the project.
