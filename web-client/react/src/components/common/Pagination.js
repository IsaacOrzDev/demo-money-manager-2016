// @flow
import React from 'react';

type Props = {
    totalRecords: number,
    pagesPerSet: number,
    recordsPerPage: number,
    selectPageEvent: (page: number) => any
};

type State = {
    pages: Array<number>,
    totalPages: number,
    currentPage: number,
    hasPrePages: boolean,
    hasNextPages: boolean
};

class Pagination extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            pages: [],
            totalPages: 0,
            currentPage: 0,
            hasPrePages: false,
            hasNextPages: false
        };
        const component: any = this;
        component.initialize = this.initialize.bind(this);
        component.selectPrePages = this.selectPrePages.bind(this);
        component.selectNextPages = this.selectNextPages.bind(this);
        component.selectPage = this.selectPage.bind(this);
    }

    initialize() {
        let totalPages = Math.ceil(this.props.totalRecords / this.props.recordsPerPage);
        let pages = [];
        let hasEnoughPages = totalPages / this.props.pagesPerSet > 1;
        if(hasEnoughPages) {
            for(let i = 1; i <= this.props.pagesPerSet; i++)
                pages.push(i);
        } else {
            for(let j = 1; j <= totalPages; j++)
                pages.push(j);
        }
        this.setState({
            totalPages,
            pages,
            currentPage: pages[0],
            hasPrePages: false,
            hasNextPages: hasEnoughPages
        });
    }

    selectPrePages() {
        let pages = [];
        let currentFirstPage = this.state.pages[0];
        for(let i = 1; i <= this.props.pagesPerSet; i++)
            pages.unshift(currentFirstPage - i);
        this.setState({
            pages,
            hasPrePages: currentFirstPage - this.props.pagesPerSet > 1,
            hasNextPages: true
        });
        this.selectPage(pages[0]);
    }

    selectNextPages() {
        let pages = [];
        let currentLastPage = this.state.pages[this.state.pages.length - 1];
        if(currentLastPage + this.props.pagesPerSet <= this.state.totalPages) {
            for(let i = 1; i <= this.props.pagesPerSet; i++)
                pages.push(currentLastPage + i);
        } else {
            for(let j = 1; j + currentLastPage <= this.state.totalPages; j++)
                pages.push(currentLastPage + j);
        }
        this.setState({
            pages,
            hasPrePages: pages[0] !== 1,
            hasNextPages: currentLastPage + this.props.pagesPerSet + 1 <= this.state.totalPages
        });
        this.selectPage(pages[0]);
    }

    selectPage(page: number) {
        this.setState({
            currentPage: page
        });
        this.props.selectPageEvent(page);
    }

    componentWillMount() {
        this.initialize();
    }

    componentDidMount() {
        this.props.selectPageEvent(this.state.currentPage);
    }

    render() {
        return (
            <div className="pagination">
                {this.state.hasPrePages &&
                    <span onClick={this.selectPrePages}>{'<'}</span>
                }
                {this.state.pages.map(x => this.state.currentPage === x?
                    <span key={x} data-active="true">{x}</span>
                :
                    <span key={x} onClick={e => this.selectPage(x)}>{x}</span>
                )}
                {this.state.hasNextPages &&
                    <span onClick={this.selectNextPages}>{'>'}</span>
                }
            </div>
        );
    }
}

export { Pagination };