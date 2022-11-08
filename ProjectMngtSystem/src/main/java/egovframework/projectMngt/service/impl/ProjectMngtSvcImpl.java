package egovframework.projectMngt.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import egovframework.projectMngt.service.ProjectMngtSvc;
import egovframework.projectMngt.vo.FileVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.SearchVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import jdk.nashorn.internal.ir.RuntimeNode.Request;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.annotations.Param;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.xml.internal.ws.api.ha.StickyFeature;

@Service("projectMngtSvc")
public class ProjectMngtSvcImpl implements ProjectMngtSvc {
	private final Logger logger = LoggerFactory.getLogger(this.getClass()) ;
	
	@Resource(name = "projectMngtMapper")
	private ProjectMngtMapper projectMngtMapper;
	
	@Resource(name = "uploadPath")
	private String uploadPath;
	
	public List<ProjectVO> getProjectList(SearchVO search){
		List<ProjectVO> project_list = projectMngtMapper.getProjectList(search);
		return project_list;
	}
	
	public int getProjectListCnt() {
		int totalCnt = projectMngtMapper.getProjectListCnt();
		return totalCnt;
	}
	
	public List<ScheduleVO> getScheduleList(int project_idx){
		List<ScheduleVO> schedule_list = projectMngtMapper.getScheduleList(project_idx);
		return schedule_list;
	}
	
	public int getScheduleListCnt(int project_idx) {
		int totalCnt = projectMngtMapper.getScheduleListCnt(project_idx);
		return totalCnt;
	}
	
	public List<WorkVO> getWorkList(Map<String, Integer> map){
		List<WorkVO> work_list = projectMngtMapper.getWorkList(map);
		return work_list;
	}
	
	public int getWorkListCnt(Map<String, Integer> map) {
		int totalCnt = projectMngtMapper.getWorkListCnt(map);
		return totalCnt;
	}
	
	public ProjectVO getProjectInfo(int project_idx) {
		ProjectVO project_info = projectMngtMapper.getProjectInfo(project_idx);
		return project_info;
	}
	
	public ScheduleVO getScheduleInfo(int schedule_idx) {
		ScheduleVO schedule_info = projectMngtMapper.getScheduleInfo(schedule_idx);
		return schedule_info;
	}
	
	public WorkVO getWorkInfo(int work_idx) {
		WorkVO work_info = projectMngtMapper.getWorkInfo(work_idx);
		return work_info;
	}
	
	public int addProject(ProjectVO project_param) {
		int result = projectMngtMapper.addProject(project_param);
		return result;
	}
	
	public int addSchedule(ScheduleVO schedule_param) {
		int result = projectMngtMapper.addSchedule(schedule_param);
		return result;
	}
	
	public List<WorkDataVO> getWorkDataList(int work_idx) {
		List<WorkDataVO> work_data_info = projectMngtMapper.getWorkDataList(work_idx);
		return work_data_info;
	}
	
	public int getWorkDataListCnt(int work_idx) {
		int totalCnt = projectMngtMapper.getWorkDataListCnt(work_idx);
		return totalCnt;
	}
	
	public int saveWorkData(Map<String, String> map) {
		int result = 1;
		try {
			String addRecordList = map.get("addRecordList");
			JSONArray addJsonArr = new JSONArray(addRecordList);
			if(addJsonArr.length() != 0) {
				List<Map<String, String>> addList = getListMapFromJsonArray(addJsonArr);
				int addCnt = projectMngtMapper.addWorkData(addList);
			}
			
			String updRecordList = map.get("updRecordList");
			JSONArray updJsonArr = new JSONArray(updRecordList);
			if(updJsonArr.length() != 0) {
				List<Map<String, String>> updList = getListMapFromJsonArray(updJsonArr);
				int updCnt = projectMngtMapper.updWorkData(updList);
			}
			
			String delRecordList = map.get("delRecordList");
			JSONArray delJsonArr = new JSONArray(delRecordList);
			if(delJsonArr.length() != 0) {
				List<Map<String, String>> delList = getListMapFromJsonArray(delJsonArr);
				//work_data row 삭제
				int delCnt = projectMngtMapper.delWorkData(delList);
				
				boolean delResult = true;
				//file delete
				for(int i = 0; i < delList.size(); i++) {
					int work_data_idx = Integer.parseInt(delList.get(i).get("work_data_idx"));
					FileVO fileVO = new FileVO();
					fileVO.setWork_data_idx(work_data_idx);
					fileVO = projectMngtMapper.getUploadFileInfo(fileVO);
					delResult = delFile(fileVO);
				}
				
				//file_info row 삭제
				if(delResult) {
					int delFileCnt = projectMngtMapper.delFileInfo(delList);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			result = 0;
		}
		
		return result;
	}
	
	//jsonObject -> Map
	public static Map<String, String> getMapFromJSONObject(JSONObject obj){
		if(ObjectUtils.isEmpty(obj)) {
			throw new IllegalArgumentException(String.format("BAD REQUEST obj %s", obj));
		}
		
		try {
			Map<String, String> map = new ObjectMapper().readValue(obj.toString(), Map.class);
			return map;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	//jsonArray -> List<Map>
	public static List<Map<String, String>> getListMapFromJsonArray(JSONArray jsonArray){
		if(ObjectUtils.isEmpty(jsonArray)) {
			throw new IllegalArgumentException("jsonArray is null");
		}
		List<Map<String, String>> list = new ArrayList<Map<String,String>>();
		for(Object jsonObject : jsonArray) {
			list.add(getMapFromJSONObject((JSONObject) jsonObject));
		}
		
		return list;
	}
	
	//fileUpload
	public void uploadFile(FileVO fileVO) throws Exception{
		
		//obj for fileName duplication
		String saveFileName = "", saveFilePath = "";
		
		//original file name
		String orgFileName = fileVO.getUploadFile().getOriginalFilename();
	
		//file name w/o ext
		String fileCutName = orgFileName.substring(0, orgFileName.lastIndexOf("."));
	
		//ext
		String fileExt = orgFileName.substring(orgFileName.lastIndexOf(".") + 1);
	
		//file path, file name
		saveFilePath = uploadPath + File.separator + orgFileName;
	
		//저장할 파일명
		saveFileName = orgFileName; 
	
		//create file on file path
		File fileFolder = new File(uploadPath);
		if(!fileFolder.exists()) {
			if(fileFolder.mkdirs()) {
				logger.info("[file.mkdirs] : Success");
			}else {
				logger.error("[file.mkdirs] : Fail");
			}
		}
		
		File saveFile = new File(saveFilePath);
		
		//동일파일명 확인
		if(saveFile.isFile()) {
			boolean _exist = true;
			int index = 0;
			
			//file name duplication chk
			while(_exist) {
				index++;
				saveFileName = fileCutName + "(" + index + ")." + fileExt;
				String dictFile = uploadPath + File.separator + saveFileName;
				
				_exist = new File(dictFile).isFile();
				if(!_exist) {
					saveFilePath = dictFile;
				}
			}
			//업로드처리
			fileVO.getUploadFile().transferTo(new File(saveFilePath));
		}else {
			fileVO.getUploadFile().transferTo(saveFile);
		}
		fileVO.setFile_name(saveFileName);
		fileVO.setFile_path(saveFilePath);
		fileVO.setFile_size(fileVO.getUploadFile().getSize());
		fileVO.setExt(fileExt);
		
		//기존 work_data에 있는 파일인지 확인
		FileVO addedFileInfo = projectMngtMapper.getUploadFileInfo(fileVO);
		if(addedFileInfo != null) {
			fileVO.setFile_idx(addedFileInfo.getFile_idx());
			projectMngtMapper.updAddedFileInfo(fileVO);
		}else {
			projectMngtMapper.addFileInfo(fileVO);
		}
	}
	
	//file delete
	public static boolean delFile(FileVO file_info) {
		boolean result = true;
		try {
			File file = new File(file_info.getFile_path());
			if(file.isFile())
				file.delete();
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	public boolean delUploadFile(int file_idx) {
		FileVO file_info = new FileVO();
		file_info.setFile_idx(file_idx);
		
		file_info = projectMngtMapper.getUploadFileInfo(file_info);
		
		//file delete
		boolean result = delFile(file_info);
		
		//file_info table update
		projectMngtMapper.updDelYn(file_info);
		
		return result;
	}
	
	public void fileDownload(int file_idx, HttpServletRequest request, HttpServletResponse resp) {
		FileVO file_info = new FileVO();
		file_info.setFile_idx(file_idx);
		file_info = projectMngtMapper.getUploadFileInfo(file_info);
		
		String file_name = file_info.getFile_name();
		
		try {
			String browser = request.getHeader("User-Agent");
			if(browser.contains("MSIE") || browser.contains("Trident") || browser.contains("Chrome")) {
				file_name = URLEncoder.encode(file_name, "UTF-8").replaceAll("\\+", "%20");
			}else {
				file_name = new String(file_name.getBytes("UTF-8"), "ISO-8859-1");
			}
		} catch (UnsupportedEncodingException ex) {
			System.out.println("UnsupportedEncodingException");
		}
		
		String file_path = file_info.getFile_path();
		File file = new File(file_path);
		if(!file.exists()) {
			return;
		}
		
		resp.setContentType("application/octer-stream");
		resp.setHeader("Content-Transfer-Encoding", "binary");
		resp.setHeader("Content-Disposition", "attachment; filename=\"" + file_name + "\"");
		try {
			OutputStream os = resp.getOutputStream();
			FileInputStream fis = new FileInputStream(file_path);
			
			int ncount = 0;
			byte[] bytes = new byte[512];
			
			while((ncount = fis.read(bytes)) != -1) {
				os.write(bytes, 0, ncount);
			}
			fis.close();
			os.close();
		} catch (Exception e) {
			System.out.println("FileNotFoundException : " + e);
		}
	}
}
