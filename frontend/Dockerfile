FROM node:18.12.1 as builder

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable

COPY --from=builder /frontend/dist /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# EXPOSE 443

CMD [ "nginx", "-g", "daemon off;" ]