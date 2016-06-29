
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
			maskSize(mask);
			center(login);
			show(mask);
			doMove(mask,{'opacity':30});
			show(login);
			doMove(login,{'opacity':100});
			document.documentElement.style.overflow = 'hidden';
		}
		//注册
		btnReg.onclick = function(){
			maskSize(mask);
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
	})();
	//浏览器窗口改变触发事件
	(function(){
		var login = document.getElementById('login');
		var reg = document.getElementById('reg');
		var mask = document.getElementById('mask');
		var photoBig = document.getElementById('photo_big');
		var pic = document.getElementById('photo');
		var aImg = pic.getElementsByTagName('img');

		window.onresize = function(){
			if(getStyle(mask,'display') == 'block'){
				//重置遮罩层尺寸
				maskSize(mask);
				//居中登录框
				center(login);
				//居中注册框
				center(reg);
				//居中图片加载框
				center(photoBig)
			}
			//触发延迟加载
			picLoad(aImg);
		}
	})();
	//弹出层拖拽
	(function(){
		var login = document.getElementById('login');
		var reg = document.getElementById('reg');
		var loginTitle = login.getElementsByTagName('h2')[0];
		var regTitle = reg.getElementsByTagName('h2')[0];
		var photoBig = document.getElementById('photo_big');
		var photoTitle = photoBig.getElementsByTagName('h2')[0];
		drag(loginTitle,login);
		drag(regTitle,reg);
		drag(photoTitle,photoBig);
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
					if(l >= document.documentElement.clientWidth+getScroll('scrollLeft')-parent.offsetWidth){
						l = document.documentElement.clientWidth+getScroll('scrollLeft')-parent.offsetWidth;
					}else if(l <= 0){
						l = 0;
					}else if(l <= getScroll('scrollLeft')){
						l = getScroll('scrollLeft');
					}
					if(t >= document.documentElement.clientHeight+getScroll('scrollTop')-parent.offsetHeight){
						t = document.documentElement.clientHeight+getScroll('scrollTop')-parent.offsetHeight;
					}else if(t <= 0){
						t = 0;
					}else if(t <= getScroll('scrollTop')){
						t = getScroll('scrollTop');
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
	//登陆表单验证
	(function(){
		var oForm = document.getElementById('login_form');
		var login = document.getElementById('login');
		var mask = document.getElementById('mask');
		var loading = document.getElementById('loading');
		var loadingText = loading.getElementsByTagName('p')[0];
		var success = document.getElementById('success');
		var successText = success.getElementsByTagName('p')[0];

		oForm.sub.onclick = function(){
			if(/^\w{2,20}$/.test(trim(oForm.user.value)) && oForm.pass.value.length >=6){
				var _this = this;
				show(loading);
				center(loading);
				loadingText.innerHTML = '正在登陆，请稍候...';
				_this.disabled = true;
				_this.style.backgroundPosition = 'right';
				ajax({
					method:'post',
					url:'is_login.php',
					data:serialize(oForm),
					success:function(text){
						hide(loading);
						if(text == 1){
							getByClass(oForm,'info')[0].innerHTML = '登陆失败：用户名或密码不正确！';
						}else{
							getByClass(oForm,'info')[0].innerHTML = '';
							show(success);
							center(success);
							successText.innerHTML = '登陆成功，请稍候...';
							setTimeout(function(){
								hide(success);
								oForm.reset();
								doMove(mask,{'opacity':0},function(){
									hide(mask);
								});
								doMove(reg,{'opacity':0},function(){
									hide(login);
								});
								document.documentElement.style.overflow = 'auto';
							},1500);
						}
						_this.disabled = false;
						_this.style.backgroundPosition = 'left';
					},
					async:true
				})
			}else{
				getByClass(oForm,'info')[0].innerHTML = '登陆失败：用户名或密码不合法！';
			}
		}
	})();
	//注册表单验证
	(function(){
		var oForm = document.getElementById('reg_form');
		var succ = getByClass(oForm,'succ');
		//----------用户名----------
		var infoUser = getByClass(oForm,'info_user')[0];
		var errorUser = getByClass(oForm,'error_user')[0];
		var succUser = getByClass(oForm,'succ_user')[0];
		var loadingUser = getByClass(oForm,'loading')[0];
		//----------密码----------
		var infoPass = getByClass(oForm,'info_pass')[0];
		var errorPass = getByClass(oForm,'error_pass')[0];
		var succPass = getByClass(oForm,'succ_pass')[0];
		var aQ = getByClass(oForm,'q');
		var aS = getByClass(oForm,'s');
		//----------确认密码----------
		var infoNotPass = getByClass(oForm,'info_notpass')[0];
		var errorNotPass = getByClass(oForm,'error_notpass')[0];
		var succNotPass = getByClass(oForm,'succ_notpass')[0];
		//----------提问----------
		var errorQues = getByClass(oForm,'error_ques')[0];
		//----------回答----------
		var infoAns = getByClass(oForm,'info_ans')[0];
		var errorAns = getByClass(oForm,'error_ans')[0];
		var succAns = getByClass(oForm,'succ_ans')[0];
		//----------邮箱----------
		var infoEmail = getByClass(oForm,'info_email')[0];
		var errorEmail = getByClass(oForm,'error_email')[0];
		var succEmail = getByClass(oForm,'succ_email')[0];
		var allEmail = getByClass(oForm,'all_email')[0];
		var aLi = allEmail.getElementsByTagName('li');
		var aSpan = allEmail.getElementsByTagName('span');
		//----------生日----------
		var birthday = getByClass(oForm,'birthday')[0];
		var errorBirthday = getByClass(oForm,'error_birthday')[0];
		//----------备注----------
		var aPs = getByClass(oForm,'ps');
		var aNum = getByClass(oForm,'num');
		var clear = getByClass(oForm,'clear')[0];
		//----------加载中----------
		var loading = document.getElementById('loading');
		var loadingText = loading.getElementsByTagName('p')[0];
		//----------注册成功----------
		var success = document.getElementById('success');
		var successText = success.getElementsByTagName('p')[0];
		//刷新重置表单
		oForm.reset();

		userVerify();
		passVerify();
		confirmPass();
		quesVerify();
		ansVerify();
		emailVerify();
		birthdayVerify();
		psVerify();
		subVerify();
		//用户名验证
		function userVerify(){
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
				}else if(!checkUser()){
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
		function checkUser(){
			var onOff = true;
			if(!/^\w{2,20}$/.test(trim(oForm.user.value))){
				errorUser.innerHTML = '输入不合法，请重新输入！';
				return false;
			}else{
				show(loadingUser);
				hide(infoUser);
				ajax({
					method:'post',
					url:'is_user.php',
					data:serialize(oForm),
					success:function(text){
						if(text == 1){
							errorUser.innerHTML = '用户名被占用，请重新输入！';
							onOff = false;
						}else{
							onOff = true;
						}
						hide(loadingUser);
					},
					async:false
				});
			}
			return onOff;
		}
		//密码验证
		function passVerify(){
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
				passCheck();
			}
		}
		function passCheck(){
			var value = oForm.pass.value;
			var valueLength = value.length;
			var codeLength = 0;
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
				return true;
			}else{
				return false;
			}
		}
		//确认密码
		function confirmPass(){
			oForm.notpass.onfocus = function(){
				show(infoNotPass);
				hide(errorNotPass);
				hide(succNotPass);
			}
			oForm.notpass.onblur = function(){
				if(notpassCheck()){
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
		function notpassCheck(){
			if(oForm.notpass.value == oForm.pass.value && oForm.pass.value != '')return true;
		}
		//问题验证
		function quesVerify(){
			oForm.ques.onchange = function(){
				if(quesCheck())hide(errorQues);
			}
		}
		function quesCheck(){
			if(oForm.ques.value != 0)return true;
		}
		//回答验证
		function ansVerify(){
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
				}else if(ansCheck()){
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
		function ansCheck(){
			if(oForm.ans.value.length >= 2 && oForm.ans.value.length <= 32)return true;
		}
		//邮箱验证
		function emailVerify(){
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
				}else if(emailCheck()){
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
		function emailCheck(){
			if(/^[\w\-\.]+\@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(oForm.email.value))return true;
		}
		//生日验证
		function birthdayVerify(){
			
			var day30 = [4,6,9,11];
			var day31 = [1,3,5,7,8,10,12];
			//var str = '';
			oForm.day.onchange = function(){
				if(birthdayCheck()){
					hide(errorBirthday);
				}
			}
			//添加年
			for( var i = 1950; i < 2017; i++){
				//方法1
				// str += '<option value="' + i + '">' + i + '</option>';
				// 方法2
				oForm.year.add(new Option(i,i),undefined);
				// 方法3
				// var option = document.createElement('option');
				// option.value = i;
				// option.innerHTML = i;
				// oForm.year.appendChild(option);
			}
			// oForm.year.innerHTML += str;
			// 添加月
			for( var i = 1; i < 13; i++){
				oForm.month.add(new Option(i,i),undefined);
			}
			//添加日
			oForm.year.onchange = function(){
				selectDay();
			}
			oForm.month.onchange = function(){
				selectDay();
			}
			function selectDay(){
				if(oForm.year.value != 0 && oForm.month.value != 0){
					var curDay = 0;
					//清理注入内容
					oForm.day.length = 1;
					if(inArr(day30,parseInt(oForm.month.value))){
						curDay = 30;
					}else if(inArr(day31,parseInt(oForm.month.value))){
						curDay = 31;
					}else{
						if(parseInt(oForm.year.value) % 4 == 0 && parseInt(oForm.year.value) % 100 != 0 || parseInt(oForm.year.value) % 400 == 0){
							curDay = 29;
						}else{
							curDay = 28;
						}
					}
					for(var i = 1; i <= curDay; i++){
						oForm.day.add(new Option(i,i),undefined);
					}
				}else{
					oForm.day.length = 1;
				}
			}
		}
		function birthdayCheck(){
			if(oForm.year.value != 0 && oForm.month.value != 0 && oForm.day.value != 0)return true;
		}
		//备注字数验证
		function psVerify(){
			oForm.ps.onkeyup = function(){
				checkPs();
			}
			//检测粘贴
			oForm.ps.onpaste = function(){
				setTimeout(function(){
					checkPs();
				},50)
			}
			//清尾
			clear.onclick = function(){
				oForm.ps.value = oForm.ps.value.substring(0,200);
				checkPs();
			}
			
		}
		//检测字数
		function checkPs(){
			var num = 200 - oForm.ps.value.length;
			if(num >= 0){
				show(aPs[0]);
				hide(aPs[1]);
				aNum[0].innerHTML = num;
				return true;
			}else{
				show(aPs[1]);
				hide(aPs[0]);
				aNum[1].innerHTML = -num;
				aNum[1].style.color = 'red';
				return false;
			}
		}
		//提交验证
		function subVerify(){
			oForm.sub.onclick = function(){
				var onOff = true;
				if(!checkUser()){
					show(errorUser);
					onOff = false;
				}
				if(!passCheck()){
					show(errorPass);
					onOff = false;
				}
				if(!notpassCheck()){
					show(errorNotPass);
					onOff = false;
				}
				if(!quesCheck()){
					show(errorQues);
					onOff = false;
				}
				if(!ansCheck()){
					show(errorAns);
					onOff = false;
				}
				if(!emailCheck()){
					show(errorEmail);
					onOff = false;
				}
				if(!birthdayCheck()){
					show(errorBirthday);
					onOff = false;
				}
				if(!checkPs()){
					onOff = false;
				}
				if(onOff){
					var _this = this;
					show(loading);
					center(loading);
					loadingText.innerHTML = '正在提交注册...';
					_this.disabled = true;
					_this.style.backgroundPosition = 'right';
					ajax({
						method:'post',
						url:'add.php',
						data:serialize(oForm),
						success:function(text){
							hide(loading);
							show(success);
							center(success);
							successText.innerHTML = '注册成功，请登录！';
							setTimeout(function(){
								hide(success);
								_this.disabled = false;
								_this.style.backgroundPosition = 'left';
								for (var i = 0; i < succ.length; i++) {
									hide(succ[i]);
								}
								oForm.reset();
								doMove(mask,{'opacity':0},function(){
									hide(mask);
								});
								doMove(reg,{'opacity':0},function(){
									hide(reg);
								});
								document.documentElement.style.overflow = 'auto';
							},1500);

						},
						async:true
					})
				}
			}
			
		}
	})();
	//图片轮播
	(function(){
		var banner = document.getElementById('banner');
		var aImg = banner.getElementsByTagName('img');
		var aLi = banner.getElementsByTagName('li');
		var aStrong = banner.getElementsByTagName('strong')[0];

		function fn(num){
			for (var i = 0; i < aImg.length; i++) {
				hide(aImg[i]);
				aLi[i].index = i;
				aLi[i].style.color = '#999';
			}
			show(aImg[num]);
			aLi[num].style.color = '#333';
			aStrong.innerHTML = aImg[num].alt;
		}
		fn(0);
		picAuto()
		function picAuto(){
			var timer = null;
			var num = 0;
			fn1();
			function fn1(){
				clearInterval(timer);
				timer = setInterval(function(){
					num ++;
					if(num >= aImg.length){
						num = 0;
					}
					fn(num);
				},2000)
			}
			banner.onmouseover = function(){
				clearInterval(timer);
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].onmouseover = function(){
						fn(this.index)
					}
					aLi[i].onmouseout = function(){
						num = this.index;
					}
				}
			}
			banner.onmouseout = function(){
				fn1();
			}
			
		}
	})();
	//图片延迟加载
	(function(){
		var pic = document.getElementById('photo');
		var aImg = pic.getElementsByTagName('img');

		for (var i = 0; i < aImg.length; i++) {
			aImg[i].style.opacity = 0;
			aImg[i].style.filter = 'alpha(opacity=0)';
		}
		window.onscroll = function(){
			picLoad(aImg);	
		}			
	})();
	//图片预加载
	(function(){
		var pic = document.getElementById('photo');
		var aImg = pic.getElementsByTagName('img');
		var photoBig = document.getElementById('photo_big');
		var big = getByClass(photoBig,'big')[0];
		var bigPic = big.getElementsByTagName('img')[0];
		var leftMask = getByClass(big,'left_mask')[0];
		var rightMask = getByClass(big,'right_mask')[0];
		var preyBtn = getByClass(big,'btn_prey')[0];
		var nextBtn = getByClass(big,'btn_next')[0];
		var mask = document.getElementById('mask');
		var close = getByClass(document.body,'close');

		for (var i = 0; i < aImg.length; i++) {
			aImg[i].index = i;
			aImg[i].onclick = function(){
				var oImg = new Image;
				
				maskSize(mask);
				center(photoBig);
				show(mask);
				doMove(mask,{'opacity':30});
				show(photoBig);
				doMove(photoBig,{'opacity':100});
				document.documentElement.style.overflow = 'hidden';
				
				oImg.onload = function(){
					bigPic.style.width = '600px';
					bigPic.style.height = '450px';
					bigPic.style.top = '0';
					bigPic.style.opacity = '0';
					doMove(bigPic,{'opacity':100});
					attr(bigPic,'src',oImg.src);
				}
				oImg.src = attr(this,'bigsrc');
				prevNextImg(this);
				// 上一张
				leftMask.onmouseover = function(){
					doMove(preyBtn,{'opacity':50});
				}
				leftMask.onmouseout = function(){
					doMove(preyBtn,{'opacity':0});
				}
				leftMask.onclick = function(){
					var nowPic = aImg[attr(bigPic,'index')-1];
					if(attr(bigPic,'index') == 0){
						nowPic = aImg[aImg.length-1]
					}
					loadinImg(this);
					prevNextImg(nowPic);
				}
				//下一张
				rightMask.onmouseover = function(){
					doMove(nextBtn,{'opacity':50});
				}
				rightMask.onmouseout = function(){
					doMove(nextBtn,{'opacity':0});
				}
				rightMask.onclick = function(){					
					var nowPic = aImg[parseInt(attr(bigPic,'index'))+1];
					if(attr(bigPic,'index') == aImg.length-1){
						nowPic = aImg[0];
					}
					loadinImg(this);
					prevNextImg(nowPic);
				}
				//图片未加载完成时的效果 
				function loadinImg(_this){
					//创建临时图片对象
					var currentImg = new Image;
					//显示loading图片，并设置样式
					attr(bigPic,'src','img/loading.gif');
					bigPic.style.top = '190px';
					bigPic.style.width = '33px';
					bigPic.style.height = '33px';
					//图片加载完成时执行的事件
					currentImg.onload = function(){
						bigPic.style.width = '600px';
						bigPic.style.height = '450px';
						bigPic.style.top = '0';
						bigPic.style.opacity = '0';
						doMove(bigPic,{'opacity':100});
						attr(bigPic,'src',currentImg.src);
					}
					currentImg.src = attr(_this,'src');
				}
				//预加载上一张/下一张图片
				function prevNextImg(obj) {
					var preyImg = new Image;
					var nextImg = new Image;
					var preyIndex = obj.index-1;
					var nextIndex = obj.index+1;
					if(obj.index == 0){
						preyIndex = aImg.length-1;
					}
					if(obj.index == aImg.length-1){
						nextIndex = 0;
					}
					preyImg.src = attr(aImg[preyIndex],'bigsrc');
					nextImg.src = attr(aImg[nextIndex],'bigsrc');
					attr(leftMask,'src',preyImg.src);
					attr(rightMask,'src',nextImg.src);
					attr(bigPic,'index',obj.index);
				}
			}
		}
		//关闭注册
		close[2].onclick = function(){
			doMove(mask,{'opacity':0},function(){
				hide(mask);
			})
			doMove(photoBig,{'opacity':0},function(){
				hide(photoBig);
			})
			document.documentElement.style.overflow = 'auto';
			attr(bigPic,'src','img/loading.gif');
			bigPic.style.top = '190px';
			bigPic.style.width = '33px';
			bigPic.style.height = '33px';
		}
		
	})();
}









































