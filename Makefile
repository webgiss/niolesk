.PHONY: build run rm milestone-release release

IMAGE_NAME=local-niolesk-image
CONTAINER_NAME=local-niolesk

VERSION_CHECKER=yarn info -R | grep -A 1 "niolesk@workspace:." | tail -n 1 | sed -e "s/.*Version: //"
APP_VERSION=$(shell $(VERSION_CHECKER))
WORKING_DIR=$(shell pwd)

PORT=8017

rm:
	docker rm --force $(CONTAINER_NAME) || true

run: rm
	docker run -d --rm=true -e "NIOLESK_KROKI_ENGINE=https://kroki.io/" -p $(PORT):80 --name "$(CONTAINER_NAME)" "$(IMAGE_NAME)"

build:
	docker build --rm --force-rm -t "$(IMAGE_NAME)" .

release:
	bash -c '! [[ `git status --porcelain` ]]' || (echo "You must have commited everything before running a release" && false)
	yarn version patch
	git add .
	git commit -m "v$$($(VERSION_CHECKER))"
	git push
	git tag "v$$($(VERSION_CHECKER))"
	git push --tags
	yarn version patch
	git add .
	git commit -m "v$$($(VERSION_CHECKER)) : Start new developement"

milestone-release:
	bash -c '! [[ `git status --porcelain` ]]' || (echo "You must have commited everything before running a release" && false)
	yarn version minor
	git add .
	git commit -m "v$$($(VERSION_CHECKER))"
	git push
	git tag "v$$($(VERSION_CHECKER))"
	git push --tags
	yarn version minor
	yarn version patch
	git add .
	git commit -m "v$$($(VERSION_CHECKER)) : Start new developement milestone"

info:
	@echo $(APP_VERSION)
