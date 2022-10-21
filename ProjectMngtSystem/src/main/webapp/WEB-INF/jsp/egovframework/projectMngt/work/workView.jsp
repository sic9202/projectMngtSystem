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
	<script src="/js/dataset/datasetView.js"></script>
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
			<div class="btn-area lb">
           		<a href="javascript:history.back();" onclick="" class="btn btn-big btn_green btn-150">목록</a>
	        </div>
	        <div class="data-view-result">
	        	<p class="cate"><span class="cate19">프로젝트명</span> <span>${project_info.project_name }</span></p>
	            <p class="date">
	              <span>등록일자 : <fmt:formatDate pattern="yyyy-MM-dd" value="${work_info.work_reg_date }"/> </span>
	            </p>
	            <p class="title">${work_info.work_name }</p>
	            <p class="text">
		        	주기적인 모니터링을 하되 특정 이슈가 발생 하면 그에 대한 가이드가 최대한 빨리 나오도록 확인이 필요 합니다.
	            </p>
	       	</div>
          <div class="tab_borad_in_wrap">
            <ul class="tab_board_in">
              <%-- <li id="tab1" class="active" style="cursor:pointer;"><a onclick="datasetInfo(${dataset_idx})">배포정보</a></li> --%>
              <%-- <li id="tab2" class="active" style="cursor:pointer;"><a onclick="datasetLayout(${dataset_idx})">데이터명세</a></li> --%>
              <%-- <li id="tab3" class="inactive" style="cursor:pointer;"><a onclick="datasetSample(${dataset_idx})">샘플데이터</a></li> --%>
            </ul>
          </div>        
<!-- 데이터명세 시작 -->
         <div id="dataset_layout">
            <table class="tbl_info sm">
                <caption> 표</caption>
                <colgroup>
                    <col style="width:5%">
                    <col style="width:auto;">
                    <col style="width:10%;">
                </colgroup>
                <thead>
                    <tr>
                        <th class="b">번호</th>
                        <th class="b">등록내용</th>
                        <th class="b">등록자</th>
<!--                         <th class="b">길이</th> -->
<!--                         <th class="b">PK여부</th> -->
<!--                         <th class="b">Null여부</th> -->
<!--                         <th class="b">컬럼 설명</th> -->
<!--                         <th class="b">도메인</th> -->
<!--                         <th class="b">개인정보 여부</th> -->
                    </tr>
                </thead>
                <tbody>
                	<tr data="added">
						<td>1</td>
						<td><input id="content" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td>신인철</td>
					</tr>
					
                	<tr data="add" style="display:none;">
						<td><input id="column_name_'+rowCnt+'"type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="kor_name_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><select id="data_type_'+rowCnt+'" class="selectOrg"></select></td>
						<td><input id="data_length_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value="20"/></td>
						<td>
							<select id="pk_yn_'+rowCnt+'" class="selectOrg">
							<option value="">-선택-</option>
							<option value="0" selected>n</option>
							<option value="1">y</option>
							</select>
						</td>
						<td>
							<select id="null_yn_'+rowCnt+'" class="selectOrg">
							<option value="">-선택-</option>
							<option value="0" selected>n</option>
							<option value="1">y</option>
							</select>
						</td>
						<td><input id="column_desc_'+rowCnt+'"type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><select id="data_domain_'+rowCnt+'"class="selectOrg"></select></td>
						<td><select id="privacy_type_'+rowCnt+'" class="selectOrg"></select></td>
						<td><a id="layout_del_btn_'+rowCnt+'" style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a></td>
					</tr>
                </tbody>
            </table>
            <div class="btn-area lb">
                <a style="cursor:pointer;" onclick="addDatasetLayout()" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>
                    컬럼추가</a>
            </div>
            <div class="btn-area cb">
                <a style="cursor:pointer;" onclick="saveDatasetLayout(${dataset_idx})" class="btn btn-big btn_green btn-150">저장</a>
            </div>
         </div>
<!-- 데이터명세 끝  -->
<!-- 샘플데이터 시작 -->
         <div id="dataset_sample"  style="display:none;">
         	<table class="tbl_info sm">
                 <caption> 표</caption>
                 <colgroup>
                     <col style="width:30%">
                     <col style="width:60%">
                     <col style="width:10%;">
                 </colgroup>
                 <thead>
                    <tr>
                        <th class="b">컬럼명</th>
                        <th class="b">샘플데이터</th>
                        <th class="b"></th>
                    </tr>
                </thead>
                 <tbody>
                 	<tr data="added">
						<input type="hidden" id="smpl_data_layout_idx" value="data_layout_idx"/>
						<td><input readonly id="smpl_column_name" type="text" class="inputOrg" maxlength="50" value="kor_name"/></td>
						<td><input id="sample_record" type="text" class="inputOrg" maxlength="50" value="sample_record"/></td>
						<td><a id="sample_del_btn" style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a>
					</tr>
					<tr data="add">
						<td><input id="column_name" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><input id="sample_record" type="text" class="inputOrg" maxlength="50" value=""/></td>
						<td><a id="sample_del_btn" style="cursor:pointer;" onclick="removeRecord(this)" style="cursor:pointer;" class="btn btn-sm btn_color_navy">삭제</a>
					</tr>
                 </tbody>
             </table>
<!--              
             <div class="btn-area lb">
                 <a href="#" onclick="" class="btn btn-sm btn_color_navy"><i class="xi-download-disk"></i>
                     컬럼추가</a>
             </div>
-->             
             <div class="btn-area cb">
                <a style="cursor:pointer;" onclick="saveDatasetSample(${dataset_idx})" class="btn btn-big btn_green btn-150">저장</a>
            </div>
         </div>
<!-- 샘플데이터 시작 -->          
        </div>
      </div>
    </div>
    <!-- container end-->

</body>

</html>