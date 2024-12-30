'use client';

import { createConnectTransport } from '@connectrpc/connect-web';
import { TransportProvider } from '@connectrpc/connect-query';
import { FC, PropsWithChildren } from 'react';

const finalTransport = createConnectTransport({
  baseUrl: process.env.NEXT_PUBLIC_CONNECT_TRANSPORT_BASE_URL!,
});

export const FrontendChallengeTransportProvider: FC<PropsWithChildren> = ({ children }) => {
  return <TransportProvider transport={finalTransport}>{children}</TransportProvider>;
};
