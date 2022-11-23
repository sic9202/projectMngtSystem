package egovframework.projectMngt.vo;

import java.sql.Timestamp;

public class ScheduleVO extends SearchVO{
	private int schedule_idx;
	private String schedule_name;
	private String schedule_manager;
	private String schedule_period;
	private Timestamp schedule_reg_date;
	private String schedule_info;
	private int project_idx;
	private String project_name;
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
	public String getSchedule_manager() {
		return schedule_manager;
	}
	public void setSchedule_manager(String schedule_manager) {
		this.schedule_manager = schedule_manager;
	}
	public String getSchedule_period() {
		return schedule_period;
	}
	public void setSchedule_period(String schedule_period) {
		this.schedule_period = schedule_period;
	}
	public Timestamp getSchedule_reg_date() {
		return schedule_reg_date;
	}
	public void setSchedule_reg_date(Timestamp schedule_reg_date) {
		this.schedule_reg_date = schedule_reg_date;
	}
	public String getSchedule_info() {
		return schedule_info;
	}
	public void setSchedule_info(String schedule_info) {
		this.schedule_info = schedule_info;
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
