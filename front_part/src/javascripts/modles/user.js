
const isSignIn=()=>{
    return $.ajax({
        url:'/api/users/v1/isSign',
        type:"POST",
        success:(result)=>{
            console.log(result);
        }
    });

}

const UserDetail=()=>{
    return $.ajax({
        url:'/api/users/v1/Detail',
        type:"POST",
        success:(result)=>{
            console.log(result);
        }
    });
}


const exit =()=>{
    return $.ajax({
        url:'/api/users/v1/exit',
        type:"POST",
        success:(result)=>{
            console.log(result);
        }
    });
}

export default {
    isSignIn,
    UserDetail,
    exit
}