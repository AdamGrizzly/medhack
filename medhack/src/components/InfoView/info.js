import React, { Component } from 'react';
import { Input } from 'antd';
import 'antd/lib/input/style/css'; 


class InfoView extends Component {
  state = {
    data: [],
    institution: [],
  }

  componentWillMount = async () => {
    const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions/${this.props.match.params.id}/movements`);
    const mres = await mreq.json();
    const ireq = await fetch(`http://46.101.236.211:6969/api/v1/institutions/${this.props.match.params.id}`);
    const ires = await ireq.json();
    this.setState({ 
      data: mres,
      institution: ires
    });
  }

  render() {
    return (
      <div className='single-view-container'>
      	<div className='place-info'>
          <div className='left-info'>
            <p>{this.state.institution.short_name}</p>
            <p>{this.state.institution.address}</p>
          </div>
          <div className='mid-info'>
            <p>{this.state.institution.region}</p>
          </div>
          <div className='right-info'>
          </div>
        </div>
      	<div className='place-medicine'>
      		<div className='medicine-header'>
      			<p>Врач</p>
      			<p>Ком. название</p>
      			<p>Кодификатор</p>
      			<p>Дата выдачи</p>
      			<p>Форма</p>
            <p>Кол-во</p>
      		</div>
      		<div className='medicine-content'>
            {this.state.data.map((one,index)=>{
              return(
                <div className='meidcine-row' key={one.index}>
                  <p className='name'>{one.doctor}</p>
                  <p className='market-name'>{one.drug}</p>
                  <p className='code'>{one.code}</p>
                  <p className='date'>{one.date}</p>
                  <p className='form'>форма</p>
                  <p className='amount'>{one.count}</p>
                </div>
              );
            })}
      		</div>
      	</div>
      </div>
    );
  }
}

export default InfoView;