FROM node:20
RUN npm ci
RUN npm run build
COPY entrypoint.sh /entrypoint.sh
COPY dist /dist
ENTRYPOINT ["/entrypoint.sh"]
