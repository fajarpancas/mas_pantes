import { Platform } from 'react-native';
import { Method } from 'react-native-awesome-component';
import messaging from '@react-native-firebase/messaging';
import NavigationServices from '../Services/NavigationServices';

class FCMService {
    constructor() {
        this.register = this.register.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.getToken = this.getToken.bind(this);
        this.requestPermission = this.requestPermission.bind(this);
        this.deleteToken = this.deleteToken.bind(this);
    }

    register(onRegister, onNotification, onOpenNotification, onGetLocation, onGetInfoKurir) {
        this.checkPermission(onRegister);
        this.createNotificationListeners(
            onRegister,
            onNotification,
            onOpenNotification,
            onGetLocation,
            onGetInfoKurir
        );
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };

    checkPermission(onRegister) {
        messaging()
            .hasPermission()
            .then(enabled => {
                if (enabled) {
                    //user has permissions
                    this.getToken(onRegister);
                } else {
                    //User doesn't have permission
                    this.requestPermission(onRegister);
                }
            })
            .catch(error => {
                console.tron.log('Permission Rejected', error);
            });
    }

    getToken(onRegister) {
        messaging()
            .getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken);
                } else {
                    console.tron.log("User doesn't have device token");
                }
            })
            .catch(error => {
                console.tron.log('getToken rejected', error);
            });
    }

    requestPermission(onRegister) {
        messaging()
            .requestPermission()
            .then(() => {
                this.getToken(onRegister);
            })
            .catch(error => {
                console.tron.log('Request Permission rejected', error);
            });
    }

    deleteToken() {
        messaging()
            .deleteToken()
            .catch(error => {
                console.tron.log('Delete token error', error);
            });
    }

    createNotificationListeners(onRegister, onNotification, onOpenNotification, onGetLocation, onGetInfoKurir) {
        // When the app is running, but in the background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                '[FCM Serivce] onNotificationOpenedApp Notification caused app to open from background state: ',
                remoteMessage,
            );
            if (remoteMessage) {
                const notification = remoteMessage.notification;
                // console.log("Notification opened by device user", notification.getData());  
                onGetInfoKurir(remoteMessage, true)
                onOpenNotification(notification);
            }
            onGetInfoKurir(remoteMessage, false)
            onGetLocation(remoteMessage)
        });

        // When the app is opened from  a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log(
                    '[FCM Serivce] getInitialNotification Notification caused app to open from quit state: ',
                    remoteMessage,
                );
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    onOpenNotification(notification);
                    onGetInfoKurir(remoteMessage, true)
                }
                onGetInfoKurir(remoteMessage, false)
                onGetLocation(remoteMessage)
            });

        // messaging().setBackgroundMessageHandler(function (payload) {
        //     console.log('Received background message: ', payload);
        //     // onGetLocation(payload)
        //     // return self.registration.showNotification('Title', { 'body': 'Body' });
        // });

        //Foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log('[FCMService] A new FCM message arrived!', remoteMessage);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.date.notification;
                } else {
                    notification = remoteMessage.notification;
                }
                onGetInfoKurir(remoteMessage, false)
                onNotification(notification);
            }
            onGetInfoKurir(remoteMessage, false)
            onGetLocation(remoteMessage)
        });

        //Triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.tron.log('New token refresh: ', fcmToken);
            onRegister(fcmToken);
        });
    }

    unRegister = () => {
        if (this.messageListener) {
            this.messageListener();
        }
    };
}

export const fcmService = new FCMService();