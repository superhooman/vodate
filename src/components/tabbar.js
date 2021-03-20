import { useRouter } from 'next/router';
import Link from 'next/link';

const NavLink = ({
  href, children, className, classNameActive, ...rest
}) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        
        className={`${className} ${router.asPath === href ? classNameActive : ''}`}
      >
        {children}
      </a>
    </Link>
  );
};

const TabBar = ({items = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>,
        href: '/app'
    }
]}) => (
    <div style={{
      paddingBottom: 'constant(safe-area-inset-bottom)'
    }} className="fixed bottom-0 left-0 w-full px-8 py-2 flex justify-around border-t border-gray-500 dark:border-gray-700">
        {items.map((link) => (
            <NavLink href={link.href} classNameActive="text-blue-500" className="p-2">
                {link.icon}
            </NavLink>
        ))}
    </div>
)

export default TabBar;