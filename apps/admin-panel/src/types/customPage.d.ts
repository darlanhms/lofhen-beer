import React from 'react';
import { NextPage } from 'next';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomPage<P = {}> = NextPage<P> & {
  layout?: React.FunctionComponent<Required<React.PropsWithChildren>>;
};
