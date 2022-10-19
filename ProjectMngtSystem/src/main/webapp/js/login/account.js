//비밀번호 확인 버튼 
function check_pwd(){
	var valuePwd = $('#pwd').val();
	var valueEmail = $('#email').val();
	
	if(valuePwd == "") {
		alert('기존 비밀번호를 입력해주세요.');
		$('#pwd').focus();
		return false;
	}	
	
	$.postDataGetJSON("/checkAccount.do", {"valuePwd": valuePwd, "valueEmail": valueEmail}, function(r) {
		if(r.status == 1) {
			/*$('#email').val("");*/
			/*alert("value : " + $('#email').val());*/
			$('#firstPassword').removeAttr("disabled");
			$('#checkPassword').removeAttr("disabled");
			$('#firstPassword').css("background-color", "white");
			$('#checkPassword').css("background-color", "white");
			$('#duplicate_check').hide();
			/*$('#mobile').css('display','block');*/
			alert("확인되었습니다.");				
		}else if(r.status == 3){
			alert("비밀번호가 틀립니다. 다시 입력해 주세요.");
			$("#pwd").val("");
			$("#pwd").focus();
			return false;
		}
	});
	$('#hidden_move').val("1");
	return true;
}

//기관명 타입 확인
function check_radio(check) {
	if(check == "공공기관") {
		$("#first").prop("checked", true);
		$("#biz_type_value").val(check);
	}else if(check == "민간기업") {
		$("#second").prop("checked", true);
		$("#biz_type_value").val(check);
	}
}

//플랫폼 확인
function check_platform(platform) {
	$('#hidden_platform').val(platform);
	var value = $('#hidden_platform').val();
	var el = document.getElementById('org_platform');
	var len = el.options.length;
	for(var i = 1; i < len; i++) {
		if(value == el.options[i].value) {
			el.options[i].selected = true;
		}
		
	}
}

//연락처 확인
function check_mobile(mobile) {
	var el = document.getElementById('mobile');
	var len = el.options.length;
	var cotelno0 = mobile;
	$('#cotelno1').val(mobile);
	for (var i = 0; i < len; i++) {
		if(cotelno0 == el.options[i].value) {
			el.options[i].selected = true;
		}
	}
}

//비밀번호 양식 확인
function pwdCheck(pwd){
	var num = pwd.search(/[0-9]/g);
	var eng = pwd.search(/[a-z]/ig);
	var spe = pwd.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

	if(pwd.length < 6 || pwd.length > 12){
		alert("8자리 ~ 20자리 이내로 입력해주세요.");
		return false;
	}else if(pwd.search(/\s/) != -1){
		alert("비밀번호는 공백 없이 입력해주세요.");
		return false;
	}else if(num < 0 || eng < 0 || spe < 0 ){
		alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
		return false;
	}else {
		return true;
	}
}

//사용자 정보 재수정
function update_user() {
	/*if(check_pwd()) {
		alert("정보수정 하시겠습니까?");
		window.location.href = encodeURI("/");
	} else {
		window.location.href = encodeURI("#");
	}*/
	
	var hidden_move = $('#hidden_move').val();
	if(hidden_move == "0") {
		
		var user_email = $('#email').val();
		var user_info = $('#user_info').val();
		var org_name = $('#org_name').val();
		var biz_reg_no = $('#biz_reg_no').val();
		var biz_type = $('input[name="org_type"]:checked').val();
		var cotelno0 = $("#mobile option:selected").val();
		var cotelno1 = $('#cotelno1').val();
		var cotelno2 = $('#cotelno2').val();
		var mobile = cotelno0 + "-" + cotelno1 + "-" + cotelno2;
		var description = $("#org_platform option:selected").val();
		
		$.postDataGetJSON("/update_user_noPwd.do", {"user_email":user_email, "user_info": user_info, "org_name": org_name, "biz_reg_no": biz_reg_no
				, "biz_type": biz_type, "mobile": mobile, "description": description},
				function(r){
					if(r.status == 1) {
						alert("정보수정이 완료되었습니다.");
						window.location.href = encodeURI("/");
					} else {
						alert("정보수정 실패했습니다.")
					}
			});
	} else if(hidden_move == "1"){
		var pass_wd = "";
		var firstPassword = $('#firstPassword').val();
		var checkPassword = $('#checkPassword').val();
		
		if(firstPassword == "") {
			alert("새로운 비밀번호를 입력해주세요.");
			$('#firstPassword').focus();
			return false;
		} else {
			if(!pwdCheck(firstPassword)) {
				$('#firstPassword').focus();
				return false;
			} 
		}
		
		if(checkPassword == "") {
			alert("새로운 비밀번호확인을 입력해주세요.");
			$('#checkPassword').focus();
			return false;
		} else {
			if(!pwdCheck(checkPassword)) {
				$('#checkPassword').focus();
				return false;
			}
		}
		
		if(firstPassword != checkPassword) {
			alert('비밀번호가 틀립니다.');
			return false;
		} else {
			pass_wd = checkPassword;
		}
		var user_email = $('#email').val();
		var user_info = $('#user_info').val();
		var org_name = $('#org_name').val();
		var biz_reg_no = $('#biz_reg_no').val();
		var biz_type = $('input[name="org_type"]:checked').val();
		var cotelno0 = $("#mobile option:selected").val();
		var cotelno1 = $('#cotelno1').val();
		var cotelno2 = $('#cotelno2').val();
		var mobile = cotelno0 + "-" + cotelno1 + "-" + cotelno2;
		var description = $("#org_platform option:selected").val();
		
		$.postDataGetJSON("/update_user.do", {"user_email":user_email, "pass_wd": pass_wd, "user_info": user_info, "org_name": org_name, "biz_reg_no": biz_reg_no
			, "biz_type": biz_type, "mobile": mobile, "description": description},
			function(r){
				if(r.status == 1) {
					alert("정보수정이 완료되었습니다.");
					window.location.href = encodeURI("/");
				} else {
					alert("정보수정 실패했습니다.")
				}
		});
	}
}

//전화번호 split
function getMobile() {
	
	var id = $('#email').val();
	$.postDataGetJSON("/getInfo.do",{"id":id},function(r){
		$('#user_info').val(r.list.user_info);
		$('#org_name').val(r.organization.org_name);
		/*$('#biz_type_value').val(r.organization.biz_type)*/
		$('#biz_reg_no').val(r.organization.biz_reg_no);
		var mobile = r.list.mobile;
		var mobile_array = mobile.split("-");
		check_radio(r.organization.biz_type);
		/*$('#cotelno0').val(mobile_array[0]);*/
		check_mobile(mobile_array[0]);
		$('#cotelno1').val(mobile_array[1]);
		$('#cotelno2').val(mobile_array[2]);
		check_platform(r.platform.idx);
	});
}

//회원탈퇴
function widthdrawl() {
	var email = $('#email').val();
	$.postDataGetJSON("/widthdrawl.do", {"email": email}, function(r) {
		if(r.status == 1) {
			alert("회원탈퇴 되었습니다.");
			window.location.href = encodeURI("/");
		} else {
			alert("실패")
		}
	});
}





