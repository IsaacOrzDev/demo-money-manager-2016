// @flow
import React from 'react';

type Props = {
    description: string,
    value: boolean,
    changeEvent?: (e: any) => any
};

const Checkbox = ({description, value, changeEvent}: Props) => (
    <div className="checkbox">
        <div className="checkbox_group">
            <label className="checkbox_description">{description}</label>
            <input type="checkbox" onClick={changeEvent} checked={value} />
        </div>
    </div>
)

export { Checkbox };