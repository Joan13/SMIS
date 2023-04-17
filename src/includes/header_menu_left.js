import React from 'react'
import LateralMenus from './lateral_menus';
import WindowActions from './window_actions';

const HeaderMenuLeft=()=> {
  return (
    <div className='items-center w-full align-center m-0 textcenter pl-2 pr-2 rounded-xl'>
        <WindowActions />
        <LateralMenus />
    </div>
  )
}

export default HeaderMenuLeft;
