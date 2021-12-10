# Compilation of Niolesk

Niolesk currently is just a static page, thus doesn't require anything else than a webserver serving static pages (like github pages).

## Compilation using yarn

Requierements:
- nodejs
- yarn
- git

Get the sources:

```
$ git clone https://github.com/webgiss/niolesk
```

Then initialise your working copy

```
$ yarn
yarn install v1.22.10
[1/5] Validating package.json...
[2/5] Resolving packages...

[...]

[5/5] Building fresh packages...
Done in 30.40s.
$
```

Finaly build Niolesk

```
$ yarn build
yarn run v1.22.10
$ react-scripts build
Creating an optimized production build...

[...]

Done in 154.64s.
$
```

Niolesk will be found in `build/` (and should be hosted at the root of the website)

## Compilation using docker

Requierement:
- Docker

First Build or pull the image

```
$ docker pull ghcr.io/webgiss/niolesk
```

The copy the files

```
docker run --rm -v $(pwd)/niolesk:/out --entrypoint "/bin/cp"  ghcr.io/webgiss/niolesk -r /usr/share/nginx/html /out
```

The files be in folder `niolesk/html/`

## Download the site directly from github

This part will be accessible in future releases.
