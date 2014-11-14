# LinkedIn Connection Expander

![People You May Know](https://raw.githubusercontent.com/dunckr/pymk/master/assets/pymk.png)

Unlike other social networks, connecting with others on LinkedIn is a positive gain.
Most users will connect with you just by simply viewing their profile.
This is a growth hack to expand your network by utilising this tendancy.

LinkedIn suggests people that you might know (PYMK).
This script automates viewing these users’ profiles.

Users are stored into [MongoDB](http://www.mongodb.org/) and it is driven by a headless browser, [PhantomJS](http://phantomjs.org/).

## Installation

+ ```npm install```

## Usage

+ Ensure ```mongod``` database is running
+ Start the script e.g. ```node example/index.js```

```
var Pymk = require('../index');

var options = {
    email: 'example@mail.com',
    password: 'topSecret',
    maxTimesToVisit: 3,
    timeBetweenVists: 60 * 60 * 24 * 10,
    numberOfPages: 4
};

var pymk = new Pymk(options);
pymk.run();
```

+ Combine with [node-cron](https://github.com/ncb000gt/node-cron) to have this run on a scheduled basis

## License

MIT © [Duncan Beaton](http://dunckr.com)
