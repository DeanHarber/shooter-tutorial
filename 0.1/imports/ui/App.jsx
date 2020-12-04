import React, { Component } from 'react';

export class App extends Component {

    state = { x: 0 , y: 0 };

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
                <div className="target" style={{ transform: `translate3d(${300-x}px, ${300-y}px, 0)` }} />
                <div className="target" style={{ transform: `translate3d(${500-x}px, ${300-y}px, 0)` }} />
                <div className="target" style={{ transform: `translate3d(${500-x}px, ${500-y}px, 0)` }} />
                <div className="target" style={{ transform: `translate3d(${300-x}px, ${500-y}px, 0)` }} />
            </>
        )
    }
}
