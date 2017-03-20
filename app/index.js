import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import RenderSelect from './RenderSelect'
import Stations from './stations'
import Alert from 'react-s-alert'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-select/dist/react-select.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import './index.css'

class App extends Component {
	constructor() {
		super()
		this.state = {
			seats: 0,
			startDate: moment(),
			source: {},
			destination: {}
		}
		this.randomNumber = this.randomNumber.bind(this)
		this.setSource = this.setSource.bind(this)
		this.setDestination = this.setDestination.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.toggleCalendar = this.toggleCalendar.bind(this)
		this.setSeats = this.setSeats.bind(this)
		this.callHandler = this.callHandler.bind(this)
	}

	randomNumber(min,max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	setSource(source) {
		this.setState({source})
	}

	setDestination(destination) {
		this.setState({destination})
	}

	setSeats(e) {
		const seats = e.target.value
		this.setState({seats})
	}

	handleChange (date) {
	  this.setState({startDate: date})
	  this.toggleCalendar()
	}

	toggleCalendar (e) {
	  e && e.preventDefault()
	  this.setState({isOpen: !this.state.isOpen})
	}

	callHandler(singleOrReturn) {
		if(Object.keys(this.state.source).length !== 0 && Object.keys(this.state.destination).length !== 0 && this.state.seats > 0)
			{
				const price = this.randomNumber(300,1500);
				Alert.success('Ticket Successfully booked for ' + this.state.seats + ' people at Rs. ' + (price * this.state.seats * singleOrReturn), {
		            position: 'bottom-left',
		            effect: 'bouncyflip',
		            timeout: 5000
		        });
			}
		else {
			Alert.error('Please Fill All the Fields', {
	            position: 'bottom-right',
	            effect: 'bouncyflip',
	            timeout: 3000
	        });
		}
	}

	render() {
		return (
				<div>
					<h1>ATVM Train Ticketing</h1>
					<div className="label">Source Station</div>
					<RenderSelect name="source" options={Stations} setStateValue={this.setSource} />
					<div className="label">Destination Station</div>
					<RenderSelect name="destination" options={Stations} setStateValue={this.setDestination} />
					<div className="label">Choose Journey Date</div>
					<div className="flex">
						<button className="bttn-material-flat example-custom-input" onClick={this.toggleCalendar}>{this.state.startDate.format("DD-MM-YYYY")}</button>
					</div>
					{
				        this.state.isOpen && (
				            <DatePicker
				                selected={this.state.startDate}
				                onChange={this.handleChange}
				                withPortal
				                inline />
				        )
				    }
				    <div className="label">Enter number of people</div>
					<div className="flex">
						<input type="number" placeholder="Enter number of seats" value={this.state.seats} onChange={this.setSeats} />
					</div>
					<div className="flex">
						<button type="button" className="bttn-material-flat bttn-md bttn-success btn" onClick={() => this.callHandler(1)}>Single</button>
						<button type="button" className="bttn-material-flat bttn-md bttn-success btn" onClick={() => this.callHandler(2)}>Return</button>
					</div>
		            <Alert stack={{limit: 1}} />
				</div>
			)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
