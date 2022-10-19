<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">

<body>
	<script src="/js/idsmetadata/login.js"></script>
        <div class="sub-visual sv01 on">
            <p class="animated on">비밀번호 찾기</p>
        </div>
        <!--header end-->


        <!-- container start-->
        <div class="pr-page">
            <div class="inner02">
                <p class="sub__tit01">비밀번호 변경</p>
                <p class="sub__stit01">
                    <span class="b">${email }</span>에 사용할 새로운 비밀번호를 입력하십시오. 
                </p>

                <div class="find cb">
    
                        <table class="tbl_info sm" style="width:50%; left: calc(50%/2);">
                            <colgroup>
                                <col style="width:30%">
                                <col style="width:70%">
                              </colgroup>
                            <tr>
                                <th>새 비밀번호</th>
                                <td class="lb"><input id="pwd1" type="password" class="inputOrg" placeholder="비밀번호를 입력해주세요."><p style="font-size: 12px;">※ 영문+숫자+특수문자 조합 6~12자 이내로 입력해주세요.</p></td>
                            </tr>
                            <tr>
                                <th>비밀번호 확인</th>
                                <td class="lb"><input id="pwd2" type="password" class="inputOrg" placeholder="비밀번호를 재입력해주세요."></td>
                            </tr>
                        </table>
                

                    <div class="btn-area">
                        <a onclick="change_pwd('${email }')" class="findOk">확인</a>
                    </div>
            
                </div>
            </div>
        </div>
        <!-- container end-->
</body>

</html>