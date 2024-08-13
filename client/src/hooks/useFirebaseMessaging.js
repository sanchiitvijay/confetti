// useFirebaseMessaging.js
import { useEffect } from 'react';
import { getMessaging, onMessage } from "firebase/messaging";

const useFirebaseMessaging = () => {
    useEffect(() => {
        const messaging = getMessaging();

        // Handle foreground messages
        onMessage(messaging, (payload) => {
            console.log("[firebase-messaging-sw.js] Received foreground message ", payload);
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: payload.notification.image,
                data: {
                    url: payload.data.url,
                }
            };

      
            const notification = new Notification(notificationTitle, notificationOptions);

    
            notification.onclick = (event) => {
                event.preventDefault(); 
                const url = payload.data.url || '/'; 
                window.open(url, '_blank'); 
            }; 
        });
    }, []);
}

export default useFirebaseMessaging;
