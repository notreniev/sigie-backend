FROM node:12.3.1
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig.json .
RUN npm install --verbose
RUN npm install -g @angular/cli@8.1.0
RUN npm rebuild node-sass

COPY . .

RUN npm i -g typescript
RUN tsc

EXPOSE 3100