package com.points.connect.model;

import java.util.Date; 
//java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.NaturalId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Actualite {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String title;
    
    @NotBlank
    @NaturalId
    private String fileName;
    
    @NotNull
    private Date cloture; 
    
    @NotNull
    private Date enregistrement; 
	
    @NotBlank
    @Lob
    @Column(name = "content")
    private String content;
    
    @NotBlank
    @Lob
    private String description;
    
    /*public Actualite(String title,String fileName,Date cloture,Date enregistrement,String description)
    {
    	this.cloture=cloture;
    	this.description=description;
    	this.enregistrement=enregistrement;
    	this.fileName=fileName;
    	this.title=title;
    }
    public Actualite()
    {
    	
    }*/
	

}

  