/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.projectMngt.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.ui.ModelMap;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.projectMngt.vo.FileVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.SearchVO;
import egovframework.projectMngt.vo.WorkDataVO;
import egovframework.projectMngt.vo.WorkVO;

/**
 * @Class Name : EgovSampleService.java
 * @Description : EgovSampleService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public interface ProjectMngtSvc {
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
	int delWork(int parseInt);
	
	//work_data 관련
	List<WorkDataVO> getWorkDataList(int work_idx);
	int getWorkDataListCnt(int work_idx);
	int saveWorkData(Map<String, String> map);
	WorkDataVO getWorkDataInfo(int work_data_idx);
	
	//uploadFile 관련
	void uploadFile(FileVO fileVO) throws Exception;
	int delUploadFile(int file_idx);
	void fileDownload(int file_idx, HttpServletRequest request, HttpServletResponse resp);
}
