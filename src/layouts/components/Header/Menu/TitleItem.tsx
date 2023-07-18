import { NavLink } from 'react-router-dom';
import classNames from "classnames/bind";

import styles from './Titles.module.scss';

const cx = classNames.bind(styles)

const TitleItem: React.FC<any> = ({ title, to, icon }) => {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            {/* {icon} */}
            <div className={cx('hover-top')}></div>
                {title}
            <div className={cx('hover-bottom')}></div>
        </NavLink>
    )
}

export default TitleItem;
