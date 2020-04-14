'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.curryingFunc = curryingFunc;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// 防抖 (只执行最后一次点击)
var Debounce = exports.Debounce = function Debounce(fn, t) {
    var delay = t || 500;
    var timer = void 0;
    return function () {
        var _this = this;

        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(_this, args);
        }, delay);
    };
};

//节流(先执行一次，过了t/1000秒后，有操作再执行执行第二次))
var Throttle = exports.Throttle = function Throttle(fn, t) {
    var last = void 0;
    var timer = void 0;
    var interval = t || 500;
    return function () {
        var _this2 = this;

        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(_this2, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    };
};

//柯里化函数
function curryingFunc(func) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var len = func.length;
    return function () {
        for (var _len = arguments.length, _args = Array(_len), _key = 0; _key < _len; _key++) {
            _args[_key] = arguments[_key];
        }

        _args.unshift.apply(_args, _toConsumableArray(args));
        if (_args.length < len) {
            return curryingFunc.call(null, func, _args);
        }
        return func.apply(undefined, _args);
    };
}

var Common = function () {
    function Common() {
        _classCallCheck(this, Common);
    }

    _createClass(Common, [{
        key: 'getType',

        //判断数据类型
        value: function getType(obj) {
            var map = {
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

    }, {
        key: 'regFile',
        value: function regFile(data) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image";

            var fileTypes = [".jpg", ".png", ".gif", ".jpeg", ".rar", ".txt", ".zip", ".doc", ".ppt", ".xls", ".pdf", ".docx", ".xlsx"];
            var Types = {
                image: [".jpg", ".png", ".gif", ".jpeg"]
            };
            var regData = data[1].toLowerCase();
            for (var i in Types[type]) {
                if (regData == Types[type][i]) {
                    return true;
                }
            }
        }

        //深拷贝

    }, {
        key: 'deepClone',
        value: function deepClone(data) {
            var type = this.getType(data);
            var obj = void 0;
            if (type === 'array') {
                obj = [];
            } else if (type === 'object') {
                obj = {};
            } else {
                //不再具有下一层次
                return data;
            }
            if (type === 'array') {
                for (var i = 0, len = data.length; i < len; i++) {
                    obj.push(this.deepClone(data[i]));
                }
            } else if (type === 'object') {
                for (var key in data) {
                    obj[key] = this.deepClone(data[key]);
                }
            }
            return obj;
        }

        //获取url中的单个数据

    }, {
        key: 'getUrlParam',
        value: function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);return null;
        }

        //获取url中的所有数据

    }, {
        key: 'getUrlParams',
        value: function getUrlParams() {
            var url = window.location.search; //url中?之后的部分
            url = url.substring(1); //去掉?
            var dataObj = {};
            if (url.indexOf('&') > -1) {
                url = url.split('&');
                for (var i = 0; i < url.length; i++) {
                    var arr = url[i].split('=');
                    dataObj[arr[0]] = arr[1];
                }
            } else {
                url = url.split('=');
                dataObj[url[0]] = url[1];
            }
            return dataObj;
        }

        //数组去重

    }, {
        key: 'uniqueArr',
        value: function uniqueArr(arr) {
            return [].concat(_toConsumableArray(new Set(arr)));
        }

        //快速排序

    }, {
        key: 'quickSort',
        value: function (_quickSort) {
            function quickSort(_x2) {
                return _quickSort.apply(this, arguments);
            }

            quickSort.toString = function () {
                return _quickSort.toString();
            };

            return quickSort;
        }(function (arr) {
            if (arr.length <= 1) {
                return arr;
            }
            var pivotIndex = Math.floor(arr.length / 2);
            var pivot = arr.splice(pivotIndex, 1)[0];
            var left = [],
                right = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    if (i < pivot) {
                        left.push(i);
                    } else {
                        right.push(i);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return [].concat(_toConsumableArray(quickSort(left)), [pivot], _toConsumableArray(quickSort(right)));
        })

        //二分查找（非递归）

    }, {
        key: 'binarySearch',
        value: function binarySearch(arr, key) {
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

    }, {
        key: 'binary_search',
        value: function (_binary_search) {
            function binary_search(_x3, _x4, _x5, _x6) {
                return _binary_search.apply(this, arguments);
            }

            binary_search.toString = function () {
                return _binary_search.toString();
            };

            return binary_search;
        }(function (arr, low, high, key) {
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
        })
    }]);

    return Common;
}();

var common = new Common();
exports.common = common;