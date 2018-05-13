// @flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';

type Props = {
    in: boolean,
    children: any
}

const Bounce = (props: Props) => (
    <CSSTransition
        classNames="bounce"
        in={props.in}
        timeout={1000000}>
            {props.children}            
    </CSSTransition>
);

export { Bounce };