FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=30s --start-period=1s --retries=3 \
  CMD curl -f http://0.0.0.0:8081 || exit 1

CMD [ "http-server", "dist" ]