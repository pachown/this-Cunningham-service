FROM node:14

RUN mkdir -p /

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start"]