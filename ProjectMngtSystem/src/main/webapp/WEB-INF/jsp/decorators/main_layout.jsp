<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/page" prefix="page"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
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
    <style type="text/css">
    	.ellipsis-box {
		    display: -webkit-box;
		    -webkit-box-orient: vertical;
		    word-wrap: break-word;
		    text-overflow: ellipsis;
		    overflow: hidden;
		    -webkit-line-clamp: 1;
		    text-align: left;
		}
/* 		.tbl_info tbody tr:hover { background-color: #f2f5ff; } */
    </style>
</head>
<body>
	
	<div class="wrap">
	<!-- header -->
	<page:applyDecorator name="top" encoding="UTF-8"/>
	</div>
	<decorator:body></decorator:body>
	<decorator:getProperty property="div.modal_content_added"></decorator:getProperty>
	<decorator:getProperty property="div.modal_content_add"></decorator:getProperty>
</body>
</html>