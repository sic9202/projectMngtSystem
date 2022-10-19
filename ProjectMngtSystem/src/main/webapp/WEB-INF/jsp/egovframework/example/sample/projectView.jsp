<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>K-ICT 빅데이터 센터</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">


    <meta property="og:type" content="website">
    <meta property="og:title" content="DATAMASQ">
    <meta name="naver-site-verification" content="">
    <meta name="description" content="KICT 빅데이터 센터">
    <meta property="og:description" content="KICT 빅데이터 센터">

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
		$().ready(function(){
			datasetInfo("${dataset_idx}");
		});
	</script>
    <div class="sub-visual sv01 on">
      <p class="animated on">보유 데이터셋</p>
    </div>
    <!--header end-->


    <!-- container start-->

    <div class="pr-page">
      <div class="inner02">
        <p class="sub__tit01"> 보유 데이터셋 <span class="sub__tit02"></span></p>


        <div class="board_detail_contents">
          <table class="tbl_info sm">
            <caption> 표</caption>
            <colgroup>
              <col style="width:20%">
              <col style="width:80%">
            </colgroup>
            <thead>
              <tr>
                <th class="b">데이터명</th>
                <td class="lb"><input type="text" id="data_name" name="" class="inputOrg" maxlength="50" title="회원별 월별 상품 구매내역"
                    placeholder=""></td>
              </tr>
            </thead>
          </table>

          <div class="tab_borad_in_wrap">
            <ul class="tab_board_in">
              <li id="tab1" class="active" style="cursor:pointer;"><a onclick="datasetInfo(${dataset_idx})">배포정보</a></li>
              <li id="tab2" class="inactive" style="cursor:pointer;"><a onclick="datasetLayout(${dataset_idx})">데이터명세</a></li>
              <li id="tab3" class="inactive" style="cursor:pointer;"><a onclick="datasetSample(${dataset_idx})">샘플데이터</a></li>
            </ul>
          </div>

<!-- 배포정보 시작-->
		<div id="dataset_info">
          <table id="dataset_info_data" class="tbl_info sm">
            <caption> 표</caption>
            <colgroup>
              <col style="width:20%">
              <col style="width:30%">
              <col style="width:20%">
              <col style="width:30%">
            </colgroup>
            <thead>
              <tr>
                <th class="b">데이터 분야</th>
                <td class="lb" colspan="3">
                  <select id="selectRegion" class="selectOrgW" name="">
                  </select>
                </td>
              </tr>
            <tbody>
              <tr>
                <th class="b">데이터 설명</th>
                <td class="lb" colspan="3"><input type="text" id="data_desc" class="inputOrg" maxlength="50"
                    title="데이터에 대한 설명을 최대한 상세하게 입력하세요.(최대 50자)" placeholder="데이터에 대한 설명을 최대한 상세하게 입력하세요.(최대 50자)"></td>
                </tr>
                <tr>
                <th class="b">키워드</th>
                <td class="lb" colspan="3"><textarea id="data_keyword" name="data_keyword" class="textarea" cols="95" rows="4" title="기타"
                    placeholder="데이터를 설명할 수 있는 키워드를 입력해주세요. (최대 30개, 콤마(,)로 구분)"></textarea></td>
              </tr>
			  <tr>
                <th class="b">인코딩 방식</th>
                <td class="lb">
                  <select id="selectEncodingType" class="selectOrgW" name="">
                  </select>
                </td>
                <!-- <td class="lb"><input id="encoding_type" type="text" class="inputOrg" maxlength="50" title="데이터를 입력하세요"
                    placeholder="데이터를 입력하세요"></td> -->
                <th class="b">확장자</th>
                <td class="lb">
                  <select id="selectFileExtension" class="selectOrgW" name="">
                  </select>
                </td>
                <!-- <td class="lb"><input id="file_extension" type="text" class="inputOrg" maxlength="50" title="데이터를 입력하세요"
                    placeholder="데이터를 입력하세요"></td> -->
              </tr>
              <tr>
                <th class="b">압축형식</th>
                <td class="lb">
                  <select id="selectCompressionType" class="selectOrgW" name="">
                  </select>
                </td>
               <!-- <td class="lb" colspan="3"><input id="compression_type" type="text" class="inputOrg" maxlength="50"
                    title="데이터를 입력하세요" placeholder="데이터를 입력하세요"></td> -->
              </tr>
              <tr>
                <th class="b">사이즈</th>
                <td class="lb"><input id="dataset_size" type="text" class="inputOrgW rb" maxlength="50" title="사이즈"
                    placeholder="0"> byte</td>
                <th class="b">건수</th>
                <td class="lb" colspan="3"><input id="record_count" type="text" class="inputOrgW rb" maxlength="50"
                    title="건수" placeholder="0"> record</td>
              </tr>
              <tr>
                <th class="b">제공을 위한 처리비용</th>
                <td class="lb" colspan="3"><input type="text" id="processing_cost" class="inputOrgW rb" name="" maxlength="50"
                    title="사이즈" placeholder="0"> 원</td>
              </tr>
              <tr>
                <th class="b">데이터기간</th>
                <td class="lb" colspan="3">
                  <input type="date" id="data_from_date" class="textfield textfield-datepicker datetimepicker hasDatepicker"
                    title="검색 시작 날짜" placeholder="YYYY-MM-DD" autocomplete="off" style="padding-right:3px">
                  ~
                  <input type="date" id="data_end_date" class="textfield textfield-datepicker datetimepicker hasDatepicker"
                    title="검색 종료 날짜" placeholder="YYYY-MM-DD" autocomplete="off" style="padding-right:3px">
                </td>
              </tr>
              <tr>
              	<th class="b">공개여부</th>
              	<td class="lb" colspan="3">
					<div class="radio-group">
						<input type="radio" name="open_yn" value=1>
						<label for="open_yn">공개</label>
					</div>
					<div class="radio-group">
						<input type="radio" name="open_yn" value=0 checked>
						<label for="open_yn">비공개</label>
					</div>
              	</td>
              </tr>
            </tbody>
          </table>
          <div class="btn-area cb">
            <a style="cursor: pointer;" onclick="saveDatasetInfo(${dataset_idx})" class="btn btn-big btn_green btn-150">저장</a>
            <a style="cursor: pointer;" onclick="delDataset(${dataset_idx})" class="btn btn-big btn_color_green btn-150">삭제</a>
          </div>
         </div>
<!-- 배포정보 끝 -->        
<!-- 데이터명세 시작 -->
         <div id="dataset_layout" style="display:none;" >
            <table class="tbl_info sm">
                <caption> 표</caption>
                <colgroup>
                    <col style="width:10%">
                    <col style="width:12%">
                    <col style="width:auto;">
                    <col style="width:8%">
                    <col style="width:10%">
                    <col style="width:10%">
                    <col style="width:12%">
                    <col style="width:10%">
                    <col style="width:10%">
                    <col style="width:8%">
                </colgroup>
                <thead>
                    <tr>
                        <th class="b">컬럼명</th>
                        <th class="b">컬럼한글명</th>
                        <th class="b">데이터타입</th>
                        <th class="b">길이</th>
                        <th class="b">PK여부</th>
                        <th class="b">Null여부</th>
                        <th class="b">컬럼 설명</th>
                        <th class="b">도메인</th>
                        <th class="b">개인정보 여부</th>
                        <th class="b"></th>
                    </tr>
                </thead>
                <tbody>
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
         <div id="dataset_sample" style="display:none;">
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