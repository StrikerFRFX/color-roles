FROM node:latest

WORKDIR /usr/color-roles

COPY package.json package.json
RUN yarn

COPY . .

RUN yarn build

FROM node:latest

COPY package.json package.json
RUN yarn

COPY --from=0 dist .

CMD ["node", "index"]