SHELL := /bin/bash

SDKMAN_INIT ?= $(HOME)/.sdkman/bin/sdkman-init.sh
MVN = if [ -f "$(SDKMAN_INIT)" ]; then source "$(SDKMAN_INIT)"; fi; mvn
JAVA = if [ -f "$(SDKMAN_INIT)" ]; then source "$(SDKMAN_INIT)"; fi; java

.PHONY: help frontend-install frontend-build frontend-dev dev build test package run clean api-status docker-build docker-run

help:
	@printf "Targets:\n"
	@printf "  make frontend-install Install React frontend dependencies\n"
	@printf "  make frontend-build   Build React frontend into Quarkus resources\n"
	@printf "  make frontend-dev     Start Vite dev server for frontend work\n"
	@printf "  make dev         Start Quarkus dev mode\n"
	@printf "  make build       Compile and package the app\n"
	@printf "  make test        Run tests\n"
	@printf "  make package     Package without tests\n"
	@printf "  make run         Run the packaged app\n"
	@printf "  make clean       Remove build output\n"
	@printf "  make api-status  Query the local status endpoint\n"
	@printf "  make docker-build Build the Docker image\n"
	@printf "  make docker-run   Run the Docker image on port 8080\n"

frontend-install:
	npm --prefix src/main/frontend install

frontend-build:
	npm --prefix src/main/frontend run build

frontend-dev:
	npm --prefix src/main/frontend run dev

dev:
	$(MAKE) frontend-build
	$(MVN) quarkus:dev

build:
	$(MAKE) frontend-build
	$(MVN) verify

test:
	$(MAKE) frontend-build
	$(MVN) test

package:
	$(MAKE) frontend-build
	$(MVN) package -DskipTests

run:
	$(MAKE) frontend-build
	$(MVN) package -DskipTests
	$(JAVA) -jar target/quarkus-app/quarkus-run.jar

clean:
	$(MVN) clean

api-status:
	curl -s http://localhost:8080/api/status

docker-build:
	docker build -t emdashpolice .

docker-run:
	docker run --rm -p 8080:8080 emdashpolice
