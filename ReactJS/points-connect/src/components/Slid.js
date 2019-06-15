import React,{Component} from "react";
import {Carousel,Icon} from "antd";
//import "antd/dist/antd.css";
import "../assets/css/Slid.css"

class Slid extends Component {
  
  /*
               <Carousel dots="true" dotPosition="Bottom" autoplay>
              
                  {   this.state.venteFlash.map(function(image)
                           {
                              return (
                                 <div key={image.id}>
                                   
                                    
                                          <img className="img-fluid" src={require("../uploads/venteFlash/"+image.fileName)} alt=""/>
                                    
                                    
                                 </div>
                                    )
                                 
                              })
                       
                           
                  }     
      
                  </Carousel>
            
   */      
   

  constructor(props) {
               super(props);
               this.next = this.next.bind(this);
               this.previous = this.previous.bind(this);
               this.carousel = React.createRef();
               this.state=
               {
                  venteFlash:[],
                  
               }
               this.s={
                  dsplay:"inline-block",
               }
             }
   async componentWillMount(){
        
               let url1,response1,venteFlash;
              
               //    venteFlash
               url1 = "http://localhost:8080/Accueil/venteFlash";
               response1 = await fetch(url1);
               venteFlash  = await response1.json().then(results=> {return results});
               
               this.setState({
                   'venteFlash' : venteFlash,
         
               });
            }
   next() {
               this.carousel.next();
             }
   previous() {
               this.carousel.prev();
             }
           
   render() {
               const props = {
                 dots: true,
                 dotPosition:"top",
                 infinite: true,
                 speed: 500,
                 slidesToShow: 1,
                 slidesToScroll: 1
               };
               return (
                 <div >
                     
                    <div style={this.s}> 
                   <Carousel ref={node => (this.carousel = node)} {...props}>
                   {   this.state.venteFlash.map(function(image)
                           {
                              return (
                                 <div key={image.id}>
                                   
                                    
                                          <img className="img-fluid" src={require("../uploads/venteFlash/"+image.fileName)} alt=""/>
                                    
                                    
                                 </div>
                                    )
                                 
                              })
                       
                           
                  }     
                   </Carousel>
                  </div>
                   <div className="centeredLeft">
                        <Icon  type="left-circle" onClick={this.previous} /> 
                     </div>
                  <div className="centeredRight">  
                     <Icon type="right-circle" onClick={this.next} />
                  </div>
               
                 </div>
               );
             }
           }
            

 export default Slid;
