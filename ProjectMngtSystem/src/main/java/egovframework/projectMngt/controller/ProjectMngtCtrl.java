package egovframework.projectMngt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import egovframework.projectMngt.service.ProjectMngtSvc;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.WorkVO;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProjectMngtCtrl {

	@Resource(name = "projectMngtSvc")
	private ProjectMngtSvc projectMngtSvc;
	
	public String index(ModelMap model) {
		return "/main";
	}
	
	@RequestMapping("/projectList.do")
	public String projectList(ModelMap model, HttpServletRequest request, HttpServletResponse resp) {
		List<ProjectVO> project_list = projectMngtSvc.getProjectList();
		int totalCnt = projectMngtSvc.getProjectListCnt();
		model.addAttribute("project_list", project_list);
		model.addAttribute("totalCnt", totalCnt);
		
		return "/projectMngtList/projectList";
	}
	
	@RequestMapping("/scheduleList.do")
	public String scheduleList(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx) {
		List<ScheduleVO> schedule_list = projectMngtSvc.getScheduleList(Integer.parseInt(project_idx));
		int totalCnt = projectMngtSvc.getScheduleListCnt(Integer.parseInt(project_idx));
		ProjectVO project_info = projectMngtSvc.getProjectInfo(Integer.parseInt(project_idx));
		
		model.addAttribute("schedule_list", schedule_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("project_info", project_info);
		
		return "/projectMngtList/scheduleList";
	}
	
	@RequestMapping("/workList.do")
	public String workList(ModelMap model, HttpServletRequest request, HttpServletResponse resp,
			@RequestParam("project_idx") String project_idx, @RequestParam("schedule_idx") String schedule_idx) {
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("project_idx", Integer.parseInt(project_idx));
		map.put("schedule_idx", Integer.parseInt(schedule_idx));
		
		List<WorkVO> work_list = projectMngtSvc.getWorkList(map);
		int totalCnt = projectMngtSvc.getProjectListCnt();
		ScheduleVO schedule_info = projectMngtSvc.getScheduleInfo(Integer.parseInt(schedule_idx));
		
		model.addAttribute("work_list", work_list);
		model.addAttribute("totalCnt", totalCnt);
		model.addAttribute("schedule_info", schedule_info);
		
		return "/projectMngtList/workList";
	}
	
	
	@RequestMapping("/workNew.do")
	public String workNew(ModelMap model){
		return "/projectMngtList/workNew";
	}
	
	@RequestMapping("/workView.do")
	public String workView(ModelMap model) {
		return "/projectMngtList/workView";
	}
}
