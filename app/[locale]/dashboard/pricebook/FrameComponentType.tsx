import { FunctionComponent } from "react";

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
    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-1 pl-0 box-border min-w-[170px] max-w-[172px] text-left text-sm text-sienna font-work-sans">
      <div className="self-stretch h-[205.6px] flex flex-col items-start justify-start gap-[12px_0px]">
        <button className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex-1 flex flex-col items-start justify-start">
          <img
            className="self-stretch flex-1 relative rounded-xl max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={depth7Frame0}
          />
        </button>
        <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-3">
          <div className="self-stretch flex flex-col items-start justify-start text-base text-gray">
            <div className="self-stretch relative leading-[24px] font-medium">
              {electrical}
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="w-[168px] relative leading-[21px] inline-block">
              {electricalInstallationAnd}
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start">
            <div className="self-stretch relative leading-[21px] whitespace-nowrap">
              {carwashing}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
