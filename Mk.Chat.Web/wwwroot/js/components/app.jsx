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