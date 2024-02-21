import React from 'react'
import LateralMenus from './lateral_menus';
import WindowActions from './window_actions';
import JSONData from './../../package.json';

const HeaderMenuLeft = () => {
  return (
    <div className='items-center w-full align-center m-0 textcenter pl-2 pr-2 rounded-lg'>
      {JSONData.platform === 'Desktop' ? <WindowActions /> : null}
      <LateralMenus />
    </div>
  )
}

export default HeaderMenuLeft;
