var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGR4wK7mLyqJwJzUCqm1bXMUNRu9YfwFpLCiKKEjjHJehbCs7xBr9BplARTzbQCIOvYrFOlF5g3V3EPQQyu5vu4",
   "privateKey": "rmlUhJc6U4M-Oh3ZaLzzKTxQla69CsnYQI51mvh7eEg"
};
 
 
webPush.setVapidDetails(
   'mailto:khoerulabu@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/e-XUmJ1e2sg:APA91bGCQcdZha4O2XOh9VekbSErYvcL_sKMgssAmJz6ku_fgmxyLF0mFd_YY4y2xn3wuUDKP0D1SffGGwyYZsx5y-jGXpyrxkIME7I7WHLoVuuLBXrpyW4mzpkmsVCHzjuMvEVtAbbT",
   "keys": {
       "p256dh": "BKMnG9vyG9gAN7Wxo60Yrh5relgcVclJNHGD7nq1GRnCfpAJtxRj5L1j+waKvJMI/rU5zfVqNYCukpQxzknLEM4=",
       "auth": "J5C3fSBOT4iT7qWFA3SOVg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '328566933988',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);