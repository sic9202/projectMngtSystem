function movePage(pageNo){
	$("#pageNo").val(pageNo);
	getShareDatasetList(0 ,pageNo)
}

function goScheduleNew(){
	$("#moveForm").attr("action", "/goScheduleNew.do");
	$("#moveForm").submit();
}

function scheduleNew(){
	var user_idx = $("input[name=user_idx]").val();
	var project_idx = $("input[name=project_idx]").val();
	var schedule_name = $("input[name=schedule_name]").val();
	
	if(schedule_name == ""){
		alert("공정명을 입력해주세요.");
		$("input[name=schedule_name]").focus();
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/scheduleNew.do",
		data: {
			user_idx: user_idx,
			project_idx: project_idx,
			schedule_name: schedule_name
		},
		success: function(r){
			if(r == 1){
				alert("등록되었습니다.")
				$("#moveForm").attr("action", "/scheduleList.do");
				$("#moveForm").submit();
			}else{
				alert("등록에 실패했습니다.");
				$("#moveForm").attr("action", "/scheduleList.do");
				$("#moveForm").submit();
			}
		},
		error: function(error){
			alert("통신 실패");
			$("#moveForm").attr("action", "/scheduleList.do");
				$("#moveForm").submit();
		}
	});
}

function goWorkList(schedule_idx){
	$("#moveForm").attr("action", "/workList.do");
	$("#moveForm input[name=schedule_idx]").val(schedule_idx);
	$("#moveForm").submit();
}
