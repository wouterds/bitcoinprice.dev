PWD = $(shell pwd)
VERSION = $(shell cat package.json | grep "\"version\"" | sed -e 's/^.*: "\(.*\)".*/\1/')

DOCKER_COMPOSE = ./.docker/docker-compose.yml
DOCKERFILE_NODE = ./.docker/node/Dockerfile
DOCKERFILE_NGINX = ./.docker/nginx/Dockerfile

TAG_PREFIX = wouterds/bitcoinprice.dev
TAG_NODE = ${TAG_PREFIX}:node
TAG_NGINX = ${TAG_PREFIX}:nginx

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
		--build-arg PORT=${PORT} \
		--build-arg APP_HOST=${APP_HOST} \
		--build-arg API_HOST=${API_HOST} \
		-t ${TAG_NODE} .
	touch .build-node

.build-nginx: ${DOCKERFILE_NGINX}
	docker build -f ${DOCKERFILE_NGINX} -t ${TAG_NGINX} .
	touch .build-nginx

build: .build-node .build-nginx
	docker tag ${TAG_NODE} ${TAG_NODE}-${VERSION}
	docker tag ${TAG_NGINX} ${TAG_NGINX}-${VERSION}

docker-login:
	docker login -u ${DOCKER_REGISTRY_USER} -p ${DOCKER_REGISTRY_PASS}

push: build docker-login
	docker push ${TAG_NODE}
	docker push ${TAG_NGINX}
	docker push ${TAG_NODE}-${VERSION}
	docker push ${TAG_NGINX}-${VERSION}

deploy:
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p ${DEPLOY_PATH}"
	scp ${DOCKER_COMPOSE} ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/docker-compose.yml
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}; docker-compose pull"
	ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd ${DEPLOY_PATH}; docker-compose up -d"
