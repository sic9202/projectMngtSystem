<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<body>
	<script src="/js/login/signUp.js"></script>
	<div class="sub-visual sv01 on">
<!-- 		<p class="animated on">회원가입</p> -->
	</div>
	<!--header end-->

	<!-- container start-->
	<div class="pr-page">
		<div class="inner02">
			<p class="sub__tit01">회원가입</p>
			<div class="board_detail_contents">
				<table class="tbl_info sm">
					<caption> 표</caption>
					<colgroup>
						<col style="width:20%">
						<col style="width:80%">
					</colgroup>
					<tbody>
						<tr>
							<th>회원아이디 <span class="red">*</span></th>
							<td class="lb"><input id="user_id" type="text" class="inputOrgW" maxlength="50" title="" placeholder="data@dimoa.co.kr"> 
								<a onclick="re_enter()" id="re_enter"class="btn btn-sm btn_color_navy" style="cursor:pointer;display: none;">이메일 재입력</a>
								<a onclick="duplicate_check()" id="duplicate_check" class="btn btn-sm btn_color_navy"style="cursor:pointer;display: ;">중복체크</a>
							</td>
						</tr>				
						<tr>
							<th>비밀번호 <span class="red">*</span></th>
							<td class="lb"><input id="user_pwd" type="password" maxlength="50" title="" placeholder="">
								<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.
							</td>
						</tr>
						<tr>
							<th>비밀번호확인 <span class="red">*</span></th>
							<td class="lb"><input id="user_pwd_check" type="password" maxlength="50" title="" placeholder="">
								<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.
							</td>
						</tr>
						<tr>
							<th>이름 <span class="red">*</span></th>
							<td class="lb"><input type="text" id="user_name" class="inputOrgW" maxlength="50" title="" placeholder=""></td>
						</tr>
						<tr>
							<th>연락처</th>
							<td class="lb">  
								<select id="cotelno0" class="selectOrg">
									<option value="02">02</option>
									<option value="031">031</option>
									<option value="032">032</option>
									<option value="033">033</option>
									<option value="041">041</option>
									<option value="042">042</option>
									<option value="043">043</option>
									<option value="051">051</option>
									<option value="052">052</option>
									<option value="053">053</option>
									<option value="054">054</option>
									<option value="055">055</option>
									<option value="061">061</option>
									<option value="062">062</option>
									<option value="063">063</option>
									<option value="064">064</option>
									<option value="070">070</option>
									<option value="010">010</option>
								</select> 
									-
								<input type="text" name="cotelno2" id="cotelno1" class="inputOrgWm" title="대표번호 가운뎃자리" size="10" maxlength="4">
									-
								<input type="text" name="cotelno2" id="cotelno2" class="inputOrgWm" title="대표번호 뒤자리" size="10" maxlength="4">
							</td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" id="id_check" value="0" />	
				<div class="btn-area cb">
					<a onclick="sign_up_user()" class="btn btn-big btn_green btn-150" style="cursor: pointer;">회원가입</a>
					<a href="login.do" class="btn btn-big btn_color_green btn-150">취소</a>
				</div>
			</div>
		</div>
	</div>
</body>