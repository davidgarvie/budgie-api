FROM node:18

ENV NODE_ENV=development

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
