package com.points.connect.model;
import java.util.Date; 
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class venteFlash {
		
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @NotBlank
	    @NaturalId
	    private String fileName;
	    
	    @NotNull
	    private Date cloture; 
	    
	    @NotNull
	    private Date enregistrement; 
	    
	    public venteFlash(String file,Date cloture,Date open){
	    	this.fileName=file;
	    	this.cloture=cloture;
	    	this.enregistrement=open;
	    }
		
	    
}

	  

