const ProgressBar = ({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) => {
  return (
    <div className='flex w-full justify-between pb-1' style={{ marginTop: 14 }}>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`mx-1 h-2 flex-1 rounded ${
            index < currentStep ? 'bg-primary' : 'bg-gray-300'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
