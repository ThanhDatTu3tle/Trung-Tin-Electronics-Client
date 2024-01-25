import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles)

const Button: React.FC<any> = ({
    to,
    href,
    primary = false,
    outline = false,
    superTiny = false,
    tiny = false, 
    small = false, 
    large = false, 
    disable = false,
    children, 
    onClick, 
    ...passProps
}) => {

    let Comp: string = 'button'
    const props = {
      onClick,
      ...passProps,
    }

    // remove even listener when button is disabled
    if (disable) {
        Object.keys(props).forEach(key => {
          if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key]
          }
        })
      }
    
      // 
      if (to) {
        props.to = to
        // Comp = Link
      } else if (href) {
        props.href = href
        Comp = 'a'
      }
    
      const classes = cx('wrapper', {
        primary,
        outline,
        superTiny,
        tiny,
        small,
        large,
        disable
      })

    return (
        <Comp className={classes} {...props}>
            <span>{children}</span> 
        </Comp>
    )
}

export default Button;
