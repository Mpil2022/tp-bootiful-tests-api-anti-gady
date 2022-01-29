FROM node:16-alpine as node

# Set work directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ .

# Maven, Angular CLI and Java installation
RUN apk update && apk add openjdk11 maven && npm install -g @angular/cli@13.0.1 && npm install --prefix "front"

# Run API and front
EXPOSE 4200
EXPOSE 8080
CMD ["sh", "-c", "mvn clean package spring-boot:start ; npm run start --prefix 'front'"]