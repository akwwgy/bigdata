//注意每次发起ajax请求都会先调用这个函数
//这个函数中能拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    //在发起真正的ajax之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);

    //统一为有权限的接口 设置headers请求头
    if (options.url.indexOf('/my') != -1) {  //使用indexOf方法判断是否有my这个字符串
        options.headers = {
            //header就是请求头配置对象
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    //无论成功与否，都会调用这个complate
    options.complete = function (res) {
        //在complete中使用resJson拿到服务器相应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            location.href = './login.html';
            localStorage.removeItem('token');
        }
    }
})