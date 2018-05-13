// @flow
import React from 'react';
import { convertToMoneyFormatString } from '../../componentFunctions';

type Props = {
    balance: number,
    income: number,
    expense: number,
    currency: string
};

const BalanceReport = (props: Props) => (
    <table className="balance-report">
        <tbody>
            <tr>
                <td>
                    <span className="balance-report_description">
                        Total Balance
                    </span>
                </td>
                <td>
                    <span className="balance-report_value">
                        {convertToMoneyFormatString(props.balance, props.currency)}
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span className="balance-report_description">
                        Total Income
                    </span>
                </td>
                <td>
                    <span className="balance-report_value">
                        {convertToMoneyFormatString(props.income, props.currency)}
                    </span>
                </td>
            </tr>
            <tr>
                <td>
                    <span className="balance-report_description">
                        Total Expense
                    </span>
                </td>
                <td>
                    <span className="balance-report_value">
                        {convertToMoneyFormatString(props.expense, props.currency)}
                    </span>
                </td>
            </tr>            
        </tbody>
    </table>
);

export { BalanceReport };