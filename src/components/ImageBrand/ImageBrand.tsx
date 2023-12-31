import { useState, forwardRef } from "react";
// import { Link } from "react-router-dom";
import styles from './ImageBrand.module.scss';
import classNames from 'classnames';

// fallback: customFallback = images.icon_profile,
const ImageBrand: React.FC<any> = forwardRef(({ 
    onClick, 
    children, 
    src, 
    fallback: customFallback = '', 
    alt, 
    href, 
    className, 
    to, 
    ...props 
}, ref) => {

  const [fallback, setFallback] = useState('')

  const handleError = () => {
    setFallback(customFallback)
  }

  const editImage = () => {
    // console.log('Ngu')
  }

  return (
    <img 
      className={classNames(styles.wrapper, className)} 
      ref={ref} 
      src={fallback || src} 
      alt={alt} 
      href={href}
      to={to}
      {...props} 
      onClick={editImage}
      onError={handleError} 
    >
    </img>
  )
})

export default ImageBrand;
