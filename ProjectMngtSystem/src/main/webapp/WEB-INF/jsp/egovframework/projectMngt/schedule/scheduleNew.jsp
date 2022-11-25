<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<body>
	<script src="/js/projectMngt/schedule.js"></script>
	<div class="sub-visual sv01 on">
		<p class="animated on">일정관리</p>
	</div>
    <!--header end-->

    <!-- container start-->
	<input type="hidden" name="menuCode" value="">
	<div class="pr-page">
		<div class="inner02">
		<c:set var="chk" value="${schedule_info ne null and schedule_info ne '' }"/>
			<p class="sub__tit01">
			<c:if test="${chk }">
				일정수정
			</c:if>
			<c:if test="${!chk }">
				일정신규		
			</c:if>
			</p>
			<div class="board_detail_contents">
			<c:if test="${chk}">
				<div class="btn-area rb">
					<a style="cursor:pointer;" onclick="delSchedule(${schedule_info.schedule_idx})" class="btn btn-big btn_color_red btn-150">삭제</a>
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
							<th>단계<span class="red">*</span></th>
							<td class="lb" colspan="3">
								<input type="text" id="schedule_name" name="schedule_name" class="inputOrg" value='<c:if test="${chk }">${schedule_info.schedule_name }</c:if>'>
							</td>
						</tr>
						<tr>
							<th>담당자<span class="red">*</span></th>
							<td class="lb">
								<input type="text" id="schedule_manager" name="schedule_name" class="inputOrg" value='<c:if test="${chk }">${schedule_info.schedule_manager }</c:if>'>
							</td>
							<th>기간<span class="red">*</span></th>
							<td class="lb">
								<input type="text" id="schedule_period" name="schedule_name" class="inputOrg" value='<c:if test="${chk }">${schedule_info.schedule_period }</c:if>'>
							</td>
						</tr>
						<tr>
							<th>정보</th>
							<td class="lb" colspan="3">
								<input type="text" id="schedule_info" name="schedule_name" class="inputOrg" value='<c:if test="${chk }">${schedule_info.schedule_info }</c:if>'>
							</td>
						</tr>	
						<tr>
							<th>등록일<span class="red">*</span></th>
							<td class="lb">
								<input id="schedule_reg_date" class="inputOrg" type="text" value='<c:if test="${chk}"><fmt:formatDate pattern="yyyy-MM-dd" value="${schedule_info.schedule_reg_date }"/></c:if>'>
							</td>
							<th>등록자</th>
							<td class="lb">${login_info.user_name }</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- <div class="etc__box">
				<input type="text" id="" name="schedule_name" class="inputOrg" maxlength="50" title="공정명을 입력하세요." placeholder="공정명을 입력하세요.">
			</div> -->
			<div class="btn-area cb">
			<c:if test="${chk }">
				<a style="cursor: pointer;" onclick="scheduleNew(${schedule_info.schedule_idx})" class="btn btn-big btn_green btn-150">저장</a>
			</c:if>
			<c:if test="${!chk }">
				<a style="cursor: pointer;" onclick="scheduleNew()" class="btn btn-big btn_green btn-150">등록</a>
			</c:if>
				<a href="javascript:history.back();" class="btn btn-big btn_green btn-150">취소</a>
			</div>
				<input type="hidden" name="user_idx" value="${user_idx }">
			</div>
      <!-- container end-->
	</div>
	<form action="" method="post" id="moveForm">
		<input type="hidden" name="project_idx" value="${project_idx }">
		<input type="hidden" name="schedule_idx" value=""/>
	</form>
</body>