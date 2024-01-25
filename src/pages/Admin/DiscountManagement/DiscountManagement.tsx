import * as React from "react";
import { useState } from "react";
import classNames from "classnames/bind";

import styles from "./DiscountManagement.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useBrand } from "../../../Context/BrandContext";
import { useCategory } from "../../../Context/CategoryContext";
import { useProduct } from "../../../Context/ProductContext";

import ProductDiscountComponent from "../../../components/ProductDiscountComponent";
import Clock from "../../../components/Clock";
import Button from "../../../components/Button";

const cx = classNames.bind(styles);

const DiscountManagement: React.FC<any> = () => {

  const brands = useBrand();
  const categories = useCategory();
  const filteredProductsResult = useProduct();

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

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
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

  const handleCategoryToggle = (categoryName: string) => {
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
            QUẢN LÝ KHUYẾN MÃI SẢN PHẨM
          </p>
        </div>
        <div className={cx("right")}>
          <div className={cx("current-position")}>
            <Clock />
            <FontAwesomeIcon icon={faHouse} style={{ paddingRight: "1rem" }} />
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: "1rem", height: "1rem", paddingRight: "1rem" }}
            />
            <p>Quản lý khuyến mãi sản phẩm</p>
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
                      .filter(
                        (data) =>
                          data.category.name === dataa.name &&
                          data.status === true
                      )
                      .map((data) => (
                        <ProductDiscountComponent key={data.id} data={data} />
                      ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {selectedCategoryIds.map((dataa) => (
                <div className={cx("machine")} key={dataa}>
                  <div className={cx("title-wrapper")}>
                    <div className={cx("title")}>{dataa}</div>
                  </div>
                  <div className={cx("product")}>
                    {filteredProductsResult
                      .filter(
                        (data) =>
                          data.category.name === dataa && data.status === true
                      )
                      .map((data) => (
                        <ProductDiscountComponent key={data.id} data={data} />
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
              {selectedCategoryIds.includes(category.name) === true ? (
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

export default DiscountManagement;
