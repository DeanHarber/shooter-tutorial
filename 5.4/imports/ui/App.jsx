import React, { Component } from 'react';
import _ from 'lodash';
import { Transition, animated } from 'react-spring/renderprops';
import { withTracker } from 'meteor/react-meteor-data';

import { Target } from "./Target";
import { GameCollection } from "../api/game.collection";
import {PlayerNameForm} from "./PlayerNameForm";
const AnimatedTarget = animated(Target);

export class App extends Component {

    state = {
        playerId: null,
        x: 0 , y: 0
    };

    componentDidMount() {

        const self = this;
        setInterval(function () {
            const gameId = self.props.game._id;
            if(gameId) {
                Meteor.call("game.ping", gameId);
            }
        }, 5000);

        let isPointerLocked = false;
        window.addEventListener('click', () => {
            if(!isPointerLocked && this.state.playerId) {
                document.body.requestPointerLock();
            }
        });

        document.addEventListener('pointerlockchange', () => {
            isPointerLocked = document.pointerLockElement === document.body;
        });

        let x = 0, y = 0;
        let view = { x, y };
        window.addEventListener('mousemove', (evt) => {
            if(isPointerLocked) {
                x += evt.movementX;
                y += evt.movementY;

                view.x = x;
                view.y = y;
            }
        });

        const animation = () => {
            this.setState(view);
            window.requestAnimationFrame(animation);
        };
        window.requestAnimationFrame(animation);
    }

    render() {
        const { x, y } = this.state;

        return (
            <>

                {this.state.playerId ?
                    <>
                        <div className="crosshair" />
                        <Transition
                            native
                            items={this.props.game.targets}
                            keys={(target) => target._id}
                            from={{ scale: 0 }}
                            enter={{ scale: 1 }}
                            leave={{ scale: 0 }}>
                            {(target) => {
                                return (props) => {
                                    return <AnimatedTarget
                                        style={props}
                                        key={target._id}
                                        _id={target._id}
                                        onClick={(_id) => Meteor.call("game.targetHit", this.props.game._id, _id, this.state.playerId)}
                                        x={target.x - x}
                                        y={target.y - y}
                                        size={target.size} />;
                                }
                            }}
                        </Transition>
                    </>
                    :
                    <PlayerNameForm onSubmit={(name) => {
                        Meteor.call("game.addPlayer", this.props.game._id, name, (err, playerId) => {
                            if(!err) this.setState({ playerId });
                        })
                    }} />
                }

            </>
        )
    }
}

export const AppWithTracker = withTracker(({ gameId }) => {
    const game = GameCollection.findOne({ _id: gameId }) || { targets: [] };
    return { game };
})(App);