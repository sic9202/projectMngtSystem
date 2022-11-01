
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

function goProjectNew(){
	window.location.href = encodeURI("/goProjectNew.do");
}

function projectNew(){
	var user_idx = $("input[name=user_idx]").val();
	var project_name = $("input[name=project_name]").val();
	
	if(project_name == ""){
		alert("프로젝트명을 입력해주세요.");
		$("input[name=project_name]").focus();
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/projectNew.do",
		data: {
			user_idx: user_idx,
			project_name: project_name
		},
		success: function(r){
			if(r == 1){
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

function goScheduleList(project_idx){
	$("#moveForm").attr("action", "/scheduleList.do");
	$("#moveForm input[name=project_idx]").val(project_idx);
	$("#moveForm").submit();
}
