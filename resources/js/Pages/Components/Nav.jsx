import { useEffect, useState } from "react";

const Nav = ({ user }) => {

    // const [links, setLinks] = useState(['pricing', 'availability', 'contact us']);

    // useEffect(() => {
    //     if (user) {
    //         setLinks(['promo', 'packet', 'site', 'logout']);
    //     }
    // }, [user])
    let links
    if (user) {
        // setLinks(['promo', 'packet', 'site', 'logout']);
        links = ['promo', 'packet', 'site', 'logout'];
        console.log('FROM NAV !!! LOGGED');
    } else {
        // setLinks(['pricing', 'availability', 'contact us']);
        links = ['pricing', 'availability', 'contact us'];
        console.log('FROM NAV !!! NOT LOGGED');
        
    }

    return ( 
        <div className="navigation sticky top-0 bg-bg border-2 border-b-acce z-50">
            <div className="slogan bg-">
                <ul className='flex justify-around text-sm pt-2'>
                    <li className='text-ablue'>#maximum<span className='text-ared'>speed</span></li>
                    <li className='text-ablue'>#maximum<span className='text-ared'>care</span></li>
                    <li className='text-ablue'>#maximum<span className='text-ared'>value</span></li>
                </ul>
            </div>
            <div id="navtop" className='flex justify-between w-4/5 m-auto items-center py-7 text-txt'>
                <img src="/images/logo.png" className='h-10' />
                <ul className='navigation justify-around w-1/3 sm:hidden md:flex'>
                {links.map((link) => (
                    <li key={links.indexOf(link)} className='text-txt'><a href={link}>{link}</a></li>
                ))}
                </ul>
            </div>
        </div>
     );
}
 
export default Nav;