FROM node:16-alpine AS build

ENV NODE_OPTIONS=--max_old_space_size=10000

WORKDIR /usr/app/
COPY package*.json ./
RUN npm i
COPY src/ ./src
COPY .env.prod .env
COPY . .
RUN npm run build

FROM nginx:1.19.0
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf_orig 
COPY --from=build /usr/app/dist/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]