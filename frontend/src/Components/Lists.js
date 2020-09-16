import React from 'react';
import PlaceCard from './PlaceCard';

export default class Lists extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: props.items
    };
  };

  componentWillReceiveProps({items}) {
    this.setState({items,items})
  }

  render(){
    return(
      <div>
        <div className="cardHolder">
          {this.state.items.map((item) => (
            <PlaceCard key={item.id} data={item}/>
          ))}
        </div>
      </div>
    );
  };
};
