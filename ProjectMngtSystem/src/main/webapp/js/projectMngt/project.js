function movePage(pageNo){
	window.location.href = encodeURI("/projectList.do?currentPageNo="+pageNo);
}

function goProjectList(){
	var searchType = $("#searchType").val();
	if(searchType == 0){
		alert("검색항목을 선택해주세요.");
		return false;
	}
	var searchContent = $("#searchContent").val();
	if(searchContent == ""){
		alert("검색어를 입력해주세요.");
		return false;
	}
	
	$("#listForm").attr("action", "/projectList.do");
	$("#listForm input[name=searchType]").val(searchType);
	$("#listForm input[name=searchContent]").val(searchContent);
	$("#listForm").submit();
}

//move projectNew page
function goProjectNew(){
	window.location.href = encodeURI("/goProjectNew.do");
}

//add project
function projectNew(project_idx){
	var project_name = $("#project_name").val();
	var project_pm = $("#project_pm").val();
	var project_period = $("#project_period").val();
	var customer = $("#customer").val();
	var customer_pm = $("#customer_pm").val();
	var project_info = $("#project_info").val();
	var project_reg_date = $("#project_reg_date").val();
	
	
	if(check_project_val()){
		$.ajax({
			type: "POST",
			url: "/projectNew.do",
			data: {
				customer: customer,
				customer_pm: customer_pm,
				project_name: project_name,
				project_pm: project_pm,
				project_period: project_period,
				project_reg_date: project_reg_date,
				project_info: project_info,
				project_idx: project_idx
			},
			success: function(r){
				if(r > 0){
					alert("등록되었습니다.")
					window.location.href = encodeURI("/projectList.do");
				}else{
					alert("등록에 실패했습니다.");
					window.location.href = encodeURI("/projectList.do");
				}
			},
			error: function(error){
				alert("통신 실패");
				window.location.href = encodeURI("/projectList.do");
			}
		});
	}
}

function check_project_val(){
	var result = true;
	var project_name = $("#project_name").val();
	var project_pm = $("#project_pm").val();
	var project_period = $("#project_period").val();
	var customer = $("#customer").val();
	var customer_pm = $("#customer_pm").val();
	var project_reg_date = $("#project_reg_date").val();
	
	if(project_name == null || project_name.trim() == ""){
		alert("프로젝트명을 입력해주세요.");
		$("#project_name").focus();
		result = false;
		return false;
	}
	
	if(project_pm == null || project_pm.trim() == ""){
		alert("프로젝트 PM을 입력해주세요.");
		$("#project_pm").focus();
		result = false;
		return false;
	}
	
	if(project_period == null || project_period.trim() == ""){
		alert("프로젝트기간을 입력해주세요.");
		$("#project_period").focus();
		result = false;
		return false;
	}
	
	if(customer == null || customer.trim() == ""){
		alert("고객사를 입력해주세요.");
		$("#customer").focus();
		result = false;
		return false;
	}
	
	if(customer_pm == null || customer_pm.trim() == ""){
		alert("고객사 PM을 입력해주세요.");
		$("#customer_pm").focus();
		result = false;
		return false;
	}
	
	var date_pattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	if (project_reg_date == null || project_reg_date.trim() == ""){
		alert("등록일을 입력해주세요.");
		result = false;
		return false;
	}else if(!project_reg_date.match(date_pattern)){
		alert("날짜형식에 맞지 않는 데이터가 입력되었습니다. 다시 입력해주세요.");
		result = false;
		return false;
	}
	
	return result;
}

function goScheduleList(project_idx){
	$("#moveForm").attr("action", "/scheduleList.do");
	$("#moveForm input[name=project_idx]").val(project_idx);
	$("#moveForm").submit();
}

function delProject(project_idx){
	if(confirm("해당 프로젝트 하위의 모든 데이터가 삭제됩니다. 그래도 삭제하시겠습니까?") == true){
		var project_idx = project_idx;
		$.ajax({
			type: "POST",
			url: "/delProject.do",
			data: {
				project_idx: project_idx
			},
			success: function(r){
				if(r > 0){
					alert("삭제가 완료되었습니다.")
					window.location.href = encodeURI("/projectList.do");
				}else{
					alert("삭제에 실패했습니다.");
					window.location.href = encodeURI("/projectList.do");
				}
			},
			error: function(error){
				alert("통신 실패");
				window.location.href = encodeURI("/projectList.do");
			}
		});
	}
}

$(document).ready(function(){
	$("#project_reg_date").datepicker({
		dateFormat: 'yy-mm-dd'
		, changeMonth: true
		, yearSuffix: "년"
		, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		, dayNamesMin: ['일','월','화','수','목','금','토']
	});	
});
	
