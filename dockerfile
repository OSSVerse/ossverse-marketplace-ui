# build environment
#syntax=docker/dockerfile:1.2
FROM node:14.19.0-alpine as build
RUN --mount=type=secret,id=MAPS_API_KEY 
    # cat /run/secrets/MAPS_API_KEY
# ENV MAPS_KEY=$MAPS_API_KEY
RUN export MAPS_KEY=$(cat /run/secrets/MAPS_API_KEY)
RUN apk update
RUN apk add nginx
RUN apk add g++ make python3
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn install
RUN yarn build

# production environment
FROM nginx:1.19.7-alpine
RUN apk update && apk upgrade
RUN apk add --no-cache nodejs=14.19.0-r0 npm=14.19.0-r0
RUN npm install -g yarn
COPY --from=build /app /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 8080
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
