---
title: 删除重复记录，保留最新一条
date: 2020-04-17
categories:
  - mysql
tags: 
  - Mysql
location: 重庆  
---
## 删除重复记录，保留最新一条
```mysql
DELETE 
FROM
	np_platform_user 
WHERE
	id IN (
	SELECT
		id 
	FROM
		(
		SELECT
			id,
			`hash` 
		FROM
			np_platform_user 
		WHERE
			`hash` IN ( SELECT `hash` FROM np_platform_user GROUP BY `hash` HAVING count( HASH ) > 1 ) 
			AND id NOT IN ( SELECT max( id ) AS id FROM np_platform_user GROUP BY `hash` HAVING count( HASH ) > 1 ) 
		) AS tmp 
	);
```
```mysql
 SELECT * FROM np_platform_user GROUP BY `hash` HAVING count( HASH ) > 1
```
>从mysql数据库删除重复记录只保留其中一条

这两天做了一个调用第三方接口的小程序，因为是实时更新数据，所以请求接口的频率就很高，这样有时会出现往数据库插入重复的数据，对数据库造成压力也不方便管理，因为要通过原生sql语句，
解决数据库的去重问题.在过程中遇到了麻烦，最终解决了分享出来。
要删除重复的记录，就要先查出重复的记录，这个很容易做到
```mysql
select * from cqssc group by expect having count(expect) > 1
```

>注意：这是查出所有重复记录的第一条记录，需要保留，因此需要添加查询条件，查出这三条的重复记录
```mysql
select id,expect from cqssc where expect in (select expect from cqssc group by expect having count(expect)>1) 
and id not in(select min(id) from cqssc group by expect having count(expect)>1)
```

 以上得到的结果就是我们需要删除的记录！
下面是我最初做错的地方，既然要删除，可能都会想到这样很简单了

报错了！！！在Mysql中是不能删除查询出来的记录的，这里很容易错，当时在这里纠结了很久，而是要通过一张临时表来解决。
 ```mysql
  delete from cqssc where id in (
      select id from (
          select id from cqssc where expect in (select expect from cqssc group by expect having count(expect)>1)
                                 and id not in (select min(id) from cqssc group by expect having count(expect)>1)
          ) as tmpresult
      )
 ```
 再运行试试

删除成功，最后再查询一下看是否还有重复记录

