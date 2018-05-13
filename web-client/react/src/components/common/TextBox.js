// @flow
import React from 'react';

type Props = {
    description: string,
    placeHolder: string,
    type: string,
    value: string | number,
    editable: boolean,
    error?: string,
    changeEvent: (value: any) => any
};

const TextBox = ({description, placeHolder, type, value, editable, error, changeEvent}: Props) => (
    <div className="text-box">
        {editable ?
            <input className="text-box_input" type={type} value={value} required onChange={e => changeEvent(e.target.value)} />
        :
            <input className="text-box_input text-box_input--freezing" type={type} value={value} disabled />
        }
        <label className="text-box_placeholder">{placeHolder}</label>
        <label className="text-box_desc">{description}</label>
        <p className="text-box_error">{error}</p>
    </div>
);

export { TextBox }; 