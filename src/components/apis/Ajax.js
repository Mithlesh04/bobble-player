import $ from 'jquery'

/**
 * @param {*} config URL || Object
 * @returns ajax
 */


async function Fetch(config){
    try{
        const headers = {
            'Access-Control-Allow-Origin' : '*'
        }

        if(config!=='generatetoken'){
            const token = await GetToken()
            headers['Authorization'] = 'Bearer '+token 
        }

        if('string'===typeof config){
            config = {async:true,type:'GET',headers : headers ,url:'http://13.232.184.252:5000/api/v1/'+config}
        }else{
            var { url , ...rest } = config
            url = 'http://13.232.184.252:5000/api/v1/'+url
            config = {async:true,type:'GET',headers : headers,...rest,url:url}
        }

        console.log("url_config = ",config)

        const response = await $.ajax(config)   
        return response
    }catch(e){
        console.error(' Error =  ',e)
        return e
    }
}

async function GetToken(){
    let key = 'token'
    if(!window.localStorage.hasOwnProperty(key)){
        const token = await Fetch('generatetoken')
        window.localStorage.setItem(key,token.token)
        return token.token
    }else{
        let token = window.localStorage.getItem(key)
        if(token==='undefined'){
            const token = await Fetch('generatetoken')
            window.localStorage.setItem(key,token.token)
            return token.token
        }else if(token){
            return token
        }
    }
}
export { Fetch , GetToken}