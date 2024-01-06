import React from 'react';

type RoundButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const RoundButton = ({ icon, onClick }: RoundButtonProps) => (
  <button
    type='button'
    style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} // Custom shadow
    className='focus-visible:outline-6 bg-brand-accent1 hover:bg-brand-accent3d rounded-full p-1 text-white shadow-lg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    onClick={onClick}
  >
    {icon}
  </button>
);

export default RoundButton;
