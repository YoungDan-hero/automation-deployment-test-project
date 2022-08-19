# dockerfile
# build stage
FROM node:14.13.1 as build-stage
WORKDIR /website/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /website/app/dist /usr/share/nginx/html
EXPOSE 9998
CMD ["nginx", "-g", "daemon off;"]
