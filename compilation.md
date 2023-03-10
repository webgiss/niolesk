# Compilation of Niolesk

Niolesk currently is just a static page, thus doesn't require anything else than a webserver serving static pages (like github pages).

## Compilation using yarn

Requirements:
- nodejs 16
- yarn
- git

Note: `node` version 17 has issues when compiling the site, so you should use node LTS which is `node` 16

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

Finally build Niolesk

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

### Compilation to use in another path than /

You can compile niolesk to host in another path than the default `/`. You should then replace

```
$ yarn build
```

With:

```
$ PUBLIC_URL=/niolesk/ yarn build
```

if you want to host the site at `/niolesk/`.


## Compilation using docker

Requirement:
- Docker

### Basic usage

First Build or pull the image

```
$ docker pull ghcr.io/webgiss/niolesk
```

The copy the files

```
docker run --rm -v $(pwd)/niolesk:/out --entrypoint "/bin/cp"  ghcr.io/webgiss/niolesk -r /usr/share/nginx/html /out
```

The files be in folder `niolesk/html/`

### Pulling an image

latest version pushed to git main branch has image tagged with "`:main`".

latest official version pushed to git main branch has image tagged with "`:latest`".

All version tagged can be retrieved using the tag name.

You can use other tags, see https://github.com/webgiss/niolesk/pkgs/container/niolesk for a list of tags you can use.

#### Examples

##### Latest release

```
docker pull ghcr.io/webgiss/niolesk:latest
```

##### Latest commit in branch main

```
docker pull ghcr.io/webgiss/niolesk:main
```

##### Version 1.2.0

```
docker pull ghcr.io/webgiss/niolesk:v1.2.0
```

### Building an image

By default, if you build an image, it will use the current folder to build.

```
docker build --rm --force-rm -t local_niolesk_image .
```

You can specify some build args to change the behavior

```
docker build --rm --force-rm -t local_niolesk_image:git-7438794 --build-arg SOURCE=git --build-arg POINT=7438794 .
```

You can also specify the `PUBLIC_URL` for deployment using `--build-arg` (default is `/`):

```
docker build --rm --force-rm -t local_niolesk_image --build-arg PUBLIC_URL=/niolesk/ .
```

## Download the site directly from github

With each release, you can find the html/css/js pages to use for static hosting (on the root of a vhost site) of niolesk in the file `niolesk-site-x.x.x.tar.gz`. A zip version is also available for who are cluless about tar.gz files.

You can also find with each release the storybook associated with a version under the name `niolesk-storybook-x.x.x.tar.gz`. A zip version is also provided.

# Configuration of Niolesk

You can configure the default kroki engine used by niolesk by editing the `config.js` file.

```
window.config = {
    krokiEngineUrl: 'https://kroki.io/',
};
```

If it's not obvious, replace `https://kroki.io/` by the url of the kroki instance you intend to use (for example `https://kroki.example.com/`).