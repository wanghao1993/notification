import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
@WebSocketGateway(3100, {
  cors: {
    origin: '*',
  },
})
export class WebsocketGatewayGateway {
  @WebSocketServer()
  server: any;
  handleMessage(client: any, payload: any): string {
    console.log('Received message:', payload);
    return 'Received your message';
  }
  handleConnection(client: any) {
    console.log('New WebSocket connection');
    // 在这里处理连接的逻辑
  }

  handleDisconnect(client: any) {
    console.log('WebSocket disconnected');
    // 在这里处理断开连接的逻辑
  }

  sendMessage(message: string) {
    this.server.clients.forEach((client) => {
      client.send(message);
    });
  }
}
