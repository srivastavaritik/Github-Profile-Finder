import React, { Component } from 'react'
import UserItems from './UserItems'

class Users extends Component {
    state = {
        users: [
            {
                id : '1',
                login : 'mojombo',
                avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
                html_url: 'https://github.com/mojombo',
            },
            {
                id : '2',
                login : 'pjhyett',
                avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
                html_url: 'https://github.com/pjhyett',
            },
            {
                id : '3',
                login : 'wycats',
                avatar_url: 'https://avatars.githubusercontent.com/u/4?v=4',
                html_url: 'https://github.com/mojombo',
            }
        ]
    }
    render() {
        return (
            <div>
                {this.state.users.map(user =>(
                    <UserItems key={user.id} user={user} />
                ))}
            </div>
        )
    }
}

export default Users
