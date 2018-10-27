const list =(query)=>{
    return $.ajax({
        url:'/api/v1/position/list',
        data:query,
        success:(results)=>{
            return results;
        }
    })
}

const save=(data)=>{
    // return $.ajax({
    //     url:'/api/v1/position/save',
    //     type:'POST',
    //     data,
    //     success:(results)=>{
    //         return results;//后端返回的数据，可用来判断是否存储成功
    //     }
    // })
    return new Promise((resolve)=>{
        $('.position-save #save-form').ajaxSubmit({
            url:'/api/v1/position/save',
            type:"POST",
            success:(result)=>{
                // console.log(result,"img")
                resolve(result)
            }
        })
    })
}


const remove=(id)=>{
    return $.ajax({
        url:'/api/v1/position/remove',
        type:'POST',
        data:id,
        success:(results)=>{
            return results;//后端返回的数据，可用来判断是否存储成功
        }
    })
}
const getOne=(id)=>{
    return $.ajax({
        url:'/api/v1/position/getone',
        type:'POST',
        data:id,
        success:(results)=>{
            return results;//后端返回的数据，可用来判断是否存储成功
        }
    })
}

const update=(iparams)=>{
    // return $.ajax({
    //     url:'/api/v1/position/update',
    //     type:'POST',
    //     // data:iparams,
    //     success:(results)=>{
    //         return results;//后端返回的数据，可用来判断是否存储成功
    //     }
    // })
    return new Promise((resolve)=>{
        $('.position-update #update-form').ajaxSubmit({
            url:'/api/v1/position/update',
            type:"POST",
            success:(result)=>{
                //  console.log(result,"img")
                resolve(result)
            }
        })
    })
}


export default {
    save,
    remove,
    getOne,
    update,
    list
}