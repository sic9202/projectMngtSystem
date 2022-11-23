package egovframework.projectMngt.vo;

import java.sql.Timestamp;

public class WorkVO extends SearchVO{
	private int work_idx;
	private String work_name;
	private String work_manager;
	private String work_period;
	private Timestamp work_reg_date;
	private String work_info;
	private int project_idx;
	private String project_name;
	private int schedule_idx;
	private String schedule_name;
	private int reg_user_idx;
	private String reg_user_name;
	public int getWork_idx() {
		return work_idx;
	}
	public void setWork_idx(int work_idx) {
		this.work_idx = work_idx;
	}
	public String getWork_name() {
		return work_name;
	}
	public void setWork_name(String work_name) {
		this.work_name = work_name;
	}
	public String getWork_manager() {
		return work_manager;
	}
	public void setWork_manager(String work_manager) {
		this.work_manager = work_manager;
	}
	public String getWork_period() {
		return work_period;
	}
	public void setWork_period(String work_period) {
		this.work_period = work_period;
	}
	public Timestamp getWork_reg_date() {
		return work_reg_date;
	}
	public void setWork_reg_date(Timestamp work_reg_date) {
		this.work_reg_date = work_reg_date;
	}
	public String getWork_info() {
		return work_info;
	}
	public void setWork_info(String work_info) {
		this.work_info = work_info;
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
