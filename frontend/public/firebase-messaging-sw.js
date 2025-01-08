importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHepRH9G0og4dr_s3B22a4t9_q9OlYDhc",
    authDomain: "youbase-app.firebaseapp.com",
    projectId: "youbase-app",
    storageBucket: "youbase-app.firebasestorage.app",
    messagingSenderId: "144969388080",
    appId: "1:144969388080:web:631be48e7204fa5f9e1df5",
    measurementId: "G-6W4JBX6SZ3"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
