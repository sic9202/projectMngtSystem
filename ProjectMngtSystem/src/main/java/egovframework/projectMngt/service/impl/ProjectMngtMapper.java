package egovframework.projectMngt.service.impl;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.json.JSONArray;

import egovframework.projectMngt.vo.FileVO;
import egovframework.projectMngt.vo.LoginVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.SearchVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

@Mapper("projectMngtMapper")
public interface ProjectMngtMapper {
	//로그인 관련
	int checkUser1(Map<String, String> map);
	int checkUser2(Map<String, String> map);
	LoginVO getUserInfo(Map<String, String> map);
	int signUp(LoginVO user_info);
	int duplicateCheck(String user_id);
	
	//project 관련
	List<ProjectVO> getProjectList(SearchVO search);
	int getProjectListCnt();
	ProjectVO getProjectInfo(int project_idx);
	int addProject(ProjectVO project_param);
	int updProject(ProjectVO project_param);
	int delProject(int project_idx);
	
	//schedule 관련
	List<ScheduleVO> getScheduleList(SearchVO search);
	int getScheduleListCnt(int project_idx);
	ScheduleVO getScheduleInfo(int schedule_idx);
	int addSchedule(ScheduleVO schedule_param);
	int updSchedule(ScheduleVO schedule_param);
	int delSchedule(int schedule_idx);
	
	//work 관련
	List<WorkVO> getWorkList(SearchVO search);
	int getWorkListCnt(SearchVO search);
	WorkVO getWorkInfo(int work_idx);
	int addWork(WorkVO work_param);
	int updWork(WorkVO work_param);
	int delWork(int work_idx);
	
	//work_data 관련
	List<WorkDataVO> getWorkDataList(int work_idx);
	int getWorkDataListCnt(int work_idx);
	int addWorkData(@Param(value = "addList") List<Map<String, String>> addList);
	int delWorkData(@Param(value = "delList") List<Map<String, String>> delList);
	int updWorkData(@Param(value = "updList") List<Map<String, String>> updList);
	WorkDataVO getworkDataInfo(int work_data_idx);
	
	//uploadFile 관련
	FileVO getUploadFileInfo(FileVO fileVO);
	void addFileInfo(FileVO fileVO);
	void updAddedFileInfo(FileVO addedFileInfo);
	void updDelYn(FileVO file_info);
	int delFileInfo(@Param(value = "delList") List<Map<String, String>> delList);
	
	List<FileVO> getFileInfoList(WorkVO workVO);
	List<FileVO> getFileList(int work_data_idx);
	
}
