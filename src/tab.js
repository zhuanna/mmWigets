/**
 * Created by anna on 16/8/19.
 * 传入菜单和内容的id,及子级的class实现内容切换
 * 默认为#tabMenu .tabMenuSubs #tabContent .tabContentSubs
 * 菜单激活的样式和active
 * 内容为显示和隐藏的关系
 */
require('./tab.css');

var tabWiget = function(arg){
    var setting = {
        menuID : arg.menuID || 'tabMenu',
        menuSubs : arg.menuSubs || 'tabMenuSubs',
        contentID : arg.contentID || 'tabContent',
        contentSubs : arg.contentSubs || 'tabContentSubs',
        callback : arg.callback || null
    };
    var menuSubs = $('#'+setting.menuID).find('.' + setting.menuSubs),
        contentSubs = $('#'+setting.contentID).find('.' + setting.contentSubs);
    //event
    menuSubs.each(function(index){
        $(this).attr('data-index',index);
        $(this).bind('click',function(){
            var thisIndex = $(this).attr('data-index') || 0;
            menuSubs.removeClass('active');
            $(this).addClass('active');
            contentSubs.hide();
            contentSubs.eq(thisIndex).show();
            if(typeof setting.callback === 'function'){
                setting.callback(this,contentSubs.eq(thisIndex));
            }
        });
    });
};

module.exports = tabWiget;