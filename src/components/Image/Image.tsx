import { useState, forwardRef } from "react";
// import { Link } from "react-router-dom";
import styles from './Image.module.scss';
import classNames from 'classnames';

// fallback: customFallback = images.icon_profile,
const Image: React.FC<any> = forwardRef(({ 
    onClick, 
    children, 
    src, 
    fallback: customFallback = '', 
    alt, 
    href, 
    className, 
    to, 
    // loading,
    ...props 
}, ref) => {

  const [fallback, setFallback] = useState('')

  const handleError = () => {
    setFallback(customFallback)
  }

  const editImage = () => {
    // console.log('')
  }

  return (
    <img 
      className={classNames(styles.wrapper, className)} 
      ref={ref} 
      src={fallback || src} 
      alt={alt} 
      href={href}
      to={to}
      // loading={loading}
      {...props} 
      onClick={editImage}
      onError={handleError} 
    >
    </img>
  )
})

export default Image;
