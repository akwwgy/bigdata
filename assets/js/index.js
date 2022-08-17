$(function () {
    getUserInfo();
    $('#btnLogout').on('click', function () {
        var layer = layui.layer;
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = './login.html';

            layer.close(index);
        });

    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户失败');
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
        //无论成功与否，都会调用这个complate
        // complete: function (res) {
        //     console.log(res);
        //     //在complete中使用resJson拿到服务器相应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         location.href = './login.html';
        //         localStorage.removeItem('token');
        //     }
        // }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需血染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user_pic).show();
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        console.log(first);
        $('.text-avatar').html(first).show();
    }

}