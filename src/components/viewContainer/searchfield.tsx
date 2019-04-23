import React, { CSSProperties } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '../button';

interface Props {}

interface State {
    value: string,
    redirect: boolean
}

export default class SearchField extends React.Component<Props, State> {
    constructor(props) {
      
      super(props);
      this.state = {value: '', redirect: false};
  
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
    
    setRedirect = () => {
        this.setState({
          redirect: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={this.state.value} />
        }
    }
  
    render() {
      return (
        <div>
            {this.renderRedirect()}        
            <form onSubmit={this.setRedirect}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
        </div>
      );
    }
  }