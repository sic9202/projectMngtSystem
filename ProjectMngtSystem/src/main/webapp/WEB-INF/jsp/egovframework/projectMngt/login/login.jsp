<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<body>
	<script src="/js/login/login.js"></script>
        <div class="sub-visual sv01 on">
<!--             <p class="animated on">로그인</p> -->
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
<!-- 								<button type="button" onclick="moveProjectList()">로그인</button> -->
								<button type="button" onclick="check_user()">로그인</button>
								<ul class="flex">
<!-- 									<li><a href="findPwd.do">비밀번호 찾기</a></li> -->
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