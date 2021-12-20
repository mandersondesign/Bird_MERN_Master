FROM node:10.15.2-alpine

# Create app directory
WORKDIR /app

RUN apk add --no-cache \
    python make g++ git ca-certificates

#COPY package*.json ./

RUN npm install -g typescript ts-node

#CMD ["ts-node", "./src/server.ts"]
