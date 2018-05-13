// @flow
import React from 'react';
import { IonIcon, DropDownButton } from '../common';

type Props = {
    redirectToNewIncome: () => any,
    redirectToNewExpense: () => any,
    redirectToSearchPage: () => any,
};

type State = {
    isOpen: boolean
};

class FloatingButton extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            isOpen: false
        };
        let component: any = this;
        component.toggleMenu = this.toggleMenu.bind(this);
        component.closeMenu = this.closeMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    closeMenu() {
        this.setState({
            isOpen: false
        });
    }
    
    render() {
        let { props, state } = this;
        let className = state.isOpen? "floating-button floating-button--active" : "floating-button";
        return (
            <div className={className}>
                <div className={state.isOpen? "floating-button_menu floating-button_menu--active" : "floating-button_menu"}
                    tabIndex="-1" onClick={this.closeMenu}>
                    <DropDownButton
                        in={state.isOpen}
                        cssClass="menu-item--1"
                        text="Search"
                        icon="search"
                        clickEvent={props.redirectToSearchPage} />
                    <DropDownButton
                        in={state.isOpen}
                        cssClass="menu-item--2"
                        text="New Income Entry"
                        icon="plus-circled"
                        clickEvent={props.redirectToNewIncome} />
                    <DropDownButton
                        in={state.isOpen}
                        cssClass="menu-item--3"
                        text="New Expense Entry"
                        icon="minus-circled"
                        clickEvent={props.redirectToNewExpense} />
                </div>
                <div className="floating-button_toggle" onClick={this.toggleMenu}>
                    <div className="floating-button_toggle_icons">
                        <p className="default-icon">
                            <IonIcon code="chevron-up" />
                        </p>
                        <p className="active-icon">
                            <IonIcon code="close" />
                        </p>                    
                    </div>
                </div>
            </div>
        );
    }
}

export { FloatingButton };