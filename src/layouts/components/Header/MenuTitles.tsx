import config from "../../../config";
import classNames from "classnames/bind";

import styles from './MenuTitles.module.scss';
import Titles, { TitleItem } from './Menu';

const cx = classNames.bind(styles)

const MenuTitles: React.FC = () => {
    return (
        <div className={cx('wrapper')}>
            <Titles>
                <TitleItem title='Giới thiệu' to={config.routes.introduce} icon={null}  />
                <TitleItem title='Khuyến mãi' to={config.routes.discount} icon={null}  />
                <TitleItem title='Tin tức' to={config.routes.news} icon={null}  />
                <TitleItem title='Liên hệ' to={config.routes.contact} icon={null}  />
                <TitleItem title='Hướng dẫn thanh toán' to={config.routes.paymentGuide} icon={null}  />
            </Titles>
        </div>
    )
}

export default MenuTitles;
