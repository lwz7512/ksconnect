/**
 * wechat plugin wrapper @2016/09/26
 */
interface Wechat {

  isInstalled(success: GenericHandler, error: GenericHandler);

  auth(scope: string, state: string, success: GenericHandler, error: GenericHandler);

  share(params: MessageParams, success: GenericHandler, error: GenericHandler);


}

interface AuthResponse {
  code?: string;
}

interface GenericHandler {
  (response: AuthResponse): void;
}

interface MessageParams {
  scene: number;
  message: any;
}


declare var Wechat: Wechat;
