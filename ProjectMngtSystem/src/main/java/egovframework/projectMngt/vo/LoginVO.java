package egovframework.projectMngt.vo;

import java.sql.Timestamp;

public class LoginVO {
	
	private int user_idx;
	private String user_id; //email
	private String user_pwd;
	private String encrypt_pwd;
	private String user_name;
	private String phone_num;
	private Timestamp join_date;
	private int use_yn;
	private String user_desc;
	private int status;
	public int getUser_idx() {
		return user_idx;
	}
	public void setUser_idx(int user_idx) {
		this.user_idx = user_idx;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_pwd() {
		return user_pwd;
	}
	public void setUser_pwd(String user_pwd) {
		this.user_pwd = user_pwd;
	}
	public String getEncrypt_pwd() {
		return encrypt_pwd;
	}
	public void setEncrypt_pwd(String encrypt_pwd) {
		this.encrypt_pwd = encrypt_pwd;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getPhone_num() {
		return phone_num;
	}
	public void setPhone_num(String phone_num) {
		this.phone_num = phone_num;
	}
	public Timestamp getJoin_date() {
		return join_date;
	}
	public void setJoin_date(Timestamp join_date) {
		this.join_date = join_date;
	}
	public int getUse_yn() {
		return use_yn;
	}
	public void setUse_yn(int use_yn) {
		this.use_yn = use_yn;
	}
	public String getUser_desc() {
		return user_desc;
	}
	public void setUser_desc(String user_desc) {
		this.user_desc = user_desc;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
}
