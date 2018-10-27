
import router from './router'
import '../stylesheets/index.scss';
const body_template=require('./view/body.html');
$('#wrapper').html(body_template);
router.init();
