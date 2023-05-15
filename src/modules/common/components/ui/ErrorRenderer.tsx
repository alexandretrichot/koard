import React from 'react';

export type ErrorRendererProps = {
  error?: unknown;
};

export const ErrorRenderer: React.FC<ErrorRendererProps> = ({ error }) => {
  // TODO: Implement error renderer
  /* if (error instanceof K8sError)
    return (
      <div className='border shadow-red-400 p-4'>
        <div className='text-center font-bold text-xl'>Error</div>
        <div className='text-center mt-4 text-red-500'>{error.status.reason}</div>
      </div>
    ); */

  return null;
};
