import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
    state={
        text:''
    };
    onChange= (e) => this.setState({[e.target.name] : e.target.value});
    onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please Write Something', 'light');
        }
        else{
            this.props.searchUsers(this.state.text);
            this.setState({ text: ''});    
        }
        
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
    }

    render() {
        const {clearUsers, showClear } = this.props;
        return (
            <div>
               <form onSubmit={this.onSubmit} className="form" style={{margin:'0px 30px'}}>
                   <input 
                   type="text" 
                   name="text" 
                   placeholder="Search Users..."
                   value= {this.state.text} 
                   onChange={this.onChange}/>
                   <input type="submit" value="Search" className="btn btn-dark btn-block"/>
                   {showClear && <button className="btn btn-light btn-block" onClick={clearUsers} >Clear</button>}
               </form>
               
              
            </div>
        )
    }
}

export default Search
