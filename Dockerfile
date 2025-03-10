FROM harbor.sjzy.local/images/nginx:1.23

COPY dist/ /usr/share/nginx/html/
COPY version.log /