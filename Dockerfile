FROM node:21-alpine

ENV DATABASE_NAME postgres
ENV DATABASE_HOST localhost
ENV DATABASE_USERNAME postgres
ENV DATABASE_PASSWORD secret123!
ENV DATABASE_PORT 5432

#directorio de trabajo para la aplicación
WORKDIR /usr/src/app


COPY package*.json .
RUN npm install --force
COPY . .   

EXPOSE 3000

CMD ["npm" , "run" , "start"]