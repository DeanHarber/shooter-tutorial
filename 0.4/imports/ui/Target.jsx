import React, { Component } from 'react';

export class Target extends Component {

    componentDidMount() {
        window.addEventListener('click', this.onClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClick);
    }

    onClick = (evt) => {
        let wx = window.innerWidth / 2, wy = window.innerHeight / 2;
        const { x, y } = this.getDisplayCoordinates();
        let r = this.props.size / 2;
        let cx = x + r, cy = y + r;

        // c^2 = a^2 + b^2
        let d = Math.sqrt(Math.pow(cx - wx, 2) + Math.pow(cy - wy, 2));
        if(d <= r) {
            this.props.onClick(this.props._id);
        }
    };

    getDisplayCoordinates() {
        let { size, x, y } = this.props;
        x = x * (size / 100);
        y = y * (size / 100);

        return { x, y };
    }

    render() {
        const { size } = this.props;
        const { x, y } = this.getDisplayCoordinates();

        return <div className="target" style={{ zIndex: size, width: size, height: size, transform: `translate3d(${x}px, ${y}px, 0)` }} />
    }
}