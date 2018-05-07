# wxValidator

> 一款集轻量、易用、扩展性强的JS表单验证组件

### Usage

##### 构造器

`wxValidator(src, rules, messages)`

###### arguments

1. src: `type->object`   待验证的数据

2. rules: ``type->object``  验证规则, 该对象的key与src的key保持一致，默认的验证规则有：

   `required` :  值不能为空

   `email`: 电子邮箱格式

   `phone`: 手机号码格式

   `date`:  日期格式， 如：YYYY-MM-DD

3. messages: ``type->object`   错误信息，命名的方式为     规则名 \+ '.' \+ 数据对象的 key

###### 创建wxValidator实例 ，栗子如下：

```javascript
var form = {
    userName: 'zhangdaiz',
    userEmail: '954752458@qq.com',
    telPhone: '88888888666'
}

var vaildator = new wxValidator(form, {
    userName: 'required',
    userEmail: 'required|email',
    telPhone: 'required|phone'
}, {
    'required.userName': '请输入用户名',
    'required.userEmail': '请输入邮箱地址',
    'required.telPhone': '请输入电话号码',
    'email.userEmail': '请输入正确的邮箱格式',
    'phone.telPhone': '请输入正确的电话格式'
})
```



### ApiReference

- validator.validate 验证

  `validator.validate()`  验证这个form表单的数据，整体验证通过，返回true, 否则返回false；
  
  注意之后的api均为在validate调用之后并返回false，才能使用

- validator.getErrorALL 获取错误信息

  `validator.getErrorALL()` 

- validator.getError 获取错误信息

  `validator.getError(key)` key: type -> string 通过src的key获取对应的错误信息

### 静态方法

- wxValidator.register

  `wxValidator.register(rule, handler)` 注册自定义验证规则
  
  rule: type -> string 规则名
  
  handler: type -> function 控制器 自带参数（val） 待验证的值， 返回类型为boolean

- wxValidator.singleValid

  `wxValidator.singleValid(val, rule, message)` 单一普通值快速验证
  
  val： type -> 基本数据类型
  
  rule： type -> string 验证规则
  
  message： type ->string 错误信息



### License

MIT

Brought to you by 857276958@qq.com   欢迎交流

