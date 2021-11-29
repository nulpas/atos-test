FROM nginx:1.20.2-alpine

COPY dist/* /var/www/
COPY docker/entrypoint.sh /entrypoint.sh
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["sh", "/entrypoint.sh"]
