---
title: tp5视图小总结
date: 2018-12-05
author: NeJuly
tags: 
  - php
  - thinkphp5
location: 重庆  
---

- 控制器部分
```php
<?php
namespace app\admin\controller;
class Index extends Base
{
    public function index()
    {
       $this->view->data = [
           [
               'name' => '555',
               'age' => '666',
           ]
       ];
       $viewdata = [
           'first' => 1,
           'two' => 2,
           'three' => 3,
           'four' => [
                   [
                       'name' => '111',
                       'age' => '222',
                   ]
               ],
           ];
       return view('index',$viewdata);
    }
}
```


- 视图部分<br/>
![Image text](/assets/img/php/1.png)<br/>
- 页面输出<br/>
![Image text](/assets/img/php/2.png)<br/>
![Image text](/assets/img/php/3.png)<br/>



