---
title: 在VPS服务器中搭建ss（单用户与多用户）
date: 2019-12-14
categories:
  - vultr
tags: 
  - vultr
location: 重庆  
---

我使用的环境是CentOS6。这里面所用到的中，CentOS7防火墙的命令和CentOS6不一样，其他的都一样。
## 安装shadowsocks

```bash
yum update

wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh

chmod +x shadowsocks.sh

./shadowsocks.sh 2>&1 | tee shadowsocks.log
```


然后根据提示，配置密码、端口、加密方法，参考图：<br>
![Image text](/assets/img/vultr/1.png)

## 配置配置文件
查看配置文件：
```bash
cat /etc/shadowsocks.json
```
- 单用户
默认的配置信息就是单用户的。
```json
 {
    "server":"0.0.0.0",
    "server_port":443,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"aabbcc",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open":false
}
```

- 多用户
```json
{
    "server":"0.0.0.0",
    "local_address":"127.0.0.1",
    "local_port":1080,
    "port_password":{
         "443":"pwd000",
         "9001":"pwd123",
         "9002":"pwd234",
         "9003":"pwd345",
         "9004":"pwd456"                    
    },
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}
```

## 修改完配置文件之后
```bash
/etc/init.d/shadowsocks restart
```
或者<br/>
```bash
service shadowsocks restart
```
```bash
启动：/etc/init.d/shadowsocks start
停止：/etc/init.d/shadowsocks stop
重启：/etc/init.d/shadowsocks restart
状态：/etc/init.d/shadowsocks status
```
如果配置多用户配置文件之后，有的端口访问不了谷歌。
打开cmd 查看下该的端口能不能连通
```bash
telnet ip 端口
```


如果连接失败，打开防火墙配置文件看下是否开放了端口。
```bash
cat /etc/sysconfig/iptables
```

如果没有，就将配置防火墙开放端口。
编辑iptables配置文件
```bash
vi /etc/sysconfig/iptables
```

添加规则 -A INPUT -p tcp -m tcp --dport 端口号 -j ACCEPT
在配置文件中加入以下代码。
1. 开放9001端口
-A INPUT -p tcp -m tcp --dport 9001 -j ACCEPT  

2. 开放9001-9009之间的所有端口
-A INPUT -p tcp -m tcp --dport 9001:9009 -j ACCEPT  

注意，要添加的规则要加在 REJECT 那行代码的上面的任意位置，不能加在它的下面行，否则不会生效 ：
![Image text](/assets/img/vultr/2.png)

重启防火墙
```bash
service iptables restart
```
或者<br/>
```bash
/etc/init.d/iptables restart
```

ok，访问连接成功。<br>
[原文链接](https://blog.csdn.net/la6nf/article/details/79560297?utm_source=copy)