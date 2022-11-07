package egovframework.projectMngt.vo;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

public class FileVO {
	private int file_idx;
	private String file_name;
	private String file_path;
	private MultipartFile uploadFile;
	private long file_size;
	private Timestamp upload_date;
	private String ext;
	private String del_yn;
	private int work_data_idx;
	private int work_idx;
	private int reg_user_idx;
	private int reg_user_name;
	
	public int getFile_idx() {
		return file_idx;
	}
	public void setFile_idx(int file_idx) {
		this.file_idx = file_idx;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public MultipartFile getUploadFile() {
		return uploadFile;
	}
	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
	public long getFile_size() {
		return file_size;
	}
	public void setFile_size(long file_size) {
		this.file_size = file_size;
	}
	public Timestamp getUpload_date() {
		return upload_date;
	}
	public void setUpload_date(Timestamp upload_date) {
		this.upload_date = upload_date;
	}
	public String getExt() {
		return ext;
	}
	public void setExt(String ext) {
		this.ext = ext;
	}
	public String getDel_yn() {
		return del_yn;
	}
	public void setDel_yn(String del_yn) {
		this.del_yn = del_yn;
	}
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
	public int getReg_user_idx() {
		return reg_user_idx;
	}
	public void setReg_user_idx(int reg_user_idx) {
		this.reg_user_idx = reg_user_idx;
	}
	public int getReg_user_name() {
		return reg_user_name;
	}
	public void setReg_user_name(int reg_user_name) {
		this.reg_user_name = reg_user_name;
	}
}
