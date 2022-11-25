function movePage(pageNo){
	$("#moveForm").attr("action", "/scheduleList.do");
	$("#moveForm input[name=currentPageNo]").val(pageNo);
	$("#moveForm").submit();
}

function goScheduleNew(){
	$("#moveForm").attr("action", "/goScheduleNew.do");
	$("#moveForm").submit();
}

function scheduleNew(schedule_idx){
	var project_idx = $("input[name=project_idx]").val();
	var schedule_name = $("#schedule_name").val();
	var schedule_manager = $("#schedule_manager").val();
	var schedule_period = $("#schedule_period").val();
	var schedule_info = $("#schedule_info").val();
	var schedule_reg_date = $("#schedule_reg_date").val();
	
	if(check_schedule_val()){
		$.ajax({
			type: "POST",
			url: "/scheduleNew.do",
			data: {
				project_idx: project_idx,
				schedule_name: schedule_name,
				schedule_manager: schedule_manager,
				schedule_period: schedule_period,
				schedule_info: schedule_info,
				schedule_reg_date: schedule_reg_date,
				schedule_idx: schedule_idx
			},
			success: function(r){
				if(r > 0){
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
	
}

function check_schedule_val(){
	var result = true;
	var schedule_name = $("#schedule_name").val();
	var schedule_manager = $("#schedule_manager").val();
	var schedule_period = $("#schedule_period").val();
	var schedule_reg_date = $("#schedule_reg_date").val();
	
	if(schedule_name == null || schedule_name.trim() == ""){
		alert("단계를 입력해주세요.");
		$("#schedule_name").focus();
		result = false;
		return false;
	}
	
	if(schedule_manager == null || schedule_manager.trim() == ""){
		alert("담당자를 입력해주세요.");
		$("#schedule_manager").focus();
		result = false;
		return false;
	}
	
	if(schedule_period == null || schedule_period.trim() == ""){
		alert("기간을 입력해주세요.");
		$("#schedule_period").focus();
		result = false;
		return false;
	}
	
	var date_pattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	if (schedule_reg_date == null || schedule_reg_date.trim() == ""){
		alert("등록일을 입력해주세요.");
		result = false;
		return false;
	}else if(!schedule_reg_date.match(date_pattern)){
		alert("날짜형식에 맞지 않는 데이터가 입력되었습니다. 다시 입력해주세요.");
		result = false;
		return false;
	}
	
	return result;
}

function goWorkList(schedule_idx){
	$("#moveForm").attr("action", "/workList.do");
	$("#moveForm input[name=schedule_idx]").val(schedule_idx);
	$("#moveForm").submit();
}

function goProjectList(){
	window.location.href = encodeURI("/projectList.do");
}

function goProjectNew(){
	$("#moveForm").attr("action", "/goProjectNew.do");
	$("#moveForm").submit();
}

function delSchedule(schedule_idx){
	if(confirm("해당 일정 하위의 모든 데이터가 삭제됩니다. 그래도 삭제하시겠습니까?") == true){
		var schedule_idx = schedule_idx;
		$.ajax({
			type: "POST",
			url: "/delSchedule.do",
			data: {
				schedule_idx: schedule_idx
			},
			success: function(r){
				if(r > 0){
					alert("삭제가 완료되었습니다.")
					$("#moveForm").attr("action", "/scheduleList.do");
					$("#moveForm").submit();
				}else{
					alert("삭제에 실패했습니다.");
					$("#moveForm").attr("action", "/scheduleList.do");
					$("#moveForm").submit();	
				}
			},
			error: function(error){
				alert("통신 실패");
				$("#moveForm").attr("action", "/scheduleList.do");
				$("#moveForm").submit();
			}
		})
	}
}

$(document).ready(function(){
	$("#schedule_reg_date").datepicker({
		dateFormat: 'yy-mm-dd'
		, changeMonth: true
		, yearSuffix: "년"
		, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		, dayNamesMin: ['일','월','화','수','목','금','토']	
	});
});
