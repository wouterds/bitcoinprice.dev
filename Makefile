PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

DOCKER_COMPOSE = ./.docker/docker-compose.yml
DOCKERFILE_NODE = ./.docker/node/Dockerfile

TAG_PREFIX = wouterds/bitcoinlive.dev
TAG_NODE = ${TAG_PREFIX}:node

all: build

clean:
	-rm -rf node_modules
	-rm -rf dist
	-rm -rf .env
	-rm -rf .build-*

node_modules: yarn.lock
	docker run --rm -v ${PWD}:/code -w /code node:14-alpine yarn --pure-lockfile

lint: node_modules
	docker run --rm -v ${PWD}:/code -w /code node:14-alpine yarn lint

.build-app: node_modules
	docker run --rm -v $(PWD):/code -w /code node:14-alpine yarn build
	touch .build-app

.build-node: .build-app ${DOCKERFILE_NODE}
	docker build -f ${DOCKERFILE_NODE} \
		--build-arg HOST=${HOST} \
		--build-arg PORT=${PORT} \
		-t ${TAG_NODE} .
	touch .build-node

build: .build-node
	docker tag ${TAG_NODE} ${TAG_NODE}-${VERSION}

docker-login:
	docker login -u ${DOCKER_REGISTRY_USER} -p ${DOCKER_REGISTRY_PASS}

push: build docker-login
	docker push ${TAG_NODE}
	docker push ${TAG_NODE}-${VERSION}

deploy:
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p ${DEPLOY_PATH}"
	scp ${DOCKER_COMPOSE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/docker-compose.yml
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}; docker-compose pull"
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}; docker-compose up -d"
