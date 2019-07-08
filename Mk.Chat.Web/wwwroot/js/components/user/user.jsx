import React from 'react';

export default class User extends React.Component {
    render() {
        return (
            <div style={this.props.isCurrent ? { fontWeight: 'bold', fontStyle: 'italic' } : {}}>{this.props.name}</div>
        );
    }
};