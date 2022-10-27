function movePage(pageNo){
	$("#pageNo").val(pageNo);
	getDatasetList(0 ,pageNo)
}

function getDatasetList(chk, page){
	var org_idx = $("#moveForm input[name=org_idx]").val();
	var tag = "";
	
	var pageNo = $("#pageNo").val();
	
	if(pageNo == "" || pageNo == undefined ){
		pageNo = 1;
	}
	
	$("#triger").click(function() {
		if(pageNo != 1) {
			pageNo = 1;
		}
	})
	
//	var listSize = $("#listSize").val();
	var listSize = 5;
	var searchContent = $("#searchContent").val();	
	var searchType = $("#searchType option:selected").val();
	var checkTriger = "";
	if(chk == 1){
		if(searchType == "" && searchContent != ""){
			alert("검색항목을 선택해주세요.");
			return;
		}else if(searchType != "" && searchContent == ""){
			alert("검색어를 입력해주세요.");
			return;
		}
	}
	
	$.postDataGetJSON("/getDatasetList.do", {
		"org_idx":org_idx
		, "searchType":searchType
		, "searchContent":searchContent
		, "pageNo": pageNo
		, "listSize": listSize
	}, function(r){
		var totalCnt = "0";
		if(r.list.length > 0){
			totalCnt = r.totalCnt;
			var paging = r.paging_html;
			var endPage = parseInt(totalCnt/listSize);
			var cnt = 1;
			var num = "";
			for(var i = 0; i < r.list.length; i++){
				var data_name = "";
				var dataset_insert_date = "";
				var user_info = "";
				var open_yn = "";
				var dataset_idx = "";
				num = parseInt((parseInt(listSize)*(parseInt(pageNo)-1)) + parseInt(cnt));
				if(r.list[i].dataset_idx != null){
					dataset_idx = r.list[i].dataset_idx;
				}
				if(r.list[i].data_name != null){
					data_name = r.list[i].data_name;
				}
				if(r.list[i].dataset_insert_date != null){
					dataset_insert_date = r.list[i].dataset_insert_date;
				}
				if(r.list[i].user_info != null){
					user_info = r.list[i].user_info;
				}
				if(r.list[i].open_yn != null){
					open_yn = r.list[i].open_yn;
				}
				
				tag += '<tr><td>'+num+'</td>'
					+ '<td class="sbj txtL"><a style="cursor:pointer;" onclick="datasetView('+dataset_idx+')">'+data_name+'</a></td>'
					+ '<td>'+dataset_insert_date+'</td>'
					+ '<td>'+user_info+'</td>';
				
				if(open_yn == 1){
					tag += '<td><span class="cate">공개</span></td></tr>'
				}else{
					tag += '<td><span class="cate red">준비</span></td></tr>'
				}
			cnt++
			}
		}else{
			tag += '<tr>'
				+		'<td colspan="5">조회된 데이터가 없습니다.</td>'
				+  '</tr>'
		}
		$('#totalCnt').html(totalCnt);
		$('#datasetList tbody').html(tag);
		$('#pagination').html(paging);
	});
}

function goDatasetNew(){
	var user_idx = $("#moveForm input[name=user_idx]").val();
	$("#moveForm").attr("action", "/goDatasetNew.do");
	$("#moveForm input[name=user_idx]").val(user_idx);
	$("#moveForm").submit();
}

function datasetNew(){
	var user_idx = $("input[name=user_idx]").val();
	var data_name = $("input[name=data_name]").val();
	
	if(data_name == ""){
		alert("데이터명을 입력해주세요.");
		$("input[name=data_name]").focus();
		return false;
	}
	
	$.postDataGetJSON("/datasetNew.do", {"user_idx":user_idx, "data_name":data_name}, function(r){
		if(r.status == 1){
			alert("등록되었습니다.")
			window.location.href = encodeURI("/datasetList.do");
		}else{
			alert("등록에 실패했습니다.");
			window.location.href = encodeURI("/datasetList.do");
		}
	});
}

function goWorkList(){
	$("#moveForm").attr("action", "/workList.do");
	$("#moveForm").submit();
}

function newWork(){
	window.location.href = encodeURI("/workNew.do");
}

function goWorkView(work_idx){
	$("#moveForm").attr("action", "/workView.do");
	$("#moveForm input[name=work_idx]").val(work_idx);
	$("#moveForm").submit();
}

//레코드추가
function addRecord(){
	var tag = "";
	var rowCnt = $('#work_data table tbody tr').length;
	tag += '<tr data="add">'
		+		'<td><input id="str_date" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="end_date" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="reg_user_name" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+ 		'<td><input id="support_time" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="support_type" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="support_content" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td>'
		+			'<select id="severity" class="selectOrgN">'
		+				'<option value="2">상</option>'
		+				'<option value="1">중</option>'
		+				'<option value="0">하</option>'
      	+			'</select>'
		+		'<td>'
		+			'<a id="sample_del_btn" style="cursor:pointer;" onclick="removeRecord(this)" style="cursor:pointer;" class="btn btn-sm btn_color_navy">삭제</a>'
		+		'</td>'
		+	'</tr>'
	$('#work_data tbody').append(tag);
}

//레코드 삭제
function removeRecord(btn){
	tr = $(btn).parent().parent();
	if(tr.attr("data") == "add"){
		tr.remove();
	}else if(tr.attr("data") == "added"){
		tr.attr("data", "del");
		tr.attr("style", "display:none");
	}
}

function check_work_data_val(){
	var result = true;
	$('#work_data table tbody tr').each(function(idx, val){
		if($(val).attr('data') == 'add'){
			if($("#str_date_"+idx).val() == null || $("#str_date_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#end_date_"+idx).val() == null || $("#end_date_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#support_time_"+idx).val() == null || $("#support_time_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}else if(isNaN($("#support_time_"+idx).val())){
				alert("숫자만 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#support_type_"+idx).val() == null || $("#support_type_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#support_content_"+idx).val() == null || $("#support_content_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#severity_"+idx).val() == null || $("#severity_"+idx).val() == ""){
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				result = false;
				return false;
			}
		}
	});
	
	return result;
}

function saveWorkData(work_idx){
	var date_pattern = /([0-2][0-9]{3})-([0-1][0-9])-([0-3][0-9]) ([0-5][0-9]):([0-5][0-9]):([0-5][0-9])(([\-\+]([0-1][0-9])\:00))?/;
	var arr = new Array();
	var delArr = new Array();
	
	var str_date = "";
	var end_date = "";
	var support_time = "";
	var support_type = "";
	var support_content = "";
	var severity = "";

	if(check_work_data_val()){
		$('#work_data table tbody tr').each(function(idx, val){
			if($(val).attr('data') == 'add'){
				var obj = new Object();
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
				obj.work_idx = work_idx;
			}
		});
	}
	
	
	//기본 3개(workType, project_name, id)
	if(Object.keys(datas).length < 4){
		return false;
	}
	
	$.ajax({
		cache : false,
		url : rootPath + '/joinwork/updateDateMngt.html',
		type : 'POST', 
		data : {
			datas : JSON.stringify(datas)
		}, 
		success : function(result) {
			if(result > 0){
				alert("저장되었습니다.");	
			}else{
				alert("오류가 발생했습니다.")
			}
			goList();
		}, // success 
		error : function(result) {
			alert("실패하였습니다.");
		}
	});
}