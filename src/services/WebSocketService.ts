import ReconnectingWebSocket, {
  Event,
  CloseEvent,
} from 'reconnecting-websocket';
import { Dispatch } from 'redux';
import { serviceEvent } from './serviceEvent';
import {
  orderBookUpdate,
} from './orderBookUpdate';
import { OrderBookUpdate, ServiceEventModel } from '../model';
import { hideLoading, showLoading } from '../actions/actions';

type Precision = 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
const WEBSOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2';
const SYMBOL = 'tBTCUSD';
class WebSocketService {
  private socket!: ReconnectingWebSocket;
  private url: string;
  private precision: string;
  private static instance: WebSocketService;
  private dispatch: Dispatch;
  private viaDisconnect: boolean;
  constructor(url: string, dispatch: Dispatch) {
    this.url = url;
    this.dispatch = dispatch;
    this.precision = 'P0';
    this.viaDisconnect = false;
  }
  public static getInstance(dispatch: Dispatch): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService(WEBSOCKET_URL, dispatch);
    }

    return WebSocketService.instance;
  }
  private subscribeToOrderBook(precision: Precision) {
    const payload = {
      event: 'subscribe',
      channel: 'book',
      symbol: SYMBOL,
      prec: precision,
      len: '25',
    };
    this.socket.send(JSON.stringify(payload));
  }

  private unsubscribeFromOrderBook() {
    if (!this.socket) {
      return;
    }
    const payload = {
      event: 'unsubscribe',
      channel: 'book',
    };
    this.socket.send(JSON.stringify(payload));
  }
  public connect(precision: Precision = 'P0') {
    this.viaDisconnect = false;
    if (this.socket) {
      this.socket.close();
    }
    this.socket = new ReconnectingWebSocket(this.url);

    this.socket.onopen = this.handleOpen;
    this.socket.onclose = this.handleClose;
    this.socket.onerror = this.handleError;
    this.socket.onmessage = this.handleMessage;
    this.subscribeToOrderBook(precision);
  }

  public disconnect() {
    if (this.socket?.OPEN) {
      this.viaDisconnect = true;
      this.socket.close();
    }
  }

  handleOpen = (event: Event) => {
    this.dispatch(hideLoading());
    console.log('WebSocket open', event);
  };

  handleClose = (event: CloseEvent) => {
    if(!this.viaDisconnect){
      this.dispatch(showLoading());
    }
    console.log('WebSocket close', event);
  };

  handleError = (event: Event) => {
    console.error('WebSocket error', event);
  };

  handleMessage = (event: MessageEvent) => {
    const data: ServiceEventModel | OrderBookUpdate = JSON.parse(event.data);

    if (!Array.isArray(data)) {
      serviceEvent(data, this.socket);
    } else {
      orderBookUpdate(data, this.dispatch);
    }
  };

  increasePrecision() {
    let newPrecision: string;
    switch (this.precision) {
      case 'P4':
        newPrecision = 'P3';
        break;
      case 'P3':
        newPrecision = 'P2';
        break;
      case 'P2':
        newPrecision = 'P1';
        break;
      case 'P1':
        newPrecision = 'P0';
        break;
      default:
        return;
    }

    this.unsubscribeFromOrderBook();
    this.precision = newPrecision;
    this.connect(newPrecision as Precision);
  }

  decreasePrecision() {
    let newPrecision: string;
    switch (this.precision) {
      case 'P0':
        newPrecision = 'P1';
        break;
      case 'P1':
        newPrecision = 'P2';
        break;
      case 'P2':
        newPrecision = 'P3';
        break;
      case 'P3':
        newPrecision = 'P4';
        break;
      default:
        return;
    }

    this.unsubscribeFromOrderBook();
    this.precision = newPrecision;
    this.connect(newPrecision as Precision);
  }

  public send(message: string): void {
    this.socket.send(message);
  }
}

export default WebSocketService;
