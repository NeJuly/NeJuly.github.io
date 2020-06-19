---
title: 解决Nginx [error] open() ＂/usr/local/Nginx/logs/Nginx.pid
date: 2020-03-31
author: NeJuly
tags: 
  - linux
location: 重庆  
---

重新启动服务器，访问web服务发现无法浏览啦!登陆服务器之后进到nginx使用
```bash
./nginx -s reload
```
重新读取配置文件，发现报nginx: 
```bash
[error] open() "/usr/local/nginx/logs/nginx.pid" failed (2: No such file or directory)错误，进到logs文件发现的确没有nginx.pid文件
[root@localhost sbin]# ./nginx -s reload
nginx: [error] open() "/usr/local/nginx/logs/nginx.pid" failed (2: No such file or directory)
```


解决方法： 
- 使用nginx -c的参数指定nginx.conf文件的位置
```bash
[root@localhost nginx]# /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
[root@localhost nginx]# cd logs/
[root@localhost logs]# ll
总用量 12
-rw-r--r-- 1 root root 1246 12月 9 18:10 access.log
-rw-r--r-- 1 root root 516 12月 10 15:39 error.log
-rw-r--r-- 1 root root 5 12月 10 15:38 nginx.pid
```
看nginx.pid文件已经有了。
- 直接找到nginx 项目根目录 一般情况是 `/usr/local/nginx/sbin/`目录
```bash
[root@localhost nginx]# /usr/local/nginx/sbin/nginx
```
直接运行，让NGINX自己查询也可以实现。
