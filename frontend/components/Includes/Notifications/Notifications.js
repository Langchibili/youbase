'use client'

import { useEffect } from 'react'
import { getNotificationToken, messaging } from '@/Firebase'
import { FireBaseVapidKey } from '@/secrets'
import { updateUserAccount } from '@/Functions'

export default function Notifications({loggedInUser}) {
  useEffect(() => {
    if(typeof window !== "undefined"){
        const getDeviceToken = async () => {
            try {
              // Check if the browser supports notifications
              if (!('Notification' in window)) {
                console.error('This browser does not support notifications.')
                return
              }
      
              // Request notification permission
              const permission = await Notification.requestPermission()
              if (permission === 'granted') {
                const currentToken = await getNotificationToken(messaging, {
                  vapidKey: FireBaseVapidKey, // Get this from Firebase Console
                })
                if (currentToken) {
                  updateUserAccount({notificationsDeviceId:currentToken},loggedInUser.user.id)    
                  console.log('Device Token:', currentToken)
                  // Send this token to your backend (Strapi server)
                } else {
                  console.error('No registration token available.')
                }
              } else {
                console.error('Notification permission denied.')
              }
            } catch (error) {
              console.error('An error occurred while retrieving token:', error)
            }
          }
      
          getDeviceToken()
    }
  }, [])

  return <div></div>
}
