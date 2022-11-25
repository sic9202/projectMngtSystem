<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<body>
  	<script src="/js/projectMngt/work.js"></script>
    <div class="sub-visual sv01 on">
      <p class="animated on">업무관리</p>
    </div>
    <!--header end-->

    <!-- container start-->
    <input type="hidden" name="menuCode" value="">
    <div class="pr-page">
      <div class="inner02">
      <c:set var="chk" value="${work_info ne null and work_info ne '' }"/>
        <p class="sub__tit01">
		<c:if test="${chk }">
			업무수정
		</c:if>
		<c:if test="${!chk }">
			업무신규		
		</c:if>
		</p>
		<div class="board_detail_contents">
		<c:if test="${chk}">
			<div class="btn-area rb">
				<a style="cursor:pointer;" onclick="delWork(${work_info.work_idx})" class="btn btn-big btn_color_red btn-150">삭제</a>
			</div>
		</c:if>
			<table class="tbl_info sm">
				<caption> 표</caption>
				<colgroup>
					<col style="width:15%">
					<col style="width:35%">
					<col style="width:15%">
					<col style="width:35%">
				</colgroup>
				<tbody>
					<tr>
						<th>업무명<span class="red">*</span></th>
						<td class="lb" colspan="3">
							<input type="text" id="work_name" name="work_name" class="inputOrg" value='<c:if test="${chk }">${work_info.work_name }</c:if>'>
						</td>
					</tr>
					<tr>
						<th>담당자<span class="red">*</span></th>
						<td class="lb">
							<input type="text" id="work_manager" name="work_manager" class="inputOrg" value='<c:if test="${chk }">${work_info.work_manager }</c:if>'>
						</td>
						<th>기간<span class="red">*</span></th>
						<td class="lb">
							<input type="text" id="work_period" name="work_period" class="inputOrg" value='<c:if test="${chk }">${work_info.work_period }</c:if>'>
						</td>
					</tr>
					<tr>
						<th>정보</th>
						<td class="lb" colspan="3">
							<input type="text" id="work_info" name="work_info" class="inputOrg" value='<c:if test="${chk }">${work_info.work_info }</c:if>'>
						</td>
					</tr>
					<tr>
						<th>등록일<span class="red">*</span></th>
						<td class="lb">
							<input id="work_reg_date" class="inputOrg" type="text" value='<c:if test="${chk}"><fmt:formatDate pattern="yyyy-MM-dd" value="${work_info.work_reg_date }"/></c:if>'>
						</td>
						<th>등록자</th>
						<td class="lb">${login_info.user_name }</td>
					</tr>
				</tbody>
			</table>
		</div>
        <div class="btn-area cb">
        <c:if test="${chk }">
        	<a style="cursor: pointer;" onclick="workNew(${work_info.work_idx})" class="btn btn-big btn_green btn-150">저장</a>
        </c:if>
        <c:if test="${!chk }">
        	<a style="cursor: pointer;" onclick="workNew()" class="btn btn-big btn_green btn-150">등록</a>
        </c:if>	
        	<a href="javascript:history.back();" class="btn btn-big btn_green btn-150">취소</a>
        </div>
      </div>
      <!-- container end-->
    </div>
<form action="" method="post" id="moveForm">
	<input type="hidden" name="project_idx" value="${project_idx }">
	<input type="hidden" name="schedule_idx" value="${schedule_idx }"/>
</form>
</body>
</html>