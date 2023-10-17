FROM node:16-buster

WORKDIR /app

RUN mkdir -p .

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
