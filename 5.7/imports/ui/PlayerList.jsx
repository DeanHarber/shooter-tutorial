import React, { Component } from 'react';
import _ from 'lodash';

export class PlayerList extends Component {
    render() {
        return (
            <div className="player-card-list">
                {_.map(_.orderBy(this.props.players,['score'],['desc']), (player) => {
                    return <div key={player._id} className="player-card">{player.score} {player.name}</div>
                })}
            </div>
        );
    }
}
