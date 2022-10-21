<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
  	<script src="/js/dataset/datasetList.js"></script>
    <div class="sub-visual sv01 on">
      <p class="animated on">보유 데이터셋</p>
    </div>
    <!--header end-->

    <!-- container start-->
    <input type="hidden" name="menuCode" value="">
    <div class="pr-page">
      <div class="inner02">
        <p class="sub__tit01">데이터명세 신규 등록</p>
        <div class="etc__box"><input type="text" id="" name="data_name" class="inputOrg" maxlength="50" title="데이터를 입력하세요"
            placeholder="데이터를 입력하세요">
        </div>
        <div class="btn-area cb">
          <a style="cursor: pointer;" onclick="datasetNew()" class="btn btn-big btn_green btn-150">등록</a>
        </div>
		<input type="hidden" name="org_idx" value="${org_idx }">
		<input type="hidden" name="user_idx" value="${user_idx }">
      </div>
      <!-- container end-->
    </div>

</body>
</html>