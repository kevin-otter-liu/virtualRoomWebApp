FROM node:18.12.1

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

RUN npm run build

CMD ["node","dist/server.js"]