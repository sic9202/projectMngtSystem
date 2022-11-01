package egovframework.projectMngt.vo;

import java.sql.Timestamp;

public class ScheduleVO extends SearchVO{
	private int schedule_idx;
	private String schedule_name;
	private int project_idx;
	private String project_name;
	private Timestamp schedule_reg_date;
	private int reg_user_idx;
	private String reg_user_name;
	public int getSchedule_idx() {
		return schedule_idx;
	}
	public void setSchedule_idx(int schedule_idx) {
		this.schedule_idx = schedule_idx;
	}
	public String getSchedule_name() {
		return schedule_name;
	}
	public void setSchedule_name(String schedule_name) {
		this.schedule_name = schedule_name;
	}
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
	public Timestamp getSchedule_reg_date() {
		return schedule_reg_date;
	}
	public void setSchedule_reg_date(Timestamp schedule_reg_date) {
		this.schedule_reg_date = schedule_reg_date;
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
