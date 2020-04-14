

// 防抖 (只执行最后一次点击)
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

//节流(先执行一次，过了t/1000秒后，有操作再执行执行第二次))
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

//柯里化函数
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
    //判断数据类型
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

    //判断文件类型
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

    //深拷贝
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

    //获取url中的单个数据
    getUrlParam(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return decodeURI(r[2]); return null;
    }

    //获取url中的所有数据
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

    //数组去重
    uniqueArr(arr){
        return [...new Set(arr)]
    }

    //快速排序
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

    //二分查找（非递归）
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
     * 二分查找（递归）
     * @param {*} arr 已排好的数组
     * @param {*} low 第一个值的索引
     * @param {*} high 最后一个值的索引
     * @param {*} key 想要查找的值
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

    //验证手机号码
    verifyPhone(phone){
        let reg = /^[1][3,5,6,7,8]\d{9}$/;
        return reg.test(phone)
    }

    //验证邮箱
    verifyEmail(email){
        let reg = /^[a-zA-Z0-9]+@[a-zA-z]+\.[\w]{2,3}$/
        return reg.test(email)
    }

}
const common = new Common();
export { common }

