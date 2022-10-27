package egovframework.projectMngt.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.projectMngt.service.ProjectMngtSvc;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("projectMngtSvc")
public class ProjectMngtSvcImpl implements ProjectMngtSvc {
	
	@Resource(name = "projectMngtMapper")
	private ProjectMngtMapper projectMngtMapper;
	
	public List<ProjectVO> getProjectList(){
		List<ProjectVO> project_list = projectMngtMapper.getProjectList();
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
}
