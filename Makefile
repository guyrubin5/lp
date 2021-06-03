NPM := node_modules
BIN := $(NPM)/.bin
GATSBY := $(BIN)/gatsby

build:
	$(GATSBY) build

analyze:
	ANALYZE=1 $(GATSBY) build

build-image:
	docker build -t frontend .

run-docker:
	docker run -it -d --name lp-frontend --rm -p 8000:8000 -p 9000:9000 frontend sh
