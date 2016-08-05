# Node爬虫+邮箱发送

这个用来爬牛客网上的招聘信息，然后发给自己的邮箱

## Features

- 利用superagent来抓取网页
- 利用cheerio来分析网页
- 利用nodemailer来发送邮件(内置QQ邮箱配置)
- 尝试利用eventproxy来管理异步


## Configs
1. 新建auth.json，然后输入邮箱密码，已经加入.gitignore，这样不会再git里面记录账号
```
{
  "user": "",
  "pass":""
}
```
2. 新建send_list.json，输入要发件方和接收方，接收方如果不止一个可以用逗号隔开
```
{
"from":"@qq.com",
"to":"@126.com"
}
```
3. 在命令函输入 `node index.js`可以完成爬取数据到发送邮件的过程。

4. 如果输入`node index.js fetch`可以只爬取数据
5. 如果输入`node index.js mail`可以把爬取的数据进行邮件发送（要成功执行第四步）


## Reference
[爬虫](http://www.tuicool.com/articles/MvUjMfB)
