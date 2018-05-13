// @flow
import React from 'react';
import { convertToMoneyFormatString } from '../../componentFunctions';

type AppTitleProps = {
    isVisible: boolean,
}

type NumberTitleProps = {
    children: number,
    currency: string
};

const AppTitle = (props: AppTitleProps) => (
    <div className={props.isVisible? `app-title`: `app-title app-title--invisible`}>
        <h1>Money Manager 101</h1>
    </div>
);

const NumberTitle = (props: NumberTitleProps) => (
    <div className="number-title">
        {convertToMoneyFormatString(props.children, props.currency)}
    </div>
);

export { AppTitle, NumberTitle };