import React, { Component } from 'react'
import Select from 'react-select'

class RenderSelect extends Component {
	constructor() {
		super();
		this.state = {
			value: ''
		}
		this.setValue = this.setValue.bind(this);
		this.renderValue = this.renderValue.bind(this);
	}

	setValue (value) {
		this.setState({ value });
		this.props.setStateValue(value);
	}

	renderValue(option) {
		return <strong>{option.label}</strong>;
	}

	render() {
		const {options,name} = this.props;
		return <Select className="select" name={name} value={this.state.value} onChange={this.setValue} options={options} valueRenderer={this.renderValue} />;
	}
}

export default RenderSelect
