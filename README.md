# **wxValidator**

> 一款集轻量、易用、扩展性强的JS表单验证组件

## Usage

#### 构造器

`wxValidator(src, rules, messages)`

##### arguments

1. src:  ` Object`   待验证的数据

2. rules: ``object``  验证规则, 该对象的key与src的key保持一致，默认的验证规则有：

   `required` :  值不能为空

   `email`: 电子邮箱格式

   `phone`: 手机号码格式

   `date`:  日期格式， 如：YYYY-MM-DD

3. messages: `object`   错误信息，命名的方式为     规则名 \+ '.' \+ 数据对象的 key

##### 创建wxValidator实例 ，栗子如下：

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



## ApiReference

### 实例方法

- validator.validate 验证

  `validator.validate()`  验证这个form表单的数据，整体验证通过，返回true, 否则返回false；

  注意之后的实例其他api均为在validate调用之后并返回false，才能正常使用

- validator.allErrors  全部错误信息对象 

  默认为空对象{}，调用 validator.validate返回false后，数据才会更新

  数据结构如下：

  ```javascript
  allErrors = {
      phone: ['请输入手机号码', '手机号码格式不正确'],
      name: ['请输入名字']
  }
  ```

- validator.getError 获取错误信息

  `validator.getError(key)` key: `String`  通过src的key获取对应的错误信息

### 静态方法

- wxValidator.register

  `wxValidator.register(rule, handler)` 注册自定义验证规则

  rule: `String` 规则名

  handler: `Function` 控制器 参数 `val` 待验证的值， 返回类型为`Boolean`

- wxValidator.singleValid

  `wxValidator.singleValid(val, rule, message)` 单一普通值快速验证 ，`return boolean`

  val： `Mixed` 待验证数据

  rule： `String` 验证规则

  message： `String` 错误信息


## 在MVVM框架中的用法（vue, wepy, mpvue...)

简单例子：

### View层

```html
<div class="form-group">
    <input type="text" class="form-control" v-model="name" placeholder="名字" />
    <span style="color:red;" v-if="validation && validation.allErrors && validation.allErrors['name']">
        {{validation.allErrors['name'][0]}}
    </span>
</div>
<button @click="check">验证</button>
```



### Model层

```javascript
{
  data () {
    return {
      name: '',
      validation: null
    }
  }, 
  methods: {
      createValidator() {
          this.validation = new wxValidator(
              {
                  name: this.name
              },
              {
                  name: 'required'
              },
              {
                  'required.name': '请输入名字'
              }
          );
      }，
      check() {
          this.createValidator();
          //当调用validation.validate返回false时，会更新allErrors对象数据，稍后框架会异步更新 
          //vnodes，错误信息就会呈现在您的屏幕
          if (!this.validation.validate()) {
              
          }
          //接下来自由发挥 
      }
  }
}
```



## License

Brought to you by 857276958@qq.com   欢迎交流

