import React,{Component} from "react";
import "antd/dist/antd.css";
import "../assets/css/documentation.css";
import { Tree } from 'antd';
const { TreeNode } = Tree;
class documentation extends Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  render() {
    return (
      <div className="document-container">
            
            <h1 className="page-title document-title">Ajout d'un événement ou actualité :</h1>

            <Tree className="margin" showLine defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}>
              <TreeNode title={<p className="text-primary document-Tree-Node">parent 1</p>} key="0-0">
                <TreeNode title={<p className="text-primary document-Tree-Node-Node">Node Node 1</p>} key="0-0-0">
                  <TreeNode title={<p className="text-success leaf">leaf</p>} key="0-0-0-0" />
                  <TreeNode title={<p className="text-success leaf">leaf</p>} key="0-0-0-1" />
                  <TreeNode title={<p className="text-success leaf">leaf</p>} key="0-0-0-2" />
                </TreeNode>
              <TreeNode title={<p className="text-primary document-Tree-Node-Node">Node Node 2</p>} key="0-0-1">
                  <TreeNode title="leaf" key="0-0-1-0" />
              </TreeNode>
              <TreeNode title={<p className="text-primary document-Tree-Node-Node">Node Node 3</p>} key="0-0-2">
                  <TreeNode title={<p className="text-success leaf">leaf</p>} key="0-0-2-0" />
                  <TreeNode title={<p className="text-success leaf">leaf</p>} key="0-0-2-1" />
                </TreeNode>
              </TreeNode>
            </Tree>
      </div>
    );
  }
}
 
export default documentation;