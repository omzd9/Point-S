package com.points.connect.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
public class FileStorageProp {
	    private String uploadDirEvent;
	    private String uploadDirPromo;
	    private String uploadDirRequete;

	    public String getUploadDirEvent() {
	        return uploadDirEvent;
	    }
	    public String getUploadDirRequete() {
	        return uploadDirRequete;
	    }
	    public String getUploadDirPromo() {
	        return uploadDirPromo;
	    }

	    public void setUploadDirEvent(String uploadDirEvent) {
	        this.uploadDirEvent = uploadDirEvent;
	    }
	    public void setUploadDirRequete(String uploadDirRequete) {
	        this.uploadDirRequete = uploadDirRequete;
	    }
	    public void setUploadDirPromo(String uploadDirPromo) {
	        this.uploadDirPromo= uploadDirPromo;
	    }
	}
