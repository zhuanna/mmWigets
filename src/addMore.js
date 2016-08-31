/**
 * Created by anna on 16/8/22.
 * 点击加载更多,添加内容
 *
 * 参数
 * 默认按钮样式.addMoreBtn
 * url:请求地址
 * method:请求方式 get,post
 * data:请求参数--对象格式传入
 * callback回调参数
 * class为加载更多按钮的样式名
 * parent为加载更多按钮的父容器
 *
 */
var ajax = __webpack_require__(10);
var index = 1;//初始页数
var addMore = function(arg){

    if(!arg.url) return;

    if(arg.data && typeof arg.data != 'object'){
        alert('请输入key-value格式的参数');
        return;
    }

    arg.data = (arg.data)?arg.data:{};

    //加载更多按钮的样式
    arg.class =(arg.class)?arg.class:'addMoreBtn';

    //判断容器
    if(!arg.parent){
        alert('请添加parent参数,做为添加内容的容器!');
        return;
    }

    var parentWrap = $(arg.parent);


    arg.data.page = index;

    parentWrap.off().on('click', '.'+arg.class, function(){
        var _this = this;
        ajax({
            url : arg.url,
            method : arg.method || 'get',
            data : arg.data || {},
            callback : arg.callback || null,
            btn : _this
        });
    });

    index++;
};

module.exports = addMore;
