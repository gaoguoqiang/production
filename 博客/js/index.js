
window.onload = function(){
	//导航栏
	(function(){
		var header = document.getElementById('header_bg');
		var member = getByClass(header,'member')[0];
		var oUl = member.getElementsByTagName('ul')[0];
		var btnLogin = getByClass(header,'login')[0];
		var btnReg = getByClass(header,'reg')[0];
		var login = document.getElementById('login');
		var reg = document.getElementById('reg');
		var mask = document.getElementById('mask');
		var close = getByClass(document.body,'close');
		var loginTitle = login.getElementsByTagName('h2')[0];
		//个人中心
		member.onmouseover = function(){
			show(oUl);
			doMove(oUl,{'height':110,'opacity':100});
		}
		member.onmouseout = function(){
			doMove(oUl,{'height':0,'opacity':0},function(){
				hide(oUl);
			});
		}
		//登陆
		btnLogin.onclick = function(){
			maskSize();
			center(login);
			show(mask);
			doMove(mask,{'opacity':30});
			show(login);
			doMove(login,{'opacity':100});
			document.documentElement.style.overflow = 'hidden';
		}
		//注册
		btnReg.onclick = function(){
			maskSize();
			center(reg);
			show(mask);
			doMove(mask,{'opacity':30});
			show(reg);
			doMove(reg,{'opacity':100});
			document.documentElement.style.overflow = 'hidden';
		}
		//关闭注册
		close[0].onclick = function(){
			doMove(mask,{'opacity':0},function(){
				hide(mask);
			})
			doMove(reg,{'opacity':0},function(){
				hide(reg);
			})
			document.documentElement.style.overflow = 'auto';
		}
		//关闭登陆
		close[1].onclick = function(){
			doMove(mask,{'opacity':0},function(){
				hide(mask);
			})
			doMove(login,{'opacity':0},function(){
				hide(login);
			})
			document.documentElement.style.overflow = 'auto';
		}
		//监听浏览器窗口大小
		window.onresize = function(){
			if(getStyle(mask,'display') == 'block'){
				maskSize();
				center(login);
				center(reg);
			}
		}
		//设置遮罩层宽高
		function maskSize(){
			var w = 0;
			var h = 0;
			if(innerWidth){
				w = innerWidth;
				h = innerHeight;
			}else{
				w = document.documentElement.clientWidth;
				h = document.documentElement.clientHeight;
			}
			mask.style.width = w+'px';
			mask.style.height = h+'px';
		}
		//居中弹出框
		function center(obj){
			obj.style.left = (document.documentElement.clientWidth-parseInt(getStyle(obj,'width')))/2+'px';
			obj.style.top = (document.documentElement.clientHeight-parseInt(getStyle(obj,'height')))/2+'px';
		}
	})();
	//弹出层拖拽
	(function(){
		var login = document.getElementById('login');
		var reg = document.getElementById('reg');
		var loginTitle = login.getElementsByTagName('h2')[0];
		var regTitle = reg.getElementsByTagName('h2')[0];
		drag(loginTitle,login);
		drag(regTitle,reg);
		//拖拽
		function drag(obj,parent){
			obj.onmousedown = function(ev){
				var ev = ev || event;
				var disX = ev.clientX-parent.offsetLeft;
				var disY = ev.clientY-parent.offsetTop;

				document.onmousemove = function(ev){
					var ev = ev || event;
					var l = ev.clientX-disX;
					var t = ev.clientY-disY;
					if(l >= document.documentElement.clientWidth-parent.offsetWidth){
						l = document.documentElement.clientWidth-parent.offsetWidth;
					}else if(l <= 0){
						l = 0;
					}
					if(t >= document.documentElement.clientHeight-parent.offsetHeight){
						t = document.documentElement.clientHeight-parent.offsetHeight;
					}else if(t <= 0){
						t = 0;
					}
					parent.style.left = l+'px';
					parent.style.top = t+'px';
				}
				document.onmouseup = function(){
					document.onmousemove = document.onmouseup = null;
				}
				return false;
			}
		}
	})();
	//导航
	(function(){
		var nav = document.getElementById('nav');
		var oUl = nav.getElementsByTagName('ul')[0];
		var aLi = oUl.getElementsByTagName('li');
		var navBg = getByClass(nav,'nav_bg')[0];
		var white = getByClass(nav,'white')[0];

		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index = i;
			var l = 0;
			aLi[i].onmouseover = function(){
				l = this.offsetLeft + 20;
				var n = this.index
				doMove(navBg,{'left':l},function(){
					doMove(white,{'left':-aLi[0].offsetWidth*n});
				});
			}
			aLi[i].onmouseout = function(){
				doMove(navBg,{'left':20},function(){
					doMove(white,{'left':0});
				});
			}
		}
	})();
	//侧边栏
	(function(){
		var main = document.getElementById('main');
		var sideBar = getByClass(main,'sidebar')[0];
		var aH2 = main.getElementsByTagName('h2');
		var aUl = main.getElementsByTagName('ul');

		for (var i = 0; i < aH2.length; i++) {
			aH2[i].index = i;
			//给每一个对象单独添加开关
			aH2[i].onOff = true;
			aH2[i].onclick = function(){
				var n = this.index;
				if(this.onOff){
					doMove(aUl[n],{'height':0,'opacity':0});
				}else{
					doMove(aUl[n],{'height':150,'opacity':100});
				}
				this.onOff = !this.onOff;
			}
		}
	})();
	//表单验证
	(function(){
		var oForm = document.getElementById('reg_form');
		
		userVerify();
		passVerify();
		confirmPass();
		ansVerify();
		emailVerify();
		//用户名验证
		function userVerify(){
			var infoUser = getByClass(oForm,'info_user')[0];
			var errorUser = getByClass(oForm,'error_user')[0];
			var succUser = getByClass(oForm,'succ_user')[0];
			oForm.user.onfocus = function(){
				show(infoUser);
				hide(errorUser);
				hide(succUser);
			}
			oForm.user.onblur = function(){
				if(trim(this.value) == ''){
					hide(infoUser);
					hide(errorUser);
					hide(succUser);
				}else if(!/^\w{2,20}$/.test(trim(this.value))){
					show(errorUser);
					hide(infoUser);
					hide(succUser);
				}else{
					show(succUser);
					hide(infoUser);
					hide(errorUser);
				}
			}
		}
		//密码验证
		function passVerify(){
			var infoPass = getByClass(oForm,'info_pass')[0];
			var errorPass = getByClass(oForm,'error_pass')[0];
			var succPass = getByClass(oForm,'succ_pass')[0];
			var aQ = getByClass(oForm,'q');
			var aS = getByClass(oForm,'s');
			
			oForm.pass.onfocus = function(){
				show(infoPass);
				hide(errorPass);
				hide(succPass);
			}
			oForm.pass.onblur = function(){
				if(trim(this.value) == ''){
					hide(infoPass);
				}else if(passCheck(this)){
					show(succPass);
					hide(errorPass);
					hide(infoPass);
				}else{
					show(errorPass);
					hide(succPass);
					hide(infoPass);
				}
			}
			oForm.pass.onkeyup = function(){
				passCheck(this);
			}
			function passCheck(_this){
				var value = _this.value;
				var valueLength = value.length;
				var codeLength = 0;
				var onOff = false;
				//判断是否为6-20个字符
				if(valueLength >= 6 && valueLength <= 20){
					aQ[0].innerHTML = '●';
					aQ[0].style.color = 'green';
				}else{
					aQ[0].innerHTML = '○';
					aQ[0].style.color = '#666';
				}
				//判断是否包含空字符
				if(valueLength > 0 && !/\s/.test(value)){
					aQ[1].innerHTML = '●';
					aQ[1].style.color = 'green';
				}else{
					aQ[1].innerHTML = '○';
					aQ[1].style.color = '#666';
				}
				//判断是否为大、小写字母、数字、非空字符，2种以上
				if(/\d/.test(value)){
					codeLength ++;
				}
				if(/[a-z]/.test(value)){
					codeLength ++;
				}
				if(/[A-Z]/.test(value)){
					codeLength ++;
				}
				if(/[^\w]/.test(value)){
					codeLength ++;
				}
				if(codeLength>=2){
					aQ[2].innerHTML = '●';
					aQ[2].style.color = 'green';
				}else{
					aQ[2].innerHTML = '○';
					aQ[2].style.color = '#666';
				}
				//判断安全级别
				if(valueLength >= 10 && codeLength >= 3){
					for (var i = 0; i < aS.length-1; i++) {
						aS[i].style.color = 'green';
					}
					aS[3].innerHTML = '高';
					aS[3].style.color = 'green';
				}else if(valueLength >= 8 && codeLength >= 2){
					for (var i = 0; i < aS.length-2; i++) {
						aS[i].style.color = '#f60';
					}
					aS[2].style.color = '#ccc';
					aS[3].innerHTML = '中';
					aS[3].style.color = '#f60';
				}else if(valueLength >= 1){
					aS[0].style.color = 'maroon';
					aS[1].style.color = '#ccc';
					aS[2].style.color = '#ccc';
					aS[3].innerHTML = '低';
					aS[3].style.color = 'maroon';
				}else{
					for (var i = 0; i < aS.length-1; i++) {
						aS[i].style.color = '#ccc';
					}
					aS[3].innerHTML = '';
				}
				if(valueLength >= 6 && valueLength <= 20 && !/\s/.test(value) && codeLength>=2){
					onOff = true;
				}
				return onOff;
			}
		}
		//确认密码
		function confirmPass(){
			var infoNotPass = getByClass(oForm,'info_notpass')[0];
			var errorNotPass = getByClass(oForm,'error_notpass')[0];
			var succNotPass = getByClass(oForm,'succ_notpass')[0];
			oForm.notpass.onfocus = function(){
				show(infoNotPass);
				hide(errorNotPass);
				hide(succNotPass);
			}
			oForm.notpass.onblur = function(){
				if(this.value == oForm.pass.value && oForm.pass.value != ''){
					show(succNotPass);
					hide(errorNotPass);
					hide(infoNotPass);
				}else{
					show(errorNotPass);
					hide(infoNotPass);
					hide(succNotPass);
				}
			}
		}
		//回答验证
		function ansVerify(){
			var infoAns = getByClass(oForm,'info_ans')[0];
			var errorAns = getByClass(oForm,'error_ans')[0];
			var succAns = getByClass(oForm,'succ_ans')[0];
			oForm.ans.onfocus = function(){
				show(infoAns);
				hide(errorAns);
				hide(succAns);
			}
			oForm.ans.onblur = function(){
				if(this.value == ''){
					hide(succAns);
					hide(errorAns);
					hide(infoAns);
				}else if(this.value.length >= 2 && this.value.length <= 32){
					hide(errorAns);
					hide(infoAns);
					show(succAns);
				}else{
					show(errorAns);
					hide(infoAns);
					hide(succAns);
				}
			}
		}
		//邮箱验证
		function emailVerify(){
			var infoEmail = getByClass(oForm,'info_email')[0];
			var errorEmail = getByClass(oForm,'error_email')[0];
			var succEmail = getByClass(oForm,'succ_email')[0];
			var allEmail = getByClass(oForm,'all_email')[0];
			var aLi = allEmail.getElementsByTagName('li');
			var aSpan = allEmail.getElementsByTagName('span');
			oForm.email.onfocus = function(){
				show(infoEmail);
				hide(errorEmail);
				hide(succEmail);
				if(this.value.indexOf('@') == -1){
					show(allEmail);
				}
			}
			oForm.email.onblur = function(){
				hide(allEmail);
				if(this.value == ''){
					hide(infoEmail);
					hide(errorEmail);
					hide(succEmail);
				}else if(/^[\w\-\.]+\@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(this.value)){
					hide(errorEmail);
					hide(infoEmail);
					show(succEmail);
				}else{
					show(errorEmail);
					hide(infoEmail);
					hide(succEmail);
				}
			}
			//邮箱自动补全键盘事件
			oForm.email.onkeyup = function(ev){
				var ev = ev || event;
				for (var i = 0; i < aSpan.length; i++) {
					if(this.value.indexOf('@') == -1){
						show(allEmail);
						aSpan[i].innerHTML = this.value;
					}else{
						hide(allEmail);
					}
				}
				for(var j = 0; j < aLi.length; j++){
					aLi[j].style.backgroundColor = '';
					aLi[j].style.color = '#666';
				}
				//键盘选择补全信息
				if(ev.keyCode == 40){
					if(this.index == undefined || this.index >= aLi.length-1){
						this.index = 0;
					}else{
						this.index ++;
					}
					aLi[this.index].style.backgroundColor = '#e5edf2';
					aLi[this.index].style.color = '#369';
				}
				if(ev.keyCode == 38){
					if(this.index == undefined || this.index <= 0){
						this.index = aLi.length-1;
					}else{
						this.index --;
					}
					aLi[this.index].style.backgroundColor = '#e5edf2';
					aLi[this.index].style.color = '#369';
				}
				if(ev.keyCode == 13){
					this.value = aLi[this.index].innerText;
					hide(allEmail);
					this.index = undefined;
				}
			}
			//鼠标选择补全信息
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].onmouseover = function(){
					this.style.backgroundColor = '#e5edf2';
					this.style.color = '#369';
				}
				aLi[i].onmouseout = function(){
					this.style.backgroundColor = '';
					this.style.color = '#666';
				}
				aLi[i].onmousedown = function(){
					oForm.email.value = this.innerText;
				}
			}
		}
	})();
	//
}









































