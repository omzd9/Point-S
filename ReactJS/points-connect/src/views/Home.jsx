import React,{Component} from "react";
import "antd/dist/antd.css";
import '../assets/css/Home.css'
import '../assets/css/modern-business.css'
import "../assets/css/Slid.css"

import CardTemp from "../components/CardTemp";
import Slid from "../components/Slid";
class Home extends Component {
    
    constructor(){
        super();
        this.state =
            {
                'events': [],

            }
       
        //const backgroundimg ={'backgroundImage':'http://placehold.it/1900x1080'};
        this.divStyle = {
            marginTop : '100px',
            
          }
        


    }
    async componentDidMount(){
        
        let events,url,response;
       
        // events
        url = "http://localhost:8080/Accueil/events";
        response = await fetch(url);
        events  = await response.json().then(results=> {return results});
     
        
        this.setState({
            'events' : events,

        });
        
     
    }
    render() { 
        return (
               < div>
                        
                        <Slid />
                      
                        <div className="jumbotron " style={this.divStyle}>
                            <h1 className="display-3">Actualité et évènement</h1>
                            <p className="lead">This is a sntent or information.</p>
                            <hr/>
                          
                            <div className="row">
                                {   this.state.events.map(function(event)
                                        {
                                            return (
                                                <CardTemp key={event.id} description={event.description} content={event.content} title={event.title} img={event.fileName}/>

                                            )
                                        })
                                }
                                
                            </div>
                    
                    
                        </div>
                  

                </div>
                 );
  }

}
export default Home;