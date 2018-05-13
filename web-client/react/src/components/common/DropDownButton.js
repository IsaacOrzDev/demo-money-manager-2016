// @flow
import React from 'react';
import { IonIcon } from '../common';
import { Bounce } from '../animations';

type Props = {
    in: boolean,
    cssClass: string,
    text: string,
    icon: string,
    clickEvent: (e: any) => any
};

const DropDownButton = (props: Props) => (
    <Bounce in={props.in}>
        <div className={`drop-down-button ${props.cssClass}`}>
            <a onClick={props.clickEvent}>{props.text}</a>
            <span className="drop-down-button_icon">
                <IonIcon code={props.icon} />
            </span>    
        </div>        
    </Bounce>
);

export { DropDownButton };