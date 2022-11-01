function id_check(id){
	var reg_id = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_id.test(id)) {                            
         return false;         
    }else{
    	return true;
    }  
}

function value_check(){
	if($("#user_id").val() == ""){
		alert("아이디를 입력해주세요");
		$("#user_id").focus();
		return false;
	}else{
		if(!id_check($("#user_id").val())){
			alert("잘못된 형식의 아이디 입니다.");
			$("#user_id").val("");
			$("#user_pwd").val("");
			$("#user_id").focus();
			return false;
		}
	}
	if($("#user_pwd").val() == ""){
		alert("비밀번호를 입력해주세요");
		$("#user_pwd").val("");
		$("#user_pwd").focus();
		return false;
	}
	return true;
}


function check_user() {
	if(value_check()){
		var user_id = $("#user_id").val();
		var user_pwd = $("#user_pwd").val();
		
		$.ajax({
			type: "POST",
			url: "/checkUser.do",
			data: {
				user_id: user_id,
				user_pwd: user_pwd
			},
			success: function(r){
				if(r.status == 1){ //로그인 성공
					if(r.use_yn == 0){
						alert("탈퇴한 회원입니다.");
						$("#user_pwd").val("");
						$("#user_id").val("");
						$("#user_id").focus();
						return false;
					}else{
						goProjectList();
					}
				}else if(r.status ==2){ //틀린 아이디
					alert("잘못된 아이디 입니다.");
					$("#user_pwd").val("");
					$("#user_id").val("");
					$("#user_id").focus();
				}else if(r.status == 3){ //틀린 비밀번호
					alert("잘못된 비밀번호 입니다.");
					$("#user_pwd").val("");
					$("#user_pwd").focus();
				}else{
					alert("로그인에 실패하였습니다.");
					$("#user_pwd").val("");
					$("#user_id").val("");
					$("#user_id").focus();
				}
			}
		});
	}
}

//function find_pwd(){
//	
//	var id = $("#email1").val();
//	var domain = $("#email2").val();
//	var email = id+"@"+domain;
//	
//	if(id_check(email)){
//		$.postDataGetJSON("/find_passwd.do", {email: email}, function(r){
//			if(r.status == 0){
//				alert("등록되지 않은 이메일 주소 입니다.");
//			}else{
//				alert("임시비밀번호를 이메일로 전송하였습니다.");
//				window.location.href = encodeURI("/login.do");
//			}
//		});
//	}	
//}

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

//function change_pwd(email){
//	var pwd = $("#pwd1").val();
//	if($("#pwd1").val() == ""){
//		alert("비밀번호를 입력하세요");
//		$("#pwd1").focus();
//		return false;
//	}else{
//		if(!pwdCheck($("#pwd1").val())){
//			alert("양식에 맞추어 비밀번호를 입력하세요")
//			$("#user_pwd").focus();
//			return false;
//		}else{
//			if($("#pwd1").val() != $("#pwd2").val()){
//			alert("비밀번호가 일치하지 않습니다.");
//			$("#pwd2").focus();
//			return false;
//			}
//		}
//		$.postDataGetJSON("/update_pwd.do", {pwd:pwd, email:email}, function(r){
//			if(r.status == 1){
//				alert("비밀번호가 변경되었습니다.");
//				window.location.href = encodeURI("/datasetList.do");
//			}else{
//				alert("비밀번호 변경 실패하였습니다.")
//			}
//		});
//	}
//
//}

function goProjectList(){
	window.location.href = encodeURI("/projectList.do");
}