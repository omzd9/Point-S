package com.points.connect.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
public class FileStorageProp {
	    private String uploadDirEvent;
	    private String uploadDirPromo;

	    public String getUploadDirEvent() {
	        return uploadDirEvent;
	    }
	    public String getUploadDirPromo() {
	        return uploadDirPromo;
	    }

	    public void setUploadDirEvent(String uploadDirEvent) {
	        this.uploadDirEvent = uploadDirEvent;
	    }
	    public void setUploadDirPromo(String uploadDirPromo) {
	        this.uploadDirPromo= uploadDirPromo;
	    }
	}
