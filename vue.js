(function(win){
// 只能new调用
function Vue(opts){
    this.$data = opts.data;
    this._init(opts);
}

Vue.prototype._init = function(opts){
    let vm = this;
    vm.opts = opts;
    initRender(vm);
}

function initRender(vm){
    compileHtml.call(vm, vm.opts.el);
    defineReactive$$1.call(vm, vm.opts);
}

function isObject(obj){
    return typeof obj === 'object' ? true : false;
}

function defineReactive$$1(obj){
    let t = this;
    // 判断是一个对象
    for(let key in obj){
        let val = obj[key];
        if(isObject(val)){
            defineReactive$$1.call(this, val)
        }else{
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                set: function(newVal){
                    // 设置的时候拦截
                    val = newVal;
                    setVal.call(t, key, newVal)
                },
                get: function(){
                    return val;
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

function getVal(param){
    let data = this.opts.data;
    return data[param]
}

function setVal(key, newVal){
    compileHtml.call(this, this.opts.el)
}



// 解析HTML
function compileHtml(el){
    let t = this;
    let $el = query(el);
    if($el.nodeType == 1){
        let attrs = [...$el.attributes];
        attrs.forEach((attr)=>{
            let {name, value} = attr;
            if(name.indexOf('v-')===0){
                let r = getVal.call(this, value);
                $el.value = r;
                $el.addEventListener("input", (e)=>{
                    let val = e.target.value;
                    t.$data[value] = val;
                }, false)
            }
        });
        let children = $el.childNodes;
        for(let l of children){
            compileHtml.call(this, l);
        }
        
    }else{
        let text;
        if(typeof $el._ov == 'undefined') {
            text = $el.textContent;
            $el._ov = text;
        }else{
            text = $el._ov;
        }
        let reg = /\{\{(.+?)\}\}/g;
        if(reg.test(text)){
            text.replace(reg, (...args)=>{
                let r = args[1]; //{{a}} 得到a
                let rr = getVal.call(this, r)
                $el.textContent = rr;
            })
        }
    }
}


win.Vue = Vue;
})(window)


