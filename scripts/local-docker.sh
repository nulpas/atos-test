#!/bin/bash

NOW="$(date +"%Y-%m-%d__%H-%M")"

cd server
docker build -t atos-test-api .
docker save atos-test-api > ../scripts/atos-test-api-$NOW.zip
docker rm atos-test-api --force
docker run --name atos-test-api -d -p 7555:7555 atos-test-api
cd ..

npm run build:pro
docker build -t atos-test .
docker save atos-test > ./scripts/atos-test-$NOW.zip
docker rm atos-test --force
docker run --name atos-test -d -p 6555:80 -e BASE_API_URL__MAIN='https://jsonplaceholder.typicode.com/' -e BASE_API_URL__SECONDARY='/assets/data/' -e BASE_API_URL__THIRD='http://localhost:7555' atos-test
