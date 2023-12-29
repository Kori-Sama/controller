# syntax = docker/dockerfile:experimental
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
COPY index.html ./
RUN npm install
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./
COPY public public/
COPY src src/
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]