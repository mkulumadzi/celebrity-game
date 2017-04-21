FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY public/ /var/www
COPY bower_components/ /var/www/bower_components

EXPOSE 80
