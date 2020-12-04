import React, { Component } from 'react';

export class PlayerNameForm extends Component {

    state = { name: "" }

    render() {
        return (
            <div className="name-form">
                <form onSubmit={(evt) => {
                    evt.preventDefault();
                    this.props.onSubmit(this.state.name);
                }}>
                    <div className="enter-player">
                        <p>Type your name and hit Enter</p>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={(evt) => this.setState({ name: evt.target.value })} />
                        <img src={"/logo.svg"} />
                    </div>
                </form>
            </div>
        );
    }
}
