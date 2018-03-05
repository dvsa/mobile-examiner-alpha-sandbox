# Notification Suppression Demo App 

---

It's a demo app that presents all features that team found out during tech investigation until 2.03.2018.

It's contains following plugins
1. **asam-plugin** that provide API to turn on/off Autonomous Single App Mode (*Prerequisite the **io.ionic.notification.suppression.demo** app id must be added to **Single App Lock** config profile in MDM*)
2. **cordova-plugin-screen-orientation** thanks to this plugin we are able to lock screen in portrait mode
3. **cordova-plugin-insomnia** this plugin keeps screen light up
4. **phonegap-plugin-mobile-accessibility** provides API to check if Guided Access (ASAM) is turn on
5. **cordova-open-native-settings** with this plugin we have possibility to open settings