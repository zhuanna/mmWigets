/**
 * Created by anna on 16/9/2.
 * 工具函数tool
 */
var tool = {
    //获取地址栏参数
    getParamFromURL:function(argName){
        if(!argName){
            alert('没有输入参数名。')
            return;
        }
        if(typeof argName !== 'string'){
            alert('参数不是字符串类型。')
            return;
        }
        var args = location.search.substr(1),
            result = args.match('(^|&)'+argName +'=([^&]*)(&|$)');
        return (result)?result[2]:'';
    },
    //是否是中国移动手机号
    isChinaMobile:function(num){
        var chinaMobileArr = ["134", "135", "136", "137", "138", "139", "158", "159", "157", "150", "151", "188", "182", "147", "152", "183", "187", "184", "178"],
            chinaMobileArrStr = chinaMobileArr.join(''),
            result = num.match(/0?(13|14|15|18)[0-9]{9}/);
        if(result){
            if(chinaMobileArrStr.indexOf(result.input.substr(0,3)) >= 0){
                return result.input;
            }else{
                console.log('输入的参数不是移动手机号');
            }
        }else{
            console.log('输入的参数不是手机号');
        }
    }
};

module.exports = tool;