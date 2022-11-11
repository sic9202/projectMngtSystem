package egovframework.projectMngt.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import egovframework.projectMngt.service.LoginSvc;
import egovframework.projectMngt.vo.LoginVO;

@Controller
public class LoginCtrl {
	
	@Resource(name = "loginSvc")
	private LoginSvc loginSvc;
	
	@RequestMapping("/login.do")
	public String login(ModelMap model) {
		return "/login/login";
	}
	
	@RequestMapping("/checkUser.do")
	@ResponseBody
	public LoginVO checkUser(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("user_id") String user_id
			, @RequestParam("user_pwd") String user_pwd) throws Exception{
		Map<String, String> map = new HashMap<String, String>();
		map.put("user_id", user_id);
		map.put("user_pwd", user_pwd);
		
		LoginVO loginVO =  loginSvc.checkUser(map);
		if(loginVO.getStatus() == 1) {
			request.getSession().setAttribute("loginVO", loginVO);
		}
		return loginVO;
	}
	
	@RequestMapping("/signUp.do")
	public String signUp(ModelMap model, HttpServletRequest request, HttpServletResponse resp) throws Exception{
		return "/login/signUp";
	}
	
	@RequestMapping("/register_account.do")
	@ResponseBody
	public int signUp(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("user_id") String user_id
			, @RequestParam("user_pwd") String user_pwd
			, @RequestParam("user_name") String user_name
			, @RequestParam("phone_num") String phone_num
			)throws Exception{
		LoginVO user_info = new LoginVO();
		user_info.setUser_id(user_id);
		user_info.setUser_pwd(user_pwd);
		user_info.setUser_name(user_name);
		if(!"".equals(phone_num) && phone_num != null) {
			user_info.setPhone_num(phone_num);
		}
		int status = loginSvc.signUp(user_info);
		
		return status;
	}
	
	@RequestMapping("/duplicate_check.do")
	@ResponseBody
	public int duplicateCheck (ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("user_id") String user_id
			) throws Exception{
		
		int status = loginSvc.duplicateCheck(user_id);
		return status;
	}
	
	@RequestMapping("/logout.do")
	public String logout(ModelMap model, HttpServletRequest request, HttpServletResponse resp) {
		request.getSession().removeAttribute("loginVO");
		
		return "/login/login";
	}
}
