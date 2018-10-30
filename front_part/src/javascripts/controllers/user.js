import user_model from '../modles/user'

//判断该用户是否是登陆状态，不在登录状态的话就直接跳转到登录界面，根据session判断（session是在登录成功的时候设置的)
const _one = () => { };

const userInfo = async (success = _one, fail = _one) => {
    let _token = localStorage.getItem('token') || '';
    var isSignIn = await user_model.isSignIn({ token: _token });
    
    var siginstate = isSignIn.status == 200;
    if (siginstate) {
        success()
        return true;
    } else {
        fail();

        return false;
    }

}


//登录进入主页后要获取该用户的一些内容，渲染到个人中心
const userDetail = async () => {
    let _token = localStorage.getItem('token') || '';
    let _result = await user_model.UserDetail({ token: _token });
    
    if (_result.status === 304) { // 用户没有登录信息
        alert('请重新登录')
        window.location.href = '/admin.html'
    } else {
        $('.nickname').html(_result.data.nickname)
    }


//退出函数的处理

    $('.exit-btn').click(async function () {

        //清空localstorage里面的token
        localStorage.removeItem('token');
        window.location.href = '/admin.html'
      
    })
}




//权限的处理

export default {
    userInfo,
    userDetail
}