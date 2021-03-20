import React from 'react';

const Button = React.forwardRef(({children, className, link, ...rest}, ref) => {
    const classNames = `cursor-pointer shadow rounded-lg whitespace-nowrap bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-600 dark:hover:bg-gray-100 flex items-center justify-center px-4 py-2 transition transform active:scale-95 focus:outline-none disabled:opacity-50 ${className || ''}`;
    return link ? (<a {...rest} ref={ref} className={classNames}>{children}</a>) : (<button {...rest} className={classNames}>{children}</button>)
})

export default Button;