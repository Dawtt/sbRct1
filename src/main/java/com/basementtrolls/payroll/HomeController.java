package com.basementtrolls.payroll;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/*
@Controller marks this class as a spring MVC controller
*/
@Controller
public class HomeController {

	/*
	@RequestMapping flags the index() method to support the / route.
	*/
	@RequestMapping(value = "/")
	public String index(){
		return "index";
	}
}