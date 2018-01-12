export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length))
    }
    var o = {
        'M+':date.getMonth()+1,
        'd+':date.getDay(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    }
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
           let str = o[k]+'';
           fmt = fmt.replace(RegExp.$1,(str.length===1?leftAddZero(str):str)) 
        }
    }
    return fmt;
}

function leftAddZero(str){
    return ('00'+str).substr(str.length);
}