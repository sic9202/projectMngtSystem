package egovframework.projectMngt.service.impl;

import java.util.List;
import java.util.Map;

import egovframework.projectMngt.service.LoginSvc;
import egovframework.projectMngt.service.ProjectMngtSvc;
import egovframework.projectMngt.cmm.registersrv;
import egovframework.projectMngt.vo.LoginVO;
import egovframework.projectMngt.vo.ProjectVO;
import egovframework.projectMngt.vo.ScheduleVO;
import egovframework.projectMngt.vo.WorkVO;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
import egovframework.rte.fdl.idgnr.EgovIdGnrService;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("loginSvc")
public class LoginSvcImpl implements LoginSvc {
	
	@Resource(name = "projectMngtMapper")
	private ProjectMngtMapper projectMngtMapper;
	
	public LoginVO checkUser(Map<String, String> map) throws Exception{
		LoginVO loginVO = new LoginVO();
		int status = 1;
		
		String encrypt_pwd = registersrv.encryptPassword(map.get("passwd"), map.get("id"));
		map.put("encrypt_pwd", encrypt_pwd);
		int cnt1 = projectMngtMapper.checkUser1(map);
		if(cnt1 == 0) {
			status = 2;
		}else{
			int cnt2 = projectMngtMapper.checkUser2(map);
			if(cnt2 == 0) {
				status = 3;
			}else {
				loginVO = projectMngtMapper.getUserInfo(map);
			}
		}
		loginVO.setStatus(status);
		return loginVO;
	}
}
