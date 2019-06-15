
import React,{Component} from "react";
import ReadMoreReact from 'read-more-react';
import "../assets/css/Slid.css"
class CardTemp extends Component {
  constructor(props){
    super(props);
    this.taile ={
      min: 20,
      max : 1000,
      
      text:"Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proidentsunt in culpa qui officia deserunt mollit anim id est laborum.",
  };
  this.content =this.props.content;
  }
  
  componentWillMount(){
    this.img= require("../uploads/events/" + this.props.img);

  }
   render(props) { 
    return (
    
            <div className="col-lg-4 col-sm-6 portfolio-item">
              <div className="card h-100">
                <img className="card-img-top" src={this.img}  alt=""/>
                <div className="card-body">
                  <h4 className="card-title">
                    <p className="text-primary"> {this.props.title}</p>
                  </h4>
                  <p className="card-text">
                   
                  <ReadMoreReact text={this.props.content}
                                min={this.taile.min}
                                
                                max={this.taile.max}
                                readMoreText={<button className="btn btn-primary btn-xs pow" >Read more</button>}/>
                  </p>
                </div>
            </div>
        </div> 
        
    );
  }
}
 
export default CardTemp;


