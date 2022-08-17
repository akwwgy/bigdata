//注意每次发起ajax请求都会先调用这个函数
//这个函数中能拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    //在发起真正的ajax之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
})