# development build - build app
FROM node:15 as builder
WORKDIR /usr/src/app
ARG GIT_SHA
COPY . .
ENV NODE_ENV=production
RUN cd collections \
    && npm install --silent \
    && npm run build
ENV GIT_SHA=${GIT_SHA}

# production environment
FROM nginx:1.19.10
# Copy collections build into nginx html directory for now,
# collections will be at the root of the server
COPY --from=builder /usr/src/app/collections/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/.docker/nginx.conf /etc/nginx/nginx.conf
ENV PORT 80
EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]
