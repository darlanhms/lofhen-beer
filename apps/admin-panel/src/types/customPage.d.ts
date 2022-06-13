import { NextPage } from 'next';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomPage<P = {}> = NextPage<P> & {
  layout?: React.FunctionComponent<Required<React.PropsWithChildren>>;
};
