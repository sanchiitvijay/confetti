import React from 'react'
import ChangeDp from './Settings/ChangeDp'
import EditProfile from "../Feed/Settings/EditProfile"
import ChangePassword from "../Feed/Settings/ChangePassword"
import DeleteAccount from "../Feed/Settings/DeleteAccount"
const Settings = () => {
  return (
    <div className='dark:text-white  flex flex-col items-center gap-4 '>   
        <ChangeDp/>
        <EditProfile/>
        <ChangePassword/>
        <DeleteAccount/>
        <div className='invisible'>dasflkasd;lfk;lasdkf</div>
    </div>
  )
}

export default Settings