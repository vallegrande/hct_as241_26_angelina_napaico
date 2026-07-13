
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production
RUN ls -la /app/dist

FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/angular-hackathon/browser /usr/share/nginx/html

COPY ./default.conf.template /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]