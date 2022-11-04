package egovframework.projectMngt.service.impl;

import java.io.File;
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
				int delCnt = projectMngtMapper.delWorkData(delList);
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
	public void uploadFile(MultipartHttpServletRequest multiRequest) throws Exception{
		
		FileVO fileVO = new FileVO();
		ModelMap model = new ModelMap();
		
		
		Map<String, MultipartFile> files = multiRequest.getFileMap();
		
		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		
		MultipartFile mFile;
		
		//obj for fileName duplication
		String saveFileName = "", saveFilePath = "";
		
		while(itr.hasNext()) {
			Entry<String, MultipartFile> entry = itr.next();
			
			mFile = entry.getValue();
			
			//original file name
			String orgFileName = mFile.getOriginalFilename();
		
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
				mFile.transferTo(new File(saveFilePath));
			}else {
				mFile.transferTo(saveFile);
			}
			fileVO.setFileName(saveFileName);
			
			model.addAttribute("fileVO", fileVO);
		}
	}
}
