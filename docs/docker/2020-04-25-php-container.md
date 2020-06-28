---
title: 外部NGINX配置PHP容器权限
date: 2020-04-25
categories:
 - docker
tags: 
  - docker
location: 重庆  
---

### 搜索php-fpm
```$xslt
docker search php-fpm
```
```$xslt
docker pull php-fpm
```


#### Dockerfile
```$xslt
FROM docker.io/bitnami/php-fpm:latest
```

#### 制作bash命令
restar.sh
```bash
#!/bin/bash
basepath=$(cd `dirname $0`; pwd)

useradd -g www-data www-data
uid=$(cat /etc/passwd | grep 'www-data' | awk -F ':' '{print $3'})
gid=$(cat /etc/passwd | grep 'www-data' | awk -F ':' '{print $4'})
echo "当前添加用户ID：${uid}"
echo "当前添加用户组ID：${gid}"


docker stop php-fpm
docker rm php-fpm
cd $basepath && \
docker build -t php-fpm . && \
docker run --privileged --user ${uid}:${gid}  -p 9000:9000 --name php-fpm -v /var/www:/var/www -v /user/local/php/conf:/usr/local/etc/php -v /usr/local/php/conf/conf.d:/usr/local/etc/php/conf.d -v /usr/local/php/logs:/phplogs --restart=always -itd php-fpm
```


