OWNER=graphql
IMAGE_NAME=credentials-admin
QNAME=$(OWNER)/$(IMAGE_NAME)

GIT_TAG=$(QNAME):$(TRAVIS_COMMIT)
BUILD_TAG=$(QNAME):0.1.$(TRAVIS_BUILD_NUMBER)
LATEST_TAG=$(QNAME):latest

lint:
	docker run -it --rm -v "$(PWD)/Dockerfile:/Dockerfile:ro" redcoolbeans/dockerlint

build:
	npm run build
	docker build -t $(GIT_TAG) .

tag:
	# docker tag $(GIT_TAG) $(BUILD_TAG)
	docker tag $(GIT_TAG) $(LATEST_TAG)

login:
	echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
push: login
	# docker push $(GIT_TAG)
	# docker push $(BUILD_TAG)
	docker push $(LATEST_TAG)