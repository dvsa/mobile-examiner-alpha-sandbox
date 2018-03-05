cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "asam-plugin.plugin",
    "file": "plugins/asam-plugin/www/plugin.js",
    "pluginId": "asam-plugin",
    "clobbers": [
      "ASAM"
    ],
    "runs": true
  },
  {
    "id": "cordova-open-native-settings.Settings",
    "file": "plugins/cordova-open-native-settings/www/settings.js",
    "pluginId": "cordova-open-native-settings",
    "clobbers": [
      "cordova.plugins.settings"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-insomnia.Insomnia",
    "file": "plugins/cordova-plugin-insomnia/www/Insomnia.js",
    "pluginId": "cordova-plugin-insomnia",
    "clobbers": [
      "window.plugins.insomnia"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/ios/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "cordova-plugin-ionic-webview.ios-wkwebview-exec",
    "file": "plugins/cordova-plugin-ionic-webview/src/www/ios/ios-wkwebview-exec.js",
    "pluginId": "cordova-plugin-ionic-webview",
    "clobbers": [
      "cordova.exec"
    ]
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  },
  {
    "id": "cordova-plugin-screen-orientation.screenorientation",
    "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
    "pluginId": "cordova-plugin-screen-orientation",
    "clobbers": [
      "cordova.plugins.screenorientation"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "phonegap-plugin-mobile-accessibility.mobile-accessibility",
    "file": "plugins/phonegap-plugin-mobile-accessibility/www/mobile-accessibility.js",
    "pluginId": "phonegap-plugin-mobile-accessibility",
    "clobbers": [
      "window.MobileAccessibility"
    ]
  },
  {
    "id": "phonegap-plugin-mobile-accessibility.MobileAccessibilityNotifications",
    "file": "plugins/phonegap-plugin-mobile-accessibility/www/MobileAccessibilityNotifications.js",
    "pluginId": "phonegap-plugin-mobile-accessibility",
    "clobbers": [
      "MobileAccessibilityNotifications"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "asam-plugin": "1.0.0",
  "cordova-open-native-settings": "1.4.1",
  "cordova-plugin-device": "2.0.2-dev",
  "cordova-plugin-insomnia": "4.3.0",
  "cordova-plugin-ionic-keyboard": "2.0.5",
  "cordova-plugin-ionic-webview": "1.1.16",
  "cordova-plugin-network-information": "2.0.2-dev",
  "cordova-plugin-screen-orientation": "3.0.1",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-whitelist": "1.3.3",
  "phonegap-plugin-mobile-accessibility": "1.0.5-dev"
};
// BOTTOM OF METADATA
});