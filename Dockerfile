FROM node:18-alpine


WORKDIR /app

COPY package*.json ./

RUN npm update
RUN npm i

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
