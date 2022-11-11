//이메일규칙
function email_check(email){
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(email)) {                            
        return false;         
    }else{
    	return true;
    }                     
}

//비밀번호생성규칙
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
		alert("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
		return false;
	}else {
		return true;
	}
}

//입력값 체크
function value_check(){
	if($("#user_id").val().trim() == ""){
		alert("아이디를 입력하세요");
		$("#user_id").val().trim();
		$("#user_id").focus();
		return false;
	}else{
		if(!email_check($("#user_id").val())){
			alert("아이디 형식이 틀립니다.");
			$("#user_id").val().trim();
			$("#user_id").focus();
			return false;
		}
	}
	if($("#user_pwd").val() == ""){
		alert("비밀번호를 입력하세요");
		$("#user_pwd").focus();
		return false;
	}else{
		if(!pwdCheck($("#user_pwd").val())){
			alert("양식에 맞추어 비밀번호를 입력하세요");
			$("#user_pwd").val().trim();
			$("#user_pwd").focus();
			return false;
		}else{
			if($("#user_pwd").val() != $("#user_pwd_check").val()){
			alert("비밀번호가 일치하지 않습니다.");
			$("#user_pwd_check").val().trim();
			$("#user_pwd_check").focus();
			return false;
			}
		}
	}
	
	if($("#user_name").val().trim() == ""){
		alert("이름을 입력하세요");
		$("#user_name").val().trim();
		$("#user_name").focus();
		return false;
	}

	if($("#id_check").val() == 0){
		alert("아이디중복체크를 해주세요");
		return false;
	}
	return true;
}

//회원가입
function sign_up_user(){
	if(value_check()){
		var user_id = $("#user_id").val();
		var user_pwd = $("#user_pwd").val();
		var user_name = $("#user_name").val();
		var phone_num = "";
		if($("#cotelno1").val().trim() != "" && $("#cotelno2").val().trim() != ""){
			phone_num = $("#cotelno0").val()+"-"+$("#cotelno1").val().trim()+"-"+$("#cotelno2").val().trim();	
		}
		
		$.ajax({
			type: "POST",
			url: "/register_account.do",
			data: {
				user_id: user_id,
				user_pwd: user_pwd,
				user_name: user_name,
				phone_num: phone_num
			},
			success: function(r){
				if(r == 1){
					alert("회원가입이 완료되었습니다.");
					window.location.href = encodeURI("/login.do");
				}else{
					alert("회원가입에 실패하였습니다. 관리자에게 문의하세요.");
				}
			}
		});
	}
}

function re_enter(){
	$("#id_check").val(0);
	$("#duplicate_check").css("display","");
	$("#re_enter").css("display", "none");
	$("#user_id").prop('disabled', false);
}

//이메일 중복체크
function duplicate_check(){
	var user_id = $("#user_id").val();
	if(user_id.trim() == "" || user_id == null){
		alert("아이디를 입력하세요");
		user_id.trim();
		user_id.focus();
		return false;
	}else{
		if(email_check(user_id)){
			$.ajax({
				type: "POST",
				url: "/duplicate_check.do",
				data: {
					user_id: user_id,
				},
				success: function(r){
					if(r == 1){
						alert("중복된 이메일 입니다.");
					}else if(r == 0){
						alert("사용가능한 이메일 입니다.");
						$("#id_check").val(1);
						$("#duplicate_check").css("display","none");
						$("#re_enter").css("display", "");
						$("#user_id").prop('disabled', true);
					}else{
						alert("중복체크 불가합니다.");
					}
				}
			});
		}else{
			alert("잘못된 형식의 이메일 입니다.");
		}
	}
}
