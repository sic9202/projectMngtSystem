<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
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
	<!-- header start-->
	<script type="text/javascript">
	    function fn_search(){
	    	var keyword = $("#keyword").val();
	    	location.href = "/list_search.do?keyword="+keyword;
	    }
	
	</script>
	<!--header end-->
	
	<!-- container start-->
	<div>
	    <section class="section main_section01 fp-section active fp-table fp-completely" data-fp-styles="null" data-anchor="mainvisual" style="height: 969px;">
	        <div class="fp-tableCell" style="height: 969px;">
	            <div class="main__visual">
	
	                <div class="visual__txt">
	                    <p class="txt01">data ㆍ insight ㆍ value</p>
	                    <p class="txt02">함께 만드는 빅데이터<br>함께 누리는 가치</p>
	                </div>
	                <!-- input-box -->
	                <div class="input-box">
	                    <input type="search" id="keyword" name="keyword" title="검색어를 입력해 주세요"
	                        placeholder="찾으시는 데이터의 키워드를 입력하세요." autocomplete="off"
	                        class="input-text">
	                    <button type="button" class="btn-search" onclick="fn_search();"><i
	                            class="xi-magnifier"></i></button>
	
	                    <div id="autoCompleteDiv" class="atcmp_wrap suggest-wrap" style="display:none;">
	                        자동완성 기능<br>자동완성 기능
	                    </div>
	                </div>
	
	            </div>
	        </div>
		</section>
	</div>
	<!-- container end-->
</body>

</html>