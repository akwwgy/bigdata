$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {  //这个value就是使用这个验证规则的表单值
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致';
            }
        }

    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败');
                }
                layer.msg('更新成功');
                //重置表单的一个简单方法（jQuery元素转dom元素，调用dom元素的reset方法）
                $('.layui-form')[0].reset();
            }
        })
    })
})