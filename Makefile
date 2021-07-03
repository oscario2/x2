# runtime
DENO := deno run -A --unstable --no-check
NODE := node

# package
PKG := x2

define package
$(shell node -p "require('./package.json').$(1)")
endef

# docker
DTAG := $(call package,version)
DIMG := app:${DTAG}

# runtime
deno:
	@${DENO} tests/${PKG}.test.ts

node:
	@${NODE} tests/${PKG}.test.js

all:
	@$(MAKE) deno node

# docker
docker-build:
	@docker image inspect ${DIMG} > /dev/null 2>&1 || docker build -t ${DIMG} .

docker-run:
	@docker run -it --init ${DIMG}

docker:
	@echo ${DIMG}
	@$(MAKE) docker-build docker-run

# misc
docker-delete-all:
	@docker system prune -a --volumes

