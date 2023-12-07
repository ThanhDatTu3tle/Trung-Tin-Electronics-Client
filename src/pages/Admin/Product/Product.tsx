import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Product.module.scss";
import Button from "../../../components/Button";
import ProductAdminComponent from "../../../components/ProductAdminCom/ProductAdminComponent";

import { useBrand } from "../../../Context/BrandContext";
import { useCategory } from "../../../Context/CategoryContext";
import { useProduct } from "../../../Context/ProductContext";
import Clock from "../../../components/Clock";

const faHouseIcon = faHouse as IconProp;
const faArrowRightIcon = faArrowRight as IconProp;

const cx = classNames.bind(styles);

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Product: React.FC<any> = () => {
  const categories = useCategory();
  const filteredProductsResult = useProduct();
  const brands = useBrand();

  const [selectedBrandButton, setSelectedBrandButton] = useState<number | null>(
    null
  );

  const [brand0, setBrand0] = useState(true);
  const [, setFilteredBrands] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);
  const [, setBrandChanged] = useState(false);
  const handleClickBrand0 = () => {
    setBrand0(!brand0);
    setBrandChanged(false);
  };

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    { id: number; name: string; status: boolean }[]
  >([]);
  const [category0, setCategory0] = useState(true);
  const [, setCategoryChanged] = useState(false);
  const handleClickCategory0 = () => {
    setCategory0(!category0);
    setCategoryChanged(false);
  };

  const handleClickBrandAll = (brandId: number) => {
    setSelectedBrandButton(brandId === selectedBrandButton ? null : brandId);
    let updatedFilteredBrand: React.SetStateAction<
      { id: number; name: string; status: boolean }[]
    > = [];
    if (brandId !== selectedBrandButton) {
      updatedFilteredBrand = brands.filter((brand) => brand.id === brandId);
    }
    setFilteredBrands(updatedFilteredBrand);
    setCategory0(false);
  };

  const handleCategoryToggle = (categoryName: any) => {
    if (selectedCategoryIds.includes(categoryName)) {
      setSelectedCategoryIds(
        selectedCategoryIds.filter((name) => name !== categoryName)
      );
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryName]);
      setCategory0(!true);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("left")}>
          <p style={{ width: "fit-content", fontWeight: 700 }}>
            BỘ LỌC SẢN PHẨM
          </p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon
              icon={faHouseIcon}
              style={{ paddingRight: "1rem" }}
            />
            <FontAwesomeIcon
              icon={faArrowRightIcon}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Sản phẩm</p>
            <FontAwesomeIcon
              icon={faArrowRightIcon}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Bộ lọc sản phẩm</p>
          </div>
        </div>
      </div>
      <div className={cx("main-container")}>
        <div className={cx("products")}>
          {category0 === true ? (
            <>
              {categories.map((dataa) => (
                <div className={cx("machine")} key={dataa.id}>
                  <div className={cx("title-wrapper")}>
                    <div className={cx("title")}>{dataa.name}</div>
                  </div>
                  <div className={cx("product")}>
                    {filteredProductsResult
                      .filter((data) => data.category.name === dataa.name)
                      .map((data) => (
                        <ProductAdminComponent key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {selectedCategoryIds.map((dataa) => (
                <div className={cx("machine")} key={dataa.id}>
                  <div className={cx("title-wrapper")}>
                    <div className={cx("title")}>{dataa.name}</div>
                  </div>
                  <div className={cx("product")}>
                    {filteredProductsResult
                      .filter((data) => data.category.name === dataa.name)
                      .map((data) => (
                        <ProductAdminComponent key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={cx("filter")}>
          <h3>Bộ lọc</h3>
          <h4>Lọc theo danh mục</h4>
          {category0 === true ? (
            <Button primary onClick={handleClickCategory0}>
              Tất cả sản phẩm
            </Button>
          ) : (
            <Button outline onClick={handleClickCategory0}>
              Tất cả sản phẩm
            </Button>
          )}
          {categories.map((category) => (
            <>
              {selectedCategoryIds.includes(category) === true ? (
                <Button
                  primary
                  onClick={() => handleCategoryToggle(category!.name)}
                  key={category.id}
                >
                  {category.name}
                </Button>
              ) : (
                <Button
                  outline
                  onClick={() => handleCategoryToggle(category!.name)}
                  key={category.id}
                >
                  {category.name}
                </Button>
              )}
            </>
          ))}
          <h4>Lọc theo hãng</h4>
          <>
            <Button primary onClick={handleClickBrand0}>
              Tất cả các hãng
            </Button>
          </>
          {brands.map((brand) => (
            <>
              {selectedBrandButton === brand.id ? (
                <Button
                  primary
                  onClick={() => handleClickBrandAll(brand!.id)}
                  key={brand.id}
                >
                  {brand.name}
                </Button>
              ) : (
                <Button
                  outline
                  onClick={() => handleClickBrandAll(brand!.id)}
                  key={brand.id}
                >
                  {brand.name}
                </Button>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
