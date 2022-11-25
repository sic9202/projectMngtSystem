//workList page이동
function movePage(pageNo) {
	$("#moveForm").attr("action", "/workList.do");
	$("#moveForm input[name=currentPageNo]").val(pageNo);
	$("#moveForm").submit();
}

//업무목록 이동
function goWorkList() {
	$("#moveForm").attr("action", "/workList.do");
	$("#moveForm").submit();
}

//업무추가 페이지 이동
function goWorkNew() {
	$("#moveForm").attr("action", "/goWorkNew.do");
	$("#moveForm").submit();
}

//업무 추가
function workNew(work_idx){
	var project_idx = $("input[name=project_idx]").val();
	var schedule_idx = $("input[name=schedule_idx]").val();
	var work_name = $("#work_name").val();
	var work_manager = $("#work_manager").val();
	var work_period = $("#work_period").val();
	var work_info = $("#work_info").val();
	var work_reg_date = $("#work_reg_date").val();
	
	if(check_work_val()){
		$.ajax({
			type: "POST",
			url: "/workNew.do",
			data: {
				project_idx: project_idx,
				schedule_idx: schedule_idx,
				work_name: work_name,
				work_manager: work_manager,
				work_period: work_period,
				work_info: work_info,
				work_reg_date: work_reg_date,
				work_idx: work_idx
			},
			success: function(r){
				if(r = 1){
					alert("등록되었습니다.")
					$("#moveForm").attr("action", "/workList.do");
					$("#moveForm").submit();
				}else{
					alert("등록에 실패했습니다.");
					$("#moveForm").attr("action", "/workList.do");
					$("#moveForm").submit();
				}
			},
			error: function(error){
				alert("통신 실패");
				$("#moveForm").attr("action", "/workList.do");
				$("#moveForm").submit();
			}
		});
	}
}

function check_work_val(){
	var result = true;
	var work_name = $("#work_name").val();
	var work_manager = $("#work_manager").val();
	var work_period = $("#work_period").val();
	var work_reg_date = $("#work_reg_date").val(); 
	
	if(work_name == null || work_name.trim() == ""){
		alert("업무명을 입력해주세요.");
		$("#work_name").focus();
		result = false;
		return false;
	}
	
	if(work_manager == null || work_manager.trim() == ""){
		alert("담당자을 입력해주세요.");
		$("#work_manager").focus();
		result = false;
		return false;
	}
	
	if(work_period == null || work_period.trim() == ""){
		alert("기간을 입력해주세요.");
		$("#work_period").focus();
		result = false;
		return false;
	}
	
	var date_pattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	if (work_reg_date == null || work_reg_date.trim() == ""){
		alert("등록일을 입력해주세요.");
		result = false;
		return false;
	}else if(!work_reg_date.match(date_pattern)){
		alert("날짜형식에 맞지 않는 데이터가 입력되었습니다. 다시 입력해주세요.");
		result = false;
		return false;
	}
	
	return result;
}

function delWork(work_idx){
	if(confirm("해당 업무 하위의 모든 데이터가 삭제됩니다. 그래도 삭제하시겠습니까?") == true){
		var work_idx = work_idx;
		$.ajax({
			type: "POST",
			url: "/delWork.do",
			data: {
				work_idx: work_idx
			},
			success: function(r){
				if(r > 0){
					alert("삭제가 완료되었습니다.")
					$("#moveForm").attr("action", "/workList.do");
					$("#moveForm").submit();
				}else{
					alert("삭제에 실패했습니다.");
					$("#moveForm").attr("action", "/workList.do");
					$("#moveForm").submit();	
				}
			},
			error: function(error){
				alert("통신 실패");
				$("#moveForm").attr("action", "/workList.do");
				$("#moveForm").submit();
			}
		})
	}
}

//업무상세 이동
function goWorkView(work_idx) {
	$("#moveForm").attr("action", "/workView.do");
	$("#moveForm input[name=work_idx]").val(work_idx);
	$("#moveForm").submit();
}

//work_data 유효성 검사
function check_work_data_val(work_data_idx) {
	var result = true;
	var str_date = "";
	var end_date = "";
	var support_time = "";
	var support_type = "";
	var support_content = "";
	var severity = "";
	var work_data_manager = "";
	
	if(typeof work_data_idx == "undefined" || work_data_idx == null || work_data_idx == ""){ //new
		str_date = $("#str_date").val();
		end_date = $("#end_date").val();
		support_time = $("#support_time").val();
		support_type = $("#support_type").val();
		support_content = $("#support_content textarea").val();
		severity = $("#severity").val();
		work_data_manager = $("#work_data_manager").val();
	}else{ //update
		str_date = $("#str_date_"+work_data_idx).val();
		end_date = $("#end_date_"+work_data_idx).val();
		support_time = $("#support_time_"+work_data_idx).val();
		support_type = $("#support_type_"+work_data_idx).val();
		support_content = $("#support_content_"+work_data_idx+" textarea").val();
		severity = $("#severity_"+work_data_idx).val();
		work_data_manager = $("#work_data_manager_"+work_data_idx).val();
	}
	
	if (support_time == null || support_time.trim() == "") {
		alert("지원시간을 입력해주세요.");
		result = false;
		return false;
	} else if (isNaN(support_time)) {
		alert("지원시간에 숫자만 입력해주세요.");
		result = false;
		return false;
	}
	
	if (work_data_manager == null || work_data_manager == "") {
		alert("담당자를 입력해주세요.");
		result = false;
		return false;
	}
	
	var date_pattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	if (str_date == null || str_date.trim() == "") {
		alert("시작일을 입력해주세요.");
		result = false;
		return false;
	}else if(!str_date.match(date_pattern)){
		alert("날짜형식에 맞지 않는 데이터가 입력되었습니다. 다시 입력해주세요.");
		result = false;
		return false;
	}

	if (end_date == null || end_date.trim() == "") {
		alert("종료일을 입력해주세요.");
		result = false;
		return false;
	}else if(!end_date.match(date_pattern)){
		alert("날짜형식에 맞지 않는 데이터가 입력되었습니다. 다시 입력해주세요.");
		result = false;
		return false;
	}
	
	const date1 = new Date(str_date);
	const date2 = new Date(end_date);
	if(date1 > date2){
		alert("시작일보다 종료일이 이릅니다. 일자를 확인해주세요.");
		result = false;
		return false;
	}
	
	if (support_type == null || support_type.trim() == "") {
		alert("지원방법을 입력해주세요.");
		result = false;
		return false;
	}
	if (support_content == null || support_content.trim() == "") {
		alert("지원내용을 입력해주세요.");
		result = false;
		return false;
	}

	if (severity == null || severity == "") {
		alert("심각도를 선택해주세요.");
		result = false;
		return false;
	}

	return result;
}

//work_data 저장 및 수정
function saveWorkData(work_idx, work_data_idx){
	var str_date = "";
	var end_date = "";
	var support_time = "";
	var support_type = "";
	var support_content = "";
	var severity = "";
	var work_data_manager = "";
	var save_type = "";
	
	if(typeof work_data_idx == "undefined" || work_data_idx == null || work_data_idx == ""){ //new
		str_date = $("#str_date").val();
		end_date = $("#end_date").val();
		support_time = $("#support_time").val();
		support_type = $("#support_type").val();
		support_content = $("#support_content textarea").val().replace(/\n/g, "<br>");
		severity = $("#severity option:selected").val();
		work_data_manager = $("#work_data_manager").val();
		save_type = "add";
	}else{ //update
		str_date = $("#str_date_"+work_data_idx).val();
		end_date = $("#end_date_"+work_data_idx).val();
		support_time = $("#support_time_"+work_data_idx).val();
		support_type = $("#support_type_"+work_data_idx).val();
		support_content = $("#support_content_"+work_data_idx+" textarea").val();
		severity = $("#severity_"+work_data_idx).val();
		work_data_manager = $("#work_data_manager_"+work_data_idx).val();
		save_type = "upd";
	}
	
	
	var arr = new Array();
	var updArr = new Array();
	var addRecordList = "";
	var updRecordList = "";
	
	if (check_work_data_val(work_data_idx)) {
		var obj = new Object();
		obj.work_idx = work_idx;
		obj.str_date = str_date;
		obj.end_date = end_date;
		obj.support_time = support_time;
		obj.support_type = support_type;
		obj.support_content = support_content;
		obj.severity = severity;
		obj.work_data_manager = work_data_manager;
		obj.reg_user_idx = $("#user_idx").val();
		
		if(save_type == "add"){ //new
			arr.push(obj);
			addRecordList = JSON.stringify(arr);	
		}else if(save_type == "upd"){ //update
			obj.work_data_idx = work_data_idx;
			updArr.push(obj);
			updRecordList = JSON.stringify(updArr);
		}
		
		
		$.ajax({
			type: 'POST',
			url: '/saveWorkData.do',
			data: {
				addRecordList: addRecordList,
				updRecordList: updRecordList
			},
			success: function(r) {
				if (r > 0) {
					alert("저장되었습니다.");
					var work_idx = $("#moveForm input[name=work_idx]").val();
					goWorkView(work_idx);
				}
			},
			error: function(e) {
				alert("저장에 실패했습니다.");
				var work_idx = $("#moveForm input[name=work_idx]").val();
				goWorkView(work_idx);
			}
		});
	}else{
		return false;
	}
}

//work_data 삭제
function delWorkData(work_idx){
	if(confirm("정말 삭제하시겠습니까?") == true){
		var work_data_idx = $("#work_data_idx").val();
		var delArr = new Array();
	
		var obj = new Object();
		obj.work_idx = work_idx;
		obj.work_data_idx = work_data_idx;
		delArr.push(obj);
	
		var delRecordList = JSON.stringify(delArr);
	
		$.ajax({
			type: 'POST',
			url: '/saveWorkData.do',
			data: {
				delRecordList: delRecordList
			},
			success: function(r) {
				if (r > 0) {
					alert("삭제되었습니다.");
					var work_idx = $("#moveForm input[name=work_idx]").val();
					goWorkView(work_idx);
				}
			},
			error: function(e) {
				alert("삭제에 실패했습니다.");
				var work_idx = $("#moveForm input[name=work_idx]").val();
				goWorkView(work_idx);
			}
		});	
	}
}

//work_data 팝업에서 수정화면으로 전환
function updWorkData(){
	var work_data_idx = $("#work_data_idx").val();
	$.ajax({
		url: "/getWorkData.do",
		type: "POST",
		data: {
			work_data_idx: work_data_idx
		},
		success: function(r){
			var tag = "";
			var btn_tag = "";
			var support_content = r.support_content.replace(/<br>/g, "\r\n");
			
			tag +=	'<tr>'
				+		'<th>시작일</th>'
				+		'<td class="lb"><input type="text" class="inputOrg" id="str_date_'+r.work_data_idx+'" value="'+r.str_date+'"></td>'
				+		'<th>종료일</th>'
				+		'<td class="lb"><input type="text" class="inputOrg" id="end_date_'+r.work_data_idx+'" value="'+r.end_date+'"></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>지원시간(분)</th>'
				+		'<td class="lb"><input type="text" class="inputOrg" id="support_time_'+r.work_data_idx+'" value="'+r.support_time+'"></td>'
				+		'<th>담당자</th>'
				+		'<td class="lb"><input type="text" class="inputOrg" id="work_data_manager_'+r.work_data_idx+'" value="'+r.work_data_manager+'"></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>지원방법</th>'
				+		'<td class="lb" colspan="3"><input type="text" class="inputOrg" id="support_type_'+r.work_data_idx+'" value="'+r.support_type+'"></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>지원내용</th>'
				+		'<td id="support_content_'+r.work_data_idx+'" colspan="3"><textarea rows="1" cols="30" style="resize: none; width: 100%; height: 300px;">'+support_content+'</textarea></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>심각도</th>'
				+		'<td class="lb" colspan="3">'
				+			'<select id="severity_'+r.work_data_idx+'" class="selectOrgN">'
				+				'<option value="2">상</option>'
				+				'<option value="1">중</option>'
				+				'<option value="0">하</option>'
				+			'</select>'
				+		'</td>'
				+	'</tr>';
			
			btn_tag +=	'<input type="hidden" id="work_data_idx" value="'+r.work_data_idx+'">'
					+	'<a style="cursor: pointer; margin-right: 2px;" onclick="saveWorkData('+r.work_idx+','+r.work_data_idx+')" class="btn btn-big btn_green btn-150">저장</a>'
					+	'<a style="cursor: pointer; margin-left: 2px;" onclick="goWorkView('+r.work_idx+')" class="btn btn-big btn_gray btn-150">닫기</a>';
					
			$('#work_data_added tbody').html(tag);
			$('#work_data_idx').val(r.work_data_idx);
			$('#modal_added_btn').html(btn_tag);
			$("#severity_"+r.work_data_idx+" option:eq("+r.severity+")").prop("selected", true);
			datePicker(r.work_data_idx);
		}
	});
}

//파일 업로드
function fileUpload(work_data_idx){
	var selectedFile = $("#uploadFile_"+work_data_idx).get(0).files[0];
//	var work_data_idx = $("#work_data_idx_"+idx).val();
	var work_data_idx = work_data_idx;
	var work_idx = $("#moveForm input[name=work_idx]").val();
	var frmData = new FormData();
	frmData.append("uploadFile", selectedFile);
	frmData.append("work_data_idx", work_data_idx);
	frmData.append("work_idx", work_idx);
	
	$.ajax({
		url: "/uploadFile.do",
		type: "POST",
		processData: false,
		contentType: false,
		data: frmData,
		success: function(r){
			if(r > 0){
				alert("업로드가 완료되었습니다.");
				goWorkView(work_idx);
					
			}else{
				alert("업로드에 실패하였습니다.");
				goWorkView(work_idx);
			}
		},
		error: function(e){
			
		}
	});
}

//파일 삭제
function delUploadFile(file_idx){
	var file_idx = file_idx;
	var work_idx = $("#moveForm input[name=work_idx]").val();
	
	$.ajax({
		url: "/delUploadFile.do",
		type: "POST",
		data: {
				file_idx: file_idx
		},
		success: function(r) {
			if(r == true){
				alert("삭제가 완료되었습니다.");
				goWorkView(work_idx);
			}
		},
		error: function(e) {
			alert("삭제에 실패했습니다.");
			goWorkView(work_idx);
		}
	});
}

//파일 다운로드
function fileDownload(file_idx){
	window.location.href = encodeURI("/fileDownload.do?file_idx="+file_idx);
}

//work_data 행추가 팝업
function addRecordPopUp(){
	datePicker();
	$("#work_data_add_modal").modal();
}

//work_data 상세 팝업
function workDataView(work_data_idx){
	$.ajax({
		url: "/getWorkData.do",
		type: "POST",
		data: {
			work_data_idx: work_data_idx
		},
		success: function(r){
			var tag = "";
			var severity = "";
			switch(r.severity){
				case 0:
					severity = "하";
					break;
				case 1:
					severity = "중";
					break;
				case 2:
					severity = "상";
					break;
				default:
					severity = "";
			}
			
			var support_content = r.support_content.replace(/\n/g, "<br>");
			
			tag +=	'<tr>'
				+		'<th>시작일</th>'
				+		'<td class="lb" id="str_date_'+r.work_data_idx+'">'+r.str_date+'</td>'
				+		'<th>종료일</th>'
				+		'<td class="lb" id="end_date_'+r.work_data_idx+'">'+r.end_date+'</td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>지원시간(분)</th>'
				+		'<td class="lb" id="support_time_'+r.work_data_idx+'">'+r.support_time+'</td>'
				+		'<th>담당자</th>'
				+		'<td class="lb" id="work_data_manger_'+r.work_data_idx+'">'+r.work_data_manager+'</td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>지원방법</th>'
				+		'<td class="lb" colspan="3" id="support_type_'+r.work_data_idx+'">'+r.support_type+'</td>'
				+	'</tr>'
				+	'<tr style="overflow: scroll; height: 300px;">'
				+		'<th>지원내용</th>'
				+		'<td class="lb" colspan="3"><div id="support_content_'+r.work_data_idx+'" style="overflow:auto; height: 300px;">'+support_content+'</div></td>'
				+	'</tr>'
				+	'<tr>'
				+		'<th>심각도</th>'
				+		'<td class="lb" colspan="3" id="severity_'+r.work_data_idx+'">'+severity+'</td>'
				+	'</tr>';
				
			$('#work_data_added tbody').html(tag);
			$('#work_data_idx').val(r.work_data_idx);
			$("#work_data_added_modal").modal();
		}
	});
}

//datePicker function
function datePicker(work_data_idx){
	if(typeof work_data_idx == "undefined" || work_data_idx == "" || work_data_idx == null){
		$("#str_date").datepicker({
			dateFormat: 'yy-mm-dd'
			, changeMonth: true
			, yearSuffix: "년"
			, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, dayNamesMin: ['일','월','화','수','목','금','토']
		});
		
		$("#end_date").datepicker({
			dateFormat: 'yy-mm-dd'
			, changeMonth: true
			, yearSuffix: "년"
			, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, dayNamesMin: ['일','월','화','수','목','금','토']
		});
	}else{
		$("#str_date_"+work_data_idx).datepicker({
			dateFormat: 'yy-mm-dd'
			, changeMonth: true
			, yearSuffix: "년"
			, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, dayNamesMin: ['일','월','화','수','목','금','토']
		});
		
		$("#end_date_"+work_data_idx).datepicker({
			dateFormat: 'yy-mm-dd'
			, changeMonth: true
			, yearSuffix: "년"
			, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
			, dayNamesMin: ['일','월','화','수','목','금','토']
		});
	}
}

//일정목록 이동
function goScheduleList() {
	$("#moveForm").attr("action", "/scheduleList.do");
	$("#moveForm").submit();
}

function goScheduleNew(){
	$("#moveForm").attr("action", "/goScheduleNew.do");
	$("#moveForm").submit();
}

$(document).ready(function(){
	$("#work_reg_date").datepicker({
		dateFormat: 'yy-mm-dd'
		, changeMonth: true
		, yearSuffix: "년"
		, monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		, monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		, dayNamesMin: ['일','월','화','수','목','금','토']	
	});
});
//레코드추가
/*function addRecord() {
	var totalCnt = $("input[name=totalCnt]").val();
	if(totalCnt == 0 && $('#work_data table tbody tr').attr("data") == "none"){
		$('#work_data table tbody tr').remove();
	}
	var tag = "";
	var rowCnt = $('#work_data table tbody tr').length;
	var user_name = $('#user_name').val();
	tag +=	'<tr data="add">'
		+		'<td><input id="str_date_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="end_date_' + rowCnt + '" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td>' + user_name + '</td>'
		+		'<td><input id="support_time_' + rowCnt + '" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="support_type_' + rowCnt + '" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td id="support_content_'+rowCnt+'"><textarea rows="1" cols="30" style="resize: none; width: 100%;"></textarea></td>'
		+		'<td>'
		+			'<select id="severity_' + rowCnt + '" class="selectOrgN">'
		+				'<option value="2">상</option>'
		+				'<option value="1">중</option>'
		+				'<option value="0">하</option>'
		+			'</select>'
		+		'<td>'
//		+			'<label for="uploadFile_'+rowCnt+'">'
//		+				'<img src="/image/common/excel.png" id="uploadFileBtn_'+rowCnt+'" style="width: 30px; height: 30px; display: block; margin: 0px auto; cursor: pointer;">'
//		+			'</label>'
//		+			'<input type="file" id="uploadFile_'+rowCnt+'" style="display: none;" onchange="fileUpload('+rowCnt+')" required="required"/>'
		+		'-'
		+		'</td>'
		+		'<td>'
		+			'<a id="del_btn_' + rowCnt + '" style="cursor:pointer;" onclick="removeRecord(this)" style="cursor:pointer;" class="btn btn-sm btn_color_navy">삭제</a>'
		+		'</td>'
		+	'</tr>'
	$('#work_data tbody').append(tag);
}*/

//레코드 삭제
/*function removeRecord(btn) {
	tr = $(btn).parent().parent();
	if (tr.attr("data") == "add") {
		tr.remove();
	} else if (tr.attr("data") == "added") {
		tr.attr("data", "del");
		tr.attr("style", "display:none");
	}
}*/

//레코드 수정
/*function updateRecord(idx) {
	tr = $("#upd_btn_" + idx).parent().parent();
	tr.attr("data", "update");
	$("#str_date_" + idx).attr("disabled", false);
	$("#str_date_" + idx).attr("style", "border:; text-align: center;");
	$("#end_date_" + idx).attr("disabled", false);
	$("#end_date_" + idx).attr("style", "border:; text-align: center;");
	$("#support_time_" + idx).attr("disabled", false);
	$("#support_time_" + idx).attr("style", "border:; text-align: center;");
	$("#support_type_" + idx).attr("disabled", false);
	$("#support_type_" + idx).attr("style", "border:;");
	
	var support_content = $("#hidden_support_content_"+idx).val().replace(/<br>/g, "\r\n");
	$("#support_content_"+idx).empty();
	$("#support_content_"+idx).append('<textarea rows="1" cols="30" style="resize: none; width: 100%;">'+support_content+'</textarea>');
	$("#severity_" + idx).attr("disabled", false);
	$("#severity_" + idx).attr("style", "border:;");
	$("#upd_btn_" + idx).attr("style", "display:none;");
	$("#cncl_btn_" + idx).attr("style", "cursor:pointer; display:inline-block;");
}*/

//레코드 수정 취소
/*function cancelRecord(idx) {
	tr = $("#cncl_btn_" + idx).parent().parent();
	tr.attr("data", "added");
	$("#str_date_" + idx).attr("disabled", true);
	$("#str_date_" + idx).attr("style", "border:none; text-align: center;");
	$("#end_date_" + idx).attr("disabled", true);
	$("#end_date_" + idx).attr("style", "border:none; text-align: center;");
	$("#support_time_" + idx).attr("disabled", true);
	$("#support_time_" + idx).attr("style", "border:none; text-align: center;");
	$("#support_type_" + idx).attr("disabled", true);
	$("#support_type_" + idx).attr("style", "border:none;");
	
	var support_content = $("#hidden_support_content_"+idx).val()
	$("#support_content_" + idx).empty();
	$("#support_content_" + idx).append(support_content);
	
	$("#severity_" + idx).attr("disabled", true);
	$("#severity_" + idx).attr("style", "border:none;");
	$("#upd_btn_" + idx).attr("style", "cursor:pointer; display:inline-block;");
	$("#cncl_btn_" + idx).attr("style", "display:none;");
}*/

//유효성검사 - 기존
/*function check_work_data_val() {
	var result = true;
	var date_pattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
	$('#work_data table tbody tr').each(function(idx, val) {
		if ($(val).attr('data') == 'add') {
			if ($("#str_date_" + idx).val() == null || $("#str_date_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				$("#str_date_" + idx).focus();
				result = false;
				return false;
			}else if(!$("#str_date_" + idx).val().match(date_pattern)){
				alert("날짜형식에 맞지 않는 데이터가 입력되었습니다. 다시 입력해주세요.");
				$("#str_date_" + idx).focus();
				result = false;
				return false;
			}

			if ($("#end_date_" + idx).val() == null || $("#end_date_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				$("#end_date_" + idx).focus();
				result = false;
				return false;
			}

			if ($("#support_time_" + idx).val() == null || $("#support_time_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				$("#end_date_" + idx).focus();
				result = false;
				return false;
			} else if (isNaN($("#support_time_" + idx).val())) {
				alert("숫자만 입력해주세요.");
				$("#support_time_" + idx).focus();
				result = false;
				return false;
			}

			if ($("#support_type_" + idx).val() == null || $("#support_type_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				$("#support_type_" + idx).focus();
				result = false;
				return false;
			}
			if ($("#support_content_"+idx+" textarea").val() == null || $("#support_content_"+idx+" textarea").val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				$("#support_content_"+idx+" textarea").focus();
				result = false;
				return false;
			}

			if ($("#severity_" + idx).val() == null || $("#severity_" + idx).val() == "") {
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				$("#severity_" + idx).focus();
				result = false;
				return false;
			}
		}
	});

	return result;
}*/

//work_data 저장 - 기존
/*function saveWorkData(work_idx) {
	
	var arr = new Array();
	var updArr = new Array();
	var delArr = new Array();

	var str_date = "";
	var end_date = "";
	var support_time = "";
	var support_type = "";
	var support_content = "";
	var severity = "";

	if (check_work_data_val()) {
		$('#work_data table tbody tr').each(function(idx, val) {
			var type = $(val).attr('data');
			if (type == 'add') {
				var obj = new Object();
				obj.work_idx = work_idx;
				obj.str_date = $("#str_date_" + idx).val();
				obj.end_date = $("#end_date_" + idx).val();
				obj.support_time = $("#support_time_" + idx).val();
				obj.support_type = $("#support_type_" + idx).val();
				obj.support_content = $("#support_content_" + idx + " textarea").val().replace(/\n/g, "<br>");
				obj.severity = $("#severity_" + idx + " option:selected").val();
				obj.reg_user_idx = $("#user_idx").val();
				arr.push(obj);
			}

			if (type == 'update') {
				var obj = new Object();
				obj.work_idx = work_idx;
				obj.work_data_idx = $("#work_data_idx_" + idx).val();
				obj.str_date = $("#str_date_" + idx).val();
				obj.end_date = $("#end_date_" + idx).val();
				obj.support_time = $("#support_time_" + idx).val();
				obj.support_type = $("#support_type_" + idx).val();
				obj.support_content = $("#support_content_" + idx + " textarea").val().replace(/\n/g, "<br>");
				obj.severity = $("#severity_" + idx + " option:selected").val();
				obj.reg_user_idx = $("#user_idx").val();
				updArr.push(obj);
			}

			if (type == 'del') {
				var obj = new Object();
				obj.work_idx = work_idx;
				obj.work_data_idx = $("#work_data_idx_" + idx).val();
				delArr.push(obj);
			}

		});

		var addRecordList = JSON.stringify(arr);
		var updRecordList = JSON.stringify(updArr);
		var delRecordList = JSON.stringify(delArr);

		$.ajax({
			type: 'POST',
			url: '/saveWorkData.do',
			data: {
				addRecordList: addRecordList,
				updRecordList: updRecordList,
				delRecordList: delRecordList
			},
			success: function(r) {
				if (r == 1) {
					alert("저장되었습니다.");
					var work_idx = $("#moveForm input[name=work_idx]").val();
					goWorkView(work_idx);
				}
			},
			error: function(e) {
				alert("저장에 실패했습니다.");
				var work_idx = $("#moveForm input[name=work_idx]").val();
				goWorkView(work_idx);
			}
		});
	} else {
		return false;
	}
}*/




