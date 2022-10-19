package egovframework.projectMngt.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.WorkVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("projectMngtMapper")
public interface ProjectMngtMapper {

	List<ProjectVO> getProjectList();
	int getProjectListCnt();
	
	List<ScheduleVO> getScheduleList(int project_idx);
	int getScheduleListCnt(int project_idx);
	
	List<WorkVO> getWorkList(Map<String, Integer> map);
	int getWorkListCnt(Map<String, Integer> map);
	
	ProjectVO getProjectInfo(int project_idx);
	ScheduleVO getScheduleInfo(int schedule_idx);
}
