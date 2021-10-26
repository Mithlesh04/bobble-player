
/**
 * 
 * @param {*} key 
 * @param {*} value string | object
 */
function SessionStorage(key){
    return {
        set(value){
            if(value && 'object'===typeof value){
                value = JSON.stringify(value)
            }
            return sessionStorage.setItem(key,value)
        },
        get(property){
            let value = sessionStorage.getItem(key)
            try{
                if(value){
                    value = JSON.parse(value)
                }
            }catch(e){}
            if(property && value){
                return value[property]
            }
            return value
        },
        remove(){
            return sessionStorage.removeItem(key)
        }
    }
}

export default SessionStorage