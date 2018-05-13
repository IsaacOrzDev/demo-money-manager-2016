// @flow
import React from 'react';

type Props = {
    code: string
};

const IonIcon = ({code}: Props) => (
    <i className={"ion-" + code} />
);

export { IonIcon };