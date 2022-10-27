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
	<script src="/js/projectMngt/work.js"></script>
	<script type="text/javascript">
// 		$().ready(function(){
// 			datasetInfo("${dataset_idx}");
// 		});
	</script>
    <div class="sub-visual sv01 on">
      <p class="animated on">업무 상세</p>
    </div>
    <!--header end-->


    <!-- container start-->

    <div class="pr-page">
      <div class="inner02">
        <p class="sub__tit01"><span class="sub__tit02"></span></p>


        <div class="board_detail_contents">
	        <div class="data-view-result">
	        	<p class="cate"><span class="cate19">프로젝트명</span> <span>${project_info.project_name }</span></p>
	            <p class="date">
	              <span>등록일자 : <fmt:formatDate pattern="yyyy-MM-dd" value="${work_info.work_reg_date }"/> </span>
	            </p>
	            <p class="title">${work_info.work_name }</p>
	       	</div>
          <div class="tab_borad_in_wrap">
            <ul class="tab_board_in">
              <%-- <li id="tab1" class="active" style="cursor:pointer;"><a onclick="datasetInfo(${dataset_idx})">배포정보</a></li> --%>
              <%-- <li id="tab2" class="active" style="cursor:pointer;"><a onclick="datasetLayout(${dataset_idx})">데이터명세</a></li> --%>
              <%-- <li id="tab3" class="inactive" style="cursor:pointer;"><a onclick="datasetSample(${dataset_idx})">샘플데이터</a></li> --%>
            </ul>
          </div>        
         <div id="work_data">
         	<table class="tbl_info sm">
                 <caption> 표</caption>
                 <colgroup>
                     <col style="width:12%">
                     <col style="width:12%">
                     <col style="width:8%;">
                     <col style="width:8%;">
                     <col style="width:20%;">
                     <col style="width:auto;">
                     <col style="width:7%;">
                     <col style="width:7%;">
                 </colgroup>
                 <thead>
                    <tr>
                        <th class="b">시작일</th> 
                        <th class="b">종료일</th>
                        <th class="b">지원담당자</th>
                        <th class="b">지원시간(분)</th>
                        <th class="b">지원방법</th>
                        <th class="b">지원내용</th>
                        <th class="b">심각도</th>
                        <th class="b"></th>
                    </tr>
                </thead>
                 <tbody>
                 	<c:forEach items="${work_data_list }" var="wd_list" varStatus="wdStatus">
	                 	<tr data="added">
							<td>${wd_list.str_date }</td>
							<td>${wd_list.end_date }</td>
							<td>${wd_list.reg_user_name }</td>
							<td>${wd_list.support_time }</td>
							<td>${wd_list.support_type }</td>
							<td>${wd_list.support_content }</td>
							<td>
								<c:choose>
									<c:when test="${wd_list.severity eq 0}">
										하
									</c:when>
									<c:when test="${wd_list.severity eq 1}">
										중
									</c:when>
									<c:otherwise>
										상
									</c:otherwise>
								</c:choose>
							</td>
							<td><a id="del_btn" style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a></td>
						</tr>
					</c:forEach>
					<tr data="add">
						<td><input id="str_date" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="end_date" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="reg_user_name" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="support_time" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="support_type" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="support_content" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td>
							<select id="severity" name="" class="selectOrgN">
								<option value="2">상</option>
								<option value="1">중</option>
								<option value="0">하</option>
	                  		</select>
						<td>
							<a id="del_btn" style="cursor:pointer;" onclick="removeRecord(this)" style="cursor:pointer;" class="btn btn-sm btn_color_navy">삭제</a>
						</td>
					</tr>
                 </tbody>
             </table>
			<div class="btn-area lb">
                <a style="cursor:pointer;" onclick="addRecord()" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>행추가</a>
            </div>
            <div class="btn-area cb">
             	<a style="cursor:pointer;" onclick="goWorkList()" class="btn btn-big btn_green btn-150">이전</a>
                <a style="cursor:pointer;" onclick="saveWorkData(${dataset_idx})" class="btn btn-big btn_green btn-150">저장</a>
            </div>
         </div>
        </div>
      </div>
    </div>
    <!-- container end-->
<form action="" method="post" id="moveForm">
	<input type="hidden" name="project_idx" value="${project_info.project_idx }">
	<input type="hidden" name="schedule_idx" value="${schedule_info.schedule_idx }"/>
</form>
</body>
</html>