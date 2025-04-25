FROM node:20
WORKDIR /action
COPY . .
RUN npm ci
RUN npm run build
ENTRYPOINT ["entrypoint.sh"]
