// @flow
import React from 'react';
import { IconButton, LineBreak, Visible, AppTitle } from '../common';

type Props = {
    title: string,
    currency: string,
    goBackEvent?: () => any
};

type State = {
    isHeaderTop: boolean
};

class Header extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isHeaderTop: false,
        };
    }

    componentDidMount() {
        window.onscroll = () => {
            if(window.scrollY !== 0 && !this.state.isHeaderTop) {
                this.setState({
                    isHeaderTop: true
                });
            } else if(window.scrollY === 0 && this.state.isHeaderTop) {
                this.setState({
                    isHeaderTop: false
                });          
            }
        }
    }

    componentWillUnmount() {
        window.onscroll = () => {}
    }

    render() {
        let { props, state } = this;
        return (
            <header className={state.isHeaderTop? "header header--top": "header"}>
                <Visible sizes={[0, 1, 1, 1]}>
                    <AppTitle isVisible={true} currency={props.currency} />                    
                </Visible>
                <div className="header_content">
                    <div className="header_back-button">
                        <IconButton icon="arrow-left-c" clickEvent={props.goBackEvent} />
                    </div>
                    <div className="header_title">
                        <h2>{props.title}</h2>
                    </div>
                </div>
                <div className="header_placeholder"></div>
                <LineBreak size="s" />
            </header>
        );
    }
}

export { Header };