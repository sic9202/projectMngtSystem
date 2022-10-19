<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>K-ICT 빅데이터 센터</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">


    <meta property="og:type" content="website">
    <meta property="og:title" content="DATAMASQ">
    <meta name="naver-site-verification" content="">
    <meta name="description" content="KICT 빅데이터 센터">
    <meta property="og:description" content="KICT 빅데이터 센터">

    <link rel="shortcut icon" href="/image/common/favicon.png">

    <script type="text/javascript">
        var CTX = "";
    </script>


    <!-- 공통 CSS -->
    <link rel="stylesheet" type="text/css" href="/css/style.css" media="all">


    <!-- jqgrid css,js -->
    <script src="//code.jquery.com/jquery-3.4.1.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="/js/jquery.modal.js"></script>

</head>
<body>
	<script src="/js/login/login.js"></script>
        <div class="sub-visual sv01 on">
            <p class="animated on">로그인</p>
        </div>
        <!--header end-->


        <!-- container start-->
		<div class="pr-page">
			<div class="inner02">
				<p class="sub__tit01">로그인</p>
				<p class="sub__tit04">아이디와 비밀번호를 입력해주세요.</p>
				<div class="login">
					<div class="com_sub_tit"></div>
	
					<div class="sub_con_wrap">
						<div class="w_1160">
	
							<div class="w_550">
								<form id="" name="">
									<input type="text" placeholder="아이디" id="user_id" name="user_id">
									<input type="password" placeholder="비밀번호" id="user_pwd" name="user_pwd">
								</form>
								<button type="button" onclick="moveList()">로그인</button>
								<ul class="flex">
									<li><a href="findPwd.do">비밀번호 찾기</a></li>
								</ul>
	
								<a href="signUp.do" class="join_link btn">회원가입</a>
	
							</div>
						</div>
					</div>
	
				</div>
			</div>
		</div>
	<!-- container end-->

</body>

</html>