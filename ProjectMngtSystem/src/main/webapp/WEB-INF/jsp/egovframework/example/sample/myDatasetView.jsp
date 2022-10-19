<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html lang="ko">

<body>
	<script src="/js/dataset/myDataset.js"></script>
    <div class="sub-visual sv01 on">
      <p class="animated on">관심목록</p>
    </div>
    <!--header end-->


    <!-- container start-->
    <div class="pr-page">
      <div class="inner02">
        <p class="sub__tit01"> 관심목록<span class="sub__tit02"></span></p>

        <div class="board_detail_contents">

          <div class="btn-area lb">
            <a href="javascript:history.back();" onclick="" class="btn btn-big btn_green btn-150">목록</a>
          </div>
          <div class="data-view-result">
            <p class="cate"><span class="cate19">분야</span> <span>${result.dataset_info.region }</span></p>
            <p class="date"><span>기관명 : ${result.dataset_info.org_name }</span>
              <span>등록일자 : ${result.dataset_info.dataset_insert_date } </span>
            </p>
            <p class="title">${result.dataset_info.data_name}</p>
            <p class="text">
			<c:if test="${result.dataset_info.data_desc ne null}">
           		${result.dataset_info.data_desc }
            </c:if>
            <c:if test="${result.dataset_info.data_desc eq null}">
            	-
            </c:if>            
            </p>
          </div>

          <table class="tbl_info">
            <caption> 표</caption>
            <colgroup>
              <col style="width:20%">
              <col style="width:30%">
              <col style="width:20%">
              <col style="width:30%">
            </colgroup>
            <thead>
              <tr>
               <!--  <th>데이터 분야</th>
                <td class="lb">정렬</td>
                <th>형태 소분류</th>
                <td class="lb">텍스트</td> -->
              </tr>
            <tbody>
              <tr>
                <th>인코딩 방식</th>
                <td class="lb">
                ${result.dataset_info.encoding_type}
				<c:if test="${result.dataset_info.encoding_type ne null}">
                	${result.dataset_info.encoding_type}
                </c:if>
                <c:if test="${result.dataset_info.encoding_type eq null}">
                	-
                </c:if>
				</td>
                <th>확장자</th>
                <td class="lb">
                <c:if test="${result.dataset_info.file_extension ne null}">
                	${result.dataset_info.encoding_type}
                </c:if>
                <c:if test="${result.dataset_info.file_extension eq null}">
                	-
                </c:if>
                </td>
              </tr>
              <tr>
                <th>압축형식</th>
                <td class="lb" colspan="3">
				<c:if test="${result.dataset_info.compression_type ne null }">
					${result.dataset_info.compression_type}
				</c:if>
				<c:if test="${result.dataset_info.compression_type eq null }">
					-
				</c:if>
				</td>
              </tr>
              <tr>
                <th>사이즈</th>
                <td class="lb">
                <c:if test="${result.dataset_info.dataset_size ne null}">
					${result.dataset_info.dataset_size}
				</c:if>
				 <c:if test="${result.dataset_info.dataset_size eq null}">
					-
				</c:if>  
                </td>
                <th>건수</th>
                <td class="lb">
				<c:if test="${result.dataset_info.record_count ne null}">
					${result.dataset_info.record_count}
				</c:if>
				 <c:if test="${result.dataset_info.record_count eq null}">
					-
				</c:if>  
				</td>
              </tr>
              <tr>
                <th>제공유형</th>
                <td class="lb">협의</td>
                <th>제공을 위한 처리비용</th>
                <td class="lb">
                <c:if test="${result.dataset_info.processing_cost ne null}">
					${result.dataset_info.processing_cost}
				</c:if>
				<c:if test="${result.dataset_info.processing_cost eq null}">
					-
				</c:if>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="tbl_info2">
            <caption> 표</caption>
            <colgroup>
              <col style="width:20%">
              <col style="width:30%">
              <col style="width:20%">
              <col style="width:30%">
            </colgroup>
            <thead>
              <tr>
                <th>보유기관</th>
                <td class="lb" colspan="3">${result.dataset_info.org_name}</td>
              </tr>
            <tbody>
              <tr>
                <th>홈페이지</th>
                <td class="lb">-</td>
                <th>기관업종</th>
                <td class="lb">${result.dataset_info.biz_type}</td>
              </tr>
              <tr>
                <th>담당자이메일</th>
                <td class="lb">${result.dataset_info.user_email }</td>
                <th>연락처</th>
                <td class="lb">${result.dataset_info.mobile }</td>
              </tr>
            </tbody>
          </table>
          <div class="btn-area lb">
          	<a style="cursor: pointer;" onclick="datasetLayoutPopUp(${result.dataset_info.dataset_idx})" class="btn btn-sm btn_color_navy"><i class="xi-stack-paper"></i>
              데이터명세</a>
            <a style="cursor: pointer;" onclick="datasetSamplePopUp(${result.dataset_info.dataset_idx})" class="btn btn-sm btn_color_navy"><i class="xi-paper"></i>
              샘플데이터</a>
          </div>
          <div class="btn-area rb">
            <!-- <a href="#" onclick="" class="btn btn-big btn_gray btn-150">데이터 문의</a> -->
          		<a style="cursor: pointer;" onclick="delMyDataset(${result.dataset_info.dataset_idx})" class="btn btn-big btn_color_green btn-150">관심목록 삭제</a>
          </div>
        </div>
      </div>
      <!-- container end-->
  </div>
</body>

 <div id="modal_content" class="jquery-modal blocker current" style="display: none;">
    <div id="dataset_layout_modal" class="modal large" style="display: inline-block;">
      <a href="#close-modal" rel="modal:close" class="close-modal"><i class="xi-close-min"></i>Close</a>
      <!-- 레이어팝업  data-->
      <a href="#focus" class="disabled layer-focus" id="layer_data_preview_pop">레이어로 포커스 이동 됨</a>

      <div class="layer-title">데이터 명세</div>

      <!-- layer-contents -->
      <div class="layer-contents">

        <p class="sub__tit05"> ${result.dataset_info.data_name} </p>


        <table id="dataset_layout" class="tbl_info2">
          <caption> 표</caption>
          <colgroup>
            <col style="width:10%">
            <col style="width:10%">
            <col style="width:10%">
            <col style="width:auto">
            <col style="width:auto">
            <col style="width:auto">
            <col style="width:20%">
            <col style="width:10%">
            <col style="width:10%">
          </colgroup>
          <thead>
            <tr>
              <th>컬럼명</th>
              <th>컬럼한글명</th>
              <th>데이터타입</th>
              <th>길이</th>
              <th>PK여부</th>
              <th>NotNull<br>여부</th>
              <th>컬럼 설명</th>
              <th>도메인</th>
              <th>개인정보여부</th>
            </tr>
          <tbody>
            <tr></tr>
          </tbody>
        </table>

      </div>
      <!--// layer-contents -->

      <!-- layer-bottom -->
      <div class="btn-area cb">
        <a href="#" rel="modal:close" class="btn btn-big btn_gray btn-150">닫기</a>
      </div>
      <!--// layer-bottom -->
      <!--// 레이어팝업 - data -->


      <div class="jquery-modal blocker current" style="display: none;">
        <div id="dataset_sample_modal" class="modal large" style="display: inline-block;">
          <a href="#close-modal" rel="modal:close" class="close-modal"><i class="xi-close-min"></i>Close</a>
          <!-- 레이어팝업  - sample -->
          <a href="#focus" class="disabled layer-focus" id="layer_sample_preview_pop">레이어로 포커스 이동 됨</a>

          <div class="layer-title">샘플 데이터</div>

          <!-- layer-contents -->
          <div class="layer-contents">
            <p class="sub__tit05"> ${result.dataset_info.data_name} </p>
			<table id="dataset_sample" class="tbl_info2">
              <caption> 표</caption>
              <colgroup></colgroup>
              <thead>
                <tr></tr>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <!--// layer-contents -->
          <!-- layer-bottom -->
          <div class="btn-area cb">
            <a href="#" rel="modal:close" class="btn btn-big btn_gray btn-150">닫기</a>
          </div>
          <!--// layer-bottom -->
          <!--// 레이어팝업 - sample -->
		  </div>
		</div>
	</div>
</div>

</html>