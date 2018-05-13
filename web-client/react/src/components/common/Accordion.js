// @flow
import React from 'react';
import { IonIcon } from '../common';

type AccordionProps = {
    titles: Array<{
        text?: string,
        icon?: string
    }>,
    children: any
};

type AccordiionState = {
    isExpanded: Array<boolean>
};

type AccordionExpandPartProps = {
    isExpandable: boolean,
    children: any
};

class Accordion extends React.Component<AccordionProps, AccordiionState> {
    constructor(props: AccordionProps) {
        super(props);
        this.state = {
            isExpanded: React.Children.map(this.props.children, child => { return false })
        };

        let component: any = this;
        component.toggleAccordion = this.toggleAccordion.bind(this);
    }

    toggleAccordion(index: number, isExpandable: boolean) {
        if(isExpandable) {
            let { isExpanded } = this.state;
            isExpanded[index] = !isExpanded[index];
            this.setState({
                isExpanded
            });
        }
    }

    render() {
        let  { props, state } = this;
        return (
            <div className="accordion">
                {React.Children.map(props.children, (child, index) => 
                    <div className={state.isExpanded[index] && child.props.isExpandable ? "accordion_row accordion_row--active" : "accordion_row"}>
                        <div className={child.props.isExpandable? "accordion_collapse-part accordion_collapse-part--active" : "accordion_collapse-part"} 
                            onClick={e => this.toggleAccordion(index, child.props.isExpandable)}>
                            <span className="accordion_collapse-part_title">
                                {props.titles[index].icon &&
                                    <IonIcon code={props.titles[index].icon} />
                                }
                                &nbsp;
                                {props.titles[index].text &&
                                    props.titles[index].text
                                }
                            </span>
                            {child.props.isExpandable &&
                                <span className="accordion_collapse-part_icon">
                                    <IonIcon code={state.isExpanded[index]? "arrow-up-b" : "arrow-down-b"} />
                                </span>                              
                            }
                        </div>
                        {child}                         
                    </div>
                )}
            </div>
        )
    }
}

const AccordionExpandPart = ({isExpandable, children}: AccordionExpandPartProps) => (
    <div className="accordion_expand-part">
        {children}
    </div>
)


export { Accordion, AccordionExpandPart }