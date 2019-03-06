(function(win){
// 只能new调用
function Vue(opts){
    this._init(opts);
}

Vue.prototype._init = function(opts){
    let vm = this;
    vm.opts = opts;
    initRender(vm);
}

function initRender(vm){
    compileHtml(vm.opts.el);
    defineReactive$$1(vm.opts);
}

function isObject(obj){
    return typeof obj === 'object' ? true : false;
}

function defineReactive$$1(obj){
    // 判断是一个对象
    for(let key in obj){
        let val = obj[key];
        if(isObject(val)){
            defineReactive$$1(val)
        }else{
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                set: function(newVal){
                    // 设置的时候拦截
                },
                get: function(){
                    return obj[key];
                }
            });
        }
    }
}

function query(el){
    let $el;
    if(typeof el == 'string'){
        $el = document.querySelector(el);
    }else{
        $el = el;
    }
    return $el;
}

// 解析HTML
function compileHtml(el){
    let $el = query(el);
    if($el.nodeType == 1){
        let attrs = [...$el.attributes];
        attrs.forEach((attr)=>{
            let {name, value} = attr;
            if(name.indexOf('v-')===0){
                console.log(name, value)
            }
            
        });
        let children = $el.childNodes;
        for(let l of children){
            compileHtml(l);
        }
    }else{
        let text = $el.textContent;
        let reg = /\{\{(.+?)\}\}/g;
        if(reg.test(text)){
            text.replace(reg, (...args)=>{
                let r = args[1]; //{{a}} 得到a
            })
        }
    }
}


win.Vue = Vue;
})(window)


