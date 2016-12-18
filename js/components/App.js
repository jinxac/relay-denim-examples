import React from 'react';
import Relay from 'react-relay';

class App extends React.Component{

  onReload() {
    this.props.relay.forceFetch();
  }

  getEdges(){
    return this.props.denimList.denims.edges.map(edge => {
      return (
        <li key={edge.node.id}>
          <span>{edge.node.brand}</span>
        </li>
      )
    })
  }

  render(){
    return(
    <div>
      <h1>Denims List</h1>
      <ul>
        {this.getEdges()}
      </ul>
      <button onClick={this.onReload.bind(this)}>Reload</button>
    </div>
    )
  }
}

export default Relay.createContainer(App,{
  fragments : {
    denimList : () => Relay.QL`
      fragment on DenimList{
        denims(first:10){
          edges{
              node{
                id,
                brand,
                model,
                size
            },
          },
        },
      }
    `,
  }
})
