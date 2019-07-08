import React from 'react';
import User from './user.jsx';

export default class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [
                //{ id: 3, name: 'Vova' },
                //{ id: 4, name: "Dima" }
            ]
        }
    }

    render() {
        return (
            <div style={{width: 150, paddingLeft: 20}} >
                {this.props.users.map((user) => 
                    <User isCurrent={this.props.currentUserId === user.id} key={ user.id } name={ user.name }/>
                )}
                
            </div>
        );
    }
};