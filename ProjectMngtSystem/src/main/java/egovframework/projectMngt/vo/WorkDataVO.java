package egovframework.projectMngt.vo;

public class WorkDataVO {
	private int work_data_idx;
	private int work_idx;
	private String str_date;
	private String end_date;
	private int support_time;
	private String support_type;
	private String support_content;
	private int severity;
	private int reg_user_idx;
	private String reg_user_name;
	public int getWork_data_idx() {
		return work_data_idx;
	}
	public void setWork_data_idx(int work_data_idx) {
		this.work_data_idx = work_data_idx;
	}
	public int getWork_idx() {
		return work_idx;
	}
	public void setWork_idx(int work_idx) {
		this.work_idx = work_idx;
	}
	public String getStr_date() {
		return str_date;
	}
	public void setStr_date(String str_date) {
		this.str_date = str_date;
	}
	public String getEnd_date() {
		return end_date;
	}
	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}
	public int getSupport_time() {
		return support_time;
	}
	public void setSupport_time(int support_time) {
		this.support_time = support_time;
	}
	public String getSupport_type() {
		return support_type;
	}
	public void setSupport_type(String support_type) {
		this.support_type = support_type;
	}
	public String getSupport_content() {
		return support_content;
	}
	public void setSupport_content(String support_content) {
		this.support_content = support_content;
	}
	public int getSeverity() {
		return severity;
	}
	public void setSeverity(int severity) {
		this.severity = severity;
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