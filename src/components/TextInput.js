import React, {Component} from "react";

class TextInput extends Component{
	constructor(props){
		super(props);
		this.state={
			value: ''
		}
		this.changeHandler = this.changeHandler.bind(this)
	}
	changeHandler(event){
		this.setState({
			value: event.target.value})
	}
	render() {
		return(
			<label htmlFor = {this.props.name}>
				{this.props.label}
				<input id={this.props.name} name={this.props.name} value={this.state.value} onChange={this.changeHandler} />

			</label>
		);
	}
}

export default TextInput;
