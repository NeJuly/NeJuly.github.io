---
title: docker 容器访问外部Redis
date: 2020-04-11
categories:
 - docker
tags: 
  - docker
  - redis
location: 重庆  
---

网上有很多教程讲解如果在`centos`安装`docker-redis`，以下我将不重复造轮子。<br/>

> 注意：
> 这里主要记录`docker`内部`Redis`容器如何通过外部访问。

步骤：<br/>
1. 一般我们`docker`容器在服务器中都有一个默认的`docker0`网络：<br>
![Image text](/assets/img/docker/8.png)<br>

2. 因为Redis 禁止了外部访问，且只能通过localhost 和 127.0.0.1 访问，所以已docker容器访问，使用172.17.0.1局域网访问会 connection refuse<br/>

![Image text](/assets/img/docker/9.png)<br>

> 注意：
> docker容器中，每个容器 类似于虚拟机，独立于计算机中，每个容器之间访问，通过局域网访问（172.17.0.0/24）。