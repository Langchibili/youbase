'use client'

// firebase.js
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
import { firebaseConfig } from './secrets'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// typeof window !== "undefined"? because of nextjs behavior of running in server first for static page generation, where firebase's navigator checks is not available but in browser 
export const app = typeof window !== "undefined"? initializeApp(firebaseConfig) : {}
export const messaging = typeof window !== "undefined"? getMessaging(app) : {}
export const getNotificationToken = typeof window !== "undefined"? getToken : {}

//export { app, messaging, getToken }