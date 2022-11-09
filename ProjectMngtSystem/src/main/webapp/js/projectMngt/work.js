function movePage(pageNo) {
	$("#pageNo").val(pageNo);
	getDatasetList(0, pageNo)
}

function goWorkList() {
	$("#moveForm").attr("action", "/workList.do");
	$("#moveForm").submit();
}

function goWorkNew() {
	$("#moveForm").attr("action", "/goWorkNew.do");
	$("#moveForm").submit();
}

function workNew(){
	var project_idx = $("input[name=project_idx]").val();
	var schedule_idx = $("input[name=schedule_idx]").val();
	var work_name = $("input[name=work_name]").val();
	
	if(work_name == ""){
		alert("업무명을 입력해주세요.");
		$("input[name=work_name]").focus();
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/workNew.do",
		data: {
			project_idx: project_idx,
			schedule_idx: schedule_idx,
			work_name: work_name
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
		}
	});
}

function goWorkView(work_idx) {
	$("#moveForm").attr("action", "/workView.do");
	$("#moveForm input[name=work_idx]").val(work_idx);
	$("#moveForm").submit();
}

//레코드추가
function addRecord() {
	var chk = $('#work_data table tbody tr').attr("data");
	var tag = "";
	var rowCnt = $('#work_data table tbody tr').length;
	var user_name = $('#user_name').val();
	tag +=	'<tr data="add">'
		+		'<td><input id="str_date_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="end_date_' + rowCnt + '" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td>' + user_name + '</td>'
		+		'<td><input id="support_time_' + rowCnt + '" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="support_type_' + rowCnt + '" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td id="support_content_'+rowCnt+'"><textarea rows="1" cols="30" style="resize: none;"></textarea></td>'
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
}

//레코드 삭제
function removeRecord(btn) {
	tr = $(btn).parent().parent();
	if (tr.attr("data") == "add") {
		tr.remove();
	} else if (tr.attr("data") == "added") {
		tr.attr("data", "del");
		tr.attr("style", "display:none");
	}
}

function updateRecord(idx) {
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
	$("#support_content_"+idx).append('<textarea rows="1" cols="30" style="resize: none;">'+support_content+'</textarea>');
	$("#severity_" + idx).attr("disabled", false);
	$("#severity_" + idx).attr("style", "border:;");
	$("#upd_btn_" + idx).attr("style", "display:none;");
	$("#cncl_btn_" + idx).attr("style", "cursor:pointer; display:inline-block;");
}

function cancelRecord(idx) {
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
}

function check_work_data_val() {
	var result = true;
	$('#work_data table tbody tr').each(function(idx, val) {
		if ($(val).attr('data') == 'add') {
			if ($("#str_date_" + idx).val() == null || $("#str_date_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}

			if ($("#end_date_" + idx).val() == null || $("#end_date_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}

			if ($("#support_time_" + idx).val() == null || $("#support_time_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			} else if (isNaN($("#support_time_" + idx).val())) {
				alert("숫자만 입력해주세요.");
				result = false;
				return false;
			}

			if ($("#support_type_" + idx).val() == null || $("#support_type_" + idx).val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			if ($("#support_content_"+idx+" textarea").val() == null || $("#support_content_"+idx+" textarea").val().trim() == "") {
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}

			if ($("#severity_" + idx).val() == null || $("#severity_" + idx).val() == "") {
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				result = false;
				return false;
			}
		}
	});

	return result;
}

function saveWorkData(work_idx) {
	var date_pattern = /([0-2][0-9]{3})-([0-1][0-9])-([0-3][0-9]) ([0-5][0-9]):([0-5][0-9]):([0-5][0-9])(([\-\+]([0-1][0-9])\:00))?/;
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
}

function goScheduleList() {
	$("#moveForm").attr("action", "/scheduleList.do");
	$("#moveForm").submit();
}

function fileUpload(idx){
	var selectedFile = $("#uploadFile_"+idx).get(0).files[0];
	var work_data_idx = $("#work_data_idx_"+idx).val();
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
			if(r == 1){
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

function fileDownload(file_idx){
	window.location.href = encodeURI("/fileDownload.do?file_idx="+file_idx);
}
