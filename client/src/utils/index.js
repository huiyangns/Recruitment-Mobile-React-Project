
export function getRedirection(type, avatar) {
    let path
     if (type === 'dashen'){
        path = '/dashen'
     }else {
        path = '/laoban'
     }

     if (!avatar){
         path += 'info'
     }
     return path
}