package com.points.connect.service;

import com.points.connect.exception.FileStorageException;
import com.points.connect.exception.FileNotFoundException;
import com.points.connect.config.FileStorageProp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@EnableConfigurationProperties({
    FileStorageProp.class
})
public class FileStorageService {

    private final Path fileStorageLocationEvent;
    private final Path fileStorageLocationPromo;
    private final Path fileStorageLocationRequete;
    

    @Autowired
    public FileStorageService(FileStorageProp fileStorageProperties) {
        this.fileStorageLocationEvent = Paths.get(fileStorageProperties.getUploadDirEvent())
                .toAbsolutePath().normalize();
        this.fileStorageLocationPromo = Paths.get(fileStorageProperties.getUploadDirPromo())
                .toAbsolutePath().normalize();
        this.fileStorageLocationRequete = Paths.get(fileStorageProperties.getUploadDirRequete())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocationEvent);
            Files.createDirectories(this.fileStorageLocationPromo);
            Files.createDirectories(this.fileStorageLocationRequete);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }
    
    public void storeFileRequete(MultipartFile file, String fileName) {
		try {
			Files.copy(file.getInputStream(), this.fileStorageLocationRequete.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
		}
		catch(IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String storeFile(MultipartFile file,boolean isEvent) {
        // Normalise file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = isEvent ? this.fileStorageLocationEvent.resolve(fileName) : this.fileStorageLocationPromo.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
    public Boolean deleteFile(String fileName,boolean isEvent) {
    	File file ;
    	if(isEvent) {
    		file = new File( fileStorageLocationEvent+"/"+fileName);
    	}else {
    		file = new File( fileStorageLocationPromo+"/"+fileName);
    	}
    	
        if(file.delete()){
                return true;
            }
        else {
            	System.out.println("File  doesn't exist :"+ file.getAbsolutePath());
            	return false;
            }
    	}
    	
   /* public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName, ex);
        }
    }*/
    
}