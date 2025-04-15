import { buildNotification } from "./notficationView.js";

export function notificationController(){
    const $notifications = document.querySelector('.notification-container');
    function removeNotification($notification){
        $notification.remove();
    }
    return {
        show(message,type){
            const $notificationNew = document.createElement('li');
            $notificationNew.classList.add('notification-item');
            $notificationNew.classList.add(type);
            $notificationNew.innerHTML = buildNotification(message,type)
            $notifications.appendChild($notificationNew);

            const $btnClose = $notificationNew.querySelector('.notification-close')
            $btnClose.addEventListener('click',()=>{
                removeNotification($notificationNew);
            });

            setTimeout(() => {
                removeNotification($notificationNew);
            }, 5000);
        }
    }
}