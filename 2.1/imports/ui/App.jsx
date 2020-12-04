import React, { Component } from 'react';
import _ from 'lodash';
import { Transition, animated } from 'react-spring/renderprops';

import { Target } from "./Target";
const AnimatedTarget = animated(Target);


export class App extends Component {

    state = {
        x: 0 , y: 0,

        targets: [
            { _id: 3, x: 500, y: 500, size: 200 },
            { _id: 2, x: 500, y: 300, size: 150 },
            { _id: 1, x: 300, y: 300, size: 100 },
            { _id: 4, x: 300, y: 500, size: 300 },
        ]
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
                    items={this.state.targets}
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
                                onClick={(_id) => {
                                    const i = _.findIndex(this.state.targets, { _id });
                                    const targets = this.state.targets.slice(0);
                                    targets.splice(i, 1);
                                    this.setState({ targets });
                                }}
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
