    const Eureka = require('eureka-js-client').Eureka;

    const client = new Eureka({
      instance: {
        app: 'my-node-app',
        hostName: 'localhost', // Or the actual hostname/IP
        ipAddr: '127.0.0.1',  // Or the actual IP address
        port: {
          '$': 3000, // The port your Node.js service is running on
          '@enabled': 'true',
        },
        vipAddress: 'my-node-app', // Virtual IP address
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },
      eureka: {
        host: 'localhost', // Eureka server host
        port: 8761,        // Eureka server port
        servicePath: '/eureka/apps/',
      },
    });

    client.logger.level('debug'); // Optional: for debugging
    // client.start(function(error) {
    //   console.log(error || 'Eureka registration complete');
    // });


    module.exports = client;
