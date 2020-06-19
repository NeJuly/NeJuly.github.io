---
title: 查询当天、本周、本月、本季度、本年的数据
date: 2019-10-24
author: NeJuly
tags: 
  - Mysql
location: 重庆  
---
- 今天
```mysql
SELECT * FROM 表名 WHERE TO_DAYS(时间字段名) = TO_DAYS(NOW());
```
- 昨天
```mysql
SELECT * FROM 表名 WHERE TO_DAYS(NOW()) - TO_DAYS(时间字段名) = 1;
```
- 本周
```mysql
SELECT * FROM 表名 WHERE YEARWEEK(DATE_FORMAT(时间字段名,'%Y-%m-%d')) = YEARWEEK(NOW());
```
- 上周
```mysql
SELECT * FROM 表名 WHERE YEARWEEK(DATE_FORMAT(时间字段名,'%Y-%m-%d')) = YEARWEEK(NOW())-1;
```
- 近7天
```mysql
SELECT * FROM 表名 WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(时间字段名);
```
- 近30天
```mysql
SELECT * FROM 表名 WHERE DATE_SUB(CURDATE(), INTERVAL 30 DAY) <= DATE(时间字段名);
```
- 本月
```mysql
SELECT * FROM 表名 WHERE DATE_FORMAT(时间字段名,'%Y%m') = DATE_FORMAT(CURDATE(),'%Y%m');
```
- 上月
```mysql
SELECT * FROM 表名 WHERE PERIOD_DIFF(DATE_FORMAT(NOW(),'%Y%m'),DATE_FORMAT(时间字段名,'%Y%m')) = 1;

SELECT * FROM 表名 WHERE DATE_FORMAT(时间字段名,'%Y%m') = DATE_FORMAT(CURDATE(),'%Y%m') ; 

SELECT * FROM 表名 WHERE WEEKOFYEAR(FROM_UNIXTIME(时间字段名,'%y-%m-%d')) = WEEKOFYEAR(NOW()); 

SELECT * FROM 表名 WHERE MONTH(FROM_UNIXTIME(时间字段名,'%y-%m-%d')) = MONTH(NOW()); 

SELECT * FROM 表名 WHERE YEAR(FROM_UNIXTIME(时间字段名,'%y-%m-%d')) = YEAR(NOW()) AND MONTH(FROM_UNIXTIME(时间字段名,'%y-%m-%d')) = MONTH(NOW())；

```
- 近6个月
```mysql
SELECT * FROM 表名 WHERE 时间字段名 BETWEEN DATE_SUB(NOW(),INTERVAL 6 MONTH) AND NOW();
```
- 本季度
```mysql
SELECT * FROM 表名 WHERE QUARTER(时间字段名) = QUARTER(NOW());
```
- 上季度
```mysql
SELECT * FROM 表名 WHERE QUARTER(时间字段名) = QUARTER(DATE_SUB(NOW(),INTERVAL 1 QUARTER));
```
- 本年
```mysql
SELECT * FROM 表名 WHERE YEAR(时间字段名)=YEAR(NOW());
```
- 去年
```mysql
SELECT * FROM 表名 WHERE YEAR(时间字段名) = YEAR(DATE_SUB(NOW(),INTERVAL 1 YEAR));
```

[网络来源](https://blog.csdn.net/qq_22067469/article/details/90321979 "这个是网络测试")

>注意：
>
> 合理利用时间函数是有效的解决方案，但有时候会适得其反，因在`时间字段`上加时间函数 会导致数据库表索引失效。
> 以上查询语句适用于业务量较小场景。
