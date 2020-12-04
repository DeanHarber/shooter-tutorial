import React, { Component } from 'react';
import _ from 'lodash';
import { Transition, animated } from 'react-spring/renderprops';
import { withTracker } from 'meteor/react-meteor-data';

import { Target } from "./Target";
import { GameCollection } from "../api/game.collection";
const AnimatedTarget = animated(Target);

export class App extends Component {

    state = {
        x: 0 , y: 0
    };

    componentDidMount() {

        let isPointerLocked = false;
        window.addEventListener('click', () => {
            if(!isPointerLocked) {
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
                <div className="crosshair" />

                <Transition
                    native
                    items={this.props.game.targets}
                    keys={(target) => target._id}
                    from={{ scale: 0 }}
                    enter={{ scale: 1 }}
                    leave={{ scale: 0 }}
                >
                    {(target) => {
                        return (props) => {
                            return <AnimatedTarget
                                style={props}
                                key={target._id}
                                _id={target._id}
                                onClick={(_id) => Meteor.call("game.targetHit", this.props.game._id, _id)}
                                x={target.x - x}
                                y={target.y - y}
                                size={target.size} />;
                        }
                    }}
                </Transition>
            </>
        )
    }
}

export const AppWithTracker = withTracker(({ gameId }) => {
    const game = GameCollection.findOne({ _id: gameId }) || { targets: [] };
    return { game };
})(App);