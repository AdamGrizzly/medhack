import React, { Component } from 'react';
import './main.css';
import { Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/button/style/css';
const Option = Select.Option;

function searchingFor(term) {
	return function (x) {
		return x.short_name.toLowerCase().includes(term.toLowerCase()) || !term;
	}
}

class Main extends Component {
	state = {
		institutions: []
	}

	constructor(props) {
		super(props);
		this.state = {
			regions: [],
			institutions: [],
			render: false,
			term: '',
			data: [],
			infoFarm: [],
			vid: null
		}
		this.searchHandler = this.searchHandler.bind(this);
		this.renderInstitutions = this.renderInstitutions.bind(this)
	}

	componentWillMount = async () => {
		var data = require('../data.json');
		var regions = require('../regions.json')
		// const mreq = await fetch(`https://cors-anywhere.herokuapp.com/http://46.101.236.211:6969/api/v1/regions`);
		// const mres = await mreq.json();
		this.setState({ regions: regions });
		this.setState({ data: data })

	}
	componentDidMount() {
		console.log(this.state.regions)
		console.log(this.state.data)
	}

	renderInstitutions() {
		// const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions?region=${this.state.region}`);
		// const mres = await mreq.json();
		// await this.setState({ institutions: mres });
		// this.setState({ render: true });
		console.log(this.state.region)
		this.state.data.map((one => {
			if (one[1].id == this.state.region) {
				return (
					this.setState({
						render: true,
						infoFarm: one,
						vid: 1
					})


				)
			}
			// else{
			// 	console.log("no "+one)
			// }
		}))
	}

	onSearch = async (e) => {
		// let term = e;
		// let query = term.split(' ').join('%20');
		// console.log(`http://46.101.236.211:6969/api/v1/institutions/?search=${query}`);
		// const mreq = await fetch(`http://46.101.236.211:6969/api/v1/institutions/?search=${query}`);
		// const mres = await mreq.json();
		// await 
		const value = e.toUpperCase()
		var searchOnName = []
		if (value.length > 1) {
			await this.state.data.map((one => {
				for (var i = 2; i < one.length; i++) {
					if (one[i].short_name.indexOf(value) > -1) {
						searchOnName.push([
							{ "short_name": one[i].short_name },
							{ "short_name": one[i].long_name },
							{ "id": one[1].id }]
						)
						this.setState({
							infoFarm: searchOnName,
							vid: 0
						});
					}

				}
			}))

			console.log(this.state.infoFarm)
			this.setState({ render: true });
		}
		else {
			alert("нужно больше символов")
		}
	}



	searchHandler = async (event) => {
		var value = event.target.value.toUpperCase()

		var searchOnName = []
		if (value.length > 1) {
			await this.state.data.map((one => {
				for (var i = 2; i < one.length; i++) {
					if (one[i].short_name.indexOf(value) > -1) {
						searchOnName.push([
							{ "short_name": one[i].short_name },
							{ "short_name": one[i].long_name },
							{ "id": one[1].id }]
						)

					}

				}

			}))
			await this.setState({
				infoFarm: searchOnName,
				vid: 0
			});
			console.log(this.state.infoFarm)
			if (value.length == 0) {
				this.setState({ render: false });
			}
		}

	}

	render() {
		var arr = []
		if (this.state.vid === 1) {
			for (var i = 2; i < this.state.infoFarm.length; i++) {

				arr.push(<Link to={{ pathname: `institution/${this.state.infoFarm[1].id}/${this.state.infoFarm[i].short_name}` }}>
					<p>{this.state.infoFarm[i].short_name}</p>
				</Link>)
			}
		}
		if (this.state.vid === 0) {
			for (var i = 2; i < this.state.infoFarm.length; i++) {

				arr.push(<Link to={{ pathname: `institution/${this.state.infoFarm[i][1].id}` }}>
					<p>{this.state.infoFarm[i][0].short_name}</p>
				</Link>)
				console.log(arr)
			}
		}

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
								{
									arr
								}

							</div>
						</div>
						: <div>
							<h1 style={{ textAlign: 'center' }}>Узнайте информацию о наличии лекарственных средств в лечебном учреждении</h1>
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
										onChange={value => this.setState({ region: value })}
									>
										{this.state.regions.map((one) => {

											return (
												<Option value={one.id} key={one}>{one.name}</Option>
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