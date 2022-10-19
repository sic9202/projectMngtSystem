//배포정보 리스트
function datasetInfo(dataset_idx){
	
	$.postDataGetJSON("/getDatasetInfo.do", {"dataset_idx":dataset_idx}, function(r){
		
		var data_name = "";
		if(r.dataset_info.data_name != null){
			data_name = r.dataset_info.data_name;
			$("#data_name").val(data_name);
			$("#data_name").attr('readonly', false);
		}
		
		//데이터 분야
		if(r.region_info.length > 0){
			var tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.region_info.length; i++){
				tag += '<option value="'+r.region_info[i].idx+'">'+r.region_info[i].description+'</option>'
			}
			$("#selectRegion").html(tag);
		}
		
		//인코딩 타입
		if(r.encoding_type_info.length > 0){
			var tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.encoding_type_info.length; i++){
				tag += '<option value="'+r.encoding_type_info[i].idx+'">'+r.encoding_type_info[i].description+'</option>'
			}
			$("#selectEncodingType").html(tag);
		}
		
		//확장자
		if(r.file_extension_info.length > 0){
			var tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.file_extension_info.length; i++){
				tag += '<option value="'+r.file_extension_info[i].idx+'">'+r.file_extension_info[i].description+'</option>'
			}
			$("#selectFileExtension").html(tag);
		}
		
		//압축형식
		if(r.compression_type_info.length > 0){
			var tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.compression_type_info.length; i++){
				tag += '<option value="'+r.compression_type_info[i].idx+'">'+r.compression_type_info[i].description+'</option>'
			}
			$("#selectCompressionType").html(tag);
		}
		
		if(r.dataset_info != null){
			$("#data_name").val(r.dataset_info.data_name);
			$("#selectRegion").val(r.dataset_info.region).prop("selected", true);
			$("#data_desc").val(r.dataset_info.data_desc);
			$("#data_keyword").val(r.dataset_info.data_keyword);
/*			$("#encoding_type").val(r.dataset_info.encoding_type);
			$("#file_extension").val(r.dataset_info.file_extension);
			$("#compression_type").val(r.dataset_info.compression_type);*/
			$("#selectEncodingType").val(r.dataset_info.encoding_type).prop("selected", true);
			$("#selectFileExtension").val(r.dataset_info.file_extension).prop("selected", true);
			$("#selectCompressionType").val(r.dataset_info.compression_type).prop("selected", true);
			$("#dataset_size").val(r.dataset_info.dataset_size);
			$("#record_count").val(r.dataset_info.record_count);
			$("#processing_cost").val(r.dataset_info.processing_cost);
			$("#data_from_date").val(r.dataset_info.data_from_date);
			$("#data_end_date").val(r.dataset_info.data_end_date);
			
			if(r.dataset_info.open_yn != null){
				//공개여부 공개일 경우
				if(r.dataset_info.open_yn == 1){
					$("input[name=open_yn][value=1]").attr('checked', true);
				}
			}
		}
	});
	
	if($("#dataset_info").css("display") == "none"){
		$("#dataset_info").show();
		$("#dataset_layout").hide();
		$("#dataset_sample").hide();
	}
	$("#tab1").attr("class", "active");
	$("#tab2").attr("class", "inactive");
	$("#tab3").attr("class", "inactive");
}

//데이터명세 리스트
function datasetLayout(dataset_idx){
	
	$.postDataGetJSON("/getDatasetLayout.do", {"dataset_idx":dataset_idx}, function(r){
		var tag = "";
		
		$("#data_name").attr('readonly', true);
		
		//데이터 타입
		if(r.data_type_info.length > 0){
			var dti_tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.data_type_info.length; i++){
				dti_tag += '<option value="'+r.data_type_info[i].idx+'">'+r.data_type_info[i].description+'</option>'
			}
		}
		
		//데이터 도메인
		if(r.data_domain_info.length > 0){
			var ddi_tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.data_domain_info.length; i++){
				ddi_tag += '<option value="'+r.data_domain_info[i].idx+'">'+r.data_domain_info[i].description+'</option>'
			}
		}
		
		//개인정보유형
		if(r.privacy_type_info.length > 0){
			var pti_tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.privacy_type_info.length; i++){
				pti_tag += '<option value="'+r.privacy_type_info[i].idx+'">'+r.privacy_type_info[i].description+'</option>'
			}
		}
		if(r.dataset_layout_info.length > 0){
			var dli = r.dataset_layout_info;
			
			for(var i = 0; i < dli.length; i++){
				var data_layout_idx = "";
				var column_name = "";
				var kor_name = "";
				var data_length = "";
				var column_desc = "";
				
				if(dli[i].data_layout_idx != null){
					data_layout_idx = dli[i].data_layout_idx;
				}
				if(dli[i].column_name != null){
					column_name = dli[i].column_name;
				}
				if(dli[i].kor_name != null){
					kor_name = dli[i].kor_name;
				}
				if(dli[i].data_length != null){
					data_length = dli[i].data_length;
				}
				if(dli[i].column_desc != null){
					column_desc = dli[i].column_desc;
				}
				tag += '<tr data="added">'
					+		'<input type="hidden" id="data_layout_idx_'+i+'" value="'+data_layout_idx+'"/>'
					+		'<td><input id="column_name_'+i+'"type="text" class="inputOrg" maxlength="50" value="'+column_name+'"/></td>'
					+ 		'<td><input id="kor_name_'+i+'" type="text" class="inputOrg" maxlength="50" value="'+kor_name+'"/></td>'
					+ 		'<td><select id="data_type_'+i+'" class="selectOrg">'+dti_tag+'</select></td>'
					+ 		'<td><input id="data_length_'+i+'" type="text" class="inputOrg" maxlength="50" value="'+data_length+'"/></td>'
					+ 		'<td>'
					+			'<select id="pk_yn_'+i+'" class="selectOrg">'
					+				'<option value="">-선택-</option>'
					+				'<option value="0">n</option>'
					+				'<option value="1">y</option>'
					+ 			'</select>'
					+		'</td>'
					+ 		'<td>'
					+			'<select id="null_yn_'+i+'" class="selectOrg">'
					+				'<option value="">-선택-</option>'
					+				'<option value="0">n</option>'
					+				'<option value="1">y</option>'
					+ 			'</select>'
					+		'</td>'
					+		'<td><input id="column_desc_'+i+'"type="text" class="inputOrg" maxlength="50" value="'+column_desc+'"/></td>'
					+ 		'<td><select id="data_domain_'+i+'"class="selectOrg">'+ddi_tag+'</select></td>'
					+ 		'<td><select id="privacy_type_'+i+'" class="selectOrg">'+pti_tag+'</select></td>'
					+ 		'<td><a id="layout_del_btn_"'+i+' style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a></td>'
					+	'</tr>'
			}
			$('#dataset_layout tbody').html(tag);
			
			for(var i = 0; i < dli.length; i++){
				var data_layout_idx = dli[i].data_layout_idx;
				var data_type = dli[i].data_type;
				var pk_yn = dli[i].pk_yn;
				var null_yn = dli[i].null_yn;
				var data_domain = dli[i].data_domain;
				var privacy_type = dli[i].privacy_type;
				
				$("#data_type_"+i).val(data_type).prop('selected', true);
				$("#pk_yn_"+i).val(pk_yn).prop('selected', true);
				$("#null_yn_"+i).val(null_yn).prop('selected', true);
				$("#data_domain_"+i).val(data_domain).prop('selected', true);
				$("#privacy_type_"+i).val(privacy_type).prop('selected', true);
			}
		}else{
			tag += '<tr data="add">'
				+		'<input type="hidden" id="data_layout_idx_0" value=""/>'
				+		'<td><input id="column_name_0"type="text" class="inputOrg" maxlength="50" value=""/></td>'
				+ 		'<td><input id="kor_name_0" type="text" class="inputOrg" maxlength="50" value=""/></td>'
				+ 		'<td><select id="data_type_0" class="selectOrg">'+dti_tag+'</select></td>'
				+ 		'<td><input id="data_length_0" type="text" class="inputOrg" maxlength="50" value="20"/></td>'
				+ 		'<td>'
				+			'<select id="pk_yn_0" class="selectOrg">'
				+				'<option value="">-선택-</option>'
				+				'<option value="0" selected>n</option>'
				+				'<option value="1">y</option>'
				+ 			'</select>'
				+		'</td>'
				+ 		'<td>'
				+			'<select id="null_yn_0" class="selectOrg">'
				+				'<option value="">-선택-</option>'
				+				'<option value="0" selected>n</option>'
				+				'<option value="1">y</option>'
				+ 			'</select>'
				+		'</td>'
				+		'<td><input id="column_desc_0"type="text" class="inputOrg" maxlength="50" value=""/></td>'
				+ 		'<td><select id="data_domain_0"class="selectOrg">'+ddi_tag+'</select></td>'
				+ 		'<td><select id="privacy_type_0" class="selectOrg">'+pti_tag+'</select></td>'
				+ 		'<td><a id="layout_del_btn_0" style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a></td>'
				+	'</tr>'
			$('#dataset_layout tbody').html(tag);
			$('#data_type_0').val(1).prop('selected', true);
			$('#data_domain_0').val(19).prop('selected', true);
			$('#privacy_type_0').val(4).prop('selected', true);
		}
	});
		
	if($("#dataset_layout").css("display") == "none"){
		$("#dataset_info").hide();
		$("#dataset_layout").show();
		$("#dataset_sample").hide();
	}
	$("#tab1").attr("class", "inactive");
	$("#tab2").attr("class", "active");
	$("#tab3").attr("class", "inactive");
}

//샘플데이터 리스트
function datasetSample(dataset_idx){
	$.postDataGetJSON("/getDatasetSample.do", {"dataset_idx":dataset_idx}, function(r){
		var tag = "";
		
		$("#data_name").attr('readonly', true);
		
		if(r.dataset_sample_info.length > 0){
			var dsi = r.dataset_sample_info;
			
			for(var i = 0; i < dsi.length; i++){
				var data_layout_idx = "";
				var column_name = "";
				var sample_record = "";
				
				if(dsi[i].data_layout_idx != null){
					data_layout_idx = dsi[i].data_layout_idx;
				}
				if(dsi[i].kor_name != null){
					kor_name = dsi[i].kor_name;
				}
				if(dsi[i].sample_record != null){
					sample_record = dsi[i].sample_record;
				}
				
				tag += '<tr data="added">'
					+		'<input type="hidden" id="smpl_data_layout_idx_'+i+'" value="'+data_layout_idx+'"/>'
					+		'<td><input readonly id="smpl_column_name_'+i+'" type="text" class="inputOrg" maxlength="50" value="'+kor_name+'"/></td>'
					+		'<td><input id="sample_record_'+i+'" type="text" class="inputOrg" maxlength="50" value="'+sample_record+'"/></td>'
					+		'<td><a id="sample_del_btn_'+i+'" style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a>'
					+	'</tr>'
			}
		}else{
			tag += '<tr data="none">'
				+		'<td colspan="3">조회된 데이터가 없습니다.</td>'
				+	'</tr>'
		}
		
		$('#dataset_sample tbody').html(tag);
	});
	
	if($("#dataset_sample").css("display") == "none"){
		$("#dataset_info").hide();
		$("#dataset_layout").hide();
		$("#dataset_sample").show();
	}
	
	$("#tab1").attr("class", "inactive");
	$("#tab2").attr("class", "inactive");
	$("#tab3").attr("class", "active");
}

//데이터명세 레코드 추가
function addDatasetLayout(){
	$.postDataGetJSON("/addDatasetLayout.do", {}, function(r){
		var tag = "";
		
		//데이터 타입
		if(r.data_type_info.length > 0){
			var dti_tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.data_type_info.length; i++){
				dti_tag += '<option value="'+r.data_type_info[i].idx+'">'+r.data_type_info[i].description+'</option>'
			}
		}
		
		//데이터 도메인
		if(r.data_domain_info.length > 0){
			var ddi_tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.data_domain_info.length; i++){
				ddi_tag += '<option value="'+r.data_domain_info[i].idx+'">'+r.data_domain_info[i].description+'</option>'
			}
		}
		
		//개인정보유형
		if(r.privacy_type_info.length > 0){
			var pti_tag = '<option value="">-선택-</option>';
			for(var i = 0; i < r.privacy_type_info.length; i++){
				pti_tag += '<option value="'+r.privacy_type_info[i].idx+'">'+r.privacy_type_info[i].description+'</option>'
			}
		}
		var rowCnt = $('#dataset_layout table tbody tr').length;
		
		tag += '<tr data="add">'
			+		'<input type="hidden" id="data_layout_idx_'+rowCnt+'" value=""/>'
			+		'<td><input id="column_name_'+rowCnt+'"type="text" class="inputOrg" maxlength="50" value=""/></td>'
			+ 		'<td><input id="kor_name_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value=""/></td>'
			+ 		'<td><select id="data_type_'+rowCnt+'" class="selectOrg">'+dti_tag+'</select></td>'
			+ 		'<td><input id="data_length_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value="20"/></td>'
			+ 		'<td>'
			+			'<select id="pk_yn_'+rowCnt+'" class="selectOrg">'
			+				'<option value="">-선택-</option>'
			+				'<option value="0" selected>n</option>'
			+				'<option value="1">y</option>'
			+ 			'</select>'
			+		'</td>'
			+ 		'<td>'
			+			'<select id="null_yn_'+rowCnt+'" class="selectOrg">'
			+				'<option value="">-선택-</option>'
			+				'<option value="0" selected>n</option>'
			+				'<option value="1">y</option>'
			+ 			'</select>'
			+		'</td>'
			+		'<td><input id="column_desc_'+rowCnt+'"type="text" class="inputOrg" maxlength="50" value=""/></td>'
			+ 		'<td><select id="data_domain_'+rowCnt+'"class="selectOrg">'+ddi_tag+'</select></td>'
			+ 		'<td><select id="privacy_type_'+rowCnt+'" class="selectOrg">'+pti_tag+'</select></td>'
			+ 		'<td><a id="layout_del_btn_'+rowCnt+'" style="cursor:pointer;" onclick="removeRecord(this)" class="btn btn-sm btn_color_navy">삭제</a></td>'
			+	'</tr>'
			
		$('#dataset_layout tbody').append(tag);
		$('#data_type_'+rowCnt).val(1).prop('selected', true);
		$('#data_domain_'+rowCnt).val(19).prop('selected', true);
		$('#privacy_type_'+rowCnt).val(4).prop('selected', true);
	});
}

/*
function addDatasetSample(){
	var tag = "";
	var rowCnt = $('#dataset_sample table tbody tr').length;
	
	tag += '<tr data="add">'
		+		'<td><input id="column_name_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><input id="sample_record_'+rowCnt+'" type="text" class="inputOrg" maxlength="50" value=""/></td>'
		+		'<td><a id="sample_del_btn_'+rowCnt+'" style="cursor:pointer;" onclick="removeRecord(this)" style="cursor:pointer;" class="btn btn-sm btn_color_navy">삭제</a>'
		+	'</tr>'
	
	$('#dataset_sample tbody').append(tag);
}
*/

//배포정보 저장
function saveDatasetInfo(dataset_idx){
		var data_name = $("#data_name").val();
		var data_region = $("#selectRegion option:selected").val();
		var data_desc = $("#data_desc").val();
		var data_keyword = $("#data_keyword").val();
		var encoding_type = $("#selectEncodingType option:selected").val();
		var file_extension = $("#selectFileExtension option:selected").val();
		var compression_type = $("#selectCompressionType option:selected").val();
		var dataset_size = $("#dataset_size").val();
		var record_count = $("#record_count").val();
		var processing_cost = $("#processing_cost").val();
		var data_from_date = $("#data_from_date").val();
		var data_end_date = $("#data_end_date").val();
		var open_yn = $("input[name='open_yn']:checked").val();
		
		$.postDataGetJSON("/saveDatasetInfo.do", {
			"dataset_idx":dataset_idx,
			"data_name":data_name,
			"data_region":data_region,
			"data_desc":data_desc,
			"data_keyword":data_keyword,
			"encoding_type":encoding_type,
			"file_extension":file_extension,
			"compression_type":compression_type,
			"dataset_size":dataset_size,
			"record_count":record_count,
			"processing_cost":processing_cost,
			"data_from_date":data_from_date,
			"data_end_date":data_end_date,
			"open_yn":open_yn
			}, function(r){
				if(r.status == 1){
					alert("저장되었습니다.")
					datasetInfo(dataset_idx);
				}else{
					alert("저장에 실패했습니다.");
					datasetInfo(dataset_idx);
				}
		});
}

//데이터명세 저장
function saveDatasetLayout(dataset_idx){
	var arr = new Array();
	var delArr = new Array();
	
	var dataset_idx = dataset_idx;
	
	var data_layout_idx = "";
	var column_name = "";
	var kor_name = "";
	var data_type = "";
	var data_length = "";
	var pk_yn = "";
	var null_yn = "";
	var column_desc = "";
	var data_domain = "";
	var privacy_type = "";
	
	if(check_layout_val()){
		$('#dataset_layout table tbody tr').each(function(idx, val){
			//추가된 row & 기존 row
			if($(val).attr('data') == 'added' || $(val).attr('data') == 'add'){
				var obj = new Object();
				obj.dataset_idx = dataset_idx;
				obj.data_layout_idx = $("#data_layout_idx_"+idx).val();
				obj.column_name = $("#column_name_"+idx).val();
				obj.kor_name = $("#kor_name_"+idx).val();
				obj.data_type = $("#data_type_"+idx).val();
				obj.data_length = $("#data_length_"+idx).val();
				obj.pk_yn = $("#pk_yn_"+idx).val();
				obj.null_yn = $("#null_yn_"+idx).val();
				obj.column_desc = $("#column_desc_"+idx).val();
				obj.data_domain = $("#data_domain_"+idx).val();
				obj.privacy_type = $("#privacy_type_"+idx).val();
				arr.push(obj);
			}
			
			if($(val).attr('data') == 'del'){
				var obj = new Object();
				obj.dataset_idx = dataset_idx;
				obj.data_layout_idx = $("#data_layout_idx_"+idx).val();
				delArr.push(obj);
			}
		});
		
		var data = JSON.stringify(arr);
		var delData = JSON.stringify(delArr);
			
		$.ajax({
			type: 'POST',
			url: '/saveDatasetLayout.do',
			data: {
				recordList: data,
				delRecordList: delData
			},
			success: function(r){
				if(r.status == 1){
					alert("저장되었습니다.");
					datasetLayout(dataset_idx);
				}
			},
			error: function(e){
				alert("저장에 실패했습니다.");
				datasetLayout(dataset_idx);
			}
			
		});
	}else{
		return false;
	}
}

//샘플데이터 저장
function saveDatasetSample(dataset_idx){
	var arr = new Array();
	var delArr = new Array();
	
	var dataset_idx = dataset_idx;
	
	if(check_sample_val()){
		$('#dataset_sample table tbody tr').each(function(idx, val){
			//추가된 row & 기존 row
			if($(val).attr('data') == 'added' || $(val).attr('data') == 'add'){
				var obj = new Object();
				obj.dataset_idx = dataset_idx;
				obj.data_layout_idx = $("#smpl_data_layout_idx_"+idx).val();
				obj.sample_record = $("#sample_record_"+idx).val();
				arr.push(obj);
			}
			
			if($(val).attr('data') == 'del'){
				var obj = new Object();
				obj.dataset_idx = dataset_idx;
				obj.data_layout_idx = $("#smpl_data_layout_idx_"+idx).val();
				delArr.push(obj);
			}
		});
		
		var data = JSON.stringify(arr);
		var delData = JSON.stringify(delArr);
			
		$.ajax({
			type: 'POST',
			url: '/saveDatasetSample.do',
			data: {
				recordList: data,
				delRecordList: delData
			},
			success: function(r){
				if(r.status == 1){
					alert("저장되었습니다.");
					datasetSample(dataset_idx);
				}
			},
			error: function(e){
				alert("저장에 실패했습니다.");
				datasetSample(dataset_idx);
			}
			
		});
	}else{
		return false;
	}
	
}

//데이터명세 유효성검사
function check_layout_val(){
	var result = true;
	$('#dataset_layout table tbody tr').each(function(idx, val){
		if($(val).attr('data') == 'added' || $(val).attr('data') == 'add'){
			if($("#column_name_"+idx).val() == null || $("#column_name_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#kor_name_"+idx).val() == null || $("#kor_name_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#data_type_"+idx).val() == null || $("#data_type_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#data_length_"+idx).val() == null || $("#data_length_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}else if(isNaN($("#data_length_"+idx).val())){
				alert("숫자만 입력해주세요.");
				result = false;
				return false;
			}
			
			if($("#pk_yn_"+idx).val() == null || $("#pk_yn_"+idx).val().trim() == ""){
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				result = false;
				return false;
			}
			
			if($("#null_yn_"+idx).val() == null || $("#null_yn_"+idx).val().trim() == ""){
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				result = false;
				return false;
			}
			/*
			if($("#column_desc_"+idx).val() == null || $("#column_desc_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
			*/
			if($("#data_domain_"+idx).val() == null || $("#data_domain_"+idx).val().trim() == ""){
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				result = false;
				return false;
			}
			
			if($("#privacy_type_"+idx).val() == null || $("#privacy_type_"+idx).val().trim() == ""){
				alert("선택되지 않은 값이 있습니다. 값을 선택해주세요.");
				result = false;
				return false;
			}
		}
	});
	
	return result;
}

//샘플데이터 유효성검사
function check_sample_val(){
	var result = true;
	$('#dataset_sample table tbody tr').each(function(idx, val){
		if($(val).attr('data') == 'added' || $(val).attr('data') == 'add'){
			if($("#sample_record_"+idx).val() == null || $("#sample_record_"+idx).val().trim() == ""){
				alert("공란이 있습니다. 모두 입력해주세요.");
				result = false;
				return false;
			}
		}
	});
	return result;
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

//데이터셋 삭제
function delDataset(dataset_idx){
	if(confirm("정말 삭제하시겠습니까?") == true){
		$.postDataGetJSON("/delDataset.do", {"dataset_idx":dataset_idx}, function(r){
			if(r.status == 1){
				alert("삭제되었습니다.")
				window.location.href = encodeURI("/datasetList.do");
			}else{
				alert("삭제에 실패했습니다.");
				window.location.href = encodeURI("/datasetList.do");
			}
		});
	}
}