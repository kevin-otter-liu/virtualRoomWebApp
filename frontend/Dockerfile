FROM node:18.12.1 as builder

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=builder /frontend/dist /usr/share/nginx/html

COPY conf/virtual-house.bigottercodes.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001

# EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]