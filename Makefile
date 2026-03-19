.PHONY: dev build preview lint check validate

dev:
	npx astro dev

build:
	npx astro build

preview:
	npx astro preview

lint:
	npx astro check

check:
	npx astro check

validate:
	@echo "Route validation not yet implemented"
