package egovframework.projectMngt.controller;

import java.util.List;
import java.util.Map;

import egovframework.projectMngt.service.ProjectMngtSvc;
import egovframework.projectMngt.vo.FileVO;
import egovframework.projectMngt.vo.LoginVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.SearchVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;
import egovframework.rte.fdl.property.EgovPropertyService;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ProjectMngtCtrl {
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Resource(name = "projectMngtSvc")
	private ProjectMngtSvc projectMngtSvc;
	
	@Resource(name = "propertiesService")
	private EgovPropertyService propertiesService;
	
	//project 시작 
	@RequestMapping("/projectList.do")
	public String projectList(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam(required = false, defaultValue = "1") int currentPageNo
			, @RequestParam(required = false, defaultValue = "") String searchType
			, @RequestParam(required = false, defaultValue = "") String searchContent) {
		
		SearchVO search = new SearchVO();
		search.setPageUnit(propertiesService.getInt("mainPageUnit"));
		search.setPageSize(propertiesService.getInt("mainPageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(currentPageNo);
		paginationInfo.setRecordCountPerPage(search.getPageUnit());
		paginationInfo.setPageSize(search.getPageSize());
		
		search.setFirstIndex(paginationInfo.getFirstRecordIndex());
		search.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List<ProjectVO> project_list = projectMngtSvc.getProjectList(search);
		int totalCnt = projectMngtSvc.getProjectListCnt();
		paginationInfo.setTotalRecordCount(totalCnt);
		
		model.addAttribute("project_list", project_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "/project/projectList";
	}
	
	@RequestMapping("/goProjectNew.do")
	public String goProjectNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		model.addAttribute("login_info", login_info);
		return "/project/projectNew";
	}
	
	@RequestMapping(value = "/projectNew.do")
	@ResponseBody
	public int projectNew(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_name") String project_name
			, @RequestParam("project_type") String project_type
			, @RequestParam("project_info") String project_info) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		ProjectVO project_param = new ProjectVO();
		project_param.setProject_name(project_name);
		project_param.setReg_user_idx(login_info.getUser_idx());
		project_param.setProject_type(project_type);
		project_param.setProject_info(project_info);
		
		int result = projectMngtSvc.addProject(project_param);
		
		return result;
	}
	//project 끝
	
	//schedule 시작
	@RequestMapping("/scheduleList.do")
	public String scheduleList(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_idx") String project_idx
			, @RequestParam(required = false, defaultValue = "1") int currentPageNo
			, @RequestParam(required = false, defaultValue = "") String searchType
			, @RequestParam(required = false, defaultValue = "") String searchContent) {
		SearchVO search = new SearchVO();
		search.setPageUnit(propertiesService.getInt("listPageUnit"));
		search.setPageSize(propertiesService.getInt("listPageSize"));
		search.setProject_idx(Integer.parseInt(project_idx));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(currentPageNo);
		paginationInfo.setRecordCountPerPage(search.getPageUnit());
		paginationInfo.setPageSize(search.getPageSize());
		
		search.setFirstIndex(paginationInfo.getFirstRecordIndex());
		search.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		List<ScheduleVO> schedule_list = projectMngtSvc.getScheduleList(search);
		int totalCnt = projectMngtSvc.getScheduleListCnt(Integer.parseInt(project_idx));
		paginationInfo.setTotalRecordCount(totalCnt);
		ProjectVO project_info = projectMngtSvc.getProjectInfo(Integer.parseInt(project_idx));
		
		model.addAttribute("schedule_list", schedule_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("project_info", project_info);
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "/schedule/scheduleList";
	}
	
	@RequestMapping("/goScheduleNew.do")
	public String goScheduleNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx) {
		model.addAttribute("project_idx", project_idx);
		return "/schedule/scheduleNew";
	}
	
	@RequestMapping("/goWorkNew.do")
	public String goWorkNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("schedule_idx") String schedule_idx) {
		model.addAttribute("project_idx", project_idx);
		model.addAttribute("schedule_idx", schedule_idx);
		return "/work/workNew";
	}
	
	@RequestMapping(value = "/scheduleNew.do")
	@ResponseBody
	public int scheduleNew(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("schedule_name") String schedule_name
			, @RequestParam("project_idx") String project_idx){
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		ScheduleVO schedule_param = new ScheduleVO();
		schedule_param.setProject_idx(Integer.parseInt(project_idx));
		schedule_param.setSchedule_name(schedule_name);
		schedule_param.setReg_user_idx(login_info.getUser_idx());
		
		int result = projectMngtSvc.addSchedule(schedule_param);
		
		return result;
	}
	
	@RequestMapping(value = "/workNew.do")
	@ResponseBody
	public int workNew(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("work_name") String work_name
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("schedule_idx") String schedule_idx){
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		WorkVO work_param = new WorkVO();
		work_param.setProject_idx(Integer.parseInt(project_idx));
		work_param.setSchedule_idx(Integer.parseInt(schedule_idx));
		work_param.setWork_name(work_name);
		work_param.setReg_user_idx(login_info.getUser_idx());
		
		int result = projectMngtSvc.addWork(work_param);
		
		return result;
	}
	//schedule 끝
	
	//work 시작
	@RequestMapping("/workList.do")
	public String workList(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("schedule_idx") String schedule_idx
			, @RequestParam(required = false, defaultValue = "1") int currentPageNo
			, @RequestParam(required = false, defaultValue = "") String searchType
			, @RequestParam(required = false, defaultValue = "") String searchContent) {
		
		SearchVO search = new SearchVO();
		search.setPageUnit(propertiesService.getInt("listPageUnit"));
		search.setPageSize(propertiesService.getInt("listPageSize"));
		
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(currentPageNo);
		paginationInfo.setRecordCountPerPage(search.getPageUnit());
		paginationInfo.setPageSize(search.getPageSize());
		
		search.setFirstIndex(paginationInfo.getFirstRecordIndex());
		search.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		search.setProject_idx(Integer.parseInt(project_idx));
		search.setSchedule_idx(Integer.parseInt(schedule_idx));
		
		List<WorkVO> work_list = projectMngtSvc.getWorkList(search);
		int totalCnt = projectMngtSvc.getWorkListCnt(search);
		paginationInfo.setTotalRecordCount(totalCnt);
		ProjectVO project_info = projectMngtSvc.getProjectInfo(Integer.parseInt(project_idx));
		ScheduleVO schedule_info = projectMngtSvc.getScheduleInfo(Integer.parseInt(schedule_idx));
		
		model.addAttribute("work_list", work_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("project_info", project_info);
		model.addAttribute("schedule_info", schedule_info);
		model.addAttribute("paginationInfo", paginationInfo);
		
		return "/work/workList";
	}
	
	@RequestMapping("/workView.do")
	public String workView(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx,
			@RequestParam("schedule_idx") String schedule_idx,
			@RequestParam("work_idx") String work_idx) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		
		WorkVO work_info = projectMngtSvc.getWorkInfo(Integer.parseInt(work_idx));
		ProjectVO project_info = projectMngtSvc.getProjectInfo(Integer.parseInt(project_idx));
		ScheduleVO schedule_info = projectMngtSvc.getScheduleInfo(Integer.parseInt(schedule_idx));
		
		List<WorkDataVO> work_data_list = projectMngtSvc.getWorkDataList(Integer.parseInt(work_idx));
		int totalCnt = projectMngtSvc.getWorkDataListCnt(Integer.parseInt(work_idx));
		
		model.addAttribute("work_info", work_info);
		model.addAttribute("project_info", project_info);
		model.addAttribute("schedule_info", schedule_info);
		model.addAttribute("work_data_list", work_data_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("login_info", login_info);
		
		return "/work/workView";
	}
	
	@RequestMapping("/saveWorkData.do")
	@ResponseBody
	public int saveWorkData(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam Map<String, String> map) throws Exception {
		int status = projectMngtSvc.saveWorkData(map);
		
		return status;
	}
	
	@RequestMapping("/getWorkData.do")
	@ResponseBody
	public WorkDataVO getWorkData(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("work_data_idx") String work_data_idx) throws Exception {
		
		WorkDataVO work_data_info = projectMngtSvc.getWorkDataInfo(Integer.parseInt(work_data_idx));
		
		return work_data_info;
	}
	//work 끝
	
	//fileUpload
	@RequestMapping(name = "/uploadFile.do", method = RequestMethod.POST)
	@ResponseBody
	public int uploadFile(HttpServletRequest request, HttpServletResponse resp, ModelMap model,
			@RequestParam("uploadFile") MultipartFile mFile,
			@RequestParam("work_data_idx") String work_data_idx,
			@RequestParam("work_idx") String work_idx){
		int status = 1;
		try {
			FileVO fileVO = new FileVO();
			fileVO.setWork_data_idx(Integer.parseInt(work_data_idx));
			fileVO.setWork_idx(Integer.parseInt(work_idx));
			fileVO.setUploadFile(mFile);
			projectMngtSvc.uploadFile(fileVO);
			
		} catch (Exception e) {
			if(logger.isErrorEnabled()) {
				logger.error("#Exception Message : {}", e.getMessage());
			}
			status = 0;
		}
		return status;
	}
	@RequestMapping("/delUploadFile.do")
	@ResponseBody
	public boolean delUploadFile(HttpServletRequest request, HttpServletResponse resp, ModelMap model,
			@RequestParam("file_idx") String file_idx) {
		boolean result = projectMngtSvc.delUploadFile(Integer.parseInt(file_idx));
		return result;
	}
	
	@RequestMapping("/fileDownload.do")
	public void fileDownload(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("file_idx") String file_idx) {
		projectMngtSvc.fileDownload(Integer.parseInt(file_idx), request, resp);
	}

}
