
import admin_template from '../view/admin-forms.html';
import admin_model from '../modles/admin';
import qs from 'querystring';
// import handleToastByData from '../util/handleToastByData';
import toast from '../util/toast';

const init=()=>{
    render('signin')
    bindEvent();
}
const bindEvent=()=>{
    $('#admin-content').on('click','.switch-btn',function(){
        let _type=$(this).data('type');
       render(_type);
    })

    //注册
    $('#admin-content').on('submit','#signup-form',async function(e){
        e.preventDefault();
        let _params=$(this).serialize();
        let _result= await admin_model.signup(qs.parse(_params));
        switch(_result.status){
            case 500: toast('失败，服务器出了问题'); break;
            case 201:  toast('用户已存在'); break;
            default: 
                toast('注册成功');
                render('signin')
                break;
        }
    })

    //登录
    $('#admin-content').on('submit','#signin-form',async function(e){
        e.preventDefault();
        let _params=$(this).serialize();
        let _result=await admin_model.signin(qs.parse(_params));
        switch ( _result.status ) {
            case 203: toast('密码错误'); break;
            case 202:  toast('用户不存在'); break;
            default: 
                // localStorage.user = qs.parse(_params).username
                window.location.href = "/"; 
            break;
        }
    })
}
const render=(type)=>{
    var _html=template.render(admin_template,{
        type:type
    })
    $('#admin-content').html(_html);
}

export default{
    init
}