# Linkedin PYMK Connector

![pymk](https://raw.githubusercontent.com/dunckr/pymk/master/assets/pymk.png)

Unlike other social networks, connecting with others on Linkedin is a positive gain.
Most users will connect with you just by simply viewing there profile.
This is a growth hack to expand your network by utilising this tendancy.

LinkedIn suggests people that you might know.
This script automates viewing these users’ profiles on scheduled batches and time frames.

Users are stored into [MongoDB](http://www.mongodb.org/) and it is driven by a headless browser, [PhantomJS](http://phantomjs.org/).

## Installation

+ ```npm install```

## Usage

+ Ensure ```mongod``` database is running
+ Start the script e.g. ```node test/index.js```

```
var options = {
    email: 'yo@myemail.com',
    password: 'supersecret',
    maxTimesVisit: 3, // Maximum number of times to visit someone’s profile
    timeBetweenVists: 60 * 60 * 24 * 10 // Duration between next viewing someone’s profile
};

pymk(options);
```

## License

MIT © [Duncan Beaton](http://dunckr.com)
