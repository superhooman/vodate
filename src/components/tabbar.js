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
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/></svg>,
        href: '/app'
    }
]}) => (
    <div className="fixed bottom-0 left-0 w-full p-8 flex justify-around">
        {items.map((link) => (
            <NavLink href={link.href} classNameActive="text-blue-500" className="p-4">
                {link.icon}
            </NavLink>
        ))}
    </div>
)

export default TabBar;