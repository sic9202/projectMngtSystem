function movePage(pageNo){
	$("#pageNo").val(pageNo);
	getShareDatasetList(0 ,pageNo)
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
