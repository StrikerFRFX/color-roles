FROM node:latest

RUN mkdir -p /usr/src/color-roles
WORKDIR /usr/src/color-roles

COPY package.json /usr/src/color-roles
RUN yarn

COPY . /usr/src/color-roles

RUN yarn build

FROM node:latest

WORKDIR /usr/src/color-roles
COPY package.json /usr/src/color-roles
RUN yarn

COPY --from=0 dist /usr/src/color-roles

CMD ["node", "index"]