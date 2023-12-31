import React from 'react';

type RoundButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

const RoundButton = ({ icon, onClick }: RoundButtonProps) => (
  <button
    type="button"
    style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} // Custom shadow
    className="focus-visible:outline-6 rounded-full bg-brand-accent1 p-1 text-white shadow-lg hover:bg-brand-accent3d focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={onClick}
  >
    {icon}
  </button>
);

export default RoundButton;
