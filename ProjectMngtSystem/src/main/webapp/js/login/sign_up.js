/**
 * 
 */
function email_check(email){
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if(!reg_email.test(email)) {                            
         return false;         
    }else{
    	return true;
    }                     
}

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

function value_check(){
	if($("#user_id").val() == ""){
		alert("아이디를 입력하세요");
		$("#user_id").focus();
		return false;
	}else{
		if(!email_check($("#user_id").val())){
			alert("아이디 형식이 틀립니다.");
			return false;
		}
	}
	if($("#user_pwd").val() == ""){
		alert("비밀번호를 입력하세요");
		$("#user_pwd").focus();
		return false;
	}else{
		if(!pwdCheck($("#user_pwd").val())){
			alert("양식에 맞추어 비밀번호를 입력하세요")
			$("#user_pwd").focus();
			return false;
		}else{
			if($("#user_pwd").val() != $("#user_pwd_check").val()){
			alert("비밀번호가 일치하지 않습니다.");
			$("#user_pwd_check").focus();
			return false;
			}
		}
		
	}
	if($("#user_name").val() == ""){
		alert("이름을 입력하세요")
		$("#user_name").focus();
		return false;
	}
	if($("#org_name").val() == ""){
		alert("기관명을 입력하세요");
		$("#org_name").focus();
		return false;
	}
	if($("#biz_reg_no").val() == ""){
		alert("사업자번호를 입력하세요");
		$("#biz_reg_no").focus();
		return false;
	}else{
		if($("#biz_reg_no").val().length != 10){
			alert("사업자번호를 입력하세요");
			$("#biz_reg_no").focus();
			return false;
		}
	}
	if($("#cotelno1").val() == "" || $("#cotelno2").val() == ""){
		alert("연락처를 입력하세요");
		$("#cotelno1").focus();
		return false;
	}
	if($("input[name=agreement]:checked").val() == 0){
		alert("이용양관에 동의하여야 합니다.")
		return false;
	}
	if($("input[name=org_type]:checked").val() == ""){
		alert("기관종류를 선택하여주세요.")
		return false;
	}
	if($("#id_check").val == 0){
		alert("아이디중복체크를 해주세요")
		return false;
	}
	return true;
}

function sign_up_user(){

	if(value_check()){
		var user_id = $("#user_id").val();
		var user_pwd = $("#user_pwd").val();
		var user_name = $("#user_name").val();
		var org_name = $("#org_name").val();
		var org_type = $("input[name=org_type]:checked").val();
		var org_platform = $("#org_platform option:selected").val();
		var biz_reg_no = $("#biz_reg_no").val();
		var phone_num = $("#cotelno0").val()+"-"+$("#cotelno1").val()+"-"+$("#cotelno2").val();
		
		$.postDataGetJSON("/register_account.do",{
			"user_id": user_id,
			"user_pwd": user_pwd,
			"user_name": user_name,
			"org_name": org_name,
			"org_type": org_type,
			"org_platform": org_platform,
			"biz_reg_no": biz_reg_no,
			"phone_num": phone_num
		},
		function(r){
			if(r.status == 1){
				alert("회원가입이 완료 되었습니다.");
				window.location.href = encodeURI("/login.do");
			}else{
				alert("회원가입에 실패하였습니다. 관리자에게 문의하세요.");
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

function duplicate_check(){
	var id = $("#user_id").val();
	if(id == "" || id == null){
		alert("아이디를 입력하세요");
	}else{
		if(email_check(id)){
			$.postDataGetJSON("/duplicate_check.do", {id: id}, function(r){
				if(r.status == 2){
					alert("중복된 이메일 입니다.");
				}else if(r.status == 1){
					alert("사용가능한 이메일 입니다.");
					$("#id_check").val(1);
					$("#duplicate_check").css("display","none");
					$("#re_enter").css("display", "");
					$("#user_id").prop('disabled', true);
				}else{
					alert("중복체크 불가합니다.");
				}
			});
		}else{
			alert("잘못된 형식의 이메일 입니다.");
		}
	}
	
	
	
}














