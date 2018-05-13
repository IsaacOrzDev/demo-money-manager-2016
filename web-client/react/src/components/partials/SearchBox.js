// @flow
import React from 'react';
import { IonIcon } from '../common';
import { checkIsEnterKey } from '../../componentFunctions';

type Props = {
    placeholder: string,
    value: string,
    changeEvent: (value: string) => any,
    searchEvent: () => any
};

function handleEnter(e: any, event: () => any) {
    let charCode = e.which ? e.which : e.keyCode;
    if(checkIsEnterKey(charCode))
        event();
}

const SearchBox = (props: Props) => (
    <div className="search-box">
        <div className="search-box-container">
            <div className="search-box_content">
                <div className="search-box_input">
                    <input type="text" className="search-box_textbox" 
                        placeholder={props.placeholder} 
                        value={props.value}
                        onChange={e => props.changeEvent(e.target.value)}
                        onKeyPress={e => handleEnter(e, props.searchEvent)} />
                        {props.value.length > 0 &&
                            <button className="search-box_button" onClick={props.searchEvent}>
                                <IonIcon code="search" />
                            </button>                        
                        }
                </div>
            </div>        
        </div>
    </div>
);

export { SearchBox };