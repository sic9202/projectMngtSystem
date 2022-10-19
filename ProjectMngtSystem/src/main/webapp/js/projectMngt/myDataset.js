function movePage(pageNo){
	$("#pageNo").val(pageNo);
	getMyDatasetList(0,pageNo);
}

function getMyDatasetList(chk, page){
	var user_idx = $("#moveForm input[name=user_idx]").val();
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
	
	var listSize = 3;
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
	
	$.postDataGetJSON("/getMyDatasetList.do", {
		"user_idx":user_idx
		, "searchType":searchType
		, "searchContent":searchContent
		, "pageNo": pageNo
		, "listSize": listSize
	}, function(r){
		var totalCnt = "0";
		var region = "";
		var data_name = "";
		var insert_date = "";
		var data_desc = "";
		var org_name = "";
		var dataset_idx = "";
		
		if(r.list.length > 0){
			var totalCnt = r.totalCnt;
			var paging = r.paging_html;
			var endPage = parseInt(totalCnt/listSize);
			
			for(var i = 0; i < r.list.length; i++){
				org_name = r.list[i].org_name;
				region = r.list[i].region;
				if(region == null){
					region = '-';
				}
				data_name = r.list[i].data_name;
				insert_date = r.list[i].dataset_insert_date;
				data_desc = r.list[i].data_desc;
				if(data_desc == null){
					data_desc = '-';
				}
				dataset_idx = r.list[i].dataset_idx;
				
				tag += 	'<div class="data-view-result" style="cursor: pointer;" onclick="myDatasetView('+dataset_idx+')">'
					+ 		'<p class="cate"><span class="cate19">분야</span> <span>'+region+'</span></p>'
					+ 		'<p class="date"><span>기관명 : '+org_name+'</span>'
					+			'<span>등록일자 : '+insert_date+'</span>'
					+		'</p>'
					+		'<p class="title"><a>'+data_name+'</a></p>'
					+		'<p class="text">'+data_desc+'</p>'
					+	'</div>'
			}
		}else{
			tag += '<div class="data-view-result">'
				+  		'<p class="text">조회된 데이터가 없습니다.</p>'
				+  '</div>'
		}
		$('#data_content').html(tag);
		$('#totalCnt').html(totalCnt);
		$('#pagination').html(paging);
	});
}

function myDatasetView(dataset_idx){
	$("#moveForm").attr("action", "/myDatasetView.do");
	$("#moveForm input[name=dataset_idx]").val(dataset_idx);
	$("#moveForm").submit();
}

function datasetSamplePopUp(dataset_idx){
	$.postDataGetJSON("/getDatasetSample.do", {"dataset_idx":dataset_idx}, function(r){
		var colTag = "";
		var thTag = "";
		var tdTag = "";
		if(r.dataset_sample_info.length > 0){
			for(var i = 0; i < r.dataset_sample_info.length; i++){
				var column_name = r.dataset_sample_info[i].column_name;
				var sample_record = r.dataset_sample_info[i].sample_record;
				if(sample_record == null){
					sample_record = '-';
				}
				
				colTag += '<col style="width:auto">'
				thTag += '<th>'+column_name+'</th>';
				tdTag += '<td>'+sample_record+'</td>';
			}
			$('#dataset_sample colgroup').html(colTag);
			$('#dataset_sample thead tr').html(thTag);
			$('#dataset_sample tbody tr').html(tdTag);
		}else{
			tdTag += '<td>조회된 데이터가 없습니다.</td>'
			$('#dataset_sample tbody tr').html(tdTag);
		}
	});
	$("#dataset_sample_modal").modal();
}

function datasetLayoutPopUp(dataset_idx){
	$.postDataGetJSON("/getDatasetLayout.do", {"dataset_idx":dataset_idx}, function(r){
		var tag = "";
		if(r.dataset_layout_info.length > 0){
			for(var i = 0; i < r.dataset_layout_info.length; i++){
				var column_name = r.dataset_layout_info[i].column_name;
				var kor_name = r.dataset_layout_info[i].kor_name;
				var data_type_str = r.dataset_layout_info[i].data_type_str;
				var data_length = r.dataset_layout_info[i].data_length;
				
				var pk_yn = r.dataset_layout_info[i].pk_yn;
				if(pk_yn == 0)
					pk_yn = 'n';
				else
					pk_yn = 'y'
						
				var null_yn = r.dataset_layout_info[i].null_yn;
				if(null_yn == 0)
					null_yn = 'n';
				else
					null_yn = 'y';
				
				var column_desc = r.dataset_layout_info[i].column_desc;
				var data_domain_str = r.dataset_layout_info[i].data_domain_str;
				var privacy_type_str = r.dataset_layout_info[i].privacy_type_str;
				
				tag += '<tr><td>'+column_name+'</td>'
					+ '<td>'+kor_name+'</td>'
					+ '<td>'+data_type_str+'</td>'
					+ '<td>'+data_length+'</td>'
					+ '<td>'+pk_yn+'</td>'
					+ '<td>'+null_yn+'</td>'
					+ '<td>'+column_desc+'</td>'
					+ '<td>'+data_domain_str+'</td>'
					+ '<td>'+privacy_type_str+'</td></tr>'
			}
		}else{
			tag += '<tr>'
				+		'<td colspan="9">조회된 데이터가 없습니다.</td>'
				+	'</tr>'
		}
		
		$('#dataset_layout tbody').html(tag);
	});
	$("#dataset_layout_modal").modal();
}

//관심목록 삭제
function delMyDataset(dataset_idx){
	if(confirm("정말 삭제하시겠습니까?") == true){
		$.postDataGetJSON("/delMyDataset.do", {"dataset_idx":dataset_idx}, function(r){
			if(r.status == 1){
				alert("삭제되었습니다.")
				window.location.href = encodeURI("/myDatasetList.do");
			}else{
				alert("삭제에 실패했습니다.");
				window.location.href = encodeURI("/myDatasetList.do");
			}
		});
	}
}