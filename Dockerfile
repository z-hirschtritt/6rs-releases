FROM gcr.io/plasma-column-128721/node_base:10.4.1
ENV NODE_ENV=production

RUN apk add --no-cache --repository https://nl.alpinelinux.org/alpine/edge/main/ dumb-init

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

WORKDIR /app
RUN npm install

COPY . /app

EXPOSE 8080
ENTRYPOINT ["/usr/bin/dumb-init", "npm", "start"]
