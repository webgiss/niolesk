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

Or using docker-compose:

```yaml
version: "3.5"
services:
  niolesk:
    image: "ghcr.io/webgiss/niolesk"
    ports:
      - "8017:80"
    hostname: "niolesk"
    restart: "always"
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

Or using docker-compose:

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

### Analytics links

You can configure analytics provider using docker env var.

#### Matomo

You can use "matomo_js" or "matomo_image" as analytics providers, and then use matomo url as arg1 and matomo site id as arg2

```
docker run -d --rm=true -e "NIOLESK_ANALYTICS_PROVIDER_NAME=matomo_js" -e "NIOLESK_ANALYTICS_PROVIDER_ARG1=https://matomo.example.com/" -e "NIOLESK_ANALYTICS_PROVIDER_ARG2=32" -p 8017:80 ghcr.io/webgiss/niolesk
```

Or using docker-compose:

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
      - "NIOLESK_ANALYTICS_PROVIDER_NAME=matomo_js"
      - "NIOLESK_ANALYTICS_PROVIDER_ARG1=https://matomo.example.com/"
      - "NIOLESK_ANALYTICS_PROVIDER_ARG2=32"
```

#### Google analytics 4

You can use "google_ga4" as analytics providers, and then use the measurement id as arg1

```
docker run -d --rm=true -e "NIOLESK_ANALYTICS_PROVIDER_NAME=google_ga4" -e "NIOLESK_ANALYTICS_PROVIDER_ARG1=G-XXX999XXXX" -p 8017:80 ghcr.io/webgiss/niolesk
```

Or using docker-compose:

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
      - "NIOLESK_ANALYTICS_PROVIDER_NAME=google_ga4"
      - "NIOLESK_ANALYTICS_PROVIDER_ARG1=G-XXX999XXXX"
```

#### Any analytics using only docker env vars

You can use any analytics providers either by providing "just" type/content

```
docker run -d --rm=true -e "NIOLESK_ANALYTICS_TYPE=html" -e 'NIOLESK_ANALYTICS_CONTENT=<img src="https://example.com/analytics/image.png?id=E-0145456533" />' -p 8017:80 ghcr.io/webgiss/niolesk
```

Or using docker-compose:

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
      - "NIOLESK_ANALYTICS_TYPE=html"
      - 'NIOLESK_ANALYTICS_CONTENT=<img src="https://example.com/analytics/image.png?id=E-0145456533" />'
```

Note that you can't provide direct html tag `<script>...</script>` in your HTML content as there are [security restrictions](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations). You have to specify explicit script content as type `js` by calling:

```
docker run -d --rm=true -e "NIOLESK_ANALYTICS_TYPE=js" -e 'NIOLESK_ANALYTICS_CONTENT=console.log("This is analytics code")' -p 8017:80 ghcr.io/webgiss/niolesk
```

Or using docker-compose:

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
      - "NIOLESK_ANALYTICS_TYPE=js"
      - 'NIOLESK_ANALYTICS_CONTENT=console.log("This is analytics code")'
```

#### Any analytics by creating your own provider

You can also create your own analytics provider by including your own version of file `/usr/share/nginx/html/config-analytic-providers.js` inside docker:

Create a file where you want, for example `/opt/niolesk/config-analytic-providers.js`:

```js
window.config_analytic_providers = {
   my_provider: [
    {
      type: 'js',
      content: `
        const _dataTracker = window._dataTracker = window._dataTracker || []
        const eTrack = (key,value) => _dataTracker.push([key,value])
        eTrack('now',new Date())
        eTrack('id','E-0145456533')
      `,
    },
    {
      type: 'js',
      content: 'https://example.com/analytics/script.js?id=E-0145456533',
    },
   ],
}
```

and then call

```
docker run -d --rm=true -e "NIOLESK_ANALYTICS_PROVIDER_NAME=my_provider" -v "/opt/niolesk/config-analytic-providers.js:/usr/share/nginx/html/config-analytic-providers.js:ro" -p 8017:80 ghcr.io/webgiss/niolesk
```

Or using docker-compose:

```yaml
version: "3.5"
services:
  niolesk:
    image: "ghcr.io/webgiss/niolesk"
    ports:
      - "8017:80"
    hostname: "niolesk"
    restart: "always"
    volumes:
      - "/opt/niolesk/config-analytic-providers.js:/usr/share/nginx/html/config-analytic-providers.js:ro"
    environment:
      - "NIOLESK_ANALYTICS_PROVIDER_NAME=my_provider"
```

But you can also use providers args if you want:

`/opt/niolesk/config-analytic-providers.js`:

```js
window.config_analytic_providers = {
   my_provider: [
    {
      type: 'js',
      content: `
        const _dataTracker = window._dataTracker = window._dataTracker || []
        const eTrack = (key,value) => _dataTracker.push([key,value])
        eTrack('now',new Date())
        eTrack('id','{1}')
      `,
    },
    {
      type: 'js',
      content: 'https://example.com/analytics/script.js?id={1}',
    },
   ],
}
```

```
docker run -d --rm=true -e "NIOLESK_ANALYTICS_PROVIDER_NAME=my_provider" -e "NIOLESK_ANALYTICS_PROVIDER_ARG1=E-0145456533" -v "/opt/niolesk/config-analytic-providers.js:/usr/share/nginx/html/config-analytic-providers.js:ro" -p 8017:80 ghcr.io/webgiss/niolesk
```

Or using docker-compose:

```yaml
version: "3.5"
services:
  niolesk:
    image: "ghcr.io/webgiss/niolesk"
    ports:
      - "8017:80"
    hostname: "niolesk"
    restart: "always"
    volumes:
      - "/opt/niolesk/config-analytic-providers.js:/usr/share/nginx/html/config-analytic-providers.js:ro"
    environment:
      - "NIOLESK_ANALYTICS_PROVIDER_NAME=my_provider"
      - "NIOLESK_ANALYTICS_PROVIDER_ARG1=E-0145456533"
```

## Deploying the pages as a static site on your own server without using docker

You can download the static pages of the latest release using the file `niolesk-site`-{version}.{extension}

Every docker variable described can be configurd by editing lines in `config.js`. `config-analytic-providers.js` can be edited by simply... editing `config-analytic-providers.js`.

## Development

The storybook of the project from the latest tag is accessible at https://niolesk.top/storybook

Help for [compilation](compilation.md) of the project.
