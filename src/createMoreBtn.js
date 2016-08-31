/**
 * Created by anna on 16/8/23.
 * 创建加载更多按钮,如果已存在则显示
 * class为加载更多按钮的样式名
 * parent为加载更多按钮的父容器
 */
var createMoreBtn = function(arg){

    arg.class =(arg.class)?arg.class:'addMoreBtn';

    //判断容器
    if(!arg.parent){
        alert('请添加parent参数,做为添加内容和加载更多按钮的父容器!');
        return;
    }

    var addMoreBtn = $('.'+arg.class),
        parentWrap = $(arg.parent);
    if(parentWrap.find(addMoreBtn).length >0){
        addMoreBtn.show();
    }else{
        var span = $('<span>加载更多</span>'),
            div = $('<div class="' + arg.class + '"></div>');
        div.append(span);
        parentWrap.append(div);
    }
};

module.exports = createMoreBtn;