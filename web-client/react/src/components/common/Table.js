// @flow
import React from 'react';
import type { Option } from '../../flowTypes';

type TableEditableContainerProps = {
    titles: Array<Option>,
    editable: boolean,
    addRowEvent: (e: any) => any,
    children: any
};

type TableSelectableContainerProps = {
    titles: Array<Option>,
    selectable: boolean,
    children: any
};

type TableSelectableRowProps = {
    titles?: Array<Option>,
    id: any,
    selectEvent: (e: any, id: any) => any,
    children: any,
};

type TableEditableRowProps = {
    row: number,
    editable?: boolean,
    titles?: Array<Option>,
    deleteEvent: (index: number) => any,
    children: any
};

type TableTextBoxProps = {
    row: number,
    type: string,
    value: string,
    error: string,
    changeEvent: (index: number, value: string) => any
};

type TableLabelProps = {
    children: any
};

const TableEditableContainer = ({titles, editable, addRowEvent, children}: TableEditableContainerProps) => {
    let childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, {titles, editable})
    );
    return (
        <div className="table table--editable">
            <table>
                <thead>
                    <tr>
                        {titles.map(title => 
                            <th key={title.value}>
                                {title.text}
                            </th>
                        )}
                        {editable &&
                            <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {childrenWithProps}
                    <tr><td colSpan={titles.length + (editable? 1 : 0)}></td></tr>
                </tbody>
                {editable &&
                    <tfoot>
                        <tr>
                            <td colSpan={titles.length + (editable? 1 : 0)}>
                                <button className="table_add-button" onClick={addRowEvent}>{'+ Add'}</button>
                            </td>
                        </tr>
                    </tfoot>
                }
            </table>        
        </div>

    );
}

const TableSelectableContainer = ({titles, selectable, children}: TableSelectableContainerProps) => {
    let childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, {titles})
    );
    let className = selectable? "table table--selectable" : "table";
    return (
        <div className={className}>
            <table>
                <thead>
                    <tr>
                        {titles.map(title => 
                            <th key={title.value}>
                                {title.text}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {childrenWithProps}
                </tbody>
            </table>        
        </div>

    );
}

const TableSelectableRow = ({titles, id, selectEvent, children}: TableSelectableRowProps) => (
    <tr onClick={e => selectEvent(e, id)}>
        {React.Children.map(children, (child, i) => 
            titles && 
            <td key={child} data-title={titles[i].text}>
                {child}
            </td>
        )}        
    </tr>
);

const TableEditableRow = ({row, editable, titles, deleteEvent, children}: TableEditableRowProps) => (
    <tr>
        {React.Children.map(children, (child, i) => 
            titles && 
            <td key={child} data-title={titles[i].text}>
                {child}
            </td>
        )}
        {editable &&
            <td>
                <button className="table_close-button" onClick={e => deleteEvent(row)}>{'X Remove'}</button>
            </td>
        }
    </tr>    
);

const TableTextBox = ({row, type, value, error, changeEvent}:TableTextBoxProps) => (
    <div className="table_text-box">
        <input className="table_text-box_input" type={type} value={value} onChange={e => changeEvent(row, e.target.value)}  />
        <p className="table_text-box_error">{error}</p>
    </div>
);

const TableLabel = ({children}: TableLabelProps) => (
    <label className="table_label">{children}</label>
);

const TableIncomeLabel = ({children}: TableLabelProps) => (
    <label className="table_label table_label--income">{children}</label>
);

const TableExpenseLabel = ({children}: TableLabelProps) => (
    <label className="table_label table_label--expense">{children}</label>
);

export { 
    TableEditableContainer,
    TableSelectableContainer,
    TableEditableRow,
    TableSelectableRow,
    TableTextBox,
    TableLabel,
    TableIncomeLabel,
    TableExpenseLabel
};