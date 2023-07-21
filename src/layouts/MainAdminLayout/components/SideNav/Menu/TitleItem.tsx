import { NavLink } from 'react-router-dom';
import classNames from "classnames/bind";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Titles.module.scss';

const cx = classNames.bind(styles)

const TitleItem: React.FC<any> = ({ title, to, icon }) => {
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            {
                <FontAwesomeIcon 
                    icon={icon}
                    style={{marginRight: '0.5rem'}} 
                />
            }
            {title}
        </NavLink>
    )
}

export default TitleItem;
