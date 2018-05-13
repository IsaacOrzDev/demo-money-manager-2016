// @flow
import React from 'react';
import {
    TableSelectableContainer as TableContainer,
    TableSelectableRow as TableRow,
    TableLabel,
    TableIncomeLabel,
    TableExpenseLabel
} from '../common';
import { TransactionTypeEnums } from '../../enums';
import { convertToMoneyFormatString, capitalizeString } from '../../componentFunctions';
import type { Option, Transaction } from '../../flowTypes';

type Props = {
    titles: Array<Option>,
    records: Array<Transaction>,
    typeOptionList: Array<Option>,
    selectEvent: (id: any) => any;
};

type State = {
    recordsPerPage: number,
    pagesPerSet: number,
    currentPageRecords: {
        from: number,
        to: number
    }
};

class RecordList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            recordsPerPage: 5,
            pagesPerSet: 5,
            currentPageRecords: {
                from: 0,
                to: 0
            }
        };
        const component: any = this;
        component.selectRow = this.selectRow.bind(this);
        component.selectPage = this.selectPage.bind(this);
    }

    selectRow(e: any, id: any) {
        e.preventDefault();
        this.props.selectEvent(id);
    }

    selectPage(page: number) {
        this.setState({
            currentPageRecords: {
                from: (page - 1) * this.state.recordsPerPage,
                to: page * this.state.recordsPerPage
            }
        });
    }

    render() {
        let { props } = this;
        return (
            <TableContainer titles={props.titles} selectable={true}>
                {props.records.map((r, ri) => 
                    <TableRow key={ri} id={r.id} selectEvent={this.selectRow}>
                        {props.titles.map(t => {
                            let value = r[t.value];
                            if(t.value === "type") {
                                let type = props.typeOptionList.find(x => x.value === value)
                                if(value === TransactionTypeEnums.income) {
                                    return <TableIncomeLabel key={t.value}>{type? type.text : ""}</TableIncomeLabel>;
                                } else {
                                    return <TableExpenseLabel key={t.value}>{type? type.text : ""}</TableExpenseLabel>;
                                }
                            } else if(t.value === "amount") {
                                return <TableLabel key={t.value}>{convertToMoneyFormatString(value, "hkd")}</TableLabel>;

                            } else if(t.value === "category") {
                                return <TableLabel key={t.value}>{capitalizeString(value)}</TableLabel>;
                            } else {
                                return <TableLabel key={t.value}>{value}</TableLabel>;
                            }
                        })}
                    </TableRow>
                )}                                  
            </TableContainer>            
        );
    }
}

export { RecordList };
