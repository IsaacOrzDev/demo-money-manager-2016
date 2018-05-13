// @flow
import React from 'react';

type ButtonGroupProps = {
    children: any
};

type ButtonGroupItemProps = {
    text: string,
    isActive: boolean,
    clickEvent: () => any
};

const ButtonGroup = ({children}: ButtonGroupProps) => (
    <footer className="button-group">
        {children}
    </footer>
);

const ButtonGroupItem = ({text, isActive, clickEvent}: ButtonGroupItemProps) => (
    <button className={isActive? "button-group_item button-group_item--active" : "button-group_item"} onClick={clickEvent}>
        {text}
    </button>
);

export { ButtonGroup, ButtonGroupItem };