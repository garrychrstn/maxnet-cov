

const Nav = () => {
    return ( 
        <div className="navigation sticky top-0 bg-bg">
            <div className="slogan">
                <ul className='flex justify-around text-sm'>
                    <li className='text-ablue'>#maximum<span className='text-ared'>speed</span></li>
                    <li className='text-ablue'>#maximum<span className='text-ared'>care</span></li>
                    <li className='text-ablue'>#maximum<span className='text-ared'>value</span></li>
                </ul>
            </div>
            <div id="navtop" className='flex justify-between w-4/5 m-auto items-center py-7 text-white'>
                <img src="/images/logo.png" className='h-10' />
                <ul className='navigation flex justify-around w-1/3'>
                    <li>pricing</li>
                    <li>availability</li>
                    <li>services</li>
                    <li>contact</li>
                </ul>
            </div>
        </div>
     );
}
 
export default Nav;