FROM node:latest as build

WORKDIR '/app'

COPY package.json ./
COPY .env.docker .env
RUN npm install --slient --legacy-peer-deps
COPY . .
CMD ["npm", "start"]
# RUN npm run build

# Prepare nginx
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/build /var/www/html
COPY --from=build /app/conf/nginx.conf /etc/nginx/conf.d/default.conf
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# # # Fire up nginx
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]