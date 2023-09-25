import classNames from "classnames/bind";

import styles from './Titles.module.scss';

const cx = classNames.bind(styles)

const Titles: React.FC<any> = ({ children, title }) => {
    return (
        <div className={cx('wrapper')}> 
            {title}{children}
        </div>
    )
}

export default Titles;
