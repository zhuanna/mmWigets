/**
 * Created by anna on 16/9/3.
 *参数说明：
 *time:需要进行倒计时的时间总数,数字类型
 *btn:倒计时其间状态不可点击的按钮,input type="button"的juqery对象
 *btnFontColor:'#f00',默认按钮的颜色
 *btnGreyFont:'#666',倒计时开始后的按钮颜色
 *btnBgColor:'#000',默认按钮的背景色
 *btnGreyBgColor:'#ccc',倒计时开始后的按钮背景色
 *btnTxt:arguments[0].btnTxt,默认按钮上的文字
 *changeTxt:显示倒计时秒数的文本,dom对象,如果倒计时按钮本身发生变化用不到这个参数
 *
 */

var countdown = function () {
    var timer;
    var d = {
        time:60,
        btnGreyFont:'#666',
        btnGreyBgColor:'#ccc',
        changeTxt:null,
        changeTxtContent:''
    };
    //要倒计时变化的数字
    var changeTime =arguments[0].time || d.time ;
    //必须大于两个参数
    if(!arguments[0].btn) return;
    //添加新参数
    for(var ele in arguments[0]){
        d[ele] = arguments[0][ele];
    }
    //添加默认的按钮文字到d
    d.btnTxt= d.btn.val();
    d.btnFontColor = d.btn.css('color');
    d.btnBgColor = d.btn.css('background');
    //循环执行的函数
    (function(time){
        var arg = arguments;
        if (changeTime <= 0) {
            d.btn.removeAttr("disabled");
            d.btn.css({'color': d.btnFontColor,'background':d.btnBgColor});
            d.btn.val(d.btnTxt);
            if(d.changeTxt){
                d.changeTxt.html(d.changeTxtContent);
            }
            changeTime = time;
            clearTimeout(timer);
        } else {
            d.btn.attr("disabled", true);
            d.btn.css({'color': d.btnGreyFont,'background': d.btnGreyBgColor});
            if(d.changeTxt){
                d.changeTxt.html('重新发送('+ changeTime + ')');
            }else{
                d.btn.val('重新发送('+ changeTime + ')');
            }
            changeTime--;
            timer = setTimeout(function () {
                arg.callee(changeTime);
            }, 1000);
        }
    }(d.time));
};
module.exports = countdown;