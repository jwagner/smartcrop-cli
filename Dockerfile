FROM node:9-stretch
WORKDIR /app
RUN node --version
RUN apt-get update && apt-get install --force-yes --yes libcv-dev libopencv-dev jq imagemagick
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
CMD npm install && npm test
