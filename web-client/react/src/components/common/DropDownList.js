// @flow
import React from 'react';
import { ElementStatusEnums } from '../../enums';
import { isFocusInCurrentTarget } from '../../componentFunctions';
import { IonIcon } from '../common';
import { defaultOption } from '../../defaultObjects';
import type { Option } from '../../flowTypes';

type DropDownListProps = {
    description: string,
    placeHolder: string,
    optionList: Array<Option>,
    selected: string,
    editable: boolean,
    error?: string,
    selectEvent: (value: string) => any
};

type DropDownListState = {
    elementStatus: $Keys<typeof ElementStatusEnums>,
};

type MultiDropDownListProps = {
    description: string,
    placeHolder: string,
    optionList: Array<Option>,
    selected: Array<string>,
    editable: boolean,
    error?: string,
    confirmEvent: (values: Array<string>) => any
};

type MultiDropDownListState = {
    elementStatus: $Keys<typeof ElementStatusEnums>,
    selected: Array<string>
};

class DropDownList extends React.Component<DropDownListProps, DropDownListState> {

    constructor(props: DropDownListProps) {
        super(props);
        let initialelementStatus = ElementStatusEnums.default;
        if(!this.props.editable)
            initialelementStatus = ElementStatusEnums.disabled;
        else if(this.props.editable && this.props.selected !== "")
            initialelementStatus = ElementStatusEnums.valid;
        this.state = {
            elementStatus: initialelementStatus
        };
        const component: any = this;
        component.openDropDownList = this.openDropDownList.bind(this);
        component.closeDropDownList = this.closeDropDownList.bind(this);
        component.selectItem = this.selectItem.bind(this);
    }

    openDropDownList(e: any) {
        e.stopPropagation();
        if(this.state.elementStatus !== ElementStatusEnums.disabled) {
            this.setState({
                elementStatus: ElementStatusEnums.focus
            });
        }
    }

    closeDropDownList(e: any) {
        if(!isFocusInCurrentTarget(e)) {
            if(this.props.selected !== "") {
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

    selectItem(e: any, option: Option) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            elementStatus: option.value ? ElementStatusEnums.valid : ElementStatusEnums.default
        });
        this.props.selectEvent(option.value.toString());
    }

    componentWillReceiveProps(nextProps: DropDownListProps) {
        if(this.props.selected !== nextProps.selected && this.props.editable) {
            if(nextProps.selected !== "") {
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
    
    render() {

        let {
            description,
            placeHolder,
            optionList,
            selected,
            editable,
            error
        } = this.props;

        let {
            elementStatus
        } = this.state;
        
        const selectClass = elementStatus === ElementStatusEnums.default ? "drop-down-list_select" : `drop-down-list_select drop-down-list_select--${elementStatus}`;
        const option = optionList.find(x => x.value === selected);
        const selectedOption: Option = option? option : defaultOption;

        return (
            <div className="drop-down-list">
                {editable? 
                    <div className={selectClass} tabIndex="0" 
                        onClick={this.openDropDownList} onFocus={this.openDropDownList} onBlur={this.closeDropDownList}>
                        <label className="drop-down-list_select_value">{selectedOption.text}</label>
                        <ul className="drop-down-list_select_options">
                            <li>
                                <a onClick={e => this.selectItem(e, defaultOption)}>&nbsp;</a>
                            </li>
                            {optionList.map(x => 
                                <li key={x.value}>
                                    <a onClick={e => this.selectItem(e, x)}>{x.text}</a>
                                </li>
                            )}
                        </ul>                        
                    </div>
                :
                    <div className={selectClass}>
                        <label className="drop-down-list_select_value">{selectedOption.text}</label>
                    </div>
                }                
                <label className="drop-down-list_placeholder">{placeHolder}</label>
                <label className="drop-down-list_desc">{description}</label>
                <p className="drop-down-list_error">{error}</p>        
            </div>            
        )
    }
}

class MultiDropDownList extends React.Component<MultiDropDownListProps, MultiDropDownListState> {

    constructor(props: MultiDropDownListProps) {
        super(props);
        let initialelementStatus = ElementStatusEnums.default;
        if(!this.props.editable)
            initialelementStatus = ElementStatusEnums.disabled;
        else if(this.props.editable && this.props.selected.length > 0)
            initialelementStatus = ElementStatusEnums.valid;
        this.state = {
            elementStatus: initialelementStatus,
            selected: this.props.selected
        };
        const component: any = this;
        component.openDropDownList = this.openDropDownList.bind(this);
        component.closeDropDownList = this.closeDropDownList.bind(this);
        component.selectItem = this.selectItem.bind(this);
        component.confirmSelect = this.confirmSelect.bind(this);
        component.isSelected = this.isSelected.bind(this);
    }

    openDropDownList(e: any) {
        e.stopPropagation();
        if(this.state.elementStatus !== ElementStatusEnums.disabled) {
            this.setState({
                elementStatus: ElementStatusEnums.focus,
                selected: this.props.selected
            });
        }
    }

    closeDropDownList(e: any) {
        if(!isFocusInCurrentTarget(e)) {
            if(this.props.selected.length > 0) {
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

    selectItem(e: any, option: Option) {
        e.preventDefault();
        e.stopPropagation();
        if(this.state.selected.find(x => x === option.value)) {
            this.setState({
                selected: this.state.selected.filter(x => x !== option.value)
            })
        } else {
            this.setState({
                selected: [...this.state.selected, option.value.toString()].sort()
            });
        }
    }

    confirmSelect(e: any) {
        e.preventDefault();
        e.stopPropagation();
        this.props.confirmEvent(this.state.selected);
        this.setState({
            elementStatus: this.state.selected.length > 0? ElementStatusEnums.valid : ElementStatusEnums.default,
        });
    }

    isSelected(value: string) {
        return this.state.selected.find(x => x === value);
    }

    componentWillReceiveProps(nextProps: MultiDropDownListProps) {
        if(nextProps.selected.length === 0 && this.props.selected.length > 0) {
            this.setState({
                elementStatus: ElementStatusEnums.default
            });
        } else if(nextProps.selected.length > 0 && this.props.selected.length === 0) {
            this.setState({
                elementStatus: ElementStatusEnums.valid
            });
        }
    }
    
    render() {

        let {
            description,
            placeHolder,
            optionList,
            selected,
            editable,
            error
        } = this.props;

        let {
            elementStatus
        } = this.state;
    
        const selectClass = elementStatus === ElementStatusEnums.default ? "drop-down-list_select" : `drop-down-list_select drop-down-list_select--${elementStatus}`;

        return (
            <div className="drop-down-list">
                {editable? 
                    <div className={selectClass} tabIndex="0" 
                        onClick={this.openDropDownList} onFocus={this.openDropDownList} onBlur={this.closeDropDownList}>
                        <label className="drop-down-list_select_value">{selected.length > 0 && `${selected.length} selected`}</label>
                        <ul className="drop-down-list_select_options"> 
                            {optionList.map(x => 
                                <li key={x.value}>
                                    <a onClick={e => this.selectItem(e, x)}>
                                        {x.text}
                                        &nbsp;
                                        {this.isSelected(x.value.toString()) &&
                                            <span><IonIcon code="checkmark-round" /></span>
                                        }
                                    </a>
                                </li>
                            )}
                            <li className="drop-down-list_select_confirm"><a onClick={this.confirmSelect}>Confirm</a></li>
                        </ul>                        
                    </div>
                :
                    <div className={selectClass}>
                        <label className="drop-down-list_select_value">{selected.length > 0 && `${selected.length} selected`}</label>
                    </div>
                }                
                <label className="drop-down-list_placeholder">{placeHolder}</label>
                <label className="drop-down-list_desc">{description}</label>
                <p className="drop-down-list_error">{error}</p>        
            </div>            
        )
    }
}

export { DropDownList, MultiDropDownList };