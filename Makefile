DCS=docker-compose exec -T connectors

.env:
	sed -e "s/{DEV_UID}/$(shell if [ "$(shell uname)" = "Linux" ]; then echo $(shell id -u); else echo '1001'; fi)/g" \
		-e "s/{DEV_GID}/$(shell if [ "$(shell uname)" = "Linux" ]; then echo $(shell id -g); else echo '1001'; fi)/g" \
		.env.dist > .env; \

init: docker-up-force install

publish:
	pnpm build
	pnpm version
	pnpm release

docker-compose.ci.yml:
	# Comment out any port forwarding
	sed -r 's/^(\s+ports:)$$/#\1/g; s/^(\s+- \$$\{DEV_IP\}.*)$$/#\1/g' docker-compose.yaml > docker-compose.ci.yml

docker-up-force: .env
	docker-compose pull --ignore-pull-failures
	docker-compose up -d --force-recreate --remove-orphans --build

docker-down-clean: .env
	docker-compose down -v

oauth2:
	docker-compose exec connectors pnpm oauth2

install:
	$(DCS) pnpm install

update:
	$(DCS) pnpm update

outdated:
	$(DCS) pnpm outdated

lint:
	$(DCS) pnpm lint-ci

unit:
	$(DCS) pnpm test

fasttest: lint unit

localtest:
	pnpm lint
	pnpm test

generate-app-metadata:
	$(DCS) pnpm generate-app-metadata

test: docker-up-force install fasttest docker-down-clean
