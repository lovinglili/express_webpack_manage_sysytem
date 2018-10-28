import pageHeaqder_models  from '../modles/pageHeaqder' ;
import pageHeader_template from '../view/pageHeader.html';
var URL =require('url')

const changeHeaderData=(req,res,next)=>{
    // console.log(URL.parse(req.url).path,"reqq")//讲router传入到数据层，然后获取不同页面对应的不同的头部信息，然后渲染
    let urlPathname=URL.parse(req.url).pathname;
    window.preUrl=window.preUrl||"";//用来保存上一条路径
    
    let dataIntemplate=pageHeaqder_models.pageHeaqder_data(urlPathname,window.preUrl);

    // console.log(dataIntemplate,"dataIntemplate");

    let _html=template.render(pageHeader_template,{
        data: dataIntemplate
    });
    window.preUrl=URL.parse(req.url).path,
    $('#pageHeader').html(_html);
}

export default { changeHeaderData };