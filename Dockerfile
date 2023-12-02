FROM node:18-alpine
RUN apk add libc6-compat openssl1.1-compat
RUN apk update
WORKDIR /app
COPY ./packages/api/package.json /app/packages/api/package.json
COPY ./packages/prisma/package.json /app/packages/prisma/package.json
COPY ./package.json ./yarn.lock /app/
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn prisma generate
RUN yarn turbo run build --scope=@school/api
