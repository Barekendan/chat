import React from 'react';
import MessageList from './message-list.jsx';
import MessageInput from './message-input.jsx';

export default class Messenger extends React.Component {
    render() {
        return (
            <div>
                <div style={{height: 200, maxHeight: 300}}>
                    <MessageList />
                </div>
                <MessageInput />
            </div>
        );
    }
}