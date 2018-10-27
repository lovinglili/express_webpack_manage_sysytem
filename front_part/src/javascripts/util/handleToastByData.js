
import toast from './toast'
const handleToastByData=(data,options={})=>{
    let one=()=>{};
    let {isRect,success,fail}={
        isRect:((typeof options.isRect)!=="undefined")? options.isRect:true,
        success:options.success||one,
        fail:options.fail||one
    }

    if(data.status==200){
        if(isRect) toast("操作成功");
        if (success) success(data.data);
    }
    else{
        if(isRect) toast("操作失败");
        if (fail) fail(data.data);
    }
}


export default  handleToastByData