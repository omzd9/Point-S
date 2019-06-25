
import React,{Component} from "react";
import ReadMoreReact from 'read-more-react';
import "../assets/css/Slid.css"
class CardTemp extends Component {
  constructor(props){
    super(props);
    this.taile ={
      min: 20,
      max : 1000,
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


