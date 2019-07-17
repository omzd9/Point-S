import { Table } from 'antd';
import React, { Component } from 'react';
import Backup from '@material-ui/icons/Backup';
import Visibility from '@material-ui/icons/Visibility';

class Document extends Component {
    constructor() {
        super();
     
    } // const end
    render() { 

        const columns = [
            {
              title:'Title',
              dataIndex: 'name',
              key: 'name',
              width:'70%',
            
            },
            
            {
                title: 'Download',
                
                render: (text, record) =>
                  record.children == null  ? (
                    <a to="#"  style={{color: 'blue'}}>
                      <Backup />
                    </a>
                  ) : null,
              },
            {
                title: 'Preview',
               
                render: (text, record) =>
                  record.children == null  ? (
                    <a to="#"  style={{color: 'blue'}}>
                      <Visibility />
                    </a>
                  ) : null,
              },
          ];

        const data = [
            {
              key: 1,
              name: 'John Brown sr.',
              age: 60,
              address: 'New York No. 1 Lake Park',
              
              children: [
                {
                  key: 11,
                  name: 'John Brown',
                  age: 42,
                  address: 'New York No. 2 Lake Park',
                  file:"file.pdf",

                },
                {
                  key: 12,
                  name: 'John Brown jr.',
                  age: 30,
                  address: 'New York No. 3 Lake Park',
                  children: [
                    {
                      key: 121,
                      name: 'Jimmy Brown',
                      age: 16,
                      address: 'New York No. 3 Lake Park',
                      file:"file.pdf",

                    },
                  ],
                },
                {
                  key: 13,
                  name: 'Jim Green sr.',
                  age: 72,
                  address: 'London No. 1 Lake Park',
                  children: [
                    {
                      key: 131,
                      name: 'Jim Green',
                      age: 42,
                      address: 'London No. 2 Lake Park',
                      children: [
                        {
                          key: 1311,
                          name: 'Jim Green jr.',
                          age: 25,
                          address: 'London No. 3 Lake Park',
                          file:"file.pdf",

                        },
                        {
                          key: 1312,
                          name: 'Jimmy Green sr.',
                          age: 18,
                          address: 'London No. 4 Lake Park',
                          file:"file.pdf",

                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              key: 2,
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
            },
          ];

     
        return ( 
            <Table 
            columns={columns} 
    
            dataSource={data} 
            
             >
            </Table> 
            );
    }
}
export default Document;
 



