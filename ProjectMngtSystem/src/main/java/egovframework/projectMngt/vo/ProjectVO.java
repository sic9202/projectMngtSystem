package egovframework.projectMngt.vo;

import java.sql.Timestamp;

public class ProjectVO extends SearchVO{
	private int project_idx;
	private String customer;
	private String customer_pm;
	private String project_name;
	private String project_pm;
	private String project_period;
	private Timestamp project_reg_date;
	private String project_info;
	private int reg_user_idx;
	private String reg_user_name;
	public int getProject_idx() {
		return project_idx;
	}
	public void setProject_idx(int project_idx) {
		this.project_idx = project_idx;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getCustomer_pm() {
		return customer_pm;
	}
	public void setCustomer_pm(String customer_pm) {
		this.customer_pm = customer_pm;
	}
	public String getProject_name() {
		return project_name;
	}
	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}
	public String getProject_pm() {
		return project_pm;
	}
	public void setProject_pm(String project_pm) {
		this.project_pm = project_pm;
	}
	public String getProject_period() {
		return project_period;
	}
	public void setProject_period(String project_period) {
		this.project_period = project_period;
	}
	public Timestamp getProject_reg_date() {
		return project_reg_date;
	}
	public void setProject_reg_date(Timestamp project_reg_date) {
		this.project_reg_date = project_reg_date;
	}
	public String getProject_info() {
		return project_info;
	}
	public void setProject_info(String project_info) {
		this.project_info = project_info;
	}
	public int getReg_user_idx() {
		return reg_user_idx;
	}
	public void setReg_user_idx(int reg_user_idx) {
		this.reg_user_idx = reg_user_idx;
	}
	public String getReg_user_name() {
		return reg_user_name;
	}
	public void setReg_user_name(String reg_user_name) {
		this.reg_user_name = reg_user_name;
	}
}
