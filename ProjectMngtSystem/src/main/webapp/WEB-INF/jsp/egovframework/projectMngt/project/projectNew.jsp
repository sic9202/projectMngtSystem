<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<body>
	<script src="/js/projectMngt/project.js"></script>
	<div class="sub-visual sv01 on">
		<p class="animated on">프로젝트관리</p>
	</div>
	<div class="pr-page">
		<div class="inner02">
			<c:set var="chk" value="${project_info ne null and project_info ne '' }"/>
			<p class="sub__tit01">
			<c:if test="${chk}">
				프로젝트수정
			</c:if>
			<c:if test="${!chk}">
				프로젝트신규
			</c:if>
			</p>
			<div class="board_detail_contents">
			<c:if test="${chk}">
				<div class="btn-area rb">
					<a style="cursor:pointer;" onclick="delProject(${project_info.project_idx})" class="btn btn-big btn_color_red btn-150">삭제</a>
				</div>
			</c:if>
				<table class="tbl_info sm">
					<caption> 표</caption>
					<colgroup>
						<col style="width:15%">
						<col style="width:35%">
						<col style="width:15%">
						<col style="width:35%">
					</colgroup>
					<tbody>
						<tr>
							<th>프로젝트명<span class="red">*</span></th>
							<td class="lb" colspan="3">
								<input id="project_name" type="text" class="inputOrg" value='<c:if test="${chk}">${project_info.project_name }</c:if>'/> 
							</td>
						</tr>
						<tr>
							<th>프로젝트PM<span class="red">*</span></th>
							<td class="lb">
								<input id="project_pm" type="text" class="inputOrg" value='<c:if test="${chk}">${project_info.project_pm }</c:if>'/>
							</td>
							<th>프로젝트기간<span class="red">*</span></th>
							<td class="lb">
								<input id="project_period" type="text" class="inputOrg" value='<c:if test="${chk}">${project_info.project_period }</c:if>'/>
							</td>
						</tr>	
						<tr>
							<th>고객사<span class="red">*</span></th>
							<td class="lb">
								<input id="customer" type="text" class="inputOrg" value='<c:if test="${chk}">${project_info.customer }</c:if>'/>
							</td>
							<th>고객사PM<span class="red">*</span></th>
							<td class="lb">
								<input id="customer_pm" type="text" class="inputOrg"value='<c:if test="${chk}">${project_info.customer_pm }</c:if>'/>
							</td>
						</tr>
						<tr>
							<th>프로젝트설명</th>
							<td class="lb" colspan="3">
								<input id="project_info" type="text" class="inputOrg" value='<c:if test="${chk}">${project_info.project_info }</c:if>'/>
							</td>
						</tr>
						<tr>
							<th>등록일<span class="red">*</span></th>
							<td class="lb">
								<input id="project_reg_date" class="inputOrg" type="text" value='<c:if test="${chk}"><fmt:formatDate pattern="yyyy-MM-dd" value="${project_info.project_reg_date }"/></c:if>'>
							</td>
							<th>등록자</th>
							<td class="lb">${login_info.user_name }</td>
						</tr>
					</tbody>
				</table>
				<input type="hidden" id="id_check" value="0" />	
				<div class="btn-area cb">
				<c:if test="${chk}">
					<a style="cursor: pointer;" onclick="projectNew(${project_info.project_idx})" class="btn btn-big btn_green btn-150">저장</a>
				</c:if>
				<c:if test="${!chk}">
					<a style="cursor: pointer;" onclick="projectNew()" class="btn btn-big btn_green btn-150">등록</a>
				</c:if>
					<a href="javascript:history.back();" class="btn btn-big btn_green btn-150">취소</a>
				</div>
			</div>
		</div>
	</div>
</body>