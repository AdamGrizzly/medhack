import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import './single.css';

// function searchingFor(term) {
//   return function (x) {
//     return x.drug.trade_name.toLowerCase().includes(term.toLowerCase()) || !term;
//     // return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
//   }
// }

class SingleView extends Component {
  state = {
    institution: [],
    term: '',

  }

  componentWillMount = async () => {
    // const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions/${this.props.match.params.id}`);
    // const mres = await mreq.json();
    // this.setState({
    //   drugs: mres.available_drugs,
    //   institution: mres
    // });
    var data = require('../data.json');
    var regions = require('../regions.json')
    var drugs = require('../drugs.json');
    await this.setState({
      data: data, drugs: drugs, id: this.props.match.params.id, regions:regions
    })
    this.state.data.map((one => {
      if (one[1].id == this.state.id) {
        return (
          this.setState({ data: one, region: one[0].name }),
          console.log(one)
        )
        
      }
     
    }))


  }

  constructor(props) {
    super(props);
    const list = this.state.institution;
    this.state = {
      institution: list,
      term: '',
      data: [],
      drugs: [],
      id: null,
      regions:[],
      region:''
    }

    this.searchHandler = this.searchHandler.bind(this);
  }
  componentDidMount() {
  
    

  }

  randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }

  searchHandler = async (event) => {
    var value = event.target.value.toUpperCase()

    var searchOnName = []
    if (value.length > 2) {
      await this.state.drugs.map((one => {
        if (one.torg_name.indexOf(value) > -1) {
          searchOnName.push(one)
        }
      }))
     
    }
    this.setState({
      drugs: searchOnName
    });

  }
  render() {
    return (
      <div className='single-view-container' >
        <div className='place-info'>
          <div className='left-info' style={{width:"100%"}}>
            <p style={{fontSize:'bold'}}> Наименование поликлинники: {this.props.match.params.name}</p>
          </div>
          <div className='mid-info'>
            <p>Область: {this.state.region}</p>
            <p>{this.state.institution.code}</p>
          </div>
          {/*<div className='right-info'>
            <Link to={{pathname: `${this.props.match.params.id}/movements`}}>
              <Button type="primary">История движений</Button>
            </Link>
          </div>*/}
        </div>
        <div className='place-medicine'>
          <Input.Search
            placeholder="Введите название лекарства"
            size="large"
            onChange={this.searchHandler}
          />
          <div className='medicine-header'>
            <p>Название</p>
            <p>Страна производства</p>
            <p>Штрих код</p>
            <p>Дозировка</p>
            <p>Форма и Обьем</p>
            <p>Стоимость</p>
          </div>
          <div className='medicine-content'>
            {this.state.drugs.map((one) => {
              return (
                <div className='meidcine-row' id={one.trade_name}>
                  <p className='name'>{one.torg_name}</p>
                  <p className='market-name'>{one.strana_proiz}</p>
                  <p className='code' style={{ color: 'black' }}>{one.shtrihkod}</p>
                  <p className='date'>{one ? one.doz : ''}</p>
                  <p className='form' >{one.name_edizm_lform} {one.koldeistvesh ? one.koldeistvesh : ''} {one.edlform ? one.edlform : ""}</p>
                  <p className='amount'>{this.randomInteger(25, 250)} сом</p>
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