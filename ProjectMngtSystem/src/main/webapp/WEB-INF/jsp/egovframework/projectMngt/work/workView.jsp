<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<body>
	<script src="/js/projectMngt/work.js"></script>
	<script type="text/javascript">
	</script>
	<div class="sub-visual sv01 on">
<!-- 		<p class="animated on">업무상세</p> -->
	</div>
    <!--header end-->

    <!-- container start-->
	<div class="pr-page">
		<div class="inner02">
			<p class="sub__tit01">업무상세</p>
			<div class="board_detail_contents">
				<div class="data-view-result">
					<p class="cate"><span class="cate19">경로</span> <span>${project_info.project_name } > ${schedule_info.schedule_name }</span></p>
					<p class="date">
						<span>등록일자 : <fmt:formatDate pattern="yyyy-MM-dd" value="${work_info.work_reg_date }"/></span>
					</p>
					<p class="title">${work_info.work_name }</p>
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
							<col style="width:7%;">
							<col style="width:12%;">
						</colgroup>
						<thead>
							<tr>
								<th class="b">시작일</th> 
								<th class="b">종료일</th>
								<th class="b">담당자</th>
								<th class="b">지원시간(분)</th>
								<th class="b">지원방법</th>
								<th class="b">지원내용</th>
								<th class="b">심각도</th>
								<th class="b">파일</th>
								<th class="b"></th>
							</tr>
						</thead>
						<tbody>
					<c:if test="${fn:length(work_data_list) != 0 }">
						<c:forEach items="${work_data_list }" var="wd_list" varStatus="wdStatus">
							<tr data="added">
								<td><input id="str_date_${wdStatus.index }" type="text" class="inputOrg" maxlength="50" value="${wd_list.str_date }" style="border: none; text-align: center;" disabled/></td>
								<td><input id="end_date_${wdStatus.index }" type="text" class="inputOrg" maxlength="50" value="${wd_list.end_date }" style="border:none; text-align: center;" disabled/></td>
								<td>${wd_list.reg_user_name }</td>
								<td><input id="support_time_${wdStatus.index }" type="text" class="inputOrg" maxlength="50" value="${wd_list.support_time }" style="border:none; text-align: center;" disabled/></td>
								<td><input id="support_type_${wdStatus.index }" type="text" class="inputOrg" maxlength="50" value="${wd_list.support_type }" style="border:none;" disabled/></td>
								<td id="support_content_${wdStatus.index }" style="text-align: left;">${wd_list.support_content }</td>
								<td>
									<select id="severity_${wdStatus.index }" class="selectOrgN" style="border:none;" disabled>
										<option value="2" <c:if test="${wd_list.severity eq 2 }">selected="selected"</c:if>>상</option>
										<option value="1" <c:if test="${wd_list.severity eq 1 }">selected="selected"</c:if>>중</option>
										<option value="0" <c:if test="${wd_list.severity eq 0 }">selected="selected"</c:if>>하</option>
									</select>
								</td>
								<td>
							<c:choose>
								<c:when test="${wd_list.del_yn eq 'N'}">
									<img title="${wd_list.file_name}" src="/image/common/download.png" id="" onclick="fileDownload(${wd_list.file_idx})" style="width: 20px; height: 20px; display: inline-block; margin: 0px 3px; cursor: pointer;">
									<img src="/image/common/delete.png" id="del_file_btn_${wdStatus.index }" onclick="delUploadFile(${wd_list.file_idx})" style="width: 20px; height: 20px; display: inline-block; margin: 0px 3px; cursor: pointer;">
								</c:when>
								<c:otherwise>
									<label for="uploadFile_${wdStatus.index }">
										<img src="/image/common/upload.png" id="uploadFileBtn_${wdStatus.index }" style="width: 20px; height: 20px; display: block; margin: 0px auto; cursor: pointer;">
									</label>
									<input type="file" id="uploadFile_${wdStatus.index }" style="display: none;" onchange="fileUpload(${wdStatus.index })" required="required"/>	
								</c:otherwise>
							</c:choose>
								</td>
								<td>
									<a id="cncl_btn_${wdStatus.index }" style="cursor:pointer; display:none;" onclick="cancelRecord(${wdStatus.index })" class="btn btn-sm btn_color_navy" >취소</a>
									<a id="upd_btn_${wdStatus.index }" style="cursor:pointer" onclick="updateRecord(${wdStatus.index })" class="btn btn-sm btn_color_navy">수정</a>
									<a id="del_btn_${wdStatus.index }" style="cursor:pointer" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a>
									<input type="hidden" id="work_data_idx_${wdStatus.index }" value="${wd_list.work_data_idx }" />
									<input type="hidden" id="hidden_support_content_${wdStatus.index }" value="${wd_list.support_content }"/>
								</td>
							</tr>
						</c:forEach>
					</c:if>
						<c:if test="${fn:length(work_data_list) == 0 }">
							<tr data="none">
								<td colspan="9">조회된 데이터가 없습니다.</td>
							</tr>
						</c:if>
						</tbody>
					</table>
					<input type="hidden" id="user_name" value="${login_info.user_name }"/>
					<input type="hidden" id="user_idx" value="${login_info.user_idx }"/>
					<div class="btn-area lb">
<!-- 						<a style="cursor:pointer;" onclick="addRecord()" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>행추가</a> -->
						<a style="cursor:pointer;" onclick="addRecordPopUp()" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>행추가</a>
					</div>
					<div class="btn-area cb">
						<a style="cursor:pointer;" onclick="goWorkList()" class="btn btn-big btn_green btn-150">이전</a>
						<a style="cursor:pointer;" onclick="saveWorkData(${work_info.work_idx})" class="btn btn-big btn_green btn-150">저장</a>
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
<div id="modal_content" class="jquery-modal blocker current" style="display: none;">
      <div id="work_data_modal" class="modal large" style="display: inline-block;">
        <a href="#close-modal" rel="modal:close" class="close-modal"><i class="xi-close-min"></i>Close</a>
        <!-- 레이어팝업  data-->
        <a href="#focus" class="disabled layer-focus" id="layer_data_preview_pop">레이어로 포커스 이동 됨</a>

        <div class="layer-title">업무데이터</div>

        <!-- layer-contents -->
        <div class="layer-contents">

          <p class="sub__tit05"> 업무데이터 이름 </p>
          <table id="dataset_layout" class="tbl_info2">
            <caption> 표</caption>
            <colgroup>
              <col style="width:20%">
              <col style="width:80%">
            </colgroup>
            <tbody>
            	<tr>
	                <th>시작일</th>
	                <td class="lb"><input id="user_pwd" class="inputOrgW" type="text" title="" placeholder=""></td>
	              </tr>
	              <tr>
	                <th>종료일</th>
	                <td class="lb"><input id="user_pwd" class="inputOrgW" type="text" title="" placeholder=""></td>
	              </tr>
	              <tr>
	              	<th>담당자</th>
	              	<td class="lb"><input id="user_pwd" class="inputOrgW" type="text" title="" placeholder=""></td>
	              </tr>
	              <tr>
	              	<th>지원시간(분)</th>
	              	<td class="lb"><input id="user_pwd" class="inputOrgW" type="text" title="" placeholder=""></td>
	              </tr>
	              <tr>
	              	<th>지원방법</th>
	              	<td class="lb"><input id="user_pwd" class="inputOrg" type="text" title="" placeholder=""></td>
	              </tr>
	              <tr>
	              	<th>지원내용</th>
	              	<td id="support_content"><textarea rows="1" cols="30" style="resize: none; width: 100%;"></textarea></td>
	              </tr>
	              <tr>
	              	<th>심각도</th>
	              	<td class="lb"><input id="user_pwd" class="inputOrg" type="text" title="" placeholder=""></td>
	              </tr>
            </tbody>
          </table>

        </div>
        <!--// layer-contents -->

        <!-- layer-bottom -->
        <div class="btn-area cb">
          <a href="#" rel="modal:close" class="btn btn-big btn_gray btn-150">닫기</a>
        </div>
        <!--// layer-bottom -->
        <!--// 레이어팝업 - data -->


        <div class="jquery-modal blocker current" style="display: none;">
          <div id="dataset_sample_modal" class="modal large" style="display: inline-block;">
            <a href="#close-modal" rel="modal:close" class="close-modal"><i class="xi-close-min"></i>Close</a>
            <!-- 레이어팝업  - sample -->
            <a href="#focus" class="disabled layer-focus" id="layer_sample_preview_pop">레이어로 포커스 이동 됨</a>

            <div class="layer-title">샘플 데이터</div>

            <!-- layer-contents -->
            <div class="layer-contents">
              <p class="sub__tit05"> ${result.dataset_info.data_name} </p>
              <table id="dataset_sample" class="tbl_info2">
                <caption> 표</caption>
                <colgroup></colgroup>
                <thead>
                  <tr></tr>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <!--// layer-contents -->
            <!-- layer-bottom -->
            <div class="btn-area cb">
              <a href="#" rel="modal:close" class="btn btn-big btn_gray btn-150">닫기</a>
            </div>
            <!--// layer-bottom -->
            <!--// 레이어팝업 - sample -->
			</div>
		</div>
	</div>
</div>