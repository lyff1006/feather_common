/*
 * @description: 
 * @author: 小羽
 * @github: https://github.com/lyff1006
 * @lastEditors: 小羽
 * @Date: 2020-03-28 23:38:34
 * @LastEditTime: 2020-05-04 23:08:30
 * @Copyright: 1.0.0
 */

/**
 * @description: 防抖 (只执行最后一次点击)
 * @Date: 2020-04-30 00:36:31
 * @author: 小羽
 * @param fn:要进行防抖处理的方法，t:防抖的延迟时间
 * @return: 
 */
export const Debounce = (fn, t) => {
    let delay = t || 500;
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    }
};

/**
 * @description: 节流(先执行一次，过了t/1000秒后，有操作再执行执行第二次))
 * @Date: 2020-04-30 00:40:09
 * @author: 小羽
 * @param fn:要进行节流处理的方法，t:节流的延迟时间
 * @return: 
 */
export const Throttle = (fn, t) => {
    let last;
    let timer;
    let interval = t || 500;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    }
};

/**
 * @description: 柯里化函数
 * @Date: 2020-04-30 00:41:45
 * @author: 小羽
 * @param {type} 
 * @return: 
 */
export function curryingFunc(func, args = []) {
    let len = func.length;
    return function (..._args) {
        _args.unshift(...args);
        if (_args.length < len) {
            return curryingFunc.call(null, func, _args);
        }
        return func(..._args);
    }
}

class Common {
    /**
     * @description: 判断数据类型
     * @Date: 2020-04-30 00:42:17
     * @author: 小羽
     * @param {type} 
     * @return: 数据类型（如boolean，number，string等）
     */
    getType(obj) {
        let map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[Object.prototype.toString.call(obj)];
    }

    /**
     * @description: 判断文件类型
     * @Date: 2020-04-30 00:43:38
     * @author: 小羽
     * @param {type} 
     * @return: 
     */
    regFile(data, type = "image") {
        let fileTypes = [
            ".jpg",
            ".png",
            ".gif",
            ".jpeg",
            ".rar",
            ".txt",
            ".zip",
            ".doc",
            ".ppt",
            ".xls",
            ".pdf",
            ".docx",
            ".xlsx"
        ];
        let Types = {
            image: [".jpg", ".png", ".gif", ".jpeg"]
        }
        let regData = data[1].toLowerCase();
        for (let i in Types[type]) {
            if (regData == Types[type][i]) {
                return true;
            }
        }
    }

    /**
     * @description: 深拷贝
     * @Date: 2020-04-30 00:44:01
     * @author: 小羽
     * @param {type} 
     * @return: 进行深拷贝后的data
     */
    deepClone(data){
        let type = this.getType(data);
        let obj;
        if(type === 'array'){
            obj = [];
        } else if(type === 'object'){
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if(type === 'array'){
            for(let i = 0, len = data.length; i < len; i++){
                obj.push(this.deepClone(data[i]));
            }
        } else if(type === 'object'){
            for(let key in data){
                obj[key] = this.deepClone(data[key]);
            }
        }
        return obj;
    }

    /**
     * @description: 获取url中的单个数据
     * @Date: 2020-04-30 00:44:54
     * @author: 小羽
     * @param {type} 
     * @return: 
     */
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return decodeURI(r[2]); return null;
    }

    /**
     * @description: 获取url中的所有数据
     * @Date: 2020-04-30 00:45:11
     * @author: 小羽
     * @param {type} 
     * @return: 
     */
    getUrlParams(){
        let url = window.location.search;  //url中?之后的部分
        url = url.substring(1);    //去掉?
        let dataObj = {};
        if(url.indexOf('&')>-1){
            url = url.split('&');
            for(let i=0; i<url.length; i++){
                let arr = url[i].split('=');
                dataObj[arr[0]] = arr[1];
            }
        }else{
            url = url.split('=');
            dataObj[url[0]]= url[1];
        }
        return dataObj;
    }

    /**
     * @description: 数组去重
     * @Date: 2020-04-30 00:45:19
     * @author: 小羽
     * @param {type} 
     * @return: 
     */
    uniqueArr(arr){
        return [...new Set(arr)]
    }

    /**
     * @description: 快速排序
     * @Date: 2020-04-30 00:45:28
     * @author: 小羽
     * @param {type} 
     * @return: 
     */
    quickSort(arr){
        if(arr.length<=1){return arr}
        let pivotIndex = Math.floor(arr.length/2)
        let pivot = arr.splice(pivotIndex,1)[0]
        let left = [], right = []
        for(let i of arr){
            if(i<pivot){
                left.push(i)
            }else{
                right.push(i)
            }
        }
        return [...quickSort(left),pivot,...quickSort(right)]
    }

    /**
     * @description: 数组合并
     * @Date: 2020-05-04 22:47:14
     * @author: 小羽
     * @param {type} 
     * arr1 合并的数组1
     * arr2 合并的数组2
     * @return: 
     */
    arrConcat(arr1,arr2){
        return [...arr1,...arr2]
    }

    /**
     * @description: 二分查找（非递归）
     * @Date: 2020-04-30 00:45:39
     * @author: 小羽
     * @param {type} 
     * @return: 
     */
    binarySearch(arr, key) {
        var low = 0,
            high = arr.length - 1;
    
        while (low <= high) {
            var mid = parseInt((high + low) / 2);
            if (key == arr[mid]) {
                return mid;
            } else if (key > arr[mid]) {
                low = mid + 1;
            } else if (key < arr[mid]) {
                high = mid - 1;
            } else {
                return -1;
            }
        }
    }


    /**
     * @description: 二分查找（递归）
     * @Date: 2020-04-30 00:45:57
     * @author: 小羽
     * @param {*} arr 已排好的数组
     * @param {*} low 第一个值的索引
     * @param {*} high 最后一个值的索引
     * @param {*} key 想要查找的值
     * @return: 
     */
    binary_search(arr,low,high,key){
        if (low > high) {
            return -1;
        }
        var mid = parseInt((high + low) / 2);
        if (arr[mid] == key) {
            return mid;
        } else if (arr[mid] > key) {
            high = mid - 1;
            return binary_search(arr, low, high, key);
        } else if (arr[mid] < key) {
            low = mid + 1;
            return binary_search(arr, low, high, key);
        }
      
    }

    /**
     * @description: 验证手机号码
     * @Date: 2020-04-30 00:46:31
     * @author: 小羽
     * @param {type} 
     * phone 手机号码
     * @return: 
     */
    verifyPhone(phone){
        let reg = /^[1][3,5,6,7,8]\d{9}$/;
        return reg.test(phone)
    }

    /**
     * @description: 验证邮箱
     * @Date: 2020-04-30 00:46:41
     * @author: 小羽
     * @param {type} 
     * email 邮箱账号
     * @return: 
     */
    verifyEmail(email){
        let reg = /^[a-zA-Z0-9]+@[a-zA-z]+\.[\w]{2,3}$/
        return reg.test(email)
    }

    /**
     * @description: 千分位格式化
     * @Date: 2020-05-04 22:41:44
     * @author: 小羽
     * @param {type} 
     * num 格式化的数字
     * decimal 是否保留小数，默认保留
     * @return: 
     */    
    formatNum(num,decimal=false){
        if(!num) return num
        if(decimal){
            return num.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.|$))/g,'$&,');
        }else{
            return num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.|$))/g,'$&,');
        }
    }

    /**
     * @description: json对象数组，根据key值去重
     * @Date: 2020-05-04 22:55:38
     * @author: 小羽
     * @param {type} 
     * arr json对象数组
     * key json对象的健值，根据该健值进行去重
     * @return: 
     */
    uniqueJsonArr(arr,key){
        let newObj = []
        for(let item of arr){
            let tag = true
            for(let item1 of newObj){
                if(item[key]==item1[key]){
                    tag = false
                }
            } 
            if(tag){
                newObj.push(item)
            }
        }
        return newObj
    }

    /**
     * @description: json对象数组，根据key值排序
     * @Date: 2020-05-04 23:06:18
     * @author: 小羽
     * @param {type} 
     * arr json对象数组
     * key json对象的健值，根据该值进行去重
     * type 排序方式，默认为asc，即升序
     * @return: 
     */
    sortJsonArr(arr,key,type="asc"){
        let newArr = this.deepClone(arr)
        if(type ==="desc"){
            for(let item of newArr){
                for(let item1 of newArr){
                    if(item[key]<item1[key]){
                        let newObj = this.deepClone(item[key])
                        item[key] = this.deepClone(item1[key])
                        item1[key] = newObj
                    }
                }
            }
        }else{
            for(let item of newArr){
                for(let item1 of newArr){
                    if(item[key]>item1[key]){
                        let newObj = this.deepClone(item[key])
                        item[key] = this.deepClone(item1[key])
                        item1[key] = newObj
                    }
                }
            }
        }
        return newArr
        
    }

}
const common = new Common();
export { common }

