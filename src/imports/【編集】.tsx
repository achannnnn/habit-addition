import svgPaths from "./svg-1wmzhoy7t9";

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

function Frame16() {
  return (
    <div className="content-stretch flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] gap-[6px] items-start justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[26px] text-white tracking-[1.144px]">設定</p>
      <p className="relative shrink-0 text-[#ffe6d8] text-[10px] tracking-[0.44px]">ゲームの設定</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-start justify-between left-1/2 top-[91px] w-[315px]">
      <Frame16 />
      <div className="relative shrink-0 size-[24px]" data-name="アイコン">
        <div className="absolute inset-[20.83%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.pde5d900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute h-[172px] left-0 opacity-90 overflow-clip top-0 w-[375px]" data-name=" Header">
      <Frame15 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap">単位の言語設定</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f88f51] flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[100px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[0.016px] whitespace-nowrap">日本語</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[100px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#f88f51] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
          <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f88f51] text-[16px] text-center tracking-[0.016px] whitespace-nowrap">英語</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0 w-full">
      <Button />
      <Button1 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame21 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
        <Frame9 />
      </div>
    </div>
  );
}

function Frame1() {
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
      <Frame1 />
      <Toggle />
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
        <Frame10 />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame13 />
      <Frame20 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <div className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f88f51] text-[16px] text-center tracking-[0.016px] whitespace-nowrap">習慣を編集</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f88f51] text-[16px] text-center tracking-[0.016px] whitespace-nowrap">習慣を削除</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-[30px] top-[201px] w-[315px]">
      <Frame17 />
      <Frame22 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] gap-[10px] items-center justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px]">やめたい習慣の名前</p>
      <p className="relative shrink-0 text-[#f88f51] text-[12px] tracking-[0.528px]">必須</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] h-[30px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#454545] text-[14px] tracking-[0.014px]">
        <p className="leading-[20px]">ゲーム</p>
      </div>
    </div>
  );
}

function Input() {
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

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame2 />
      <Input />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] gap-[10px] items-center justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px]">1日の使用数または時間</p>
      <p className="relative shrink-0 text-[#6b6b6b] text-[12px] tracking-[0.528px]">任意</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] h-[30px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#454545] text-[14px] tracking-[0.014px]">
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
          <Frame7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0dede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame3 />
      <Input1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] gap-[10px] items-center justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px]">1あたりの金額</p>
      <p className="relative shrink-0 text-[#6b6b6b] text-[12px] tracking-[0.528px]">任意</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-col font-['Hiragino_Kaku_Gothic_Pro:W3',sans-serif] h-[30px] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#454545] text-[14px] tracking-[0.014px]">
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
          <Frame8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e0dede] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[69px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Input2 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Nunito_Sans_7pt_SemiExpanded:Medium','Noto_Sans_JP:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#454545] text-[14px] tracking-[0.616px] whitespace-nowrap">通知</p>
    </div>
  );
}

function Knob1() {
  return <div className="-translate-y-1/2 absolute aspect-[22/22] bg-[#f88f51] left-[44.74%] right-[2.63%] rounded-[64.706px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.04),0px_1.941px_5.176px_0px_rgba(0,0,0,0.15),0px_1.941px_0.647px_0px_rgba(0,0,0,0.06)] top-1/2" data-name="Knob" />;
}

function Toggle1() {
  return (
    <div className="bg-[#ffe1ca] h-[14px] relative rounded-[64.706px] shrink-0 w-[35px]" data-name="Toggle">
      <Knob1 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame5 />
      <Toggle1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
        <Frame25 />
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
          <Frame11 />
        </div>
      </div>
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
          <Frame12 />
        </div>
      </div>
      <div className="bg-white relative rounded-[12px] shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[22px] pt-[14px] px-[20px] relative w-full">
          <Frame14 />
        </div>
      </div>
      <Frame24 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <div className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f88f51] text-[16px] text-center tracking-[0.016px] whitespace-nowrap">設定を保存</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[52px] relative rounded-[100px] shrink-0 w-full" data-name="Button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center px-[24px] py-[16px] relative size-full">
            <p className="font-['Nunito_Sans_7pt_SemiExpanded:SemiBold','Noto_Sans_JP:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#f88f51] text-[16px] text-center tracking-[0.016px] whitespace-nowrap">習慣を削除</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-[30px] top-[201px] w-[315px]">
      <Frame23 />
      <Frame26 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col font-['Nunito_Sans_7pt_SemiExpanded:Bold','Noto_Sans_JP:Bold',sans-serif] gap-[6px] items-start justify-center leading-[20px] not-italic relative shrink-0 whitespace-nowrap">
      <p className="relative shrink-0 text-[26px] text-white tracking-[1.144px]">編集</p>
      <p className="relative shrink-0 text-[#ffe6d8] text-[10px] tracking-[0.44px]">ゲームの編集</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex items-start justify-between left-1/2 top-[121px] w-[315px]">
      <Frame28 />
      <div className="relative shrink-0 size-[24px]" data-name="アイコン">
        <div className="absolute inset-[20.83%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.pde5d900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f88f51] overflow-clip relative rounded-[54px] size-full" data-name="【編集】">
      <Group />
      <Header />
      <Frame18 />
      <div className="absolute bg-[rgba(14,14,14,0.5)] h-[1180px] left-0 top-0 w-[375px]" />
      <div className="absolute bg-[#f88f51] h-[1102px] left-0 rounded-tl-[20px] rounded-tr-[20px] top-[78px] w-[375px]" />
      <Frame19 />
      <Frame27 />
    </div>
  );
}