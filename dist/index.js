'use strict';

//汉字的数字
var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
//基本单位
var cnIntRadice = ['', '拾', '佰', '仟'];
//对应整数部分扩展单位
var cnIntUnits = ['', '万', '亿', '兆'];
//对应小数部分单位
var cnDecUnits = ['角', '分', '毫', '厘'];
//整数金额时后面跟的字符
var cnInteger = '整';
//整型完以后的单位
var cnIntLast = '元';
//最大处理的数字
var maxNum = 999999999999999.9999;

function Number_to_Chinese(money) {

    //金额整数部分
    var integerNum = void 0;
    //金额小数部分
    var decimalNum = void 0;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts = void 0;
    if (isNaN(money)) {
        return 'Parameter Error!';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        //超出最大处理数字
        return '';
    }
    if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                //归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var _i = 0; _i < decLen; _i++) {
            var _n = decimalNum.substr(_i, 1);
            if (_n != '0') {
                chineseStr += cnNums[Number(_n)] + cnDecUnits[_i];
            }
        }
    }
    if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}

module.exports = Number_to_Chinese;