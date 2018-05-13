// @flow
import React from 'react';
import { IonIcon } from '../common';

type Props = {
    text: string,
    path?: string,
    clickEvent?: (e: any) => void,
    color: string,
    icon: string
};

const BlockButton = ({text, color, icon, path, clickEvent}: Props) => (
    <div className={`block-button block-button--${color}`}>
        {clickEvent? 
            <a onClick={clickEvent}>
                {text}
                <span className="block-button_icon">
                    {icon &&
                        <IonIcon code={icon} />
                    }
                </span>
            </a>
        :
            <a href={path}>
                {text}
                <span className="block-button_icon">
                    {icon &&
                        <IonIcon code={icon} />
                    }
                </span>
           </a>
        }
    </div>
);

export { BlockButton };