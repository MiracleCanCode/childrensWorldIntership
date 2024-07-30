import {styleClassMap} from './model/constansts';
import {ITitle} from './model/interfaces';

import './title.css';

export const Title = ({children, style}: ITitle) => {
    const classNames = ['title'];
    if (style && styleClassMap[style]) {
        classNames.push(styleClassMap[style]);
    }

    return <p className={classNames.join(' ')}>{children}</p>;
};
