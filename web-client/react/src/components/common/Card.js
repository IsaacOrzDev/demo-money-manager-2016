// @flow
import React from 'react';

type Props = {
    title?: string,
    children: any
};

const Card = ({title, children}: Props) => (
    <div className="card">
        {title &&
            <p className="card_title">{title}</p>
        }
        {children}
    </div>
);

export { Card };