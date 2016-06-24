


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












































