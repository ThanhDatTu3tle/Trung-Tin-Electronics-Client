import config from "../../../../config";
import classNames from "classnames/bind";

import styles from './SideNav.module.scss';
import Titles, { TitleItem } from '../SideNav/Menu';
import { faChartLine, faCodeBranch, faKaaba, faListUl } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

const SideNav: React.FC = () => {
    return (
        <div className={cx('wrapper')}>
            <Titles>
                <TitleItem title='Bảng thống kê' to={config.routes.admin} icon={faChartLine}  />
                <TitleItem title='Sản phẩm' to={config.routes.product} icon={faKaaba}  />
                <TitleItem title='Danh mục' to={config.routes.category} icon={faListUl}  />
                <TitleItem title='Hãng' to={config.routes.brand} icon={faCodeBranch}  />
            </Titles>
        </div>
    )
}

export default SideNav;
