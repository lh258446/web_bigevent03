$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为!~6个字符'
            }
        }
    })

    //2.表单验证
    initUserInfo()
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    //3.表单重置
    $('#btnReset').on('click', function (e) {
        //阻止默认
        e.preventDefault()
        //重新渲染
        initUserInfo()

    })


    //4.修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败')
                }
                layer.msg('用户信息修改成功')
                window.parent.getUserInfo()
            }
        })
    })
})