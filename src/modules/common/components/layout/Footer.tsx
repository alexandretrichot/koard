import React from 'react';

export type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className='flex p-4 justify-between items-center z-10 bg-white'>
      <div className='text-sm text-black/80 hover:underline'>
        <a href='https://github.com/alexandretrichot/k8s-dashboard' target='_blank' rel='noreferrer'>
          k8s-dashboard
        </a>
      </div>
      <div className='text-sm text-black/80'>
        © Copyright{' '}
        <a className='hover:underline' href='https://github.com/alexandretrichot' target='_blank' rel='noreferrer'>
          Alexandre TRICHOT
        </a>
      </div>
    </footer>
  );
};
