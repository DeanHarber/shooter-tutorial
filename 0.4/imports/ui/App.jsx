import React, { Component } from 'react';
import _ from 'lodash';

import { Target } from "./Target";


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
        window.addEventListener('mousemove', (evt) => {
            if(isPointerLocked) {
                x += evt.movementX;
                y += evt.movementY;

                this.setState({ x, y });
            }
        });
    }

    render() {
        const { x, y } = this.state;

        return (
            <>
                <div className="crosshair" />

                {_.map(this.state.targets, (target) => {
                    return <Target
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
                })}
            </>
        )
    }
}
