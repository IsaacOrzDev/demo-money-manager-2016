//@flow
import React from 'react';

const SizeEnums = {
    s: 's',
    m: 'm',
    l: 'l'
};

type Props = {
    size: $Keys<typeof SizeEnums>
};

const LineBreak = ({size}: Props) => {
    let sizeClass = "";
    switch(size) {
        case SizeEnums.s:
            sizeClass = "line-break--small";
            break;
        case SizeEnums.m:
            sizeClass = "line-break--medium";
            break;
        case SizeEnums.l:
            sizeClass = "line-break--large";
            break;
        default:
            sizeClass = "line-break--small";
    }
    return (
        <div className={`line-break ${sizeClass}`} />
    );
};

export { LineBreak };