package com.points.connect.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.points.connect.model.Actualite;
import com.points.connect.model.venteFlash;
import com.points.connect.repository.ActualiteRepository;
import com.points.connect.repository.venteFlashRepository;
import com.points.connect.service.FileStorageService;



@RestController
@RequestMapping("/api/Accueil")
public class Accueil {
	
	@Autowired
	private ActualiteRepository actualitesTable;
	
	@Autowired
    private FileStorageService fileStorageService;
	
	@Autowired
	private venteFlashRepository venteFlashTable;
	
	
    @DeleteMapping("promo/{id}/delete")
    @Transactional
    public ResponseEntity<?> deletePromo(@PathVariable long id) {
        if (! venteFlashTable.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        
        venteFlash venteFlashToBeDeleted=venteFlashTable.findById(id).get();
        
       if(fileStorageService.deleteFile(venteFlashToBeDeleted.getFileName(), false)){
    	   venteFlashTable.deleteById(id);
    	   return ResponseEntity.ok().build();
    		   }
       else	{
    			   return ResponseEntity.noContent().build();
    		   }
    }
    
    @DeleteMapping("actualite/{id}/delete")
    @Transactional
    public ResponseEntity<?> deleteActualite(@PathVariable long id) 
    {
        if (! actualitesTable.findById(id).isPresent()) {
            ResponseEntity.badRequest().build();
        }
        
        Actualite actualiteToBeDeleted=actualitesTable.findById(id).get();
        
        if(fileStorageService.deleteFile(actualiteToBeDeleted.getFileName(), true)){
        	actualitesTable.deleteById(id);
     	   return ResponseEntity.ok().build();
     		   }
        else	{
     			   return ResponseEntity.noContent().build();
     		   }
    }
    
    @PostMapping("/addEvent")
    public String uploadEvent(@RequestParam("file") MultipartFile file,@RequestParam("description") String desc,
    		@RequestParam("title") String title,@RequestParam("content") String content,
    		@RequestParam("date") String date) 
    {
        try {
    	String fileName = fileStorageService.storeFile(file,true);
    	
        Date cloture = new  SimpleDateFormat("yyyy-mm-dd").parse(date);
        Date today = new Date();
        //(String title,String fileName,Date cloture,Date enregistrement,String description)
       Actualite act = new Actualite(title,fileName,cloture,today,desc,content);
       List<Long> ids = actualitesTable.findByFileName(fileName);
       if(ids.isEmpty())
       {
        actualitesTable.save(act);
        	return "row created" ;
        }
       else {
    	  act.setId(ids.get(0));
    	  actualitesTable.save(act);
    	  return "row updated";

       }
        }
        catch(Exception e) {
        	return e.getMessage();
        	
        }

    }
    @PostMapping("/addPromo")
    public String uploadPromo(@RequestParam("file") MultipartFile file,@RequestParam("date") String date) 
    {
        try {
    	String fileName = fileStorageService.storeFile(file,false);
    	
        Date cloture = new  SimpleDateFormat("yyyy-mm-dd").parse(date);
        Date today = new Date();
       venteFlash promo = new venteFlash(fileName,cloture,today);
       List<Long> ids = venteFlashTable.findByFileName(fileName);
       if(ids.isEmpty())
       {
    	   venteFlashTable.save(promo);
        	return "row created" ;
        }
       else {
    	  promo.setId(ids.get(0));
    	  venteFlashTable.save(promo);
    	  return "row updated";

       }
        }
        catch(Exception e) {
        	return e.getMessage();
        	
        }

    }
    
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