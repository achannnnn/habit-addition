import svgPaths from "./svg-p7m7nil8jg";

function Footer() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 overflow-clip w-[375px]" data-name=" Footer">
      <div className="-translate-x-1/2 absolute bg-[#ccc] bottom-[8px] h-[5px] left-[calc(50%-0.25px)] rounded-[2.5px] w-[138.5px]" data-name="Home Bar" />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute bottom-0 contents left-0">
      <Footer />
    </div>
  );
}

function Battery() {
  return (
    <div className="absolute h-[13.5px] left-[310.5px] top-[22.2px] w-[27.164px]" data-name="Battery">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.1641 13.5">
        <g id="Battery">
          <path d={svgPaths.pb23db00} fill="var(--fill-0, white)" id="Battery_2" opacity="0.5" />
          <path d={svgPaths.paf2cf00} fill="var(--fill-0, white)" id="Fill" />
        </g>
      </svg>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute contents left-[36px] top-[19.1px]" data-name="Status Bar">
      <Battery />
      <div className="absolute h-[12px] right-[71.95px] top-[22.9px] w-[16.8px]" data-name="Wifi">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.7998 12">
          <path d={svgPaths.p3dc9d200} fill="var(--fill-0, white)" id="Wifi" />
        </svg>
      </div>
      <div className="absolute h-[12.078px] right-[96px] top-[23px] w-[19.249px]" data-name="Cellular">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.249 12.0781">
          <path d={svgPaths.p12c62400} fill="var(--fill-0, white)" id="Cellular" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['SF_Pro_Text:Semibold',sans-serif] justify-center leading-[0] left-[51.5px] not-italic text-[17px] text-center text-white top-[29.1px] tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[20px]">7:11</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] gap-[6px] items-start justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[26px] text-white tracking-[1.144px]">やめログ</p>
      <p className="relative shrink-0 text-[#ffe6d8] text-[10px] tracking-[0.44px]">やめたい習慣カウンター</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-start justify-between left-1/2 top-[91px] w-[315px]">
      <Frame13 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute h-[172px] left-0 opacity-90 overflow-clip top-0 w-[375px]" data-name=" Header">
      <StatusBar />
      <div className="absolute bg-white h-[35px] left-[113px] rounded-[17.5px] top-[12px] w-[124px]" data-name="Dynamic Island" />
      <div className="absolute bg-[#67ce67] left-[193px] rounded-[3px] size-[6px] top-[26.5px]" data-name="Camera Indicator" />
      <Frame12 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] gap-[10px] items-center justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px]">やめたい習慣の名前</p>
      <p className="relative shrink-0 text-[#f88f51] text-[12px] tracking-[0.528px]">必須</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] h-[30px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#9d9d9d] text-[14px] tracking-[0.014px]">
        <p className="leading-[20px]">例：ゲーム</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[45px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Frame4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0dede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame />
      <Input />
    </div>
  );
}

function Frame11({ className }: { className?: string }) {
  return (
    <div className={className || "bg-white relative rounded-[12px] shrink-0 w-full"}>
      <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
        <Frame7 />
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] gap-[10px] items-center justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px]">1日の使用数または時間</p>
      <p className="relative shrink-0 text-[#6b6b6b] text-[12px] tracking-[0.528px]">任意</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] h-[30px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#9d9d9d] text-[14px] tracking-[0.014px]">
        <p className="leading-[20px]">2時間</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[45px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Frame5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0dede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame1 />
      <Input1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] gap-[10px] items-center justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px]">1あたりの金額</p>
      <p className="relative shrink-0 text-[#6b6b6b] text-[12px] tracking-[0.528px]">任意</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] h-[30px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#9d9d9d] text-[14px] tracking-[0.014px]">
        <p className="leading-[20px]">500円</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white h-[45px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[12px] relative size-full">
          <Frame6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0dede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Input2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap">通知</p>
    </div>
  );
}

function Knob() {
  return <div className="-translate-y-1/2 absolute aspect-[22/22] bg-[#f88f51] left-[44.74%] right-[2.63%] rounded-[64.706px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.04),0px_1.941px_5.176px_0px_rgba(0,0,0,0.15),0px_1.941px_0.647px_0px_rgba(0,0,0,0.06)] top-1/2" data-name="Knob" />;
}

function Toggle() {
  return (
    <div className="bg-[#ffe1ca] h-[14px] relative rounded-[64.706px] shrink-0 w-[35px]" data-name="Toggle">
      <Knob />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame3 />
      <Toggle />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
        <Frame10 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame11 />
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
          <Frame8 />
        </div>
      </div>
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
          <Frame9 />
        </div>
      </div>
      <Frame16 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-[30px] top-[201px] w-[315px]">
      <Frame14 />
      <div className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f88f51] text-[16px] text-center tracking-[0.016px] whitespace-nowrap">習慣を追加</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f88f51] overflow-clip relative rounded-[54px] size-full" data-name="【習慣追加】">
      <Group />
      <Header />
      <Frame15 />
    </div>
  );
}