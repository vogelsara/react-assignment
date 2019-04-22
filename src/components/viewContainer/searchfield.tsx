import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';

interface Props {}

interface State {
    value: string
}

export default class SearchField extends React.Component<Props, State> {
    constructor(props) {
      
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <Link to={this.state.value}>Submit</Link>
        </form>
      );
    }
  }