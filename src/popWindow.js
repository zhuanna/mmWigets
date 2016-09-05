/**
 * Created by anna on 16/9/5.
 * 提示框有多种情况
 * tip表示提示后3秒钟消失
 */
require('./popWindowTip.css');
//
var popWindow = {
    //str为提示语
    tip:function(str){
            var message = str || false;
            if(message){
                var windowEl=document.getElementById('popWindowTip');
                if(windowEl){
                    windowEl.innerHTML = str;
                    windowEl.style.display='block';
                }else{
                    windowEl=document.createElement('div');
                    windowEl.setAttribute('id','popWindowTip');
                    windowEl.innerHTML=str;
                    document.body.appendChild(windowEl);
                }
                setTimeout(function(){
                    hideWindow();
                },2000);
            }
        //隐藏弹窗 使用方法hideWindow();
        function hideWindow(){
            document.getElementById('popWindowTip').style.display = 'none';
        }
    }
};

module.exports = popWindow;