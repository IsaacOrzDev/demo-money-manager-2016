// @flow
import React from 'react';

type TabsProps = {
    children: any
};

type TabItemProps = {
    text: string,
    isChecked: boolean,
    clickEvent?: () => any
};

const Tabs = ({children}: TabsProps) => (
    <div className="tabs">
        {children}
    </div>
);

const TabItem = ({text, isChecked, clickEvent}: TabItemProps) => (
    <div className="tabs_tab-item">
        <input type="radio" className="tab-item_toggle" defaultChecked={isChecked}/>
        <label className={isChecked? 'tab-item_label tab-item_label--checked': 'tab-item_label'} onClick={clickEvent}>{text}</label>
    </div>
);

export { Tabs, TabItem };

