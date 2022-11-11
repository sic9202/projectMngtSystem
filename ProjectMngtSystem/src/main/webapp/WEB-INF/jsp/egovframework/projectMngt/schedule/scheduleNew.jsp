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
			<p class="sub__tit01">일정신규</p>
			<div class="etc__box">
				<input type="text" id="" name="schedule_name" class="inputOrg" maxlength="50" title="공정명을 입력하세요." placeholder="공정명을 입력하세요.">
			</div>
			<div class="btn-area cb">
				<a style="cursor: pointer;" onclick="scheduleNew()" class="btn btn-big btn_green btn-150">등록</a>
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