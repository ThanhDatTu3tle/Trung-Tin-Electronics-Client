import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './DetailProduct.module.scss';
import Button from '../../components/Button';
import Image from '../../components/Image';
import ProductService from '../../service/ProductService';
import CartButton from '../../components/CartButton';
import ProductComponent from '../../components/ProductCom/ProductComponent';
import { useCart } from '../../Context/CartContext';

const faStarIcon = faStar as IconProp;

const cx = classNames.bind(styles);

let screenWidth = window.innerWidth;
function updateScreenSize() {
  screenWidth = window.innerWidth;
}
updateScreenSize();
window.addEventListener("resize", updateScreenSize);

const DetailProduct: React.FC = () => {
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const { addToCart } = useCart();

  const [seenProducts, setSeenProducts] = useState<
    {
      id: string;
      name: string;
      description: string;
      specification: { id: number; specification: string }[];
      imageProducts: { id: number; image: string }[];
      price: number;
      brand: string;
      event: null;
      status: boolean;
      category: string;
      idBrand: number;
      idCategory: number;
      idEvent: number;
    }[]
  >([]);  
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const seenProductsLocal = JSON.parse(localStorage.getItem('seen') || '[]');


  const [count, setCount] = useState(1);
  const handleMinus = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
  };
  const handleAdd = () => {
    setCount(count + 1);
  };

  let product: { id: string; name: string; description: string; specification: { id: number; specification: string; }[]; imageProducts: { id: number; image: string; }[]; price: number; brand: string; event: null; status: boolean; category: string; idBrand: number; idCategory: number; idEvent: number; } | undefined;

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product ? product.imageProducts[0]?.image : undefined
  );
  const [products, setProducts] = useState<
    {
      id: string;
      name: string;
      description: string;
      specification: { id: number; specification: string }[];
      imageProducts: { id: number; image: string }[];
      price: number;
      brand: string;
      event: null;
      status: boolean;
      category: string;
      idBrand: number;
      idCategory: number;
      idEvent: number;
    }[]
  >([]);
  
  const fetchAPIProducts = async () => {
    try {
      const res = await ProductService.GetAllProduct();
      return res.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const { data: productsData, refetch: refetchProducts } = useQuery(
    ['productImages'],
    fetchAPIProducts,
    {}
  );
  
  useEffect(() => {
    refetchProducts();
  }, [refetchProducts]);
  
  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  const chosenProduct = products.find((product) => product.id === id);
  const filteredProducts = products.filter((product) => product.category === chosenProduct?.category);
  const relatedProducts = filteredProducts.filter((item) => item.id !== id)

  useEffect(() => {
    const fetchProductDetails = async (productId: string) => {
      try {
        const res = await ProductService.GetProduct(productId);
        return res.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };
  
    const fetchAllProductDetails = async () => {
      const productDetails = await Promise.all(
        seenProductsLocal.map(async (productId: string) => {
          const productDetail = await fetchProductDetails(productId);
          if (productDetail) {
            return {
              ...productDetail,
            };
          }
          return null;
        })
      );
  
      setSeenProducts(productDetails.filter((seenProduct) => seenProduct !== null));
      setIsLoadingProducts(false);
    };
  
    if (isLoadingProducts) {
      fetchAllProductDetails();
    }
  }, [isLoadingProducts, seenProductsLocal]);
  
  if (products.length > 0) {
    product = products.find((product) => product.id === id);
  }

  if (!product) {
    return <div>Sản phẩm không tồn tại</div>;
  }

  const handleThumbnailClick = (image: string | undefined) => {
    if (image) {
      setSelectedImage(image);
    }
  };

  const addToCartAndShowAlert = (productId: string, quantity: number) => {
    const existingCart: { [productId: string]: number } = JSON.parse(
      localStorage.getItem('cart') || '{}'
    );
  
    if (!existingCart[productId]) {
      existingCart[productId] = quantity;
      localStorage.setItem('cart', JSON.stringify(existingCart));
  
      addToCart(productId, count);
  
      MySwal.fire({
        title: 'Đã thêm vào giỏ hàng!',
        icon: 'success',
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
    } else {
      existingCart[productId] += quantity;
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      addToCart(productId, count);

      MySwal.fire({
        title: 'Đã thêm vào giỏ hàng!',
        icon: 'success',
        didOpen: () => {
          MySwal.showLoading();
        },
        timer: 1500,
      });
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title-detail')}>
        <ul className={cx('list-title')}>
          <li>
            Trang chủ
            &nbsp;&nbsp;»&nbsp;&nbsp;
          </li>
          <li>
            {product.category}
            &nbsp;&nbsp;»&nbsp;&nbsp;
          </li>
          <li>
            {product.name} {product.id}
          </li>
        </ul>
      </div>

      <div className={cx('product-info')}>
        <div className={cx('product-images')}>
          <br />
          <div className={cx('main-image')}>
            {selectedImage != null ? (
              <>
                <Image src={selectedImage} />
              </>
            ) : (
              <>
                <Image src={product.imageProducts[0]?.image} />
              </>
            )}            
          </div>
          <div className={cx('thumbnail-images')}>
            {product.imageProducts.map((imageData: { image: string | undefined; }, index: number) => (
              <img
                  key={String(index)} 
                  src={imageData.image}
                  alt={`Thumbnail ${index + 1}`}
                  className={cx('thumbnail', { 'active': selectedImage === imageData.image })}
                  onClick={() => handleThumbnailClick(imageData.image)}
              />
            ))}
          </div>
        </div>
        <div className={cx('main-info')}>
          <br />
          <p className={cx('name')}>
            {product.name} {product.id}
          </p>
          <p className={cx('text')}>
            Giá: {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
          </p>
          <div className={cx('stars')}>
            <FontAwesomeIcon icon={faStarIcon} style={{ color: '#fec806' }} />
            <FontAwesomeIcon icon={faStarIcon} style={{ color: '#fec806' }} />
            <FontAwesomeIcon icon={faStarIcon} style={{ color: '#fec806' }} />
            <FontAwesomeIcon icon={faStarIcon} style={{ color: '#fec806' }} />
            <FontAwesomeIcon icon={faStarIcon} style={{ color: '#fec806' }} />
          </div>
          <p className={cx('text')}>Mã sản phẩm: {product.id}</p>
          {product.status === true ? (
            <>
              <p className={cx('text')}>Tình trạng: Còn hàng</p>
            </>
          ) : (
            <>
              <p className={cx('text')}>Tình trạng: Hết hàng</p>
            </>
          )}
          <p className={cx('description')}>{product.description}</p>
          <div className={cx('quantity')}>
            Số lượng:
            <div className={cx('count')}>
              <Button primary small onClick={handleMinus}>
                -
              </Button>
              <Button outline large>
                {count}
              </Button>
              <Button primary small onClick={handleAdd}>
                +
              </Button>
            </div>
          </div>
          <br />
          <Button primary onClick={() => addToCartAndShowAlert(product!.id, count)}>
            Mua sản phẩm
          </Button>
        </div>
      </div>
      <br />
      <h3>Chi tiết sản phẩm</h3>
      <p className={cx('main-description')}>{product.description}</p>
      <br />
      <h3>Thông số kĩ thuật</h3>
      {product.specification.map((item) => (
        <p key={item.id} className={cx('main-description')}>
          {item.specification}
        </p>
      ))}
      <div className={cx('seen-related')}>
          {screenWidth >= 400 ? (
              <>
                  <h3>SẢN PHẨM ĐÃ XEM</h3>
              </>
          ): (
              <>
                  <h5>SẢN PHẨM ĐÃ XEM</h5>
              </>
          )}
          <br />
          {screenWidth <= 899 && screenWidth >= 600 ? (
              <>
                  <div className={cx('product')}>
                      {seenProducts.map((data) => (
                          <ProductComponent key={data.id} data={data} />
                      ))}
                  </div>
              </>
              ) : (
              <>
                  <div className={cx('product')}>
                      {seenProducts.map((data) => (
                          <ProductComponent key={data.id} data={data} />
                      ))}
                  </div>
              </>
              )
          }
      </div>
      <div className={cx('seen-related')}>
          {screenWidth >= 400 ? (
              <>
                  <h3>SẢN PHẨM LIÊN QUAN</h3>
              </>
          ): (
              <>
                  <h5>SẢN PHẨM LIÊN QUAN</h5>
              </>
          )}
          <br />
          {screenWidth <= 899 && screenWidth >= 600 ? (
              <>
                  <div className={cx('product')}>
                      {relatedProducts.map((data) => (
                          <ProductComponent key={data.id} data={data} />
                      ))}
                  </div>
              </>
              ) : (
              <>
                  <div className={cx('product')}>
                      {relatedProducts.map((data) => (
                          <ProductComponent key={data.id} data={data} />
                      ))}
                  </div>
              </>
              )
          }
      </div>
      <CartButton />
    </div>
  );
};

export default DetailProduct;
