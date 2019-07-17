import React from 'react';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import { Card, Button, CardHeader,CardImg, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';
import "../assets/css/documentation.css"
const Example = (props) => {
  return (
  <div className='row' >
    
      <Card className="document-card">
        
        <CardBody>
            <AddShoppingCart style={{width:'90%',height:'90%'}}/>
        </CardBody>
        <CardFooter>
          <p className="document-footer" >1-Point S Products</p>
        </CardFooter>

      </Card>

      <Card className="document-card">
        
        <CardBody>
            <AddShoppingCart style={{width:'90%',height:'90%'}}/>
        </CardBody>
        <CardFooter>
          <p className="document-footer" >1-Point S Products</p>
        </CardFooter>

      </Card>
      <Card className="document-card">
        
        <CardBody>
            <AddShoppingCart style={{width:'90%',height:'90%'}}/>
        </CardBody>
        <CardFooter>
          <p className="document-footer" >1-Point S Products</p>
        </CardFooter>

      </Card>
      <Card className="document-card">
        
        <CardBody>
            <AddShoppingCart style={{width:'90%',height:'90%'}}/>
        </CardBody>
        <CardFooter>
          <p className="document-footer" >1-Point S Products</p>
        </CardFooter>

      </Card>
      <Card className="document-card">
        
        <CardBody>
            <AddShoppingCart style={{width:'90%',height:'90%'}}/>
        </CardBody>
        <CardFooter>
          <p className="document-footer" >1-Point S Products</p>
        </CardFooter>

      </Card>


  </div>
  );
};

export default Example;