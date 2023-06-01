nginx proxy settings:

server {
  listen        4000;
    server_name localhost;
    location / {
        proxy_pass         http://127.0.0.1:5000;
    }
}

server {
   listen 8000;
     server_name localhost;
     location / {
        proxy_pass         http://127.0.0.1:8888;
    }
}

pm2 start ./farmplanner

pm2 serve build 8000 --spa