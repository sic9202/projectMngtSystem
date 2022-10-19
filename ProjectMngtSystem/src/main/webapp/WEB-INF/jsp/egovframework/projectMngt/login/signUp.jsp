<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko" class="fp-enabled" style="height: 100%;">

<body>
	<script src="/js/idsmetadata/sign_up.js"></script>
            <div class="sub-visual sv01 on">
                <p class="animated on">회원가입</p>
            </div>
            <!--header end-->


            <!-- container start-->

            <div class="pr-page">
				<div class="inner02">
				  <p class="sub__tit01"> 데이터 보유기관 회원가입 신청</p>
		
		
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
						  <td class="lb"><input id="user_id" type="text" class="inputOrgW" maxlength="50" title="" placeholder="data@bigdata.com"> 
							<a onclick="re_enter()" id="re_enter"class="btn btn-sm btn_color_navy" style="cursor:pointer;display: none;">이메일 재입력</a>
							<a onclick="duplicate_check()" id="duplicate_check" class="btn btn-sm btn_color_navy"style="cursor:pointer;display: ;">중복체크</a>
							<br>기관(회사)의 이메일주소를 입력해주시기 바랍니다.
						  </td>
						</tr>				
						<tr>
							<th>비밀번호 <span class="red">*</span></th>
							<td class="lb"><input id="user_pwd" type="password"
								maxlength="50" title="" placeholder="">
							<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.</td>
						  </tr>
						  <tr>
							<th>비밀번호확인 <span class="red">*</span></th>
							<td class="lb"><input id="user_pwd_check" type="password"
								maxlength="50" title="" placeholder="">
								<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.</td>
						  </tr>
						  <tr>
							<th>이름 <span class="red">*</span></th>
							<td class="lb"><input type="text" id="user_name" class="inputOrgW"
								maxlength="50" title="" placeholder=""></td>
						  </tr>
						  <tr>
							<th>기관명 <span class="red">*</span></th>
							<td class="lb">
								<input id="org_name" type="text" class="inputOrgW"
								maxlength="50" title="" placeholder=""> 
									(
									<div class="radio-group">
									  <input type="radio" id="org_type" name="org_type" value=0>
									  <label for="org_type">공공기관</label>

									</div>
									<div class="radio-group">
										<input type="radio" id="org_type" name="org_type" value=1>
									  <label for="org_type">민간기업</label>
									</div>
									)
									
							</td>
						  </tr>
						  <tr>
							<th>사업자등록번호<span class="red">*</span></th>
							<td class="lb"><input id="biz_reg_no" type="text" class="inputOrgW" maxlength="12" title="사업자번호" placeholder="-없이 숫자 10자리 입력"></td>
						  </tr>
						  <tr>
							<th>담당자 연락처<span class="red">*</span></th>
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
						  <tr>
							<th>소속 플랫폼</th>
							<td class="lb"> 
                                <select id="org_platform" class="selectOrg" name="">
                                <option value="0">해당없음</option>
                                <c:forEach var="list" items="${result.list}" varStatus="count">
                                	<option value="${count.count }">${list.description } </option>
                                </c:forEach>

                            </select></td>
						  </tr>
						  <tr>
							<td class="cb" colspan="2">
<%-- 							<%@include file="/WEB-INF/jsp/idsmetadata/login/agreementform.jsp"%> --%>
								
							<div class="radio-group">

								<input type="radio" id="agreement" name="agreement" value=1>
								<label for="agreement" class="text">동의함</label>

							</div>
							<div class="radio-group">
								<input type="radio" id="agreement" name="agreement" value=0 checked>
								<label for="agreement" class="text">동의하지않음</label>
								
							</div>
							</td>
						  </tr>
					  </tbody>
					</table>
					<input type="hidden" id="id_check" value="0" />	
					<div class="btn-area cb">
					  <a onclick="sign_up_user()" class="btn btn-big btn_green btn-150" style="cursor: pointer;">회원가입</a>
					  <!-- <a href="/sub/Join2.html" onclick="" class="btn btn-big btn_green btn-150">회원가입</a> -->
					  <a onclick="goMain();" class="btn btn-big btn_color_green btn-150" style="cursor: pointer;">취소</a>
					</div>
				  </div>
		
				</div>

            </div>
            <!-- container end-->

            <!-- container end-->

</body>

</html>