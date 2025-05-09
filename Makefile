DCS=docker-compose exec -T connectors

ALIAS?=alias
Darwin:
	sudo ifconfig lo0 $(ALIAS) $(shell awk '$$1 ~ /^DEV_IP/' .env | sed -e "s/^DEV_IP=//")
Linux:
	@echo 'skipping ...'
.lo0-up:
	-@make `uname`
.lo0-down:
	-@make `uname` ALIAS='-alias'
.env:
	sed -e "s/{DEV_UID}/$(shell if [ "$(shell uname)" = "Linux" ]; then echo $(shell id -u); else echo '1001'; fi)/g" \
		-e "s/{DEV_GID}/$(shell if [ "$(shell uname)" = "Linux" ]; then echo $(shell id -g); else echo '1001'; fi)/g" \
		.env.dist > .env; \

init: docker-up-force install

publish:
	pnpm run build
	pnpm publish dist

docker-compose.ci.yml:
	# Comment out any port forwarding
	sed -r 's/^(\s+ports:)$$/#\1/g; s/^(\s+- \$$\{DEV_IP\}.*)$$/#\1/g' docker-compose.yaml > docker-compose.ci.yml

docker-up-force: .env .lo0-up
	docker-compose pull --ignore-pull-failures
	docker-compose up -d --force-recreate --remove-orphans --build

docker-down-clean: .env .lo0-down
	docker-compose down -v

oauth2:
	docker-compose exec connectors pnpm run oauth2

install:
	$(DCS) pnpm install

update:
	$(DCS) pnpm update

outdated:
	$(DCS) pnpm outdated

lint:
	$(DCS) pnpm run lint-ci

unit:
	$(DCS) pnpm run test

potato-unit:
	$(DCS) pnpm run potato-test

fasttest: lint unit

potato-fasttest: lint potato-unit

localtest:
	pnpm run lint
	pnpm run test

generate-app-metadata:
	$(DCS) pnpm run generate-app-metadata

test: docker-up-force install fasttest docker-down-clean

potato-test: docker-up-force install potato-fasttest docker-down-clean
