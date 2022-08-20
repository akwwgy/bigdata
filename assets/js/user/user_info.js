$(function () {
    var form = layui.form;
    var layer = layui.layer;
    console.log(666);
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度只能在1-6之间';
            }
        }
    })
    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
                console.log(res.data);
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        //首先要说明一点，重置这个按钮会将这一切都重置
        // 而我们有不需要重置的信息，所以我们阻止他的默认行文
        e.preventDefault();
        initUserInfo();

    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                initUserInfo();

                //调用父页面中的方法 这是子页面(中间隔了一个iframe)
                window.parent.getUserInfo();
                //windos就相当于iframe parent就是外面的index
            }
        })

    })

})
