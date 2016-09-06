/**
 * Created by anna on 16/8/22.
 * 公共的ajax函数
 * 参数
 * url:请求地址
 * type:请求方式 get,post
 * data:请求参数--对象格式传入
 * success:成功回调参数
 * error:失败回调参数
 */
var ajax = function(arg){

    if(!arg.url){
        alert('没有url参数');
        return;
    }

    if(arg.data && typeof arg.data != 'object'){
        alert('请输入key-value格式的参数');
        return;
    }

    arg.data = (arg.data)?arg.data:{};

    arg.data.ran = new Date().getTime();

    $.ajax({
        url : arg.url,
        type : arg.type || 'get',
        data : arg.data || {},
        dataType: arg.dataType || 'json',
        timeout : arg.timeout || 3000,
        success : function(data){
            if(typeof arg.success === 'function'){
                arg.success(data, arg.btn);
            }
        },
        error : function(xhr){
            if(typeof arg.error === 'function'){
                arg.error(arg.btn,xhr);
            }else{
                console.log(xhr);
            }
        }
    });
};

module.exports = ajax;