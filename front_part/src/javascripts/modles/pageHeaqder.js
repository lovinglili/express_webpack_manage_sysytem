
const pageHeaqder_data=(_data,preURL)=>{

    // console.log("pageHeader",_data,preURL);
    switch(_data){
        case '/position-list':{
            return {
                datas:{
                    mainHeader:"pages",
                    smallHeader:"small"
                },
                url:preURL,
                rightDatas:[
                    "首页",
                  ["职位列表",_data] 
                       
                    
                ],
                nowUrl:_data
            }
        }
        case '/home':{
            return {
                datas:{
                    mainHeader:"拉勾网",
                    smallHeader:"管理系统"
                },
                url:preURL,
                rightDatas:[
                    "首页"
                ],
                nowUrl:_data
            }
        }

        case '/position-update':{
            return {
                datas:{
                    mainHeader:"职位管理",
                    smallHeader:"职位更新"
                },
                url:preURL,
                rightDatas:[
                    "首页",
                    ["职位列表",preURL],
                   ["职位更新",_data]
                    
                ],
                nowUrl:_data
            }
        }

        case '/position-save':{
            var backData={
                datas:{
                    mainHeader:"职位管理",
                    smallHeader:"职位列表"
                },
                url:_data,
                rightDatas:[
                    "首页",
                    ["职位列表",preURL],
                    ["职位更新",_data]
                ],
                nowUrl:_data
            }
            }
            if(preUrl!='/home'){
                return backData;
            }else{
                backData.rightDatas[1][0]="";
                return backData;
            }
         
       
       
    }


}
export default { pageHeaqder_data }