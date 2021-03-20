import React from 'react';

const Button = React.forwardRef(({children, className, link, color = 'bg-gray-900', colorDark = 'bg-white', text = 'text-white', textDark = 'text-black', ...rest}, ref) => {
    const classNames = `cursor-pointer shadow rounded-lg whitespace-nowrap ${color} dark:${colorDark} ${text} dark:${textDark} hover:opacity-70 flex items-center justify-center px-6 py-4 transition transform active:scale-95 focus:outline-none disabled:opacity-50 ${className || ''}`;
    return link ? (<a {...rest} ref={ref} className={classNames}>{children}</a>) : (<button {...rest} className={classNames}>{children}</button>)
})

export default Button;