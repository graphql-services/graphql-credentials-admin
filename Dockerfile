FROM nginx:alpine
COPY build /usr/share/nginx/html/

WORKDIR /usr/share/nginx/html/

RUN chmod +x run.sh

CMD [ "/bin/sh" ,"./run.sh" ]
