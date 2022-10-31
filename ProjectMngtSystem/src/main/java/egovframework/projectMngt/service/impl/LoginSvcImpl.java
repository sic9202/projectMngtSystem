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
		
		String encrypt_pwd = registersrv.encryptPassword(map.get("user_pwd"), map.get("user_id"));
		map.put("encrypt_pwd", encrypt_pwd);
		
		//id check
		int cnt1 = projectMngtMapper.checkUser1(map);
		if(cnt1 == 0) {
			//미가입
			status = 2;
		}else{
			//id & password check
			int cnt2 = projectMngtMapper.checkUser2(map);
			if(cnt2 == 0) {
				//틀린 비밀번호
				status = 3;
			}else {
				loginVO = projectMngtMapper.getUserInfo(map);
			}
		}
		loginVO.setStatus(status);
		return loginVO;
	}
	
	public int signUp(LoginVO user_info) throws Exception{
		int status = 0;
		String encrypt_pwd = registersrv.encryptPassword(user_info.getUser_pwd(), user_info.getUser_id());
		user_info.setEncrypt_pwd(encrypt_pwd);
		int cnt = projectMngtMapper.signUp(user_info);
		
		if(cnt > 0) {
			status = 1;
		}
		return status;
	}
	
	public int duplicateCheck(String user_id){
		int status = 0; //생성가능
		try {
			int cnt = projectMngtMapper.duplicateCheck(user_id);
			if(cnt > 0) {
				status = 1; //이미 있는 id
			}
		} catch (Exception e) {
			status = 2; //에러
		}
		
		return status;
	}
}
