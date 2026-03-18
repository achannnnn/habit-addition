import svgPaths from "./svg-ljemd4bgmx";

function Footer() {
  return <div className="absolute bottom-0 h-[34px] left-0 w-[375px]" data-name=" Footer" />;
}

function Group() {
  return (
    <div className="absolute bottom-0 contents left-0">
      <Footer />
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="アイコン">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ã¢ã¤ã³ã³">
          <path clipRule="evenodd" d={svgPaths.p148b3700} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[26px] text-white tracking-[1.144px] whitespace-nowrap">ゲーム</p>
    </div>
  );
}

function Dehaze() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="dehaze">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="dehaze">
          <mask height="24" id="mask0_2_2137" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2_2137)">
            <path d={svgPaths.pd10700} fill="var(--fill-0, white)" id="dehaze_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame9 />
      <Dehaze />
    </div>
  );
}

function Frame12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] items-start left-[27px] top-[71px] w-[318px]">
      <Component1 />
      <Frame8 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute h-[172px] left-0 opacity-90 overflow-clip top-0 w-[375px]" data-name=" Header">
      <div className="absolute bg-[#f9843f] h-[172px] left-0 rounded-bl-[40px] rounded-br-[40px] top-0 w-[375px]" />
      <Frame12 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[16px] tracking-[0.704px] w-full">日</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap">時間</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[16px] tracking-[0.704px] whitespace-nowrap">分</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <p className="font-['Lato:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#f88f51] text-[26px] tracking-[0.52px] whitespace-nowrap">2000</p>
        <Frame />
      </div>
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <p className="font-['Lato:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#f88f51] text-[26px] tracking-[0.52px] whitespace-nowrap">23</p>
        <Frame4 />
      </div>
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <p className="font-['Lato:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#f88f51] text-[26px] tracking-[0.52px] whitespace-nowrap">59</p>
        <Frame5 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px] w-[min-content]">やめた時間</p>
      <Frame1 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[52px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <circle cx="26" cy="26" fill="var(--fill-0, #D9D9D9)" id="Ellipse 2" r="26" />
        </svg>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[16px] tracking-[0.704px] w-full">本</p>
    </div>
  );
}

function Frame15() {
  return <div className="content-stretch flex flex-col h-[20px] items-center justify-center shrink-0 w-[16px]" />;
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <p className="font-['Lato:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#f88f51] text-[26px] tracking-[0.52px] whitespace-nowrap">10</p>
        <Frame14 />
      </div>
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <Frame15 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px] w-[min-content]">節約できた数</p>
      <Frame13 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[52px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <circle cx="26" cy="26" fill="var(--fill-0, #D9D9D9)" id="Ellipse 2" r="26" />
        </svg>
      </div>
      <Frame7 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[16px]">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[16px] tracking-[0.704px] w-full">円</p>
    </div>
  );
}

function Frame20() {
  return <div className="content-stretch flex flex-col h-[20px] items-center justify-center shrink-0 w-[16px]" />;
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <p className="font-['Lato:Medium',sans-serif] leading-none not-italic relative shrink-0 text-[#f88f51] text-[26px] tracking-[0.52px] whitespace-nowrap">10</p>
        <Frame19 />
      </div>
      <div className="content-stretch flex gap-[2px] items-end relative shrink-0">
        <Frame20 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] min-w-full not-italic relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px] w-[min-content]">節約できた金額</p>
      <Frame18 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[14px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[52px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52 52">
          <circle cx="26" cy="26" fill="var(--fill-0, #D9D9D9)" id="Ellipse 2" r="26" />
        </svg>
      </div>
      <Frame17 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
          <Frame3 />
        </div>
      </div>
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
          <Frame6 />
        </div>
      </div>
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[10px] py-[18px] relative w-full">
          <Frame16 />
        </div>
      </div>
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#959595] text-[14px] text-center tracking-[0.616px] w-full">開始日時：2026年3月16日12時10分</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-[30px] top-[201px] w-[315px]">
      <Frame10 />
      <div className="bg-[#f88f51] h-[52px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[0.016px] whitespace-nowrap">カウンターをリセット</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#eee] overflow-clip relative rounded-[54px] size-full" data-name="【習慣詳細】">
      <Group />
      <Header />
      <Frame11 />
    </div>
  );
}