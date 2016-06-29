


//获取样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	}
}
//获取class
function getByClass(parent,sclass){
	var aEls = parent.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<aEls.length;i++){
		if((new RegExp('(\\s|^)'+sclass+'(\\s|$)')).test(aEls[i].className)){
			arr.push(aEls[i])
		}
	}
	return arr;
}
//添加class
function addClass(obj,className){
	if(!obj.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
		obj.className += ' '+className;
	}
}
//移除class
function removeClass(obj,className){
	if(obj.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
		obj.className = obj.className.replace(new RegExp('(\\s|^)'+className+'\\s|$'),'');
	}
}
//获取/设置自定义属性
function attr(obj,attr,value){
	if(value != undefined){
		obj.setAttribute(attr,value);
	}else{
		return obj.getAttribute(attr);
	}
}
//获取offsetTop
function getTop(obj){
	var iTop = 0;
	while(obj){
		iTop += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return iTop;
}

function getScroll(attr){
	return document.documentElement[attr] || document.body[attr];
}
//设置遮罩层宽高
function maskSize(obj){
	var w = 0;
	var h = 0;
	if(window.innerWidth){
		w = innerWidth + getScroll('scrollLeft');
		h = innerHeight + getScroll('scrollTop');
	}else{
		w = document.documentElement.clientWidth + getScroll('scrollLeft');
		h = document.documentElement.clientHeight + getScroll('scrollTop');
	}
	obj.style.width = w+'px';
	obj.style.height = h+'px';
}
//居中弹出框
function center(obj){
	obj.style.left = (document.documentElement.clientWidth-parseInt(getStyle(obj,'width')))/2 + getScroll('scrollLeft')+'px';
	obj.style.top = (document.documentElement.clientHeight-parseInt(getStyle(obj,'height')))/2 + getScroll('scrollTop')+'px';
}
//显示
function show(obj){
	obj.style.display = 'block';
}
//隐藏
function hide(obj){
	obj.style.display = 'none';
}
//删除首尾空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
//匹配数组里的值
function inArr(arr,value){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i] === value)return true;
	}
	return false;
}
//运动
function doMove(obj,json,endfn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var onOff = true;
		for(var attr in json){
			var curn = 0;
			if(attr == 'opacity'){
				curn = parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				curn = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr]-curn)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(curn != json[attr]){
				onOff = false;
			}
			if(attr == 'opacity'){
				obj.style[attr] = (curn+speed)/100;
				obj.style.filter = 'alpha(opacity='+(curn+speed)+')';
			}else{
				obj.style[attr] = curn+speed+'px';
			}
		}
		if(onOff){
			clearInterval(obj.timer);
			endfn && endfn();
		}

	},30)
}
//图片延迟加载
function picLoad(obj){
	var dH = document.documentElement.clientHeight;
	var iTop = getScroll('scrollTop');
	for (var i = 0; i < obj.length; i++) {
		if(dH + iTop > getTop(obj[i])){
			attr(obj[i],'src',attr(obj[i],'-src'));
			doMove(obj[i],{'opacity':100});
		}
	}
}
//表单序列化
function serialize(form){
	var parts = {};
	for (var i = 0; i < form.elements.length; i++) {
		var filed = form.elements[i];
		switch(filed.type){
			case undefined:
			case 'submit':
			case 'reset':
			case 'file':
			case 'button':
				break;
			case 'radio':
			case 'checkbox':
				if(!filed.selected){
					break;
				}
			default:
				parts[filed.name] = filed.value;
		}
	}
	return parts;
}








































