package egovframework.projectMngt.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
	public String goProjectNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam(required = false, defaultValue = "") String project_idx) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		model.addAttribute("login_info", login_info);
		if(project_idx != null && !"".equals(project_idx)) {
			ProjectVO project_info = projectMngtSvc.getProjectInfo(Integer.parseInt(project_idx));
			model.addAttribute("project_info", project_info);
		}
		
		return "/project/projectNew";
	}
	
	@RequestMapping(value = "/projectNew.do")
	@ResponseBody
	public int projectNew(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("customer") String customer
			, @RequestParam("customer_pm") String customer_pm
			, @RequestParam("project_name") String project_name
			, @RequestParam("project_pm") String project_pm
			, @RequestParam("project_period") String project_period
			, @RequestParam("project_reg_date") String project_reg_date
			, @RequestParam("project_info") String project_info
			, @RequestParam(required = false, defaultValue = "") String project_idx) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		ProjectVO project_param = new ProjectVO();
		project_param.setCustomer(customer);
		project_param.setCustomer_pm(customer_pm);
		project_param.setProject_name(project_name);
		project_param.setProject_pm(project_pm);
		project_param.setProject_period(project_period);
		project_param.setReg_user_idx(login_info.getUser_idx());
		
		if(project_reg_date != null && !"".equals(project_reg_date)) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date parseDate = sdf.parse(project_reg_date);
				project_param.setProject_reg_date(new Timestamp(parseDate.getTime()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		if(project_info != null && !"".equals(project_info)) {
			project_param.setProject_info(project_info);
		}
		
		int result = 0;
		if(project_idx != null && !"".equals(project_idx)) {
			project_param.setProject_idx(Integer.parseInt(project_idx));
			result = projectMngtSvc.updProject(project_param);
		}else {
			result = projectMngtSvc.addProject(project_param);
		}
		
		return result;
	}
	
	@RequestMapping("/delProject.do")
	@ResponseBody
	public int delProject(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_idx") String project_idx) {
		int	result = projectMngtSvc.delProject(Integer.parseInt(project_idx));
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
	public String goScheduleNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_idx") String project_idx
			, @RequestParam(required = false, defaultValue = "") String schedule_idx) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		model.addAttribute("project_idx", project_idx);
		
		if(schedule_idx != null && !"".equals(schedule_idx)){
			ScheduleVO schedule_info = projectMngtSvc.getScheduleInfo(Integer.parseInt(schedule_idx));
			model.addAttribute("schedule_info", schedule_info);
		}
		model.addAttribute("login_info", login_info);
		return "/schedule/scheduleNew";
	}
	
	@RequestMapping(value = "/scheduleNew.do")
	@ResponseBody
	public int scheduleNew(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("schedule_name") String schedule_name
			, @RequestParam("schedule_manager") String schedule_manager
			, @RequestParam("schedule_period") String schedule_period
			, @RequestParam("schedule_info") String schedule_info
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("schedule_reg_date") String schedule_reg_date
			, @RequestParam(required = false, defaultValue = "") String schedule_idx){
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		
		ScheduleVO schedule_param = new ScheduleVO();
		schedule_param.setReg_user_idx(login_info.getUser_idx());
		schedule_param.setProject_idx(Integer.parseInt(project_idx));
		schedule_param.setSchedule_name(schedule_name);
		schedule_param.setSchedule_manager(schedule_manager);
		schedule_param.setSchedule_period(schedule_period);
		
		if(schedule_info != null && !"".equals(schedule_info)) {
			schedule_param.setSchedule_info(schedule_info);
		}
		
		if(schedule_reg_date != null && !"".equals(schedule_reg_date)) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date parseDate = sdf.parse(schedule_reg_date);
				schedule_param.setSchedule_reg_date(new Timestamp(parseDate.getTime()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		int result = 0;
		if(schedule_idx != null && !"".equals(schedule_idx)) {
			schedule_param.setSchedule_idx(Integer.parseInt(schedule_idx));
			result = projectMngtSvc.updSchedule(schedule_param);
		}else {
			result = projectMngtSvc.addSchedule(schedule_param);
		}
		
		return result;
	}
	
	@RequestMapping("/delSchedule.do")
	@ResponseBody
	public int delSchedule(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("schedule_idx") String schedule_idx) {
		int result = projectMngtSvc.delSchedule(Integer.parseInt(schedule_idx));
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
	
	@RequestMapping("/goWorkNew.do")
	public String goWorkNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("schedule_idx") String schedule_idx
			, @RequestParam(required = false, defaultValue = "") String work_idx) {
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		model.addAttribute("login_info", login_info);
		
		if(work_idx != null && !"".equals(work_idx)) {
			WorkVO work_info = projectMngtSvc.getWorkInfo(Integer.parseInt(work_idx));
			model.addAttribute("work_info", work_info);
		}
		model.addAttribute("project_idx", project_idx);
		model.addAttribute("schedule_idx", schedule_idx);
		return "/work/workNew";
	}
	
	@RequestMapping(value = "/workNew.do")
	@ResponseBody
	public int workNew(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("work_name") String work_name
			, @RequestParam("work_manager") String work_manager
			, @RequestParam("work_period") String work_period
			, @RequestParam("work_info") String work_info
			, @RequestParam("work_reg_date") String work_reg_date
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("schedule_idx") String schedule_idx
			, @RequestParam(required = false, defaultValue = "") String work_idx){
		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		
		WorkVO work_param = new WorkVO();
		work_param.setReg_user_idx(login_info.getUser_idx());
		work_param.setProject_idx(Integer.parseInt(project_idx));
		work_param.setSchedule_idx(Integer.parseInt(schedule_idx));
		work_param.setWork_name(work_name);
		work_param.setWork_manager(work_manager);
		work_param.setWork_period(work_period);
		
		if(work_info != null && !"".equals(work_info)) {
			work_param.setWork_info(work_info);
		}
		
		if(work_reg_date != null && !"".equals(work_reg_date)) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				Date parseDate = sdf.parse(work_reg_date);
				work_param.setWork_reg_date(new Timestamp(parseDate.getTime()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		int result = 0;
		if(work_idx != null && !"".equals(work_idx)) {
			work_param.setWork_idx(Integer.parseInt(work_idx));
			result = projectMngtSvc.updWork(work_param);
		}else {
			result = projectMngtSvc.addWork(work_param);
		}
		
		return result;
	}
	
	@RequestMapping("/delWork.do")
	@ResponseBody
	public int delWork(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("work_idx") String work_idx) {
		int result = projectMngtSvc.delWork(Integer.parseInt(work_idx));
		return result;
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
//	@RequestMapping(name = "/uploadFile.do", method = RequestMethod.POST)
//	@ResponseBody
//	public int uploadFile(HttpServletRequest request, HttpServletResponse resp, ModelMap model,
//			@RequestParam("uploadFile") MultipartFile mFile,
//			@RequestParam("work_data_idx") String work_data_idx,
//			@RequestParam("work_idx") String work_idx){
//		int status = 1;
//		try {
//			FileVO fileVO = new FileVO();
//			fileVO.setWork_data_idx(Integer.parseInt(work_data_idx));
//			fileVO.setWork_idx(Integer.parseInt(work_idx));
//			fileVO.setUploadFile(mFile);
//			projectMngtSvc.uploadFile(fileVO);
//			
//		} catch (Exception e) {
//			if(logger.isErrorEnabled()) {
//				logger.error("#Exception Message : {}", e.getMessage());
//			}
//			status = 0;
//		}
//		return status;
//	}
	
	@RequestMapping(name = "/uploadFile.do", method = RequestMethod.POST)
	@ResponseBody
	public WorkDataVO uploadFile(HttpServletRequest request, HttpServletResponse resp, ModelMap model,
			@RequestParam("fileArr") List<MultipartFile> fileArr,
			@RequestParam("work_data_idx") String work_data_idx,
			@RequestParam("work_idx") String work_idx){
		int status = 1;
		try {
			FileVO fileVO = new FileVO();
			fileVO.setWork_data_idx(Integer.parseInt(work_data_idx));
			fileVO.setWork_idx(Integer.parseInt(work_idx));
			
			for(MultipartFile file : fileArr) {
				fileVO.setUploadFile(file);
				projectMngtSvc.uploadFile(fileVO);
			}
			
		} catch (Exception e) {
			if(logger.isErrorEnabled()) {
				logger.error("#Exception Message : {}", e.getMessage());
			}
			status = 0;
		}
		WorkDataVO work_data_info = projectMngtSvc.getWorkDataInfo(Integer.parseInt(work_data_idx));
		work_data_info.setStatus(status);
		return work_data_info;
	}
	
	@RequestMapping("/delUploadFile.do")
	@ResponseBody
	public WorkDataVO delUploadFile(HttpServletRequest request, HttpServletResponse resp, ModelMap model,
			@RequestParam("file_idx") String file_idx
			, @RequestParam("work_data_idx") String work_data_idx) {
		int status = projectMngtSvc.delUploadFile(Integer.parseInt(file_idx));
		WorkDataVO work_data_info = projectMngtSvc.getWorkDataInfo(Integer.parseInt(work_data_idx));
		work_data_info.setStatus(status);
		return work_data_info;
	}
	
	@RequestMapping("/fileDownload.do")
	public void fileDownload(HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("file_idx") String file_idx) {
		projectMngtSvc.fileDownload(Integer.parseInt(file_idx), request, resp);
	}

}
