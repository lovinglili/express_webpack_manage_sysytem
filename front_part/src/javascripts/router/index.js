import SMERouter from 'sme-router'
import home_template from '../view/home.html'
import no_found_remplate from '../view/404.html'
import position_controller from '../controllers/position'
import bus from '../util/bus'
import pageHeader_controller  from '../controllers/pageHeader'
var router =null;
const _init=()=>{
    router = new SMERouter('router-view');
    
    router.use((req,res,next)=>{
        _activeLink(req.route)
    });

    
    router.route('/',pageHeader_controller.changeHeaderData);
    
    router.route('/home',(req,res,next)=>{
        res.render(home_template);
    });
    router.route('/position-save',position_controller.save);
    router.route('/position-list',position_controller.list);
    router.route('/position-update', position_controller.update)
    router.route('/not-found',(req,res,next)=>{
        res.render(no_found_remplate);
       
    });
    router.route("*",(req,res,next)=>{
        if(req.url===''){
            res.redirect('/home');

        }else {
            res.redirect('/not-found')
        }
    });

    bus.on('go',(path, body = {}) =>  router.go(path, body) );
    bus.on('back',()=>{
        router.back()
    });

    _navLink();
}

const _navLink=(selector)=>{
    let $navs=$(selector || '.sidebar-menu li.nav-link[to]');
    $navs.on('click',function(){
        let _path=$(this).attr('to');
        router.go(_path);
    })
}


const _activeLink=(route)=>{
    let $navs=$('.sidebar-menu li[to]')
    $navs.removeClass('active');
    $navs.filter(`[to='${route}']`).addClass('active');
}

export default {
    init:_init,
    navLink: _navLink

}