<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
    
<!DOCTYPE html>
<html lang="ko" class="fp-enabled" style="height: 100%;">

<body>

        <script src="/js/idsmetadata/account.js"></script>
		<script type="text/javascript">
			$().ready(function(){
				getMobile();
			});
		</script>
            <div class="sub-visual sv01 on">
                <p class="animated on">정보수정</p>
            </div>
            <!--header end-->


            <!-- container start-->

            <div class="pr-page">
				<div class="inner02">
				  <p class="sub__tit01"> 데이터 보유기관 회원정보 수정                </p>
		
		
				  <div class="board_detail_contents">
					<table class="tbl_info sm">
					  <caption> 표</caption>
					  <colgroup>
						<col style="width:20%">
						<col style="width:80%">
					  </colgroup>
					  <tbody>
						<tr>
						  <th>회원아이디</th>
						  <td class="lb"><input type="text" id="email" class="inputOrgW" value="${result.list.user_email}"
							maxlength="50" title="" disabled/>
						  </td>
						</tr>
                        <tr>
							<th>기존 비밀번호 <span class="red">*</span></th>
							<td class="lb"><input type="password" id="pwd"
								maxlength="50" title="" placeholder="">
							<a onclick="check_pwd();" id="duplicate_check" class="btn btn-sm btn_color_navy" style="cursor:pointer;">비밀번호 확인</a>
							<input type="hidden" id="hidden_move" value="0">	
							<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.</td>
						  </tr>					
						<tr>
							<th>새로운 비밀번호 <span class="red">*</span></th>
							<td class="lb"><input type="password"
								id="firstPassword" class="inputOrgW" maxlength="50" title="" placeholder="" style="background: #E8E9E8;" disabled>
							<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.</td>
						  </tr>
						  <tr>
							<th>새로운 비밀번호확인 <span class="red">*</span></th>
							<td class="lb"><input type="password"
								id="checkPassword" class="inputOrgW" maxlength="50" title="" placeholder="" style="background: #E8E9E8;" disabled>
								<br>※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.</td>
						  </tr>
						  <tr>
							<th>이름</th>
							<td class="lb"><input type="text" id="user_info" value=""
								maxlength="50" title="" placeholder="" ></td>
						  </tr>
						  <tr>
							<th>기관명</th>
							<td class="lb">
								<input id="org_name" type="text" class="inputOrgW" value=""
								maxlength="50" title="" placeholder="">
								<input type="hidden" id="biz_type_value" value="">
									(
									<div class="radio-group">
										<input type="radio" id="first" name="org_type" value="공공기관">
									  <label for="first">공공기관</label>
									</div>
									<div class="radio-group">
									  <input type="radio" id="second" name="org_type" value="민간기업">
									  <label for="second">민간기업</label>
									</div>
									)
							</td>
						  </tr>
						  <tr>
							<th>사업자등록번호</th>
							<td class="lb"><input type="text" id="biz_reg_no" value="" class="inputOrgW" maxlength="12" title="사업자번호" placeholder="-없이 숫자 10자리 입력"></td>
						  </tr>
						  <tr>
							<th>담당자 연락처 </th>
							<input type="hidden" name="cotelno2" id="cotelno0" class="inputOrgWm" title="대표번호 앞자리" size="10" maxlength="3" value="">
							<td class="lb">  
								<select id="mobile" class="selectOrg">
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
								<input type="text" name="cotelno2" id="cotelno1" class="inputOrgWm" title="대표번호 가운뎃자리" size="10" maxlength="4" value="${mobileSecond}">
								-
								<input type="text" name="cotelno2" id="cotelno2" class="inputOrgWm" title="대표번호 뒤자리" size="10" maxlength="4" value="${mobileThird}">
							</td>
						  </tr>
						  <tr>
							<th>소속 플랫폼</th>
							<input type="hidden" id="hidden_platform" value="">
							<td class="lb"> 
                                <select id="org_platform" class="selectOrg" name="">
                               	<option value="" selected disabled hidden>-선택-</option>
                               	<c:forEach var="list" items="${result.description}" varStatus="count">
                                <option value="${count.count}">${list.description}</option>
                                </c:forEach>
                            	</select>
                            </td>
						  </tr>
						  
					  </tbody>
					</table>
					<div class="btn-area cb">
					  <a onclick="update_user();" class="btn btn-big btn_green btn-150" style="cursor:pointer;">정보수정</a>
					  <a onclick="widthdrawl();" class="btn btn-big btn_color_green btn-150" style="cursor:pointer;">회원탈퇴</a>
					</div>
				  </div>
		
				</div>

            </div>
            <!-- container end-->


</body>

</html>