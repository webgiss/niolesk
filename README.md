# Niolesk

Edit **diagrams** from **textual** descriptions! : A [kroki](https://kroki.io/) interface.

* Application : https://webgiss.github.io/niolesk/
* Container image : ghcr.io/webgiss/niolesk (static site served by nginx)

## Description

Provide an interface for https://kroki.io/

Just add any kroki url after the url of niolesk followed by `#` and you'll be able to edit the diagram, and export again a new url after change.

## Example

![Diagram](https://kroki.io/svgbob/svg/eNptjLENwDAIBHumuC5OgVkICW-QBRg-b6cN0kv8nQB-pyx9QvBoV29ligyWSphAKs2o-7PtF6SLpsmRcfA2VSx3Pag4d_YC6Q8XSA==)

[Edit this diagram](https://webgiss.github.io/niolesk/#https://kroki.io/svgbob/svg/eNptjLENwDAIBHumuC5OgVkICW-QBRg-b6cN0kv8nQB-pyx9QvBoV29ligyWSphAKs2o-7PtF6SLpsmRcfA2VSx3Pag4d_YC6Q8XSA==)

## Docker

To start a demo site:

```
docker run -d --rm=true -p 8017:80 ghcr.io/webgiss/niolesk
```

Then go to http://127.0.0.1:8017/ and it's running.

