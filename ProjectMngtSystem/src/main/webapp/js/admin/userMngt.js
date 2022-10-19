function movePage(pageNo){
	$("#pageNo").val(pageNo);
	getUserList(0 ,pageNo)
}

function getUserList(chk, page){
	var tag = "";
	
	var pageNo = $("#pageNo").val();
	
	if(pageNo == "" || pageNo == undefined){
		pageNo = 1;
	}
	
	$("#triger").click(function() {
		if(pageNo != 1) {
			pageNo = 1;
		}
	})
	
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
	
	$.postDataGetJSON("/getUserList.do", {
		"searchType":searchType
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
				var user_idx = "";
				var org_idx = "";
				var org_name = "";
				var data_platform = "";
				var user_email = "";
				var mobile = "";
				num = parseInt((parseInt(listSize)*(parseInt(pageNo)-1)) + parseInt(cnt));
				if(r.list[i].user_idx != null){
					user_idx = r.list[i].user_idx;
				}
				if(r.list[i].org_idx != null){
					org_idx = r.list[i].org_idx;
				}
				if(r.list[i].org_name != null){
					org_name = r.list[i].org_name;
				}
				if(r.list[i].data_platform != null){
					data_platform = r.list[i].data_platform;
				}
				if(r.list[i].user_email != null){
					user_email = r.list[i].user_email;
				}
				if(r.list[i].mobile != null){
					mobile = r.list[i].mobile;
				}
				
				tag += '<tr style="cursor:pointer;" onclick="userMngtView('+user_idx+')"><td>'+num+'</td>'
					+ '<td>'+data_platform+'</td>'
					+ '<td><a>'+org_name+'</a></td>'
					+ '<td>'+user_email+'</td>'
					+ '<td>'+mobile+'</td></tr>'
				cnt++;
			}
		}
		$('#totalCnt').html(totalCnt);
		$('#userList tbody').html(tag);
		$('#pagination').html(paging);
	});
}

function userMngtView(user_idx){
	$("#moveForm").attr("action", "/userMngtView.do");
	$("#moveForm input[name=user_idx]").val(user_idx);
	$("#moveForm").submit();
}

function saveUserMngtView(org_idx){
	var org_intro = $("#org_intro").val();
	if(org_intro != null && org_intro != ""){
		$.postDataGetJSON("/saveUserMngtView.do", {
			"org_idx":org_idx,
			"org_intro":org_intro
			}, function(r){
				if(r.status == 1){
					alert("수정되었습니다.")
					userMngtView(user_idx);
				}else{
					alert("수정에 실패했습니다.");
					userMngtView(user_idx);
				}
		});
	}
}