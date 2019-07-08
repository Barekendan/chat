import React from 'react';
import Message from './message.jsx';

export default class MessageList extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    render() {
        return (
            <div style={{paddingLeft: 10}}>
                {this.state.messages.map(m => <Message key={m.id} user={m.user} text={m.text} />)}
            </div>
        );
    }
}