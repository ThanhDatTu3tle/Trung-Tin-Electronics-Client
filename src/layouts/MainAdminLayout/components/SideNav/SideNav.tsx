import config from "../../../../config";
import { useState } from 'react';
import classNames from "classnames/bind";

import styles from './SideNav.module.scss';
import Titles, { TitleItem } from '../SideNav/Menu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChartLine, 
    faCodeBranch, 
    faKaaba, 
    faListUl, 
    faCaretRight, 
    faSortDown, 
    faListCheck, 
    faFilter,
    faFileInvoiceDollar,
    faUser 
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

const SideNav: React.FC = () => {
    const [status, setStatus] = useState(false);
    const currentURL = window.location.href; 
    const pathArray = currentURL.split('/'); 
    const lastPathSegment = pathArray[pathArray.length - 1];
    const handleStatus = () => {
        setStatus(!status);
    }

    return (
        <div className={cx('wrapper')}>
            <Titles>
                <TitleItem title='Bảng thống kê' to={config.routes.admin} icon={faChartLine}  />
                {status !== true && lastPathSegment !== 'management' && lastPathSegment !== 'product' ? (
                    <div className={cx('father')} onClick={handleStatus}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon 
                                icon={faKaaba}
                                style={{marginRight: '0.5rem'}} 
                            />
                            Sản phẩm
                        </div>
                        <div className={cx('arrow')}>
                            <FontAwesomeIcon 
                                icon={faCaretRight}
                                style={{marginRight: '0.5rem'}} 
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={cx('father-active')} onClick={handleStatus}>
                            <div className={cx('title')}>
                                <FontAwesomeIcon 
                                    icon={faKaaba}
                                    style={{marginRight: '0.5rem'}} 
                                />
                                Sản phẩm
                            </div>
                            <div className={cx('arrow')}>
                                <FontAwesomeIcon 
                                    icon={faSortDown}
                                    style={{marginRight: '0.5rem'}} 
                                />
                            </div>
                        </div>
                        <div className={cx('children')}>
                            <TitleItem title='Quản lý sản phẩm' to={config.routes.productManagement} icon={faListCheck} />
                            <TitleItem title='Bộ lọc sản phẩm' to={config.routes.product} icon={faFilter} />
                        </div>       
                    </>
                )}
                <TitleItem title='Danh mục sản phẩm' to={config.routes.category} icon={faListUl}  />
                <TitleItem title='Hãng sản xuất' to={config.routes.brand} icon={faCodeBranch}  />
                <TitleItem title='Đơn hàng' to={config.routes.invoice} icon={faFileInvoiceDollar}  />
                <TitleItem title='Khách hàng' to={config.routes.user} icon={faUser}  />
            </Titles>
        </div>
    )
}

export default SideNav;
