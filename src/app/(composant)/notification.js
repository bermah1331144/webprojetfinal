import React, { useEffect } from 'react';
import '../(style)/notification.scss';

export default function({message, visible, duration, onClose}) {
    useEffect(() => {
        if (visible) {
          const timer = setTimeout(onClose, duration);
          return () => clearTimeout(timer); // Cleanup au démontage
        }
      }, [visible, duration, onClose]);
    
      if (!visible) return null;
    
      return (
        <div className="notification-wrapper">
          <div className="notification">
            {message}
          </div>
        </div>
      );
}
  