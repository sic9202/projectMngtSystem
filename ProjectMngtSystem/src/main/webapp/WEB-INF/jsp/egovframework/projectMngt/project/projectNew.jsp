<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<body>
	<script src="/js/projectMngt/project.js">
		$("#project_reg_date").datepicker({
			dateFormat: 'yy-mm-dd'
			, changeMonth: true
			, yearSuffix: "년"
			, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, dayNamesMin: ['일','월','화','수','목','금','토']
		});	
	</script>
	<div class="sub-visual sv01 on">
		<p class="animated on">프로젝트관리</p>
	</div>
	<div class="pr-page">
		<div class="inner02">
			<p class="sub__tit01"> 프로젝트신규</p>
			<div class="board_detail_contents">
				<table class="tbl_info sm">
					<caption> 표</caption>
					<colgroup>
						<col style="width:20%">
						<col style="width:80%">
					</colgroup>
					<tbody>
						<tr>
							<th>프로젝트명 <span class="red">*</span></th>
							<td class="lb">
								<input id="project_name" type="text" class="inputOrg"/> 
							</td>
						</tr>				
						<tr>
							<th>프로젝트타입</th>
							<td class="lb"><input id="project_type" type="text" class="inputOrg" placeholder="ex) 데이터마이그레이션"/></td>
						</tr>
						<tr>
							<th>프로젝트설명</th>
							<td class="lb"><input id="project_info" type="text" class="inputOrg"/></td>
						</tr>
						<tr>
							<th>등록일자</th>
							<td class="lb"><input id="project_reg_date" class="inputOrg" type="text" title="" placeholder=""></td>
						</tr>
						<tr>
							<th>등록자</th>
							<td class="lb">${login_info.user_name }</td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" id="id_check" value="0" />	
				<div class="btn-area cb">
					<a style="cursor: pointer;" onclick="projectNew()" class="btn btn-big btn_green btn-150">등록</a>
					<a href="javascript:history.back();" class="btn btn-big btn_green btn-150">취소</a>
				</div>
			</div>
		</div>
	</div>
</body>