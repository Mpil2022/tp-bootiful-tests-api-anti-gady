### Base machine with npm
FROM node:16-alpine as node

# Set the work directory, copy sources
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY front/ /usr/src/app

# Angular CLI installation along with Angular app build
RUN npm install -g @angular/cli@13.2.0 && npm install && npm run build

### Run the nginx server to serve Angular app
FROM nginx:1.20-alpine

# Set the work directory, copy sources
COPY --from=node /usr/src/app/dist/front /usr/share/nginx/html
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Java and Maven installation
RUN apk update && apk add openjdk11 maven

# Run the API and the front
EXPOSE 8080
EXPOSE 80
ENTRYPOINT ["sh", "-c", "mvn clean package spring-boot:start ; nginx -g 'daemon off;'"]