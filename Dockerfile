FROM node:16-alpine AS build

ENV NODE_OPTIONS=--max_old_space_size=8192

WORKDIR /usr/app/
COPY package*.json ./
RUN npm i
COPY src/ ./src
COPY .env.prod .env
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]