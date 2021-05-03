# Niolesk

Edit **diagrams** from **textual** descriptions! : A [kroki](https://kroki.io/) interface.

* Application : https://niolesk.top/
* Container image : `ghcr.io/webgiss/niolesk` (static site served by nginx)

## Description

Provide an interface for https://kroki.io/

Just add any kroki url after the url of niolesk followed by `#` and you'll be able to edit the diagram, and export again a new url after change.

## Example

![Diagram](https://kroki.io/svgbob/svg/eNptjLENwDAIBHumuC5OgVkICW-QBRg-b6cN0kv8nQB-pyx9QvBoV29ligyWSphAKs2o-7PtF6SLpsmRcfA2VSx3Pag4d_YC6Q8XSA==)

[Edit this diagram](https://niolesk.top/#https://kroki.io/svgbob/svg/eNptjLENwDAIBHumuC5OgVkICW-QBRg-b6cN0kv8nQB-pyx9QvBoV29ligyWSphAKs2o-7PtF6SLpsmRcfA2VSx3Pag4d_YC6Q8XSA==)

## Docker

To start a demo site:

```
docker run -d --rm=true -p 8017:80 ghcr.io/webgiss/niolesk
```

Then go to http://127.0.0.1:8017/ and it's running.

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
