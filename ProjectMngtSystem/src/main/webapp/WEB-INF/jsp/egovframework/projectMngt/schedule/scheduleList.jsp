<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>프로젝트관리</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">


    <meta property="og:type" content="website">
    <meta property="og:title" content="DATAMASQ">
    <meta name="naver-site-verification" content="">
    <meta name="description" content="프로젝트관리">
    <meta property="og:description" content="프로젝트관리">

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
	<script src="/js/projectMngt/schedule.js"></script>
	<script type="text/javascript">
// 		$().ready(function(){
// 			getDatasetList(0);
// 		});
	</script>
    <div class="sub-visual sv01 on">
      <p class="animated on">프로젝트상세</p>
    </div>

    <!-- container start-->
    <div class="pr-page">
      <div id="inner02" class="inner02">
        <p class="sub__tit01">${project_info.project_name } <span class="sub__tit02"></span></p>

        <div class="btn-area rb">
          <a style="cursor:pointer;" onclick="goScheduleNew()" class="btn btn-big btn_color_green btn-150"><i class="xi-plus"></i> 신규등록</a>
        </div>

        <div class="board_top">
          <p class="lb count">
            <span>총 <b id="totalCnt">${totalCnt }</b>건</span>
          </p>
          <div class="board_search_box">
            <label class="blind" for="">검색 분류</label>
            <select id="searchType" class="search_select" name="">
              <option value="" selected>선택</option>
              <option value="10">공정명</option>
              <option value="20">등록자</option>
            </select>
            <label class="blind" for="">검색어 입력</label>
            <input id="searchContent" type="text" class="txt_search" name="" value="" placeholder="검색어 입력">
            <button type="button" class="btn_search" onclick=""><i class="xi-magnifier"></i> 검색</button>
            <input type="hidden" name="pageNo" id="pageNo" value="" />
          </div>
        </div>

        <div class="board_wrap">
          <div class="board_tbl_box">
            <table id="scheduleList" class="tbl_board notice">
              <caption>일정리스트</caption>
              <colgroup>
                <col style="width: 10%">
                <col style="width: 60%">
                <col style="width: 20%">
                <col style="width: 10%">
<%--                 <col style="width: 10%"> --%>
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">순번</th>
                  <th scope="col">공정명</th>
                  <th scope="col">등록일</th>
                  <th scope="col">등록자</th>
<!--                   <th scope="col"></th> -->
                </tr>
              </thead>
              <tbody>
              <c:if test="${fn:length(schedule_list) != 0 }">
              	<c:forEach var="s_list" items="${schedule_list }" varStatus="sStatus">
	              	<tr>
	              		<td>${sStatus.count }</td>
						<td class="sbj txtL"><a style="cursor:pointer;" onclick="goWorkList(${s_list.schedule_idx})">${s_list.schedule_name }</a></td>
						<td><fmt:formatDate pattern="yyyy-MM-dd" value="${s_list.schedule_reg_date }"/></td>
						<td>${s_list.reg_user_name }</td>
<!-- 						<td> -->
<%-- 							<a id="del_btn_${sStatus.index }" style="cursor:pointer;" onclick="removeRecord(this)" style="cursor:pointer;" class="btn btn-sm btn_color_navy">삭제</a> --%>
<!-- 						</td> -->
					</tr>
	              </c:forEach>
              </c:if>
              <c:if test="${fn:length(schedule_list) == 0 }">
              	<tr>
					<td colspan="5">조회된 데이터가 없습니다.</td>
				</tr>
              </c:if>
              
              </tbody>
            </table>
            <div class="btn-area lb">
             	<a style="cursor:pointer;" onclick="goProjectList()" class="btn btn-big btn_green btn-150">이전</a>
            </div>
          </div>
        </div>
        <div id="pagination">
          
        </div>
      </div>
      <!-- container end-->
    </div>
<form action="" method="post" id="moveForm">
	<input type="hidden" name="project_idx" value="${project_info.project_idx }">
	<input type="hidden" name="schedule_idx" value=""/>
</form>
</body>

</html>