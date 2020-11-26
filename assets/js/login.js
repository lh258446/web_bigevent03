$(function () {
    // 点击注册账号,隐藏登录,显示注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录,显示登录,隐藏注册
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //3.自定义验证规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6-12位,且不能输入空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    })
    //4.注册功能
    var layer=layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        console.log($('.reg-box [name=username]').val());
        console.log($('.reg-box [name=password]').val());
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username:$('.reg-box [name=username]').val(),
                password:$('.reg-box [name=password]').val()
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你,注册成功')
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    //5.登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        // console.log(1);
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                //校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提交信息,保存token
                layer.msg('恭喜您,登录成功')
                //保存token
                localStorage.setItem('token', res.token)
                //跳转
                location.href='/index.html'
            }
        })
    })
})
