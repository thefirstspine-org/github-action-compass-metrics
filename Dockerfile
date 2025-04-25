FROM node:20
WORKDIR /github/workspace
COPY . .
RUN npm ci
RUN npm run build
ENTRYPOINT ["/github/workspace/entrypoint.sh"]
