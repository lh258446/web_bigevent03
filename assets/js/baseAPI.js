
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
            console.log();
            var obj = res.responseJSON
            if (obj.status == 1 && obj.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href='/login.html'
            }
        }
    })
    
