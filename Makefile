.PHONY: build run rm

IMAGE_NAME=local-niolesk-image
CONTAINER_NAME=local-niolesk

APP_VERSION=$(shell yarn info -R | grep -A 1 "niolesk@workspace:." | tail -n 1 | sed -e "s/.*Version: //")
WORKING_DIR=$(shell pwd)

PORT=8017

rm:
	docker rm --force $(CONTAINER_NAME) || true

run: rm
	docker run -d --rm=true -e "NIOLESK_KROKI_ENGINE=https://kroki.io/" -p $(PORT):80 --name "$(CONTAINER_NAME)" "$(IMAGE_NAME)"

build:
	docker build --rm --force-rm -t "$(IMAGE_NAME)" .

info:
	@echo $(APP_VERSION)
