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
  	<script src="/js/projectMngt/work.js"></script>
    <div class="sub-visual sv01 on">
      <p class="animated on">업무관리</p>
    </div>
    <!--header end-->

    <!-- container start-->
    <input type="hidden" name="menuCode" value="">
    <div class="pr-page">
      <div class="inner02">
        <p class="sub__tit01">업무신규</p>
        <div class="etc__box"><input type="text" id="" name="work_name" class="inputOrg" maxlength="50" title="데이터를 입력하세요"
            placeholder="데이터를 입력하세요">
        </div>
        <div class="btn-area cb">
          <a style="cursor: pointer;" onclick="workNew()" class="btn btn-big btn_green btn-150">등록</a>
        </div>
      </div>
      <!-- container end-->
    </div>
<form action="" method="post" id="moveForm">
	<input type="hidden" name="project_idx" value="${project_idx }">
	<input type="hidden" name="schedule_idx" value="${schedule_idx }"/>
</form>
</body>
</html>