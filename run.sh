#!/bin/sh -e

if [ $# -ne 2 ]; then
  echo "Usage : run.sh <front port> <back port>"
  exit 1;
fi;

# Remplacements des ports pour lancement du front et de l'API
sed -i -E "s/listen(\s*) .*/listen\1 $1;/g" /etc/nginx/conf.d/default.conf
sed -i -E "s/port(\s*):.*/port: '$2',/g" /usr/src/app/front/src/environments/environment.ts
sed -i -E "s/server.port(\s*)=(\s*).*/server.port = $2/g" /usr/src/app/src/main/resources/application.properties

# Compilation et copie du front sur le serveur NGINX
cd /usr/src/app/front
npm run build
rm /usr/share/nginx/html/*
cp dist/front/* /usr/share/nginx/html
cd ..

# Lancement de l'API puis du front
mvn clean package spring-boot:start
nginx -g 'daemon off;'