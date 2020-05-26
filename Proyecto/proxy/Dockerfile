FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=30s --start-period=1s --retries=3 \
  CMD curl -f http://0.0.0.0:80 || exit 1