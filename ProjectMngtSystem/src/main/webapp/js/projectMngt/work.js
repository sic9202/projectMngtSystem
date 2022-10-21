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

function datasetView(dataset_idx){
	$("#moveForm").attr("action", "/datasetView.do");
	$("#moveForm input[name=dataset_idx]").val(dataset_idx);
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