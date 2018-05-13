// @flow
import React from 'react';
import { IonIcon } from '../common';

type Props = {
    icon: string,
    circle?: boolean,
    clickEvent?: () => void
};

const IconButton = ({icon, circle, clickEvent}: Props) => (
    <button className={circle? "icon-circle-button": "icon-button"} onClick={clickEvent}>
        <IonIcon code={icon} />
    </button>
);

export { IconButton };