---
title: CountDownLatch同步工具类
date: 2020-06-11
categories:
 - java
tags: 
  - java
location: 重庆  
---
>CountDownLatch介绍
>
>CountDownLatch是一个同步工具类，它允许一个或多个线程一直等待，直到其他线程执行完后再执行。

CountDownLatch是在java1.5被引入的，跟它一起被引入的并发工具类还有CyclicBarrier、Semaphore、ConcurrentHashMap和BlockingQueue，
它们都存在于java.util.concurrent包下

>CountDownLatch原理:
>
>CountDownLatch是通过一个计数器来实现的，计数器的初始化值为线程的数量。每当一个线程完成了自己的任务后，计数器的值就相应得减1。当计数器到达0时，
>表示所有的线程都已完成任务，然后在闭锁上等待的线程就可以恢复执行任务。

注：这是一个一次性操作 - 计数无法重置。 如果你需要一个重置的版本计数，考虑使用CyclicBarrier。

## CountDownLatch 内部结构

1. Sync 是一个静态内部类 继承 AbstractQueuedSynchronizer
```php
/**
 * CountDownLatch的同步控制器
 * 使用AQS状态表示计数。
 */
private static final class Sync extends AbstractQueuedSynchronizer {
    private static final long serialVersionUID = 4982264981922014374L;

    //构造方法 CountDownLatch 的构造方法最终调用的是 Sync的构造。
    Sync(int count) {
        setState(count); //初始化count
    }
    //返回当前count 计数
    int getCount() {
        return getState();
    }
    // 试图在共享模式下获取对象状态
    protected int tryAcquireShared(int acquires) {
        return (getState() == 0) ? 1 : -1;
    }
    // 试图设置状态来反映共享模式下的一个释放
    protected boolean tryReleaseShared(int releases) {
        // Decrement count; signal when transition to zero
        for (;;) {
            int c = getState();
            if (c == 0)
                return false;
            int nextc = c-1;
            if (compareAndSetState(c, nextc))
                return nextc == 0;
        }
    }
}
```

>注：从源码可知，其底层是由AQS提供支持。AQS 见下章分解。

2. await()
此函数将会使当前线程在锁存器倒计数至零之前一直等待，除非线程被中断。其源码如下　
```php
    public void await() throws InterruptedException {
        sync.acquireSharedInterruptibly(1);
    }
   //-----------------------------------------------------------
    public final void acquireSharedInterruptibly(int arg)
            throws InterruptedException {
        if (Thread.interrupted())
            throw new InterruptedException();
        //这里可以看到 最终调用的是Sync中的 tryAcquireShared 方法 
        // return (count == 0) ? 1 : -1;
        if (tryAcquireShared(arg) < 0)
            doAcquireSharedInterruptibly(arg);
    }
//-------------------------------------------------------
    public boolean await(long timeout, TimeUnit unit)
        throws InterruptedException {
        return sync.tryAcquireSharedNanos(1, unit.toNanos(timeout));
    }
```　
3.countDown() 
此函数将递减锁存器的计数，如果计数到达零，则释放所有等待的线程　　
```php
  /**   
     * count值减 1，直到计数达到零，释放所有等待的线程 。
     *      
     *  <p>如果当前计数大于零，则递减。
     *   如果新计数为零，则重新启用所有等待的线程 ，达到线程调度的目的。
     *      
     * <p>如果当前计数等于零，则没有任何反应。
     */
    public void countDown() {
        sync.releaseShared(1);
    }
//-------------------------------------------------------------------------
   /**
     * 此函数会以共享模式释放对象，
     * 并且在函数中会调用到CountDownLatch的tryReleaseShared函数，
     * 当且仅当新计数返回0时，会调用AQS的doReleaseShared函数，　
     */
    public final boolean releaseShared(int arg) {
        if (tryReleaseShared(arg)) {
            doReleaseShared();
            return true;
        }
        return false;
    }
```

## CountDownLatch 使用示例
### 示例1
```php
package com.kids.web.countdownlatch;
import java.util.concurrent.CountDownLatch;
public class Worker implements Runnable {
    private int num;
    private final CountDownLatch startSignal;
    private final CountDownLatch doneSignal;
    Worker(CountDownLatch startSignal, CountDownLatch doneSignal, int num) {
        this.startSignal = startSignal;
        this.doneSignal = doneSignal;
        this.num = num;
    }
    @Override
    public void run() {
        try {
            Thread.sleep(2000);
            System.out.println("do startSignal.await() before");
            startSignal.await();
            System.out.println("do startSignal.await() after");
 
            doWork();
            doneSignal.countDown();
            System.out.println("===count =" + doneSignal.getCount() + "========== num =" + num);
 
        } catch (InterruptedException ex) {
        } // return;
    }
    void doWork() {
        System.out.println("do work..." + num);
    }
}
```
```php
package com.kids.web.countdownlatch;
import java.util.concurrent.CountDownLatch;
public class Driver {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch startSignal = new CountDownLatch(1);
        int N = 10;
        CountDownLatch doneSignal = new CountDownLatch(N);
        for (int i = 0; i < N; ++i) // create and start threads
            new Thread(new Worker(startSignal, doneSignal,i)).start();
        doSomethingElse1();            // don't let run yet
        Thread.sleep(1000 * 5);
        startSignal.countDown();      // let all threads proceed
        doSomethingElse2();
        Thread.sleep(1000 * 5);
        doneSignal.await();           // wait for all to finish
    }
    private static void doSomethingElse1() {
        System.out.println("====================startSignal.countDown() before");
    }
    private static void doSomethingElse2() {
        System.out.println("====================startSignal.countDown() after");
    }
}
```
 结果
====================startSignal.countDown() before<br/>
do startSignal.await() before ----count=1 ---- num =0<br/>
do startSignal.await() before ----count=1 ---- num =2<br/>
do startSignal.await() before ----count=1 ---- num =4<br/>
do startSignal.await() before ----count=1 ---- num =1<br/>
do startSignal.await() before ----count=1 ---- num =3<br/>
====================startSignal.countDown() after<br/>
do startSignal.await() after  ----count=0 ---- num =3<br/>
do startSignal.await() after  ----count=0 ---- num =1<br/>
do startSignal.await() after  ----count=0 ---- num =4<br/>
do startSignal.await() after  ----count=0 ---- num =2<br/>
do work...2<br/>
doneSignal.countDown()===count =4========== num =2<br/>
do startSignal.await() after  ----count=0 ---- num =0<br/>
do work...0<br/>
do work...4<br/>
doneSignal.countDown()===count =2========== num =4<br/>
do work...1<br/>
doneSignal.countDown()===count =1========== num =1<br/>
do work...3<br/>
doneSignal.countDown()===count =0========== num =3<br/>
doneSignal.countDown()===count =3========== num =0<br/>

等待其他线程执行完毕<br/>

Process finished with exit code 0<br/>
>说明：
>通过示例结果中可以看出，在startSignal调用countDown（）之前程序在startSignal.await() 处堵塞，
>此时startSignal的count为1。在startSignal调用countDown（）之后，count =0 时 开始执行startSignal.await()之后的业务逻辑。
>doneSignal调用countDown（） 直到其count=0 回到主线程。等待doneSignal调用await（）结束。

>注意：doneSignal最终不调用await() 的话 该线程始终处于等待状态。
>（本人也不知具体原因，在await 方法中 如果计数为0的话并没有处理任何事情。而且通过sleep 看到只有doneSignal的计数为0后才会返回主线程执行。）
这里有明白的大神，恳请留言指导一下。

- 示例2
```php
package com.kids.web.countdownlatch;
 
import java.util.concurrent.CountDownLatch;
 
public class Worker2 implements Runnable {
 
    private final CountDownLatch doneSignal;
    private final int i;
 
    public Worker2(CountDownLatch doneSignal, int i) {
        this.doneSignal = doneSignal;
        this.i = i;
    }
    public void run() {
        doWork(i);
        doneSignal.countDown();
        System.out.println("=============count =" + doneSignal.getCount() + "------- i =" + i);
    }
    void doWork(int i) {
        System.out.println("do work..." + i);
    }
}

```
```php
package com.kids.web.countdownlatch;
 
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
 
public class Driver2 {
    public static void main(String[] args) throws InterruptedException {
        int N = 20;
        CountDownLatch doneSignal = new CountDownLatch(N);
        Executor e = Executors.newFixedThreadPool(1);
 
        for (int i = 0; i < N; ++i) // create and start threads
            e.execute(new Worker2(doneSignal, i));
        doneSignal.await();           // wait for all to finish
    }
}
```
 结果
do work...0<br/>
=============count =19------- i =0<br/>
do work...1<br/>
=============count =18------- i =1<br/>
do work...2<br/>
=============count =17------- i =2<br/>
do work...3<br/>
=============count =16------- i =3<br/>
。。。。。。<br/>
。。。。。。<br/>
do work...18<br/>
=============count =1------- i =18<br/>
do work...19<br/>
=============count =0------- i =19<br/>
说明：这里 Executor e = Executors.newFixedThreadPool(1); 只是为了可以从打印结果中更直观的看出 count的递减。<br/>

[原文链接](https://blog.csdn.net/qq_26368063/article/details/82386581 "原文链接") 

## 项目实战
```php
import java.util.concurrent.CountDownLatch;
/**
 * 添加直播任务，每200毫秒执行一次
 */
@Scheduled(fixedDelay = 200L)
public void handle() {
    Calendar c = Calendar.getInstance();
    c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.get(Calendar.DAY_OF_MONTH),
            0, 0, 0);
    Date startTime = c.getTime();
    Date endTime = new Date();
    List<LiveMissionRecord> records = liveMissionRecordMapper.selectPeriodData(startTime, endTime);
    if (records == null || records.size() == 0) {
        return;
    }
    //删除选中数据
    Set<Long> ids = records.stream().map(LiveMissionRecord::getId).collect(Collectors.toSet());
    if (ids.size() > 0) {
        liveMissionRecordMapper.deleteByIds(ids);
    }
    int size = records.size();
    CountDownLatch downLatch = new CountDownLatch((int) Math.ceil((double) size / 10));
    for (int i = 0; i < size; i += 10) {
        int index = i + 10;
        if (index > size) {
            index = size;
        }
        List<LiveMissionRecord> sendList = records.subList(i, index);
        //发送记录
        asyncLiveMissionService.sendCarClickAndComment(sendList, downLatch);
    }
    try {
        //调用await()方法的线程会被挂起，它会等待直到count值为0才继续执行
        downLatch.await();
    } catch (InterruptedException e) {
        log.error(e);
    }
}
```
```php
import java.util.concurrent.CountDownLatch;
/**
 * 发送商品点击和评论记录
 *
 * @param sendList 待发送记录记录
 */
@Async("live")
public void sendCarClickAndComment(List<LiveMissionRecord> sendList, CountDownLatch downLatch) {
    try {
        for (LiveMissionRecord record : sendList) {
            UserRequestData userRequestData = record.getUserRequestData();
            JSONObject jsonObject = new JSONObject();
            switch (record.getType()) {
                case 0:
                    if ("0".equals(record.getPromotionId()) || StringUtils.isEmpty(record.getPromotionId())) {
                        return;
                    }
                    String url = String.format(Constants.CAR_CLICK_URL, record.getRoomId(), record.getAuthorId(), record.getPromotionId());
                    // 发起请求
                    jsonObject = douyinAsyncService.request(userRequestData,
                            url,
                            null, HttpMethod.GET);
                    break;
                case 1:
                    String content = record.getContent();
                    if (StringUtils.isEmpty(content)) {
                        return;
                    }
                    try {
                        content = URLEncoder.encode(content, "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        log.error(e);
                    }
                    // 发起请求
                    String data = "enter_source=&content=" + content + "&room_id=" + record.getRoomId();
                    jsonObject = douyinAsyncService.request(userRequestData,
                            Constants.COMMENT_URL,
                            data, HttpMethod.POST);
                    break;
                default:
                    break;
            }
            if (jsonObject.getInteger("status_code") != 0) {
                log.info(jsonObject);
            }
        }
    } finally {
        downLatch.countDown();
    }
}
```



