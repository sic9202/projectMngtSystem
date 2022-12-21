<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<body>
	<script src="/js/projectMngt/work.js"></script>
	<script type="text/javascript"></script>
	<div class="sub-visual sv01 on">
<!-- 		<p class="animated on">업무상세</p> -->
	</div>
    <!--header end-->

    <!-- container start-->
	<div class="pr-page">
		<div class="inner02">
			<p class="sub__tit01">업무상세</p>
			<div class="board_detail_contents">
				<div class="btn-area rb">
					<a style="cursor:pointer;" onclick="goWorkNew()" style="cursor: pointer;" class="btn btn-big btn_green btn-150">수정</a>
				</div>
				<div class="data-view-result">
<!-- 					<p class="date"> -->
<%-- 						<span>업무등록일자 : <fmt:formatDate pattern="yyyy-MM-dd" value="${work_info.work_reg_date }"/></span> --%>
<!-- 					</p> -->
					<p class="title">${work_info.work_name }</p>
					<p class="cate">
						<span class="cate19">경로</span> <span>${project_info.project_name } > ${schedule_info.schedule_name }</span>
					</p>
				</div>
				<div class="tab_borad_in_wrap">
					<ul class="tab_board_in">
					
            		</ul>
				</div>        
				<div id="work_data">
					<input type="hidden" name="totalCnt" value="${totalCnt }"/>
					<table class="tbl_info sm">
						<caption> 표</caption>
						<colgroup>
							<col style="width:11%">
							<col style="width:11%">
							<col style="width:7%;">
							<col style="width:7%;">
							<col style="width:15%;">
							<col style="width:auto;">
							<col style="width:7%;">
<%-- 							<col style="width:7%;"> --%>
<%-- 							<col style="width:7%;"> --%>
						</colgroup>
						<thead>
							<tr>
								<th class="b">시작일</th> 
								<th class="b">종료일</th>
								<th class="b">담당자</th>
								<th class="b">지원시간(분)</th>
								<th class="b">지원방법</th>
								<th class="b">지원내용</th>
								<th class="b">중요도</th>
<!-- 								<th class="b">파일</th> -->
<!-- 								<th class="b"></th> -->
							</tr>
						</thead>
						<tbody>
					<c:if test="${fn:length(work_data_list) != 0 }">
						<c:forEach items="${work_data_list }" var="wd_list" varStatus="wdStatus">
							<tr data="added">
								<td>${wd_list.str_date }</td>
								<td>${wd_list.end_date }</td>
								<td>${wd_list.work_data_manager }</td>
								<td>${wd_list.support_time }</td>
								<td style="text-align: left;">${wd_list.support_type }</td>
<%-- 								<td onclick="workDataView(${wd_list.work_data_idx })" style="cursor: pointer;"><a class="ellipsis-box">${wd_list.support_content }</a></td> --%>
								<td class="sbj">
									<a class="ellipsis-box" onclick="workDataView(${wd_list.work_data_idx })" style="cursor: pointer; ">${wd_list.support_content }</a>
								</td>
								<td>
									<c:choose>
										<c:when test="${wd_list.severity eq 2 }">상</c:when>
										<c:when test="${wd_list.severity eq 1 }">중</c:when>
										<c:when test="${wd_list.severity eq 0 }">하</c:when>
									</c:choose>
								</td>
<%-- 								<td>
							<c:choose>
								<c:when test="${wd_list.del_yn eq 'N'}">
									<img title="${wd_list.file_name}" src="/image/common/download.png" id="" onclick="fileDownload(${wd_list.file_idx})" style="width: 20px; height: 20px; display: inline-block; margin: 0px 3px; cursor: pointer;">
									<img src="/image/common/delete.png" id="del_file_btn_${wd_list.work_data_idx }" onclick="delUploadFile(${wd_list.file_idx})" style="width: 20px; height: 20px; display: inline-block; margin: 0px 3px; cursor: pointer;">
								</c:when>
								<c:otherwise>
									<label for="uploadFile_${wd_list.work_data_idx }">
										<img src="/image/common/upload.png" id="uploadFileBtn_${wd_list.work_data_idx }" style="width: 20px; height: 20px; display: block; margin: 0px auto; cursor: pointer;">
									</label>
									<input type="file" id="uploadFile_${wd_list.work_data_idx }" style="display: none;" onchange="fileUpload(${wd_list.work_data_idx })" required="required"/>	
								</c:otherwise>
							</c:choose>
								</td> --%>
<!-- 								<td> -->
<%-- 									<a id="cncl_btn_${wdStatus.index }" style="cursor:pointer; display:none;" onclick="cancelRecord(${wdStatus.index })" class="btn btn-sm btn_color_navy" >취소</a> --%>
<%-- 									<a id="upd_btn_${wdStatus.index }" style="cursor:pointer" onclick="updateRecord(${wdStatus.index })" class="btn btn-sm btn_color_navy">수정</a> --%>
<%-- 									<a id="del_btn_${wdStatus.index }" style="cursor:pointer" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a> --%>
<%-- 									<input type="hidden" id="work_data_idx_${wdStatus.index }" value="${wd_list.work_data_idx }" /> --%>
<%-- 									<input type="hidden" id="hidden_support_content_${wdStatus.index }" value="${wd_list.support_content }"/> --%>
<!-- 								</td> -->
							</tr>
						</c:forEach>
					</c:if>
						<c:if test="${fn:length(work_data_list) == 0 }">
							<tr data="none">
								<td colspan="7">조회된 데이터가 없습니다.</td>
							</tr>
						</c:if>
						</tbody>
					</table>
					<input type="hidden" id="user_name" value="${login_info.user_name }"/>
					<input type="hidden" id="user_idx" value="${login_info.user_idx }"/>
					<div class="btn-area lb">
<!-- 						<a style="cursor:pointer;" onclick="addRecord()" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>행추가</a> -->
						<a style="cursor:pointer;" onclick="addRecordPopUp()" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>업무추가</a>
					</div>
					<div class="btn-area cb">
						<a style="cursor:pointer;" onclick="goWorkList()" class="btn btn-big btn_green btn-150">목록</a>
					</div>
				</div>
			</div>
        </div>
	</div>
    <!-- container end-->
	<form action="" method="post" id="moveForm">
		<input type="hidden" name="project_idx" value="${project_info.project_idx }">
		<input type="hidden" name="schedule_idx" value="${schedule_info.schedule_idx }"/>
		<input type="hidden" name="work_idx" value="${work_info.work_idx}"/>
	</form>
</body>
<div id="modal_content_added" class="jquery-modal blocker current" style="display: none;">
	<div id="work_data_added_modal" class="modal large" style="display: inline-block;">
<!-- 		<a href="#close-modal" rel="modal:close" class="close-modal"><i class="xi-close-min"></i>Close</a> -->
		<a style="cursor: pointer;" onclick="goWorkView(${work_info.work_idx})" class="close-modal"><i class="xi-close-min"></i>Close</a>
		<!-- 레이어팝업  data-->
		<a href="#focus" class="disabled layer-focus" id="layer_added_data_pop">레이어로 포커스 이동 됨</a>
		<div class="layer-title">데이터상세</div>
		<!-- layer-contents -->
		<div class="layer-contents">
			<p class="sub__tit05"></p>
			<table id="work_data_added" class="tbl_info2">
				<caption> 표</caption>
				<colgroup>
					<col style="width:15%">
					<col style="width:35%">
					<col style="width:15%">
					<col style="width:35%">
				</colgroup>
				<tbody>
					<!-- js에서 넣어주는 부분 -->
				</tbody>
			</table>
		</div>
		<!--// layer-contents -->
		<!-- layer-bottom -->
		<div id="modal_added_btn" class="btn-area cb">
			<input type="hidden" id="work_data_idx" value="">
			<a style="cursor:pointer;" onclick="updWorkData()" class="btn btn-big btn_green btn-150">수정</a>
			<a style="cursor:pointer;" onclick="delWorkData(${work_info.work_idx})" class="btn btn-big btn_color_red btn-150">삭제</a>
		</div>
		<!--// layer-bottom -->
		<!--// 레이어팝업 - data -->
	</div>
</div>
<div id="modal_content_add" class="jquery-modal blocker current" style="display: none;">
	<div id="work_data_add_modal" class="modal large" style="display: inline-block;">
<!-- 		<a href="#close-modal" rel="modal:close" class="close-modal"><i class="xi-close-min"></i>Close</a> -->
		<a style="cursor: pointer;" onclick="goWorkView(${work_info.work_idx})" class="close-modal"><i class="xi-close-min"></i>Close</a>
		<!-- 레이어팝업  - sample -->
		<a href="#focus" class="disabled layer-focus" id="layer_add_preview_pop">레이어로 포커스 이동 됨</a>
		<div class="layer-title">데이터신규</div>
		<!-- layer-contents -->
		<div class="layer-contents">
			<p class="sub__tit05"></p>
			<table id="work_data_add" class="tbl_info2">
				<caption> 표</caption>
				<colgroup>
					<col style="width:15%">
					<col style="width:35%">
					<col style="width:15%">
					<col style="width:35%">
				</colgroup>
				<tbody>
					<tr>
						<th>지원시간(분)</th>
						<td class="lb"><input id="support_time" class="inputOrg" type="text" title="" placeholder=""></td>
						<th>담당자</th>
						<td class="lb"><input id="work_data_manager" class="inputOrg" type="text" title="" placeholder=""></td>
					</tr>
					<tr>
						<th>시작일</th>
						<td class="lb"><input id="str_date" class="inputOrg" type="text" title="" placeholder=""></td>
						<th>종료일</th>
						<td class="lb"><input id="end_date" class="inputOrg" type="text" title="" placeholder=""></td>
					</tr>
					<tr>
						<th>지원방법</th>
						<td class="lb" colspan="3"><input id="support_type" class="inputOrg" type="text" title="" placeholder=""></td>
					</tr>
					<tr>
						<th>지원내용</th>
						<td id="support_content" colspan="3"><textarea rows="1" cols="30" style="resize: none; width: 100%; height: 300px;"></textarea></td>
					</tr>
					<tr>
						<th>중요도</th>
						<td class="lb" colspan="3">
							<select id="severity" class="selectOrgN">
								<option value="2">상</option>
								<option value="1">중</option>
								<option value="0">하</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--// layer-contents -->
		<!-- layer-bottom -->
		<div class="btn-area cb">
			<a style="cursor:pointer;" onclick="saveWorkData(${work_info.work_idx})" class="btn btn-big btn_green btn-150">저장</a>
<!-- 			<a href="#" rel="modal:close" class="btn btn-big btn_gray btn-150">닫기</a> -->
			<a style="cursor: pointer;" onclick="goWorkView(${work_info.work_idx})" class="btn btn-big btn_gray btn-150">닫기</a>
		</div>
		<!--// layer-bottom -->
		<!--// 레이어팝업 - sample -->
	</div>
</div>