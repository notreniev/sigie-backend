FROM node:12.3.1
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig.json .
RUN npm install --verbose

COPY . .

RUN npm i -g typescript
RUN tsc

EXPOSE 3100