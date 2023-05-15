import React from 'react';

export type WrapperProps = {
  children?: React.ReactNode;
};

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className='m-4 md:m-8 lg:m-12'>{children}</div>;
};
