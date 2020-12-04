import React, { Component } from 'react';
import _ from 'lodash';
import { Transition, animated } from "react-spring/renderprops";


export class PlayerList extends Component {
    render() {

        const orderedPlayers = _.orderBy(this.props.players, ['score'], ['desc']);

        return (
            <div className="player-card-list">

                <Transition
                    native
                    items={_.map(orderedPlayers, (player, index) => ({ ...player, y: 50 * index }))}
                    keys={(player) => player._id}
                    from={{ height: 0, opacity: 0 }}
                    leave={{ height: 0, opacity: 0 }}
                    enter={({ y }) => ({ y, height: 50, opacity: 1 })}
                    update={({ y }) => ({ y })}>

                    {(player) => {
                        return ({ y, ...rest }) => {
                            return <animated.div style={{ color: player.color, transform: y.interpolate(y => `translate3d(0,${y}px,0)`), ...rest }} key={player._id} className="player-card">{player.score} {player.name}</animated.div>
                        }
                    }}

                </Transition>
            </div>
        );
    }
}
