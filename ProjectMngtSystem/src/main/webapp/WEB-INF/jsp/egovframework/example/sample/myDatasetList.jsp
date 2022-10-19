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
    <script src="/js/cmm/common.js"></script>

</head>
<body>
  	<script src="/js/dataset/myDataset.js"></script>
	<script type="text/javascript">
		$().ready(function(){
			getMyDatasetList(0);
		});
	</script>
    <div class="sub-visual sv01 on">
      <p class="animated on">관심목록</p>
    </div>
    <!--header end-->


    <!-- container start-->
    <div class="pr-page">
      <div class="inner02">
        <p class="sub__tit01"> 관심목록 <span class="sub__tit02"></span></p>


        <div class="board_top">
          <p class="lb count">
            <span>총 <b id="totalCnt"></b>건</span>
          </p>
          <div class="board_search_box">
            <label class="blind" for="">검색 분류</label>
            <select id="searchType" class="search_select" name="">
              <option value="">선택</option>
              <option value="10">데이터명</option>
              <option value="20">키워드</option>
              <option value="30">등록자</option>
            </select>
            <label class="blind" for="">검색어 입력</label>
            <input id="searchContent" type="text" class="txt_search" name="" value="" placeholder="검색어 입력">
            <button type="button" class="btn_search" onclick="getMyDatasetList(1)"><i class="xi-magnifier"></i> 검색</button>
            <input type="hidden" name="pageNo" id="pageNo" value="" />
            <input type="hidden" name="listSize" id="listSize" value="10" />
          </div>
        </div>

        <!-- 데이터 리스트-->
		<div id="data_content">
			<div class="data-view-result">
	          <p class="text">조회된 데이터가 없습니다.</p>
	        </div>
		</div>
        <div id="pagination">
          <!-- 페이지 많이지면 생김 a href="#"
              class="btn" title="첫 페이지"><i
                class="xi-angle-double-left"></i><span class="blind">첫 페이지</span></a><a href="#" class="btn" 
              title="이전 페이지"><i class="xi-angle-left"></i><span class="blind">이전 페이지</span></a-->
         <!--  <a href="#" class="on" title="현재 페이지">1</a><a href="#">2</a><a href="#">3</a><a href="#">4</a><a
            href="#">5</a><a href="#" class="btn" title="다음 페이지"><i class="xi-angle-right"></i><span class="blind">다음
              페이지</span></a><a href="#" class="btn" title="마지막 페이지"><i class="xi-angle-double-right"></i><span
              class="blind">마지막 페이지</span></a> -->
        </div>
      </div>
      <!-- container end-->
      
	</div>
<form action="" method="post" id="moveForm">
	<input type="hidden" name="org_idx" value="${org_idx }">
	<input type="hidden" name="user_idx" value="${user_idx }"/>
	<input type="hidden" name="dataset_idx" value=""/>	
</form>	
</body>

</html>