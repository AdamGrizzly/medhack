import React, { Component } from 'react';
import { Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/lib/input/style/css'; 
import 'antd/lib/button/style/css'; 
import './single.css';

function searchingFor(term){
  return function(x){
    return x.drug.trade_name.toLowerCase().includes(term.toLowerCase()) || !term;
    // return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class SingleView extends Component {
  state = {
    institution: [],
    term: ''
  }

  componentWillMount = async () => {
    const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions/${this.props.match.params.id}`);
    const mres = await mreq.json();
    this.setState({ 
      drugs: mres.available_drugs,
      institution: mres
    });
  }

  constructor(props){
    super(props);
    const list = this.state.institution;
    this.state = {
      institution: list,
      term:''
    }

    this.searchHandler = this.searchHandler.bind(this);
  }
  
  searchHandler(event){
    this.setState({term: event.target.value})
  }

  render() {
    return (
      <div className='single-view-container'>
      	<div className='place-info'>
          <div className='left-info'>
            <p>{this.state.institution.full_name}</p>
            <p>{this.state.institution.address}</p>
          </div>
          <div className='mid-info'>
            <p>Область: {this.state.institution.region}</p>
            <p>{this.state.institution.code}</p>
          </div>
          <div className='right-info'>
            <Link to={{pathname: `${this.props.match.params.id}/movements`}}>
              <Button type="primary">История движений</Button>
            </Link>
          </div>
        </div>
      	<div className='place-medicine'>
          <Input.Search
            placeholder="Введите название лекарства"
            size="large"
            onChange={this.searchHandler}
          />
      		<div className='medicine-header'>
      			<p>Название</p>
      			<p>Ком. название</p>
      			<p>Кодификатор</p>
      			<p>Дата обновления</p>
      			<p>Форма</p>
            <p>Кол-во</p>
      		</div>
      		<div className='medicine-content'>
            {this.state.drugs && this.state.drugs.filter(searchingFor(this.state.term)).map((one)=>{
              return(
                <div className='meidcine-row' id={one.drug.trade_name}>
                  <p className='name'>{one.drug.com_name}</p>
                  <p className='market-name'>{one.drug.trade_name}</p>
                  <p className='code'>{one.drug.code}</p>
                  <p className='date'>{one.date}</p>
                  <p className='form'>{one.drug.storage}</p>
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

export default SingleView;