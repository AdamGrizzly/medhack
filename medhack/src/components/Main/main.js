import React, { Component } from 'react';
import './main.css';
import { Input, Button, Select } from 'antd';
import {Link} from 'react-router-dom';
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css'; 
import 'antd/lib/button/style/css'; 
const Option = Select.Option;

function searchingFor(term){
  return function(x){
    return x.short_name.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class Main extends Component {
		state = {
			institutions: []
		}

	  constructor(props){
	    super(props);
	    this.state = {
	      regions: [],
	      institutions: [],
	      render: false,
	      term:''
	    }
	    this.searchHandler = this.searchHandler.bind(this);
	  }

	  componentWillMount = async () => {
	    const mreq = await fetch(`http://46.101.236.211:6969/api/v1/regions`);
	    const mres = await mreq.json();
	    this.setState({ regions: mres });
	  }

	  renderInstitutions = async () => {
	  	const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions?region=${this.state.region}`);
	    const mres = await mreq.json();
	    await this.setState({institutions: mres});
	    this.setState({render: true});
	  }

	  onSearch = async (e) => {
	  	let term = e;
	  	let query = term.split(' ').join('%20');
	  	console.log(`http://46.101.236.211:6969/api/v1/institutions/?search=${query}`);
	  	const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions/?search=${query}`);
	    const mres = await mreq.json();
	    await this.setState({institutions: mres});
	    this.setState({render: true});
	  }

	  searchHandler(event){
		this.setState({term: event.target.value})
	  }

	  render() {
	    return (
	      <div className="main-container">
	      <div className='text-block'>
	      	{this.state.render ?
	      		<div className='institutions-container'>
	      			<Input
						placeholder="Введите название учреждения"
						onChange={this.searchHandler}
						size="large"
					/>
		      		<div className='institutions-list'>
			      		{this.state.institutions.filter(searchingFor(this.state.term)).map((one) => {
			      			return(<Link to={{pathname: `institution/${one.id}`}}>
			      					<p>{one.short_name}</p>
						        	</Link>)
			      		})}
		      		</div>
	      		</div>
		      	: <div>
		      		<h1>Узнайте информацию о наличии лекарственных средств в лечебном учреждении</h1>
		      		<div className='input-fields'>
					<Input.Search
						placeholder="Введите название учреждения"
						size="large"
						onSearch={e => this.onSearch(e)}
					/>
					<p>или выберите из списка</p>
					<div>
						<Select
							showSearch
							style={{ width: 200 }}
							placeholder="Область"
							onChange={value => this.setState({region: value})}
						>
						{this.state.regions.map((one)=>{
							return(
								<Option value={one.id}>{one.name}</Option>
								);
						})}
					  </Select>
					  <Button 
					  	type="primary"
					  	onClick={this.renderInstitutions}
					  >Перейти</Button>
					</div>
		      	</div>
		      	</div>
	      	}
	      	</div>
	      </div>
    );
  }
}

export default Main;