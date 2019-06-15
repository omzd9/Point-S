package com.points.connect.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.points.connect.model.Actualite;
import com.points.connect.model.venteFlash;
import com.points.connect.payload.UploadFileResponse;
import com.points.connect.repository.ActualiteRepository;
import com.points.connect.repository.venteFlashRepository;
import com.points.connect.service.FileStorageService;



@RestController
@RequestMapping("/Accueil")
public class Accueil {
	
	@Autowired
	private ActualiteRepository actualitesTable;
	
	@Autowired
    private FileStorageService fileStorageService;
	
	@Autowired
	private venteFlashRepository venteFlashTable;
	
   /* @PostMapping("/uploadActualite")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        Date d1= new Date();
        Date d2= new Date();

        //(String title,String fileName,Date cloture,Date enregistrement,String description)
        Actualite ac = new Actualite("test title",fileName,d1,d2,"test Description");
        actualitesTable.save(ac);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }*/
    
    @GetMapping("/events")
    public List<Actualite> uploadFilesEvents() {
        
    	List<Actualite> events = new ArrayList<>();
    	
    	actualitesTable.findAll().forEach(elt-> events.add(elt) );

        return events;

    }
    @GetMapping("/venteFlash")
    public List<venteFlash> uploadFilesventeFlash() {
        
    	List<venteFlash> venteF = new ArrayList<>();
    	
    	venteFlashTable.findAll().forEach(elt-> venteF.add(elt) );

        return venteF;

    }
    
    
    


}
