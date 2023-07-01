FROM --platform=linux/amd64 node:16.16.0-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm,rw npm install
COPY ./ /app/
RUN npm run build

FROM --platform=linux/amd64 nginx:1.25.1-alpine3.17-slim as runtime
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
# Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
CMD ["nginx", "-g", "daemon off;"]