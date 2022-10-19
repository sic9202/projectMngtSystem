package egovframework.projectMngt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginCtrl {
	@RequestMapping("/login.do")
	public String login(ModelMap model) {
		return "/login/login";
	}
}
