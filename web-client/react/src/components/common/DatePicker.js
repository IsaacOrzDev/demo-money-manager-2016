// @flow
import React from 'react';
import moment from 'moment';
import { Visible } from '../common';
import { ElementStatusEnums } from '../../enums';
import { isFocusInCurrentTarget } from '../../componentFunctions';
import type { Option } from '../../flowTypes';

type DisplayedMonth = {
    year: number,
    month: number
}

type PickedDate = {
    year: number,
    month: number,
    weekday: number,
    day: number
}

type Day = {
    number: number,
    weekday: number,
    isEnabled: boolean
}

type Props = {
    description: string,
    placeHolder: string,
    value: string,
    editable: boolean,
    error?: string,
    defaultDate?: moment.Moment,
    dateAfter?: moment.Moment,
    dateBefore?: moment.Moment,
    pickEvent?: (input: string) => any
};

type State = {
    elementStatus: $Keys<typeof ElementStatusEnums>,
    format: string,
    months: Array<Option>,
    weekdays: Array<Option>,
    days: Array<Array<Day>>,
    displayedMonth: DisplayedMonth,
    pickedDate: PickedDate,
    dateString: string,
};

const pickerMonths = [
    {text: 'January' ,abbr: 'Jan', value: 0},
    {text: 'February' ,abbr: 'Feb', value: 1},
    {text: 'March' ,abbr: 'March' ,value: 2},
    {text: 'April' ,abbr: 'Apr' , value: 3},
    {text: 'May' ,abbr: 'May', value: 4},
    {text: 'June' ,abbr: 'June', value: 5},
    {text: 'July' ,abbr: 'July', value: 6},
    {text: 'August' ,abbr: 'Aug', value: 7},
    {text: 'September' ,abbr: 'Sep', value: 8},
    {text: 'October' ,abbr: 'Oct', value: 9},
    {text: 'November' ,abbr: 'Nov', value: 10},
    {text: 'December' ,abbr: 'Dec', value: 11}  
];

const pickerWeekdays = [
    {text: 'Sunday' ,abbr:'Sun', value: 0},
    {text: 'Monday' ,abbr: 'Mon', value: 1},
    {text: 'Tuesday' ,abbr: 'Tue', value: 2},
    {text: 'Wednesday' ,abbr: 'Wed', value: 3},
    {text: 'Thursday' ,abbr: 'Thu', value: 4},
    {text: 'Friday' ,abbr: 'Fri', value: 5},
    {text: 'Saturday' ,abbr: 'Sat', value: 6}
];

class DatePicker extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let initialStatus = ElementStatusEnums.default;
        if(!this.props.editable)
            initialStatus = ElementStatusEnums.disabled;
        if(this.props.value)
            initialStatus = ElementStatusEnums.valid;
        let format: any = process.env.REACT_APP_DATE_FORMAT;
        this.state = {
            elementStatus: initialStatus,
            format,
            months: pickerMonths,
            weekdays: pickerWeekdays,
            days: [],
            displayedMonth: {
                year: 0,
                month: 0
            },
            pickedDate: {
                year: 0,
                month: 0,
                weekday: 0,
                day: 0
            },
            dateString: this.props.value,
        };
        const component: any = this;
        component.openCalendar = this.openCalendar.bind(this);
        component.clickPrevMonth = this.clickPrevMonth.bind(this);
        component.clickNextMonth = this.clickNextMonth.bind(this);
        component.selectDefaultDate = this.selectDefaultDate.bind(this);
        component.confirmDate = this.confirmDate.bind(this);
        component.closeCalendar = this.closeCalendar.bind(this);
        component.selectDay = this.selectDay.bind(this);
        component.generateDays = this.generateDays.bind(this);
        component.clearDate = this.clearDate.bind(this);
        component.renderCalendarHeader = this.renderCalendarHeader.bind(this);
        component.renderCalendarContent = this.renderCalendarContent.bind(this);
        component.renderCalendarFooter = this.renderCalendarFooter.bind(this);
    }

    openCalendar(e: any) {
        e.preventDefault();
        e.stopPropagation();
        if(this.state.elementStatus !== ElementStatusEnums.disabled) {
            if(this.props.value) {
                let selectedDate: moment.Moment = moment(new Date(this.props.value));
                this.setState({
                    pickedDate: {
                        year: selectedDate.year(),
                        month: selectedDate.month(),
                        weekday: selectedDate.weekday(),
                        day: selectedDate.date()
                    },
                    displayedMonth: {
                        year: selectedDate.year(),
                        month: selectedDate.month()
                    },
                    elementStatus: ElementStatusEnums.focus
                }, () => {
                    this.generateDays(selectedDate);
                })
            } else {
                this.setState({
                    elementStatus: ElementStatusEnums.focus
                }, () => {
                    if(!this.state.dateString) {
                        if(this.props.defaultDate) {
                            this.selectDefaultDate(this.props.defaultDate);
                        } else {
                            this.selectDefaultDate(moment(new Date()));
                        }
                    }
                });
            }            
        }

    }

    clickPrevMonth(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            displayedMonth: this.state.displayedMonth.month === 0 ?
                {
                    year: this.state.displayedMonth.year - 1,
                    month: 11  
                }
            :
                {
                    year: this.state.displayedMonth.year,
                    month: this.state.displayedMonth.month - 1
                }
        }, () => {
            this.generateDays(moment([
                this.state.displayedMonth.year,
                this.state.displayedMonth.month
            ]));
        });
    }

    clickNextMonth(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            displayedMonth: this.state.displayedMonth.month === 11?
                {
                    year: this.state.displayedMonth.year + 1,
                    month: 0
                }
            :   
                {
                    year: this.state.displayedMonth.year,
                    month: this.state.displayedMonth.month + 1
                }
        },()=>{
            this.generateDays(moment([
                this.state.displayedMonth.year,
                this.state.displayedMonth.month
            ]));
        });
    }

    selectDefaultDate(date: moment.Moment) {
        this.setState({
            pickedDate: {
                year: date.year(),
                month: date.month(),
                weekday: date.weekday(),
                day: date.date()
            },
            displayedMonth: {
                year: date.year(),
                month: date.month()
            }
        }, () => {
            this.generateDays(date);
        });
    }

    confirmDate(e: any) {
        e.preventDefault();
        e.stopPropagation();
        let confirmDate = moment([
            this.state.pickedDate.year,
            this.state.pickedDate.month,
            this.state.pickedDate.day
        ]);
        this.setState({
            dateString: confirmDate.format(this.state.format),
            elementStatus: ElementStatusEnums.valid
        }, () => {
            if(this.props.pickEvent)
                this.props.pickEvent(this.state.dateString);
        });
    }

    closeCalendar(e: any) {
        e.preventDefault();
        e.stopPropagation();
        if(!isFocusInCurrentTarget(e)) { 
            this.setState({
                elementStatus: this.props.value ? ElementStatusEnums.valid : ElementStatusEnums.default
            });
        }
    }

    selectDay(e: any, value: number) {
        e.preventDefault();
        e.stopPropagation();
        let targetDate: moment.Moment = moment([
            this.state.displayedMonth.year,
            this.state.displayedMonth.month,
            value
        ]);
        this.setState({
            pickedDate: {
                year: targetDate.year(),
                month: targetDate.month(),
                weekday: targetDate.weekday(),
                day: targetDate.date()
            }
        });
    }

    generateDays(date: moment.Moment) {
        let startDate: moment.Moment = moment(date).startOf('month');
        let daysArray: Array<Day> = [];
        let weeksArray: Array<Array<Day>> = [];
        if(startDate.weekday() !== 0) {
            for(let i = 0; i < startDate.weekday(); i++) {
                daysArray.push({
                    number: 0,
                    weekday: 0,
                    isEnabled: false
                });
            }
        }
        let { dateAfter, dateBefore } = this.props;
        let notBefore = -1, notAfter = -1;
        if(dateAfter && date.year() === dateAfter.year() && date.month() === dateAfter.month()) {
            notBefore = dateAfter.date();
        }
        if(dateBefore && date.year() === dateBefore.year() && date.month() === dateBefore.month()) {
            notAfter = dateBefore.date();
        }
        let totalOfDays: number = startDate.daysInMonth();
        for(let j = 0; j < totalOfDays; j++) {
            let number = startDate.date();
            let weekday = startDate.weekday();
            if(notBefore > -1 && notAfter > -1) {
                daysArray.push({
                    number,
                    weekday,
                    isEnabled: number >= notBefore && number <= notAfter
                });
            } else if(notBefore > -1) {
                daysArray.push({
                    number,
                    weekday,
                    isEnabled: number >= notBefore
                });
            } else if (notAfter > -1) {
                daysArray.push({
                    number,
                    weekday,
                    isEnabled: number <= notAfter
                });
            } else {
                daysArray.push({
                    number,
                    weekday,
                    isEnabled: true
                });
            }
            if(startDate.date() !== totalOfDays)
                startDate.add(1, 'days');
        }
        if(startDate.weekday() !== 6) {
            for(let k = startDate.weekday(); k < 6; k++) {
                daysArray.push({
                    number: 0,
                    weekday: 0,
                    isEnabled: false
                });
            }
        }
        for(let l = 0; l < daysArray.length / 7; l++)
            weeksArray[l] = daysArray.slice(l * 7, l * 7 + 7);
        this.setState({
            days: weeksArray
        });
    }

    clearDate(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            dateString: ''
        }, () => {
            if(this.props.pickEvent)
                this.props.pickEvent('');
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        if(this.props.value !== nextProps.value && this.props.editable) {
            if(nextProps.value !== "") {
                this.setState({
                    elementStatus: ElementStatusEnums.valid
                });
            } else {
                this.setState({
                    elementStatus: ElementStatusEnums.default
                });
            }
        }
    }

    renderCalendarHeader() {
        let { state } = this;
        let pickedMonth: Option | typeof undefined = state.months.find(
            x => x.value === state.pickedDate.month
        );
        let month = pickedMonth? pickedMonth.text : "";
        let pickedWeekday: Option | typeof undefined = state.weekdays.find(
            x => x.value === state.pickedDate.weekday
        );
        let weekday = pickedWeekday? pickedWeekday.text : "";
        return (
            <div className="date-picker_calendar_header">
                <div className="weekday-text">
                    {weekday}
                </div>
                <div className="date-text">
                    <div className="month-text">{month}</div>
                    <div className="day-text">{state.pickedDate.day}</div>
                    <div className="year-text">{state.pickedDate.year}</div>
                </div>
            </div>
        )
    }

    renderCalendarContent() {
        let { props, state } = this;
        let month: Option | typeof undefined = state.months.find(x => x.value === state.displayedMonth.month);
        let displayedMonthText = "";
        if(month)
            displayedMonthText = month.abbr? `${month.abbr} ${state.displayedMonth.year}` : "";
        const isPickedDate = (day: number) => (
            state.pickedDate.year === state.displayedMonth.year &&
            state.pickedDate.month === state.displayedMonth.month &&
            state.pickedDate.day === day
        );
        let canGoPreviousMonth = !(props.dateAfter && state.displayedMonth.year === props.dateAfter.year() && state.displayedMonth.month === props.dateAfter.month());
        let canGoNextMonth = !(props.dateBefore && state.displayedMonth.year === props.dateBefore.year() && state.displayedMonth.month === props.dateBefore.month());
        return(
            <div className="date-picker_calendar_content">
                <div className="month-controls">
                    {canGoPreviousMonth &&
                        <a className="month-pre" onClick={this.clickPrevMonth}>{'<'}</a>                    
                    }
                    {canGoNextMonth &&
                        <a className="month-next" onClick={this.clickNextMonth}>{'>'}</a>
                    }
                    <div className="displayed-month-text">
                        <span>{displayedMonthText}</span>
                    </div>
                </div>
                <table className="days-month">
                    <thead>
                        <tr className="weekdays">
                            {state.weekdays.map(x =>
                                <th key={x.value}>{x.abbr}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {state.days.map((week, i) => 
                            <tr key={i} className="days-week">
                                {week.map((day, j) =>
                                    <td key={j}>
                                        {day.number > 0 && day.isEnabled && (
                                                isPickedDate(day.number)?
                                                    <a className="selected-day">
                                                        {day.number}
                                                    </a>
                                                :
                                                    <a className="default-day" onClick={e => this.selectDay(e, day.number)}>
                                                        {day.number}
                                                    </a> 
                                        )}
                                        {day.number > 0 && !day.isEnabled &&
                                            <a className="disabled-day">
                                                {day.number}
                                            </a>  
                                        }
                                        {!day.number && " "}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    renderCalendarFooter() {
        return (
            <div className="date-picker_calendar_footer">
                {this.props.value &&
                    <button onClick={this.clearDate}>Clear</button>                
                }
                <button onClick={this.confirmDate}>OK</button>
            </div>
        )
    }

    render() {
        let { props, state } = this;
        const selectClass = state.elementStatus === ElementStatusEnums.default ? 
            "date-picker_select" : 
            `date-picker_select date-picker_select--${state.elementStatus}`;
        return (
            <div className="date-picker">
                <div className={selectClass} tabIndex="0"
                    onClick={this.openCalendar} 
                    onBlur={this.closeCalendar}>
                    <label className="date-picker_select_value">{props.value}</label>
                    <Visible className="date-picker_select_calendar" sizes={[1, 1, 1, 1]}>
                        {this.renderCalendarContent()}  
                        {this.renderCalendarFooter()}
                    </Visible>     
                </div>
                <label className="date-picker_placeholder">{props.placeHolder}</label>
                <label className="date-picker_desc">{props.description}</label>
                <p className="date-picker_error">{props.error}</p>     
            </div>
        );
    }
}

export { DatePicker };