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
	
	@RequestMapping("/main.do")
	public String main(ModelMap model) {
		return "/main";
	}
	
	@RequestMapping("/login.do")
	public String login(ModelMap model) {
		return "/login/login";
	}
	
	@RequestMapping("/checkUser.do")
	@ResponseBody
	public LoginVO checkUser(ModelMap model, HttpServletRequest request, HttpServletResponse resp
			, @RequestParam("id") String id
			, @RequestParam("passwd") String passwd) throws Exception{
		Map<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		map.put("passwd", passwd);
		
		LoginVO loginVO =  loginSvc.checkUser(map);
		if(loginVO.getStatus() == 1) {
			request.getSession().setAttribute("loginVO", loginVO);
		}
		
		return loginVO;
	}
}
