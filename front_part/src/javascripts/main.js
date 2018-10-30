
import router from './router'
import '../stylesheets/index.scss';
import user_controller from '../javascripts/controllers/user';
const body_template=require('./view/body.html');
// const pageHeader=require('../javascripts/view/pageHeader.html')

$('#wrapper').html(body_template);
// $('#pageHeader').html(pageHeader);
user_controller.userInfo(()=>{
    
    router.init();//是登录状态
    //渲染用户信息；
    user_controller.userDetail();
},()=>{
    //不是登录状态
    window.location.href="/admin.html";
})
//主页面显示之前要先判断登陆状态


