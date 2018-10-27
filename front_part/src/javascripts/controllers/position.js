import { bus, handleToastByData } from '../util'
import position_list_template from '../view/position-list.html'

import position_save_template from '../view/position-save.html'

import position_update_template from '../view/position-update.html'

import position_model from '../modles/data_list'
import qs from 'querystring'
//获取列表

var datafromBack="";
var position_preUrl="";
const list = async (req, res, next) => {
    position_preUrl=req.url;//用于返回列表
    if( req.query==null){
        req.query= {};
        
        let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
            pageNo: req.query.pageNo,
            pageSize: req.query.pageSize,
            search:req.query.search
        }
         datafromBack=(await position_model.list(_page)).data;
        
        let sizes=datafromBack.pageInfo.pageSize;
        let searches=datafromBack.pageInfo.search;
         bus.emit('go', '/position-list?pageNo=1&pageSize='+sizes+'&search='+searches);
    }else{
     
        var _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
            pageNo: req.query.pageNo,
            pageSize: req.query.pageSize,
            search:req.query.search
         
        }
         datafromBack=(await position_model.list(_page)).data
    }
  
    let html = template.render(position_list_template, {
        data: datafromBack
    });
    res.render(html);
    bindListEvent(datafromBack);
 
    $('.searchBykeyWords').val(req.query.search);
    removeOne(datafromBack);
}

const bindListEvent = (datafromBack) => {
    $('.position-list #addbtn').on('click', function () {
        bus.emit('go', '/position-save')
    })
    $('.pos-update').click(function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go', '/position-update', { id });
    });
    $('#possearch').on('click',()=>{
        var serachWords=$('.searchBykeyWords').val();
        
        bus.emit('go','/position-list?pageNo=1&pageSize='+datafromBack.pageInfo.pageSize+'&search='+serachWords)
    })

}
//删除
const removeOne = (datafromBack) => {
  

    $('.pos-remove').click(async function () {
        
        let id = $(this).parents('tr').data('id');
        let _result = await position_model.remove({ _id: id });

        // let trs = $('.position-list__tabel tr[data-id]')
        // // 如果只剩一个，将pageNo-1
        // let _pageNo = trs.length > 1 ? _page.pageNo : (_page.pageNo - (_page.pageNo > 1 ? 1 : 0))
        // if(_pageNo==0){
        //     _pageNo=1;
        // }
        if(datafromBack.items.length==1){
            var _pageNo=datafromBack.pageInfo.pageNo-=1;
            if(_pageNo==0){
                _pageNo=1;
            }
            
        }else{
            var _pageNo=datafromBack.pageInfo.pageNo;
        }
        handleToastByData(_result, {
            isRect: false,
            success: (_result) => {
                bus.emit('go', '/position-list?pageNo='+_pageNo+'&pageSize='+ datafromBack.pageInfo.pageSize+'&search='+datafromBack.pageInfo.search+'&_='+_result._id);
            }
        })
     
    })
}
//修改
const update = async (req, res) => {
    var { id } = req.body;
    let data = await position_model.getOne({ _id: id });
    let html = template.render(position_update_template, {
        data: data.data[0],
    });
    res.render(html);
    $('.position-update #back').on('click', function () {
       
        bus.emit('go', position_preUrl)
    })

    let _isloading = false;
    $('.position-update #companyLogo').on('change', function () {
        // console.log($(this).length)

        var reads = new FileReader();
        var f = this.files[0];
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            document.getElementById('update_img').src = this.result;
        };

    })
    $('.position-update #update-form').submit(async function (e) {
        e.preventDefault();
        if (_isloading) return false;
        _isloading = true;
        let result = await position_model.update();
        // console.log(result,"as");
        if(result.data.republish){
            // console.log("in")
            position_preUrl='/position-list';
        }
        _isloading = false;
        handleToastByData(result);
    })
}
//增加
const save = async (req, res, next) => {
    res.render(position_save_template);
    bindSaveEvent();
}
const bindSaveEvent = () => {
    $('.position-save #back').on('click', function () {
        bus.emit('go', '/position-list')
    })
    $('#companyLogo').on('change', function () {
        // console.log($(this).length)

        var reads = new FileReader();
        var f = this.files[0];
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            document.getElementById('preview').src = this.result;
        };

    })
    let _isloading = false;
    $('.position-save #save-form').submit(async function (e) {
        e.preventDefault();
        if (_isloading) return false;
        _isloading = true;
        // let _inputDatas=qs.parse($(this).serialize());
        let result = await position_model.save();
        _isloading = false;
        // console.log(result, "save");
        handleToastByData(result);

    })
}

export default {
    save,
    update,
    list
}