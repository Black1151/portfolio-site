FROM nginx:1.21

COPY ./start-nginx.sh /start-nginx.sh

RUN apt-get update && apt-get install -y netcat-openbsd

RUN chmod +x /start-nginx.sh

CMD ["/start-nginx.sh"]