package com.points.connect.payload;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
@Getter 
@Setter

public class UploadFileResponse {
	
	@Getter 
	@Setter
    private String fileName;
	@Getter
	@Setter
    private String fileDownloadUri;
	@Getter 
	@Setter
    private String fileType;
	@Getter 
	@Setter
    private long size;

   public UploadFileResponse(String fileName, String fileDownloadUri, String fileType, long size) {
        this.fileName = fileName;
        this.fileDownloadUri = fileDownloadUri;
        this.fileType = fileType;
        this.size = size;
    }/*
   public String getfileName()
   {
	   return this.fileName;
   }
   public String getFileType() {
	   return this.fileType;
   }
   public String getFileDownloadUri() {
	   return this.fileDownloadUri;
   }
   public long getSize() {
	   return this.size;
   }

 */
    
}
