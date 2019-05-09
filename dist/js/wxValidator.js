(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.WxValidator = factory();
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function () {

    /**
     * helper
     * 格式化对象，如：key值由'required|phone'变成 ['required', 'phone']
     * @param {Object} rules 
     * @return {Object}
     */
    var str2Array = function (rules) {
        for (var key in rules) {
            rules[key] = rules[key].split('|')
        }
        return rules
    }

    /**
     * constructor
     * @param {Object} src 待验证的数据对象
     * @param {Object} rules 与src键名一致的规则对象
     * @param {Object} messages 错误信息对象，命名的方式为 规则名 + '.' + 数据对象的 key
     */
    var WxValidator = function (src, rules, messages) {
        this.rules = str2Array(rules)
        this.src = src
        this.messages = messages
        this.collectedErrors = Object.create(null)
    }

    WxValidator.prototype.ruleMethods = {
        'required': function (val) {
            return !(/^\s*$/).test(val)
        },
        'phone': function (val) {
            return /^1[34578]\d{9}$/.test(val)
        },
        'date': function (val) {
            return /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(val)
        },
        'email': function (val) {
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
        }
    }

    WxValidator.prototype.getValue = function (key) {
        return this.src[key]
    }

    /**
     * 验证
     * @return {Boolean}
     */
    WxValidator.prototype.validate = function () {
        var allTrue = true;
        var ruleList;
        var value;
        var ruleName;
        var flag;
        var fn;
        var i;

        for (var key in this.src) {
            ruleList = this.rules[key];
            value = this.getValue(key);
            i = 0;

            if (value == null) return;

            if (typeof ruleList !== 'undefined') {
                while (ruleName = ruleList[i++]) {
                    fn = this.getCheckFunc(ruleName)

                    if (!fn) {
                        removeRuleAndWarn(ruleList, i)
                        continue;
                    }

                    flag = fn(value)

                    if (flag === false) {
                        allTrue = false
                        collectError(this, key, ruleName)
                    }
                }
            }
        }

        return allTrue
    }


    function removeRuleAndWarn(ruleList, index) {
        var currRule = ruleList[index]
        ruleList.splice(index, 1)
        console.warn(
            'Rule name: \"' +
            currRule +
            '\", please don\'t add the rule of unregistered for data that it be verify'
        )
    }

    function collectError(vm, key, ruleName) {
        var errKey = ruleName + '.' + key;
        var errorMsg = vm.messages[errKey];
        (vm.collectedErrors[key] || (vm.collectedErrors[key] = [])).push(errorMsg || '默认错误');
    }

    WxValidator.prototype.getCheckFunc = function (rule) {
        return this.ruleMethods[rule]
    }

    WxValidator.prototype.getError = function (key) {
        return this.collectedErrors[key] || null
    }

    WxValidator.register = function (ruleName, handler) {
        if (typeof handler !== 'function') throw new Error('The handler must be a function');
        this.prototype.ruleMethods[ruleName] = handler;
    }

    /**
     * 对单一普通值快速验证
     * @param {String, Number} val 所要验证的普通值
     * @param {String} rule 验证规则
     * @param {String} message 对应的错误信息
     * @return {Object} 结果
     */
    WxValidator.singleValid = function (val, rule, message) {
        try {
            var result = this.prototype.getCheckFunc(rule)(val)
        } catch (e) {
            throw new Error('WxValidator.singleValid can not call the rule of undefined')
        }

        return {
            result: result,
            msg: (result === false && message) || '正确'
        }
    }


    return WxValidator

})