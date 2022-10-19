<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" class="fp-enabled" style="height: 100%;">

<body>
	<script>
		function selected_email() {
		    var domain = document.getElementById("sel_email").value;
		    document.getElementById("email2").value = domain;
		}
	</script>
	<script src="/js/idsmetadata/login.js"></script>
        <div class="sub-visual sv01 on">
            <p class="animated on">비밀번호 찾기</p>
        </div>
        <!--header end-->

        <!-- container start-->
        <div class="pr-page">
            <div class="inner02">
                <p class="sub__tit01">비밀번호 찾기</p>
                <p class="sub__stit01">
                    비밀번호를 잊으셨나요?<br>
                    아래에 이메일 주소를 입력하시면 비밀번호를 보내드립니다.
                </p>

                <div class="find cb">

                    <input type="text" id="email1" class="inputOrgW" placeholder="이메일">
                    <span>@</span>
                    <input type="text" id="email2" class="inputOrgW" placeholder="직접입력">

                    <select id="sel_email" onchange="selected_email()" class="selectOrg">
                        <option value="naver.com">naver.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="daum.com">daum.com</option>
                        <option value="nate.com">nate.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hotmail.com">hotmail.com</option>
                        <option value="" selected>직접입력</option>
                    </select>


                    <div class="btn-area">
                        <a href="login.do" class="findCl">취소</a>
                        <a onclick="find_pwd()" class="findOk">확인</a>
                    </div>
                </div>
            </div>

        </div>
        <!-- container end-->
    </div>

</body>

</html>