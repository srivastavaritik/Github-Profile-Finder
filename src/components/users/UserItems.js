import React, { Component } from 'react'

class UserItems extends Component {

  

    render() {

        const {login,avatar_url,html_url} = this.props.user;

        return (
            <div className="card text-center">
                <img src={avatar_url} alt="" className="round-img" style={{width: '60px'}} />
                <h3>{login}</h3>
                <div>
                    <a href={html_url} class="btn btn-dark btn-sm my-1" >More</a>
                </div>
            </div>
        )
    }
}

export default UserItems
