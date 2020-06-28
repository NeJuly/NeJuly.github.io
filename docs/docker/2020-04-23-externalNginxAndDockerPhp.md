---
title: centOs下nginx配置docker容器php
date: 2020-04-23
categories:
 - docker
tags: 
  - docker
  - nginx
  - php
location: 重庆  
---

> 注意：<br>
> 我们以正常模式在centOs镜像中安装NGINX后，需要访问docker容器内部PHP项目配置

### docker搜索PHP-fpm
```bash
docker search php-fpm
```

### docker下载php-fpm容器镜像
```bash
docker pull php-fpm
```

### 查询docker中运行镜像文件
```bash
docker images | grep php-fpm
```
### 安装docker容器php-fpm
```bash
docker run -privileged=true
-p 9000:9000
--name php729-fpm 
-v /var/www:/var/www 
-v /user/local/php/conf:/usr/local/etc/php 
-v /usr/local/php/conf/conf.d:/usr/local/etc/php/conf.d 
-v /usr/local/php/logs:/phplogs 
--restart=always 
-itd 
 php729-fpm:latest 
```

### 查看php-fpm容器IP地址
```bash
docker inspect php729-fpm | grep IPAddress
```
![Image text](/assets/img/docker/2.png)<br>


### 配置centOs中NGINX配置
```
server {
    listen 80;
    server_name oa.api.test.cn;
    rewrite ^(.*)$ https://${server_name}$1 permanent;
}
server {
    listen 443;
    server_name oa.api.test.cn;
    ssl on;
    ssl_certificate   /home/ssl/3324583_oa.api.test.cn.pem;
    ssl_certificate_key  /home/ssl/3324583_oa.api.test.cn.key;
    #ssl_client_certificate /home/ssl/ca.crt;
    #ssl_verify_client on;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    root /var/www/dingding/public;
    index index.html index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~\.php$ {
        #fastcgi_pass   unix:/tmp/php-cgi.sock;
        fastcgi_pass 172.17.0.5:9000;
        #fastcgi_index  /var/www/wechat/public/index.php;
        fastcgi_index  index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param  REMOTE_ADDR        $remote_addr;
        fastcgi_param HTTP_X_FORWARDED_FOR $proxy_add_x_forwarded_for;
        include        fastcgi_params;
    }
    location ~ MP_verify_(.*)\.txt?$ {
        return 200 $1;
    }
}
```

![Image text](/assets/img/docker/3.png)<br>


> 注意：
> 因容器内部文件的访问权限和容器外的访问权限可能不一致`用户/用户组`不是同一个用户组,通过查看/etc/passwd查看。

1. 查询容器内/var/www内容器的所有者权限
![Image text](/assets/img/docker/4.png)<br>
2. 查看容器外，服务器中 /var/www容器内所有者权限
![Image text](/assets/img/docker/5.png)<br>
保证这两个权限一致。才能成功访问到PHP文件


docker 中安装PHP拓展<br>
![Image text](/assets/img/docker/6.png)<br>

```bash
 /usr/local/bin/docker-php-ext-enable gd mysqli
 docker-php-ext-enable  pdo pdo_mysql
```
### 可能点
![Image text](/assets/img/docker/7.png)<br>



