import React from 'react';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import UserList from './user/user-list.jsx';
import Messenger from './message/messenger.jsx';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
            messages: [],
            currentUser: null,
            hubConnection: null
        }
    }

    componentDidMount() {
        $.get("api/Users",
            data => {
                this.setState({users: data});
            });

        $.get('api/users/current',
            currentUser => {
                if (currentUser) {
                    this.setState({ currentUser });
                } else {
                    let userName = prompt("User name");

                    if (userName) {
                        $.post('api/users', { userName: userName },
                            currentUser => this.setState({ currentUser }));
                    }
                }
            });

        this.connection = new HubConnectionBuilder()
            .withUrl('/chathub')
            .configureLogging(LogLevel.Information)
            .build();

        this.connection.on('ReceiveNewUser',
            user => {
                this.setState((oldState) => {
                    let users = oldState.users.concat(user);
                    return { users };
                });
            });

        this.connection.start();
    }

    render() {
        return (
            <table className="chat">
                <tbody>
                    <tr>
                        <td style={{verticalAlign: 'top'}}>
                            <UserList currentUserId={this.state.currentUser && this.state.currentUser.id} users={this.state.users}/>
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