FROM 16.16.0-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
## Install build toolchain, install node deps and compile native add-ons
# RUN apk add --no-cache python3 make g++
RUN npm install

COPY ./ /app/
RUN npm run build
