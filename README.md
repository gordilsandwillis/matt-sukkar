# Wordpress Boilerplate

### Run Local

TODO : configure nginx server

```
cp nginx.local.conf.example /usr/local/etc/nginx/servers/wordpress.conf
```

```
sudo nginx
php-cgi -b 9000
mysql.server start
```


http://localhost:8090/