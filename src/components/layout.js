import { useRouter } from 'next/router';
import axios from "axios";
import { useContext, useEffect } from "react";
import Link from 'next/link';
import TabBar from './tabbar';
import GlobalContext from '../utils/globalContext';

const NavLink = ({
  href, children, className, classNameActive, ...rest
}) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${className} ${router.asPath === href ? classNameActive : ''}`}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};

const TabItem = (link) => (
  <NavLink href={link.href} classNameActive="text-blue-500" className={`p-2 flex flex-col items-center justify-center flex-1 transform active:scale-95 ${link.className}`}>
    {link.icon}
    <span className="text-xs font-bold mt-1 uppercase">{link.label}</span>
  </NavLink>
)

const profile = {
  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg>,
  href: '/app/profile',
  label: 'Анкета',
  className: 'transition'
}

const matches = {
  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  href: '/app/matches',
  label: 'Пары',
  className: 'transition'
}

const Layout = ({ className = "", children }) => {
  const router = useRouter();
  const global = useContext(GlobalContext)
    useEffect(() => {
        axios({
            url: '/user/check'
        }).catch(() => {
            router.push('/')
        })
    }, [])
  return(
  <div className={`min-h-screen p-6 relative ${global.isX ? 'pb-32' : 'pb-28'} ${className}`}>
    {children}
    <TabBar>
      <TabItem {...profile} />
      <div className="relative flex-1 flex justify-center">
        <NavLink href="/app" className="absolute transform active:scale-95 transition -mt-4 w-24 h-24 rounded-full shadow-lg text-current bg-white dark:bg-black border-transparent dark:border-gray-700 border flex items-center justify-center fill-none" classNameActive="bg-blue-500 dark:bg-blue-500 text-white dark:border-transparent shadow first:fill-current">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" stroke="currentColor" fill="inherit" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </NavLink>
      </div>
      <TabItem {...matches} />
    </TabBar>
  </div>
)}

export default Layout;