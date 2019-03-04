// package: webtest
// file: webtest.proto

var webtest_pb = require("./webtest_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Webtest = (function () {
  function Webtest() {}
  Webtest.serviceName = "webtest.Webtest";
  return Webtest;
}());

Webtest.ReadData = {
  methodName: "ReadData",
  service: Webtest,
  requestStream: false,
  responseStream: true,
  requestType: webtest_pb.Empty,
  responseType: webtest_pb.StreamData
};

exports.Webtest = Webtest;

function WebtestClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WebtestClient.prototype.readData = function readData(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Webtest.ReadData, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.end.forEach(function (handler) {
        handler();
      });
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.WebtestClient = WebtestClient;

