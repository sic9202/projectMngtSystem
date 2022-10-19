package egovframework.projectMngt.vo;

import java.sql.Timestamp;

public class ProjectVO {
	private int project_idx;
	private String project_name;
	private String project_type;
	private Timestamp project_reg_date;
	private int reg_user_idx;
	private String reg_user_name;
	public int getProject_idx() {
		return project_idx;
	}
	public void setProject_idx(int project_idx) {
		this.project_idx = project_idx;
	}
	public String getProject_name() {
		return project_name;
	}
	public void setProject_name(String project_name) {
		this.project_name = project_name;
	}
	public String getProject_type() {
		return project_type;
	}
	public void setProject_type(String project_type) {
		this.project_type = project_type;
	}
	public Timestamp getProject_reg_date() {
		return project_reg_date;
	}
	public void setProject_reg_date(Timestamp project_reg_date) {
		this.project_reg_date = project_reg_date;
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
