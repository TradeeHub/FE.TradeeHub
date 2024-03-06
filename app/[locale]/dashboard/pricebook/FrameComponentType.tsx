import { FunctionComponent } from 'react';

export type FrameComponentType = {
  depth7Frame0?: string;
  electrical?: string;
  electricalInstallationAnd?: string;
  carwashing?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  depth7Frame0,
  electrical,
  electricalInstallationAnd,
  carwashing,
}) => {
  return (
    <div className='text-sienna font-work-sans box-border flex min-w-[170px] max-w-[172px] flex-1 flex-col items-start justify-start py-0 pl-0 pr-1 text-left text-sm'>
      <div className='flex h-[205.6px] flex-col items-start justify-start gap-[12px_0px] self-stretch'>
        <button className='flex flex-1 cursor-pointer flex-col items-start justify-start self-stretch bg-[transparent] p-0 [border:none]'>
          <img
            className='relative max-h-full max-w-full flex-1 self-stretch overflow-hidden rounded-xl object-cover'
            alt=''
            src={depth7Frame0}
          />
        </button>
        <div className='flex flex-col items-start justify-start self-stretch px-0 pb-3 pt-0'>
          <div className='text-gray flex flex-col items-start justify-start self-stretch text-base'>
            <div className='relative self-stretch font-medium leading-[24px]'>
              {electrical}
            </div>
          </div>
          <div className='flex flex-col items-start justify-start self-stretch'>
            <div className='relative inline-block w-[168px] leading-[21px]'>
              {electricalInstallationAnd}
            </div>
          </div>
          <div className='flex flex-col items-start justify-start self-stretch'>
            <div className='relative self-stretch whitespace-nowrap leading-[21px]'>
              {carwashing}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
