const WxValidator = require('../src/wxValidator')




describe('This is a testing for Wxvalidator when occured error', () => {
    var form = {
        userName: '', // 错
        userEmail: '857276958@', // 错
        telPhone: '1326506618' // 错
    }

    var validator = new WxValidator(form, {
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

    it('validator.validate should be false', () => {
        expect(validator.validate()).toBe(false)
    })

    it('validator.allErrors existed property', () => {
        expect(Object.keys(validator.allErrors).length).toBe(3)
    })

    it('validator.getError', () => {
        expect(validator.getError('userEmail')).toEqual(['请输入正确的邮箱格式'])
    })

    it('WxValidator.register and WxValidator.singleValid', () => {
        WxValidator.register('test', (val) => {
            return val === 'test'
        })

        var resultInfo = WxValidator.singleValid('tes', 'test', '请输入test字符串')

        expect(resultInfo.result).toBe(false)
        expect(resultInfo.msg).toBe('请输入test字符串')
    })
})


describe('This is a testing for WxValidator when never error be occured', () => {
    var form = {
        userName: 'Alex', // pass
        userEmail: '857276958@qq.com', // pass
        telPhone: '13265062145' // pass
    }

    var validator = new WxValidator(form, {
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

    it('validator.validate() should be return true', () => {
        expect(validator.validate()).toBe(true)
    })

    it('validator.allErrors should without any property', () => {
        expect(Object.keys(validator.allErrors).length).toBe(0)
    })
})