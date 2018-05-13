// @flow
import React from 'react';

type Props = {
    type: string,
    text: string,
    isVisible: boolean,
    clickEvent: () => any
};

const Notification = (props: Props) => {
    let className = props.isVisible? `notification notification--visible notification--${props.type}` : `notification notification--${props.type}`;
    return (
        <div className={className} onClick={e => props.clickEvent()}>
            <p className="notification_text">
                {props.text}
            </p>
        </div>        
    )
};

export { Notification };