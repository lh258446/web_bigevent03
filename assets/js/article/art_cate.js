$(function () {
    //1.文章类别列表显示
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                    // console.log(res);
                    var str = template('tpl-art-cate', res)
                    $('tbody').html(str)
                
            }
        })
    }

    //2.显示添加文章分类列表
    var layer = layui.layer
    $('#btnAdd').on('click', function () {
      indexAdd=  layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content:$('#dialog-add').html()
        })
    })

    //3.提交文章分类添加(事件委托)
    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加文章类别成功')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

    //4.修改-展示表单
    var indexEdit = null
    var form=layui.form
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit=layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content:$('#dialog-edit').html()
        })
        //4.2 获取id,渲染页面
        var Id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                form.val('form-edit',res.data)
            }
        })
    })
    //4.修改提交
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你文章类别更新成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    //5.删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.close(index)
                    layer.msg('恭喜你,文章分类删除成功')
                }
            })
        })
    })
})