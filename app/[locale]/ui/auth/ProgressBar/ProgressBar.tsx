const ProgressBar = ({
  totalSteps,
  currentStep,
  labels = []
}: {
  totalSteps: number;
  currentStep: number;
  labels?: string[];
}) => {
  return (
    <div style={{ marginTop: 14 }}>
      <div className='flex w-full justify-between' style={{ marginBottom: 4 }}>
        {labels.map((label, index) => (
          <div key={index} className='flex-1 text-center text-xs font-bold'>
            {label}
          </div>
        ))}
      </div>
      <div className='flex w-full'>
        {[...Array(totalSteps)].map((_, index) => (
          <div
            key={index}
            className={`mx-1 h-1.5 rounded ${index < currentStep ? 'bg-primary' : 'bg-gray-300'}`}
            style={{ flex: 1 }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
