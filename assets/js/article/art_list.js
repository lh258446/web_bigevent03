$(function () {
    //定义时间过滤器
    template.defaults.imports.dateFormat = function (dtstr) {
        var dt = new Date(dtstr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    };
    //在各位数左侧补0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    };
    //1.
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    //2.初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }

    //3.初始化分类
    var form = layui.form
    var layer = layui.layer
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //4.筛选
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        q.state = state
        q.cate_id = cate_id
        initTable()
    })
    //5.分页
    var laypage = layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,

            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    //6.删除
    var layer = layui.layer
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }

                    layer.msg('删除文章分类成功')
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum --
                    initTable()
                }
            })
           layer.close(index)
        })
    })
   
})