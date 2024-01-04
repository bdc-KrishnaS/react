FROM node:lts-alpine

WORKDIR /usr/src/app/

USER root

COPY frontend/package*.json ./

RUN mkdir -p node_modules && chown -R node:node node_modules

RUN npm install && npm cache clean --force

COPY frontend/. .

EXPOSE 3000

# Health check
# HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1

USER node

CMD ["npm", "start"]