// @flow
import React from 'react';

const Container = (props: {page?: string, children: any}) => (
    <div className={props.page? "container " + props.page : "container"}>
        {props.children}
    </div>
);

const Row = (props: {children: any}) => (
    <div className="row">
        {props.children}
    </div>
);

const Column = (props: { sizes: Array<number>, children: any }) => {
    let { sizes, children } = props
    let classes = "";
    if(typeof(sizes[0]) !== 'undefined')
        classes += ` col-${sizes[0]}-mob`;
    if(typeof(sizes[1]) !== 'undefined')
        classes += ` col-${sizes[1]}-tab`;
    if(typeof(sizes[2]) !== 'undefined')
        classes += ` col-${sizes[2]}-lap`;
    if(typeof(sizes[3]) !== 'undefined')
        classes += ` col-${sizes[3]}-des`;

    return (
        <div className={classes}>
            {children}
        </div>
    );
}

const Visible = (props: { sizes: Array<number>, className?: string, children: any }) => {
    let { sizes, children } = props
    let classes = "visible";
    if(sizes[0] === 1)
        classes += ` visible-mob`;
    if(sizes[1] === 1)
        classes += ` visible-tab`;
    if(sizes[2] === 1)
        classes += ` visible-lap`;
    if(sizes[3] === 1)
        classes += ` visible-des`;
    if(props.className)
        classes = `${classes} ${props.className}`

    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export { Container, Row, Column, Visible };