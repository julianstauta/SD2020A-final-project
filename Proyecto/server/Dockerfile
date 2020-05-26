FROM node:lts-alpine

# Create app directory
WORKDIR /app/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=30s --start-period=1s --retries=3 \
  CMD curl -f http://0.0.0.0:5000 || exit 1

CMD [ "node", "index.js" ]