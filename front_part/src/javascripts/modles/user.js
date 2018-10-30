
const isSignIn=( data )=>{
    return $.ajax({
        url:'/api/users/v1/isSign',
        type:"POST",
        data,
        success:(result)=>{
           return result;
        }
    });

}

const UserDetail=(data)=>{
    return $.ajax({
        url:'/api/users/v1/Detail',
        type:"POST",
        data,
        success:(result)=>{
           return result;
        }
    });
}



export default {
    isSignIn,
    UserDetail

}