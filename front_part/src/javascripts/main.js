
import router from './router'
import '../stylesheets/index.scss';
const body_template=require('./view/body.html');
// const pageHeader=require('../javascripts/view/pageHeader.html')

$('#wrapper').html(body_template);
// $('#pageHeader').html(pageHeader);
router.init();
