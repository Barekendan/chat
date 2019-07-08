import React from 'react';
import User from './../user/user.jsx';

export default class Message extends React.Component {
    render() {
        return (
            <div>
                <User name={this.props.user.name}/>
                <div>
                    {this.props.text}
                </div>
            </div>
            );
    }
}