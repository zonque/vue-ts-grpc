// package: webtest
// file: webtest.proto

import * as webtest_pb from "./webtest_pb";
import {grpc} from "@improbable-eng/grpc-web";

type WebtestReadData = {
  readonly methodName: string;
  readonly service: typeof Webtest;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof webtest_pb.Empty;
  readonly responseType: typeof webtest_pb.StreamData;
};

export class Webtest {
  static readonly serviceName: string;
  static readonly ReadData: WebtestReadData;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: () => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: () => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class WebtestClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  readData(requestMessage: webtest_pb.Empty, metadata?: grpc.Metadata): ResponseStream<webtest_pb.StreamData>;
}

