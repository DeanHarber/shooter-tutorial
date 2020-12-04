import React, { Component } from 'react';

const Target = ({ x, y, size }) => {
    x = x * (size / 100);
    y = y * (size / 100);
    return <div className="target" style={{ zIndex: size, width: size, height: size, transform: `translate3d(${x}px, ${y}px, 0)` }} />
};

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
                <Target x={300-x} y={300-y} size={100} />
                <Target x={500-x} y={300-y} size={150} />
                <Target x={500-x} y={500-y} size={200} />
                <Target x={300-x} y={500-y} size={300} />
            </>
        )
    }
}
