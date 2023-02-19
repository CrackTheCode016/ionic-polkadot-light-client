# Ionic Polkadot Light Client

A dead simple example of using `polkadot.js` to run a [light client](https://docs.substrate.io/fundamentals/light-clients-in-substrate-connect/) on a mobile device using Ionic.

The ideal setup for this should be for it to run as a background process in conjunction to some other service, i.e a wallet, to ensure integrity of a chosen network.

### Features / Goals

 - Operates as a light client for the chosen network
 - Shows latest synced block header data for a chosen network
 - Multi-network selection
 - Syncing continues whether application is open or not, allowing you to be always up to date! (needs testing)



## Development

Make sure you have `ionic` installed:

```sh
npm install -g @ionic/cli
```

To run a development server, run in this cloned repo: 

```sh
ionic serve
```


## Building Binaries

To build for web, run the following:

```sh
# install dependencies
npm install
npm run build
```

You can then use the `www/` directory to deploy wherever.

### iOS and Android

For Android, ensure you have Android Studio installed on your system:

```sh
# install dependencies
npm install
ionic capacitor build android
```

For iOS, make sure you have Xcode and CocoaPods installed on your system:

```sh
# if you don't have CocoaPods:
sudo gem install cocoapods
# install dependencies
npm install
ionic capacitor build ios