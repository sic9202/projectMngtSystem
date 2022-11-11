<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>

<body>
	<script src="/js/projectMngt/project.js"></script>
	<script type="text/javascript">
	</script>
	<div class="sub-visual sv01 on">
<!-- 		<p class="animated on">프로젝트관리 </p> -->
	</div>
    <!--header end-->

	<input type="hidden" id="keyword" name="keyword" value="${keyword }">
    <!-- container start-->
	<div class="pr-page">
		<div class="inner02">
			<p class="sub__tit01">프로젝트목록 </p>
			<div class="btn-area rb">
				<a style="cursor:pointer;" onclick="goProjectNew()" class="btn btn-big btn_color_green btn-150"><i class="xi-plus"></i> 신규등록</a>
			</div>
			<div class="board_top">
				<p class="lb count">
					<span>총 <b id="totalCnt">${totalCnt }</b>건</span>
				</p>
<!-- 				<div class="board_search_box"> -->
<!-- 					<label class="blind" for="">검색 분류</label> -->
<!-- 					<select id="searchType" class="search_select" name=""> -->
<!-- 						<option value="0">선택</option> -->
<!-- 						<option value="1">프로젝트</option> -->
<!-- 						<option value="2">등록자</option> -->
<!-- 					</select> -->
<!-- 					<label class="blind" for="searchWord">검색어 입력</label> -->
<!-- 					<input id="searchContent" type="text" class="txt_search" name="" value="" placeholder="검색어 입력"> -->
<!-- 					<button type="button" class="btn_search" onclick=""><i class="xi-magnifier"></i> 검색</button> -->
<!-- 				</div> -->
			</div>
			<div id="data_content">
			<c:if test=""></c:if>
			<c:forEach var="p_list" items="${project_list }" varStatus="pStatus">
				<div class="data-view-result" style="cursor: pointer;" onclick="goScheduleList(${p_list.project_idx })">
					<p class="cate"><span class="cate19">분야</span><span>${p_list.project_type }</span></p>
					<p class="date">
						<span>등록일자 : <fmt:formatDate pattern="yyyy-MM-dd" value="${p_list.project_reg_date }"/></span>
					</p>
					<p class="title"><a>${p_list.project_name }</a></p>
					<p class="text">${p_list.project_info }</p>
				</div>
			</c:forEach>
			</div>
			<div class="pagination">
			<!-- 페이지 많이지면 생김 -->
				<ui:pagination paginationInfo="${paginationInfo }" type="image" jsFunction="movePage"/>
			</div>
		</div>
      <!-- container end-->
	</div>
	<form action="" method="post" id="moveForm">
		<input type="hidden" name="project_idx" value=""/>	
	</form>
	<form action="" method="post" id="listForm">
		<input type="hidden" name="searchType" value="">
		<input type="hidden" name="searchContent" value="">
	</form>
</body>
