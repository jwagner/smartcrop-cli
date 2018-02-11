FROM node:9-stretch
WORKDIR /app
RUN apt-get update && apt-get install --force-yes --yes libcv-dev libopencv-dev jq imagemagick
ADD . /app
RUN npm install
CMD npm test
