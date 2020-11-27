
    var baserURL = 'http://ajax.frontend.itheima.net'
    $.ajaxPrefilter(function (params) {
        params.url = baserURL + params.url

        //拦截
        if (params.url.indexOf('/my/') !== -1) {
            params.headers = {
                Authorization:localStorage.getItem('token') || ''
            }
        }
        //拦截所有响应
        params.complete = function (res) {
            var obj = res.responseJSON
            if (obj.status == 1 && obj.message == '身份认证失败！') {
                //清空本地存储
                localStorage.removeItem('token')
                //跳转页面
                location.href='/login.html'
            }
        }
    })
    
