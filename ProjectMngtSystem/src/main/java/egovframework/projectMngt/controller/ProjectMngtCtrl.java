package egovframework.projectMngt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import egovframework.projectMngt.service.ProjectMngtSvc;
import egovframework.projectMngt.vo.LoginVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProjectMngtCtrl {

	@Resource(name = "projectMngtSvc")
	private ProjectMngtSvc projectMngtSvc;
	
	//project 시작 
	@RequestMapping("/projectList.do")
	public String projectList(ModelMap model, HttpServletRequest request, HttpServletResponse resp) {
		LoginVO loginVO = (LoginVO) request.getSession().getAttribute("loginVO");
		
		List<ProjectVO> project_list = projectMngtSvc.getProjectList();
		int totalCnt = projectMngtSvc.getProjectListCnt();
		model.addAttribute("project_list", project_list);
		model.addAttribute("totalCnt", totalCnt);
		
		return "/project/projectList";
	}
	
	@RequestMapping("/goProjectNew.do")
	public String goProjectNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp) {
		return "/project/projectNew";
	}
	
	@RequestMapping(value = "/projectNew.do")
	@ResponseBody
	public int projectNew(@RequestParam("project_name") String project_name, @RequestParam("user_idx") String user_idx) {
		ProjectVO project_param = new ProjectVO();
		project_param.setProject_name(project_name);
		if(!"".equals(user_idx) && user_idx != null)
			project_param.setReg_user_idx(Integer.parseInt(user_idx));
		else
			project_param.setReg_user_idx(1);
		project_param.setProject_type("test project type");
		
		int result = projectMngtSvc.addProject(project_param);
		
		return result;
	}
	//project 끝
	
	//schedule 시작
	@RequestMapping("/scheduleList.do")
	public String scheduleList(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx) {
		List<ScheduleVO> schedule_list = projectMngtSvc.getScheduleList(Integer.parseInt(project_idx));
		int totalCnt = projectMngtSvc.getScheduleListCnt(Integer.parseInt(project_idx));
		ProjectVO project_info = projectMngtSvc.getProjectInfo(Integer.parseInt(project_idx));
		
		model.addAttribute("schedule_list", schedule_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("project_info", project_info);
		
		return "/schedule/scheduleList";
	}
	
	@RequestMapping("/goScheduleNew.do")
	public String goScheduleNew(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx) {
		model.addAttribute("project_idx", project_idx);
		return "/schedule/scheduleNew";
	}
	
	@RequestMapping(value = "/scheduleNew.do")
	@ResponseBody
	public int scheduleNew(@RequestParam("schedule_name") String schedule_name
			, @RequestParam("project_idx") String project_idx
			, @RequestParam("user_idx") String user_idx) {
		ScheduleVO schedule_param = new ScheduleVO();
		schedule_param.setProject_idx(Integer.parseInt(project_idx));
		schedule_param.setSchedule_name(schedule_name);
		if(!"".equals(user_idx) && user_idx != null)
			schedule_param.setReg_user_idx(Integer.parseInt(user_idx));
		else
			schedule_param.setReg_user_idx(1);
		
		int result = projectMngtSvc.addSchedule(schedule_param);
		
		return result;
	}
	//schedule 끝
	
	//work 시작
	@RequestMapping("/workList.do")
	public String workList(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx, @RequestParam("schedule_idx") String schedule_idx) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("project_idx", Integer.parseInt(project_idx));
		map.put("schedule_idx", Integer.parseInt(schedule_idx));
		
		List<WorkVO> work_list = projectMngtSvc.getWorkList(map);
		int totalCnt = projectMngtSvc.getWorkListCnt(map);
		ScheduleVO schedule_info = projectMngtSvc.getScheduleInfo(Integer.parseInt(schedule_idx));
		
		model.addAttribute("work_list", work_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("schedule_info", schedule_info);
		
		return "/work/workList";
	}
	
	@RequestMapping("/workView.do")
	public String workView(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx, @RequestParam("schedule_idx") String schedule_idx,
			@RequestParam("work_idx") String work_idx) {
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
		
		return "/work/workView";
	}
	
	@RequestMapping("/workNew.do")
	public String workNew(ModelMap model){
		return "/work/workNew";
	}
	//work 끝
	

}
