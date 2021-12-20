FROM node:10.15.2-alpine

# Create app directory
WORKDIR /app

RUN apk add --no-cache \
    python make g++ git ca-certificates tzdata

ENV TZ America/Chicago

RUN npm install -g typescript ts-node

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#RUN apk -v --update add \
#         bash \
#         grep \
#         jq \
#         python \
#         py-pip \
#         groff \
#         less \
#         && \
#     pip install awscli python-magic --upgrade && \
#     apk -v --purge del py-pip && \
#     rm /var/cache/apk/* && \
#     aws --version

EXPOSE 3000

ENV NODE_ENV production

CMD ["node", "./dist/server.js"]
