import React from 'react';

const Notification = ({ notifData }) => {
  if (notifData.message === null) {
    return null
  }

  return (
    <div className={notifData.type}>
      {notifData.message}
    </div>
  )
}

export default Notification;