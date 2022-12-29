import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';

export enum requestMethod {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
}

export type requestConfig = {
  method: requestMethod;
  url: string;
};

export type headersConfig = {
  Authorization?: string;
  'Content-Type'?: string;
};

export const useHttp = () => {
  // use Callback makes this sendRequest function pointer unchanged throughout renders
  const sendRequest = useCallback(
    async (
      requestConfig: requestConfig,
      data: AxiosRequestConfig<any> | undefined,
      headersConfig: headersConfig | {}
    ) => {
      try {
        let res = await axios({
          method: requestConfig.method,
          url: requestConfig.url,
          data: data,
          headers: headersConfig,
        });

        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );
  return {
    sendRequest,
  };
};
