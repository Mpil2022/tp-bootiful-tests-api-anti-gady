### Run the nginx server to serve Angular / Spring boot app
FROM nginx:1.20-alpine

ENV FRONT_PORT 80
ENV API_PORT 8080

# Set the work directory, copy sources
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app

# Node JS, NPM, Java JDK, Maven, Angular CLI installation along with Angular dependencies
RUN apk update && apk add openjdk11 maven nodejs npm && npm install -g @angular/cli@13.2.0 && npm install --prefix "front" && chmod 755 run.sh

# Update NGINX configuration to handle route mapping
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Launch front and API
EXPOSE ${FRONT_PORT}
EXPOSE ${API_PORT}

ENTRYPOINT /usr/src/app/run.sh ${FRONT_PORT} ${API_PORT}