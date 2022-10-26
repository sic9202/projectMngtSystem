package egovframework.projectMngt.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.projectMngt.vo.LoginVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("projectMngtMapper")
public interface ProjectMngtMapper {

	//리스트 조회
	List<ProjectVO> getProjectList();
	int getProjectListCnt();
	
	List<ScheduleVO> getScheduleList(int project_idx);
	int getScheduleListCnt(int project_idx);
	
	List<WorkVO> getWorkList(Map<String, Integer> map);
	int getWorkListCnt(Map<String, Integer> map);
	
	//정보
	ProjectVO getProjectInfo(int project_idx);
	ScheduleVO getScheduleInfo(int schedule_idx);
	WorkVO getWorkInfo(int work_idx);
	
	//추가
	int addProject(ProjectVO project_param);
	int addSchedule(ScheduleVO schedule_param);
	
	//로그인체크
	int checkUser1(Map<String, String> map);
	int checkUser2(Map<String, String> map);
	
	//로그인 정보
	LoginVO getUserInfo(Map<String, String> map);
	int signUp(LoginVO user_info);
	int duplicateCheck(String user_id);
	
	//work_data정보
	List<WorkDataVO> getWorkDataInfo(int work_idx);
}
