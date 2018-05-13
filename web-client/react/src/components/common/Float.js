// @flow
import React from 'react';

const Enums = {
    left: 'left',
    right: 'right'
};

type Props = {
    direction: $Keys<typeof Enums>,
    children: any
};

const FloatItem = ({direction, children}: Props) => (
    <div className={direction === Enums.left? 'float-item-left' : 'float-item-right'}>
        {children}
    </div>
);

const FloatGroup = ({direction, children}: Props) => (
    <div className={direction === Enums.left? 'float-group-left' : 'float-group-right'}>
        {children}
    </div>
);

export { FloatItem, FloatGroup };
