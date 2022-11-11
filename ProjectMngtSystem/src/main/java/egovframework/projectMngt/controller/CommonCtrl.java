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
public class CommonCtrl {
	
	@Resource(name = "loginSvc")
	private LoginSvc loginSvc;
	
	@RequestMapping("/TopMenu.do")
	public String TopMenu(ModelMap model, HttpServletRequest request, HttpServletResponse resp) {
 		int auth = 0;
 		LoginVO login_info = (LoginVO) request.getSession().getAttribute("loginVO");
		request.setAttribute("auth", auth);
		
		return "/cmm/TopMenu";
	}
	
}
