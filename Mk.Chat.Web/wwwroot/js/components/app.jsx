import React from 'react';
import UserList from './user/user-list.jsx';
import Messenger from './message/messenger.jsx';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            messages: [],
            currentUser: null
        }

        this.setCurrentUser = this.setCurrentUser.bind(this);
    }

    setCurrentUser(user) {
        this.setState((oldState) => {
            let state = {};
            Object.assign(state, oldState);
            state.currentUser = user;

            return state;
        });
    }

    componentDidMount() {
        $.get("api/Users",
            data => {
                this.setState((oldState) => {
                    let state = {};
                    Object.assign(state, oldState);
                    state.users = data;

                    return state;
                });
            });

        $.get('api/users/current',
            user => {
                if (user) {
                    this.setCurrentUser(user);
                } else {
                    let userName = prompt("User name");

                    if (userName) {
                        $.post('api/users', { userName: userName }, this.setCurrentUser);
                    }
                }
            });
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td style={{verticalAlign: 'top'}}>
                            <UserList users={this.state.users}/>
                        </td>
                        <td>
                            <Messenger />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}