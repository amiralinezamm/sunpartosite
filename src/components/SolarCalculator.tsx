import React, { useState } from 'react';
import { 
  Calculator, Sun, Battery, Zap, CheckCircle2, MessageCircle, Sparkles, Plus, Minus, 
  Tv, Refrigerator, Wind, Droplets, Shield, Lightbulb, Monitor, Laptop, Printer, 
  Server, Cpu, Factory, Wrench
} from 'lucide-react';
import { COMPANY_INFO } from '../data/solarData';

type PropertyCategory = 'residential-villa' | 'office-commercial' | 'industrial-warehouse';

export const SolarCalculator: React.FC = () => {
  // 1. Unified Property Type:
  // - 'residential-villa': ویلا و منزل مسکونی (یکپارچه‌شده: ویلا با برق/بدون برق، آپارتمان و مسکونی)
  // - 'office-commercial': دفتر اداری و تجاری
  // - 'industrial-warehouse': سوله صنعتی، کارگاه و کارخانه
  const [propertyType, setPropertyType] = useState<PropertyCategory>('residential-villa');

  // ==========================================
  // 1) RESIDENTIAL & VILLA APPLIANCES STATE
  // ==========================================
  const [resLamps, setResLamps] = useState<number>(10);
  
  const [resHasFridge, setResHasFridge] = useState<boolean>(true);
  const [resFridgeAge, setResFridgeAge] = useState<'new' | 'old'>('new');
  const [resFridgeSize, setResFridgeSize] = useState<'small' | 'large'>('large');

  const [resHasTv, setResHasTv] = useState<boolean>(true);
  const [resTvSize, setResTvSize] = useState<'small' | 'medium' | 'large'>('medium');

  const [resHasPump, setResHasPump] = useState<boolean>(true);
  const [resPumpPower, setResPumpPower] = useState<'0.5' | '1.0' | '1.5' | '2.0'>('1.0');

  const [resHasCooler, setResHasCooler] = useState<boolean>(false);
  const [resCoolerType, setResCoolerType] = useState<'water' | 'gas'>('water');
  const [resWaterCoolerPower, setResWaterCoolerPower] = useState<'3500' | '5000' | '7000'>('5000');
  const [resGasCoolerPower, setResGasCoolerPower] = useState<'12000' | '18000' | '24000' | '30000'>('18000');

  const [resHasSecurity, setResHasSecurity] = useState<boolean>(true);

  // ==========================================
  // 2) OFFICE & COMMERCIAL APPLIANCES STATE
  // ==========================================
  // تعداد کامپیوتر / کیس و مانیتور (بسیار مهم)
  const [officeComputers, setOfficeComputers] = useState<number>(5);
  // لپ‌تاپ
  const [officeLaptops, setOfficeLaptops] = useState<number>(3);
  // روشنایی اداری
  const [officeLamps, setOfficeLamps] = useState<number>(18);
  // پرینتر / دستگاه کپی
  const [officePrinter, setOfficePrinter] = useState<boolean>(true);
  // رک سرور، سوییچ شبکه و مودم
  const [officeServerRack, setOfficeServerRack] = useState<boolean>(true);
  // آبسردکن یا یخچال اداری
  const [officeWaterDispenser, setOfficeWaterDispenser] = useState<boolean>(true);
  // سیستم سرمایش دفتر (اسپلیت اداری)
  const [officeCooler, setOfficeCooler] = useState<boolean>(true);
  const [officeCoolerTon, setOfficeCoolerTon] = useState<'18000' | '24000' | '36000'>('24000');

  // ==========================================
  // 3) INDUSTRIAL WAREHOUSE (سوله و کارخانه) APPLIANCES STATE
  // ==========================================
  // پروژکتورهای روشنایی سوله (تعداد و توان)
  const [indFloodlightsCount, setIndFloodlightsCount] = useState<number>(8);
  const [indFloodlightPowerW, setIndFloodlightPowerW] = useState<'100' | '150' | '200' | '400'>('150');
  const [indFloodlightHours, setIndFloodlightHours] = useState<number>(10);

  // دستگاه‌های صنعتی و خط تولید (میزان مصرف وارد شده توسط کاربر بر حسب کیلووات یا اسب بخار)
  const [indMachineKw, setIndMachineKw] = useState<number>(15); // توان کل دستگاه‌های همزمان کار
  const [indMachineHours, setIndMachineHours] = useState<number>(8); // ساعت کارکرد روزانه
  const [indMachineSurge, setIndMachineSurge] = useState<'normal' | 'heavy'>('normal'); // جریان راه‌اندازی (موتورهای سنگین / الکتروموتور)

  // کمپرسور هوا یا پمپ صنعتی
  const [indHasCompressor, setIndHasCompressor] = useState<boolean>(true);
  const [indCompressorHp, setIndCompressorHp] = useState<'3' | '5.5' | '10' | '15'>('5.5');

  // سیستم امنیتی و نظارت تصویری محوطه سوله
  const [indHasCctv, setIndHasCctv] = useState<boolean>(true);

  // ==========================================
  // CONSUMPTION CALCULATIONS (Wh/day & Peak Watts)
  // ==========================================
  let totalDailyWh = 0;
  let totalPeakW = 0;
  let surgeExtraW = 0;

  if (propertyType === 'residential-villa') {
    // 1. Lighting: 10W * 6h
    const lampWh = resLamps * 10 * 6;
    const lampW = resLamps * 10;

    // 2. Fridge
    let fridgeWh = 0;
    let fridgeW = 0;
    if (resHasFridge) {
      if (resFridgeAge === 'new' && resFridgeSize === 'small') {
        fridgeWh = 500;
        fridgeW = 90;
      } else if (resFridgeAge === 'new' && resFridgeSize === 'large') {
        fridgeWh = 1000;
        fridgeW = 140;
      } else if (resFridgeAge === 'old' && resFridgeSize === 'small') {
        fridgeWh = 1200;
        fridgeW = 170;
      } else {
        fridgeWh = 2300;
        fridgeW = 260;
      }
    }

    // 3. TV: 5 hours daily
    let tvWh = 0;
    let tvW = 0;
    if (resHasTv) {
      if (resTvSize === 'small') {
        tvWh = 300;
        tvW = 60;
      } else if (resTvSize === 'medium') {
        tvWh = 550;
        tvW = 110;
      } else {
        tvWh = 850;
        tvW = 170;
      }
    }

    // 4. Water pump: ~1.5h daily
    let pumpWh = 0;
    let pumpW = 0;
    let pumpSurge = 0;
    if (resHasPump) {
      if (resPumpPower === '0.5') {
        pumpWh = 555;
        pumpW = 370;
        pumpSurge = 1100;
      } else if (resPumpPower === '1.0') {
        pumpWh = 1125;
        pumpW = 750;
        pumpSurge = 2200;
      } else if (resPumpPower === '1.5') {
        pumpWh = 1650;
        pumpW = 1100;
        pumpSurge = 3300;
      } else {
        pumpWh = 2250;
        pumpW = 1500;
        pumpSurge = 4500;
      }
    }

    // 5. Cooler
    let coolerWh = 0;
    let coolerW = 0;
    if (resHasCooler) {
      if (resCoolerType === 'water') {
        if (resWaterCoolerPower === '3500') {
          coolerWh = 2280;
          coolerW = 380;
        } else if (resWaterCoolerPower === '5000') {
          coolerWh = 3300;
          coolerW = 550;
        } else {
          coolerWh = 4800;
          coolerW = 800;
        }
      } else {
        if (resGasCoolerPower === '12000') {
          coolerWh = 5500;
          coolerW = 1100;
        } else if (resGasCoolerPower === '18000') {
          coolerWh = 8500;
          coolerW = 1700;
        } else if (resGasCoolerPower === '24000') {
          coolerWh = 11500;
          coolerW = 2300;
        } else {
          coolerWh = 14500;
          coolerW = 2900;
        }
      }
    }

    // 6. Security
    const secWh = resHasSecurity ? 1440 : 0;
    const secW = resHasSecurity ? 60 : 0;

    totalDailyWh = lampWh + fridgeWh + tvWh + pumpWh + coolerWh + secWh;
    totalPeakW = lampW + fridgeW + tvW + pumpW + coolerW + secW;
    surgeExtraW = pumpSurge;

  } else if (propertyType === 'office-commercial') {
    // 1. Computers: ~220W (case + monitor) * 8h = 1760 Wh each
    const pcWh = officeComputers * 220 * 8;
    const pcW = officeComputers * 220;

    // 2. Laptops: ~65W * 8h = 520 Wh each
    const laptopWh = officeLaptops * 65 * 8;
    const laptopW = officeLaptops * 65;

    // 3. Office Lighting: 18W LED panel * 9h
    const lightWh = officeLamps * 18 * 9;
    const lightW = officeLamps * 18;

    // 4. Printer / Copier: ~350W average during active/standby
    const printerWh = officePrinter ? 1800 : 0;
    const printerW = officePrinter ? 500 : 0;

    // 5. Server rack / Network / CCTV: 250W * 24h = 6000 Wh
    const serverWh = officeServerRack ? 6000 : 0;
    const serverW = officeServerRack ? 250 : 0;

    // 6. Water Dispenser: 150W duty cycle
    const waterWh = officeWaterDispenser ? 1200 : 0;
    const waterW = officeWaterDispenser ? 350 : 0;

    // 7. Commercial Split AC: 8h working
    let acWh = 0;
    let acW = 0;
    if (officeCooler) {
      if (officeCoolerTon === '18000') {
        acWh = 1700 * 7;
        acW = 1700;
      } else if (officeCoolerTon === '24000') {
        acWh = 2400 * 7;
        acW = 2400;
      } else {
        acWh = 3600 * 7;
        acW = 3600;
      }
    }

    totalDailyWh = pcWh + laptopWh + lightWh + printerWh + serverWh + waterWh + acWh;
    totalPeakW = pcW + laptopW + lightW + printerW + serverW + waterW + acW;
    surgeExtraW = officeCooler ? 1500 : 0;

  } else {
    // industrial-warehouse (سوله و کارخانه)
    // 1. Floodlights: count * watt * hours
    const floodWh = indFloodlightsCount * Number(indFloodlightPowerW) * indFloodlightHours;
    const floodW = indFloodlightsCount * Number(indFloodlightPowerW);

    // 2. Industrial Machinery entered by user in kW
    const machineWh = indMachineKw * 1000 * indMachineHours;
    const machineW = indMachineKw * 1000;

    // 3. Compressor / Industrial Pump:
    // 1 HP ≈ 746W
    let compW = 0;
    if (indHasCompressor) {
      const hp = Number(indCompressorHp);
      compW = hp * 746;
    }
    const compWh = indHasCompressor ? compW * 6 : 0; // ~6 hours duty

    // 4. CCTV & Perimeter Security: 24h * 150W
    const indSecWh = indHasCctv ? 150 * 24 : 0;
    const indSecW = indHasCctv ? 150 : 0;

    totalDailyWh = floodWh + machineWh + compWh + indSecWh;
    totalPeakW = floodW + machineW + compW + indSecW;
    surgeExtraW = (indMachineSurge === 'heavy' ? machineW * 0.8 : machineW * 0.3) + (indHasCompressor ? compW * 1.5 : 0);
  }

  // ==========================================
  // SYSTEM SIZING (Solar kW, Panels, Battery, Inverter)
  // ==========================================
  // Effective sun hours: 5.0h, system loss: 1.25
  const requiredSolarKw = (totalDailyWh / (5.0 * 1000)) * 1.22;
  
  let calculatedKw = 3;
  let panelCount = 6;
  let batteryKwh = 5.0;
  let inverterKw = 5;

  if (propertyType === 'residential-villa') {
    calculatedKw = Math.max(2.0, Math.round(requiredSolarKw * 10) / 10);
    panelCount = Math.max(4, Math.ceil((calculatedKw * 1000) / 550));
    // Battery sizing: 70% autonomy at 85% DoD
    const reqBatteryKwh = (totalDailyWh * 0.70) / (1000 * 0.85);
    batteryKwh = Math.max(2.5, Math.round(reqBatteryKwh * 10) / 10);

    const totalWithSurge = totalPeakW + surgeExtraW;
    if (totalWithSurge <= 3500) inverterKw = 3;
    else if (totalWithSurge <= 6000) inverterKw = 5;
    else if (totalWithSurge <= 10000) inverterKw = 8;
    else inverterKw = 11;

  } else if (propertyType === 'office-commercial') {
    calculatedKw = Math.max(5.0, Math.round(requiredSolarKw * 10) / 10);
    panelCount = Math.ceil((calculatedKw * 1000) / 550);
    // Office backup battery: covers server + computers for work hours or outage
    const reqBatteryKwh = (totalDailyWh * 0.50) / (1000 * 0.85);
    batteryKwh = Math.max(5.0, Math.round(reqBatteryKwh * 10) / 10);

    const totalWithSurge = totalPeakW + surgeExtraW;
    if (totalWithSurge <= 6000) inverterKw = 6;
    else if (totalWithSurge <= 11000) inverterKw = 10;
    else if (totalWithSurge <= 16000) inverterKw = 15;
    else inverterKw = 20;

  } else {
    // Industrial
    calculatedKw = Math.max(15, Math.round(requiredSolarKw * 10) / 10);
    panelCount = Math.ceil((calculatedKw * 1000) / 550);
    // Storage or peak-shaving / off-grid storage
    const reqBatteryKwh = (totalDailyWh * 0.40) / (1000 * 0.85);
    batteryKwh = Math.max(10.0, Math.round(reqBatteryKwh * 10) / 10);

    const totalWithSurge = (totalPeakW + surgeExtraW) / 1000;
    inverterKw = Math.max(Math.ceil(calculatedKw), Math.ceil(totalWithSurge));
  }

  const propertyCategoryLabels: Record<PropertyCategory, string> = {
    'residential-villa': 'ویلا و منزل مسکونی (با/بدون برق)',
    'office-commercial': 'دفتر اداری و کاربری تجاری',
    'industrial-warehouse': 'سوله صنعتی، کارگاه و کارخانه',
  };

  // WhatsApp formatted lead message
  const getWhatsAppMessage = () => {
    let appliancesText = '';
    
    if (propertyType === 'residential-villa') {
      appliancesText = `\n📋 جزئیات وسایل برقی ویلا و مسکونی:
- روشنایی: ${resLamps} شعله لامپ LED
${resHasFridge ? `- یخچال: ${resFridgeAge === 'new' ? 'جدید' : 'قدیمی'} (${resFridgeSize === 'large' ? 'بزرگ/ساید' : 'کوچک/متوسط'})` : ''}
${resHasTv ? `- تلویزیون: سایز ${resTvSize === 'small' ? 'تا ۴۳ اینچ' : resTvSize === 'medium' ? '۴۳ تا ۵۵ اینچ' : 'بالای ۵۵ اینچ'}` : ''}
${resHasPump ? `- پمپ آب: ${resPumpPower} اسب بخار` : ''}
${resHasCooler ? `- کولر: ${resCoolerType === 'water' ? `کولر آبی مدل ${resWaterCoolerPower}` : `کولر گازی ${resGasCoolerPower} BTU`}` : ''}
${resHasSecurity ? `- دوربین مداربسته و مودم پایش` : ''}`;
    } else if (propertyType === 'office-commercial') {
      appliancesText = `\n📋 جزئیات مصارف اداری و تجاری:
- تعداد کامپیوتر و مانیتور: ${officeComputers} دستگاه
- تعداد لپ‌تاپ: ${officeLaptops} دستگاه
- روشنایی اداری: ${officeLamps} عدد پنل سقفی LED
${officePrinter ? `- پرینتر و دستگاه کپی اداری: فعال` : ''}
${officeServerRack ? `- رک سرور و تجهیزات شبکه/مودم: فعال` : ''}
${officeWaterDispenser ? `- آبسردکن/یخچال اداری: فعال` : ''}
${officeCooler ? `- سیستم سرمایش اداری: اسپلیت ${officeCoolerTon} BTU` : ''}`;
    } else {
      appliancesText = `\n📋 جزئیات مصارف سوله و کارخانه:
- روشنایی سوله: ${indFloodlightsCount} عدد پروژکتور ${indFloodlightPowerW} وات (روزانه ${indFloodlightHours} ساعت)
- دستگاه‌های صنعتی: مجموع توان ${indMachineKw} کیلووات (روزانه ${indMachineHours} ساعت کارکرد)
- تیپ راه‌اندازی دستگاه‌ها: ${indMachineSurge === 'heavy' ? 'موتورهای سنگین با جریان راه‌اندازی بالا' : 'عادی / اینورتری'}
${indHasCompressor ? `- کمپرسور / پمپ صنعتی: توان ${indCompressorHp} اسب بخار` : ''}
${indHasCctv ? `- سیستم امنیتی و نظارت تصویری سوله: فعال` : ''}`;
    }

    const text = `سلام جناب ${COMPANY_INFO.manager} گرامی،
من از طریق محاسبه‌گر سایت ${COMPANY_INFO.name} برآورد اولیه گرفتم:
📌 نوع کاربری: ${propertyCategoryLabels[propertyType]}${appliancesText}
⚡ توان پیشنهادی نیروگاه: حدود ${calculatedKw} کیلووات (${panelCount} عدد پنل ۵۵۰ وات)
🔌 اینورتر پیشنهادی: ${inverterKw} کیلووات سان‌پرتو
🔋 بانک باتری لیتیومی: ${batteryKwh} کیلووات‌ساعت (LiFePO4 هوشمند)
📍 جهت دریافت پیش‌فاکتور رسمی، قیمت روز تجهیزات و هماهنگی بازدید پیام دادم.`;
    return encodeURIComponent(text);
  };

  return (
    <section 
      id="calculator" 
      aria-labelledby="calculator-heading"
      className="py-20 bg-slate-50/60 text-slate-900 relative border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-xs">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>ابزار برآورد هوشمند و رایگان مهندسی</span>
          </div>
          <h2 id="calculator-heading" className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            محاسبه‌گر ظرفیت، تجهیزات و تعداد پنل خورشیدی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            نوع ملک را مشخص کنید تا وسایل و تجهیزات برقی اختصاصی همان کاربری ظاهر شوند و برآورد فنی دقیق برای شما انجام شود:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 text-right shadow-xs">
            
            {/* 1. Property Type Selector: 3 clean categories as requested */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-900 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                ۱. نوع ملک و کاربری خود را انتخاب کنید:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { 
                    id: 'residential-villa', 
                    title: 'ویلا و منزل مسکونی', 
                    subtitle: 'شامل انواع ویلا و آپارتمان' 
                  },
                  { 
                    id: 'office-commercial', 
                    title: 'دفتر اداری و تجاری', 
                    subtitle: 'کامپیوتر، سرور و روشنایی' 
                  },
                  { 
                    id: 'industrial-warehouse', 
                    title: 'سوله صنعتی و کارخانه', 
                    subtitle: 'پروژکتور، خط تولید و الکتروموتور' 
                  },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setPropertyType(item.id as PropertyCategory)}
                    className={`py-3.5 px-3 rounded-xl text-center transition-all border text-xs sm:text-sm cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      propertyType === item.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-xs ring-1 ring-amber-400'
                        : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100/80 font-medium'
                    }`}
                  >
                    <span className="font-bold">{item.title}</span>
                    <span className={`text-[10px] ${propertyType === item.id ? 'text-slate-900/80' : 'text-slate-500'}`}>
                      {item.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. DYNAMIC APPLIANCES ACCORDING TO PROPERTY TYPE */}

            {/* ======================================================== */}
            {/* CASE A: RESIDENTIAL & VILLA (ویلا و منزل مسکونی) */}
            {/* ======================================================== */}
            {propertyType === 'residential-villa' && (
              <div className="space-y-5 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-slate-900 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    ۲. وسایل برقی ویلا / منزل مسکونی را مشخص کنید:
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">محاسبه بر مبنای توان واقعی</span>
                </label>

                {/* Lighting with +/- Counter */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">روشنایی (لامپ‌های کم‌مصرف LED)</div>
                      <div className="text-[11px] text-slate-500">میانگین ۱۰ وات به ازای هر شعله</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shrink-0 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setResLamps(Math.max(0, resLamps - 2))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="کاهش تعداد لامپ"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center font-mono font-black text-sm text-slate-900">
                      {resLamps}
                    </span>
                    <button
                      type="button"
                      onClick={() => setResLamps(Math.min(60, resLamps + 2))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="افزایش تعداد لامپ"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-500 pr-1">شعله</span>
                  </div>
                </div>

                {/* Refrigerator */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Refrigerator className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">یخچال و فریزر ۲۴ ساعته</div>
                        <div className="text-[11px] text-slate-500">کارکرد دائمی شبانه‌روزی</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={resHasFridge}
                        onChange={(e) => setResHasFridge(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {resHasFridge && (
                    <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-600 block mb-1 font-medium text-[11px]">وضعیت دستگاه:</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setResFridgeAge('new')}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-center border cursor-pointer ${
                              resFridgeAge === 'new'
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            جدید و کم‌مصرف
                          </button>
                          <button
                            type="button"
                            onClick={() => setResFridgeAge('old')}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-center border cursor-pointer ${
                              resFridgeAge === 'old'
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            قدیمی
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-600 block mb-1 font-medium text-[11px]">اندازه یخچال:</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setResFridgeSize('large')}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-center border cursor-pointer ${
                              resFridgeSize === 'large'
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            بزرگ (ساید / دوقلو)
                          </button>
                          <button
                            type="button"
                            onClick={() => setResFridgeSize('small')}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-center border cursor-pointer ${
                              resFridgeSize === 'small'
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            کوچک / متوسط
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Television */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Tv className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">تلویزیون و سیستم صوتی</div>
                        <div className="text-[11px] text-slate-500">میانگین ۵ ساعت در شبانه‌روز</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={resHasTv}
                        onChange={(e) => setResHasTv(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {resHasTv && (
                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">اندازه صفحه نمایش:</span>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          { id: 'small', label: 'کوچک (تا ۴۳ اینچ)' },
                          { id: 'medium', label: 'متوسط (۴۳ تا ۵۵ اینچ)' },
                          { id: 'large', label: 'بزرگ (بالای ۵۵ اینچ)' },
                        ].map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setResTvSize(s.id as any)}
                            className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-xs ${
                              resTvSize === s.id
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Water Pump */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Droplets className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">پمپ آب مصرفی ساختمان یا استخر</div>
                        <div className="text-[11px] text-slate-500">جریان استارت راه‌اندازی در محاسبات لحاظ می‌شود</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={resHasPump}
                        onChange={(e) => setResHasPump(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {resHasPump && (
                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">توان پمپ آب:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {[
                          { id: '0.5', label: 'نیم اسب (0.5 HP)' },
                          { id: '1.0', label: '۱ اسب بخار (1.0 HP)' },
                          { id: '1.5', label: '۱.۵ اسب بخار (1.5 HP)' },
                          { id: '2.0', label: '۲ اسب بخار (2.0 HP)' },
                        ].map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setResPumpPower(p.id as any)}
                            className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-[11px] sm:text-xs ${
                              resPumpPower === p.id
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Cooler: Water or Gas */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Wind className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">سیستم سرمایشی / کولر</div>
                        <div className="text-[11px] text-slate-500">کولر آبی یا اسپلیت گازی</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={resHasCooler}
                        onChange={(e) => setResHasCooler(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {resHasCooler && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-3">
                      <div>
                        <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">نوع کولر را مشخص کنید:</span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setResCoolerType('water')}
                            className={`py-2 px-3 rounded-lg text-center border cursor-pointer font-bold ${
                              resCoolerType === 'water'
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            کولر آبی
                          </button>
                          <button
                            type="button"
                            onClick={() => setResCoolerType('gas')}
                            className={`py-2 px-3 rounded-lg text-center border cursor-pointer font-bold ${
                              resCoolerType === 'gas'
                                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            کولر گازی / اسپلیت
                          </button>
                        </div>
                      </div>

                      {resCoolerType === 'water' ? (
                        <div>
                          <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">ظرفیت هوادهی کولر آبی:</span>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {[
                              { id: '3500', label: 'مدل ۳۵۰۰' },
                              { id: '5000', label: 'مدل ۵۰۰۰' },
                              { id: '7000', label: 'مدل ۷۰۰۰' },
                            ].map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setResWaterCoolerPower(c.id as any)}
                                className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-xs ${
                                  resWaterCoolerPower === c.id
                                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-2xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">ظرفیت سرمایش کولر گازی (BTU):</span>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            {[
                              { id: '12000', label: '۱۲۰۰۰ (۱۲ هزار)' },
                              { id: '18000', label: '۱۸۰۰۰ (۱۸ هزار)' },
                              { id: '24000', label: '۲۴۰۰۰ (۲۴ هزار)' },
                              { id: '30000', label: '۳۰۰۰۰ (۳۰ هزار)' },
                            ].map(c => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setResGasCoolerPower(c.id as any)}
                                className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-[11px] sm:text-xs ${
                                  resGasCoolerPower === c.id
                                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-2xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Security & Modem */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">دوربین مداربسته و مودم اینترنت</div>
                      <div className="text-[11px] text-slate-500">پایش امنیتی ۲۴ ساعته از راه دور</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={resHasSecurity}
                      onChange={(e) => setResHasSecurity(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* CASE B: OFFICE & COMMERCIAL (دفتر اداری و تجاری) */}
            {/* ======================================================== */}
            {propertyType === 'office-commercial' && (
              <div className="space-y-5 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-slate-900 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    ۲. تجهیزات و وسایل اداری و شرکتی را مشخص کنید:
                  </span>
                  <span className="text-[11px] font-normal text-slate-500">تعداد کامپیوترها و مانیتورها تعیین‌کننده است</span>
                </label>

                {/* 1. Desktop Computers & Monitors (Very Important!) */}
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/90 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-950 flex items-center gap-2">
                        <span>تعداد کامپیوتر رومیزی و مانیتور</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-semibold">مهم</span>
                      </div>
                      <div className="text-[11px] text-slate-600">کیس + مانیتور پرسنل (حدود ۲۲۰ وات هر ست اداری)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-amber-300 shrink-0 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setOfficeComputers(Math.max(0, officeComputers - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="کاهش تعداد کامپیوتر"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono font-black text-base text-slate-950">
                      {officeComputers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOfficeComputers(Math.min(50, officeComputers + 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                      title="افزایش تعداد کامپیوتر"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-600 pr-1">دستگاه</span>
                  </div>
                </div>

                {/* 2. Laptops */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Laptop className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">تعداد لپ‌تاپ‌های اداری</div>
                      <div className="text-[11px] text-slate-500">میانگین ۶۵ وات شارژ مداوم روزانه</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shrink-0 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setOfficeLaptops(Math.max(0, officeLaptops - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono font-black text-sm text-slate-900">
                      {officeLaptops}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOfficeLaptops(Math.min(30, officeLaptops + 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-500 pr-1">دستگاه</span>
                  </div>
                </div>

                {/* 3. Office Lighting */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">روشنایی دفتر (پنل‌های سقفی LED)</div>
                      <div className="text-[11px] text-slate-500">میانگین ۱۸ وات در طول ساعات کاری</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shrink-0 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setOfficeLamps(Math.max(0, officeLamps - 2))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono font-black text-sm text-slate-900">
                      {officeLamps}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOfficeLamps(Math.min(80, officeLamps + 2))}
                      className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-500 pr-1">عدد</span>
                  </div>
                </div>

                {/* 4. Network Rack / Server / Modem */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Server className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">رک شبکه، سرور محلی، سوییچ و مودم</div>
                      <div className="text-[11px] text-slate-500">پایداری شبکه و برق بدون وقفه بدون خاموشی</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={officeServerRack}
                      onChange={(e) => setOfficeServerRack(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* 5. Printer / Copier */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Printer className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">پرینتر و دستگاه کپی اداری چندکاره</div>
                      <div className="text-[11px] text-slate-500">مصرف چرخشی و لحظه‌ای چاپ اسناد</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={officePrinter}
                      onChange={(e) => setOfficePrinter(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                {/* 6. Office Split AC */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Wind className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">کولر گازی / اسپلیت اداری</div>
                        <div className="text-[11px] text-slate-500">تهویه و سرمایش فضای کاری</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={officeCooler}
                        onChange={(e) => setOfficeCooler(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {officeCooler && (
                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">ظرفیت اسپلیت اداری (BTU):</span>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {[
                          { id: '18000', label: '۱۸۰۰۰ (فضای تا ۴۰ متر)' },
                          { id: '24000', label: '۲۴۰۰۰ (فضای تا ۷۰ متر)' },
                          { id: '36000', label: '۳۶۰۰۰ (فضای بزرگ / سالن)' },
                        ].map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setOfficeCoolerTon(c.id as any)}
                            className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-xs ${
                              officeCoolerTon === c.id
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ======================================================== */}
            {/* CASE C: INDUSTRIAL & WAREHOUSE (سوله صنعتی و کارخانه) */}
            {/* ======================================================== */}
            {propertyType === 'industrial-warehouse' && (
              <div className="space-y-5 pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                <label className="text-xs font-bold text-slate-900 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    ۲. تجهیزات سوله صنعتی، کارگاه و خط تولید:
                  </span>
                  <span className="text-[11px] font-normal text-amber-700 font-semibold">پروژکتورها و توان دستگاه‌های صنعتی</span>
                </label>

                {/* 1. Industrial Floodlights (پروژکتورهای سوله) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-950">پروژکتورهای روشنایی سوله صنعتی</div>
                        <div className="text-[11px] text-slate-600">تعداد پروژکتورهای SMD/LED و توان هرکدام</div>
                      </div>
                    </div>
                    
                    {/* Floodlight Counter */}
                    <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-slate-200 shrink-0 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setIndFloodlightsCount(Math.max(1, indFloodlightsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                        title="کاهش پروژکتور"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono font-black text-base text-slate-950">
                        {indFloodlightsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIndFloodlightsCount(Math.min(50, indFloodlightsCount + 1))}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                        title="افزایش پروژکتور"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] text-slate-600 pr-1">عدد</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">توان هر پروژکتور:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { id: '100', label: '۱۰۰W' },
                          { id: '150', label: '۱۵۰W' },
                          { id: '200', label: '۲۰۰W' },
                          { id: '400', label: '۴۰۰W' },
                        ].map(item => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setIndFloodlightPowerW(item.id as any)}
                            className={`py-1.5 px-1 rounded-lg text-center border cursor-pointer font-bold text-xs ${
                              indFloodlightPowerW === item.id
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">ساعت روشن ماندن در شبانه‌روز:</span>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        <input
                          type="range"
                          min="4"
                          max="24"
                          step="1"
                          value={indFloodlightHours}
                          onChange={(e) => setIndFloodlightHours(Number(e.target.value))}
                          className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                        <span className="font-mono font-bold text-xs shrink-0 text-slate-900 w-12 text-left">
                          {indFloodlightHours} ساعت
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Industrial Machinery input (میزان مصرف دستگاه صنعتی که توسط کاربر وارد می‌شود) */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/90 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Factory className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-950 flex items-center gap-2">
                          <span>مجموع توان دستگاه‌های صنعتی و خط تولید</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold">ورود دستی کاربر</span>
                        </div>
                        <div className="text-[11px] text-slate-600">میزان کیلووات دستگاه‌ها و ماشین‌آلاتی که همزمان کار می‌کنند</div>
                      </div>
                    </div>
                  </div>

                  {/* Input field & slider for Industrial kW */}
                  <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-800">توان بار صنعتی همزمان (کیلووات):</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="1"
                          max="200"
                          value={indMachineKw}
                          onChange={(e) => setIndMachineKw(Math.max(1, Math.min(250, Number(e.target.value) || 0)))}
                          className="w-20 px-2 py-1 border border-amber-300 rounded-lg text-center font-mono font-bold text-sm text-slate-950 bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <span className="text-xs font-bold text-amber-800">کیلووات (kW)</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="2"
                      max="80"
                      step="1"
                      value={Math.min(80, indMachineKw)}
                      onChange={(e) => setIndMachineKw(Number(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>۲ kW (کارگاه سبک)</span>
                      <span>۲۵ kW (کارگاه متوسط)</span>
                      <span>۸۰+ kW (کارخانه و خط تولید)</span>
                    </div>
                  </div>

                  {/* Machine runtime hours & Surge factor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-700 block mb-1 font-medium text-[11px]">ساعت کارکرد روزانه دستگاه‌ها:</span>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        <input
                          type="range"
                          min="2"
                          max="24"
                          step="1"
                          value={indMachineHours}
                          onChange={(e) => setIndMachineHours(Number(e.target.value))}
                          className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        />
                        <span className="font-mono font-bold text-xs shrink-0 text-slate-900 w-12 text-left">
                          {indMachineHours} ساعت
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-700 block mb-1 font-medium text-[11px]">نوع استارت الکتروموتورها:</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setIndMachineSurge('normal')}
                          className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-xs ${
                            indMachineSurge === 'normal'
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          اینورتری / درایودار
                        </button>
                        <button
                          type="button"
                          onClick={() => setIndMachineSurge('heavy')}
                          className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-xs ${
                            indMachineSurge === 'heavy'
                              ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          مستقیم (جریان هجومی)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Industrial Air Compressor or Pump */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                        <Wrench className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">کمپرسور باد صنعتی / پمپ آب فشار قوی</div>
                        <div className="text-[11px] text-slate-500">تجهیز هوای فشرده یا گردش سیالات صنعتی</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={indHasCompressor}
                        onChange={(e) => setIndHasCompressor(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {indHasCompressor && (
                    <div className="pt-2 border-t border-slate-200/80">
                      <span className="text-slate-600 block mb-1.5 font-medium text-[11px]">قدرت موتور کمپرسور:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {[
                          { id: '3', label: '۳ اسب (3 HP)' },
                          { id: '5.5', label: '۵.۵ اسب (5.5 HP)' },
                          { id: '10', label: '۱۰ اسب (10 HP)' },
                          { id: '15', label: '۱۵ اسب (15 HP)' },
                        ].map(item => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setIndCompressorHp(item.id as any)}
                            className={`py-1.5 px-2 rounded-lg text-center border cursor-pointer text-xs ${
                              indCompressorHp === item.id
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-2xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Industrial Security & CCTV */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">سیستم نظارت تصویری و دزدگیر پیرامونی سوله</div>
                      <div className="text-[11px] text-slate-500">دوربین‌های دید در شب، دستگاه NVR و رادیو وایرلس</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={indHasCctv}
                      onChange={(e) => setIndHasCctv(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

              </div>
            )}

          </div>

          {/* Result Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 text-right shadow-sm relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-950">برآورد مهندسی تجهیزات خورشیدی</h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                تخمینی دقیق
              </span>
            </div>

            {/* Key Output Numbers */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* kW Capacity */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  ظرفیت پیشنهادی
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 font-mono">
                  {calculatedKw} <span className="text-xs font-sans text-slate-500">kW</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">توان نیروگاه خورشیدی</div>
              </div>

              {/* Solar Panels Count */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  تعداد پنل ۵۵۰ وات
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 mt-1 font-mono">
                  {panelCount} <span className="text-xs font-sans text-slate-500">عدد</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">مونوکریستال هاف‌سل</div>
              </div>

              {/* Inverter Capacity */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  توان اینورتر
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-mono">
                  {inverterKw} <span className="text-xs font-sans text-slate-500">kW</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">تمام سینوسی Growatt</div>
              </div>

              {/* Battery (Lithium Only!) */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                  <Battery className="w-3.5 h-3.5 text-amber-600" />
                  بانک باتری لیتیومی
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-700 mt-1 font-mono">
                  {batteryKwh} <span className="text-xs font-sans text-slate-500">kWh</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">باتری هوشمند LiFePO4</div>
              </div>

            </div>

            {/* Technical Recommendation Note */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
              <div className="text-slate-900 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                توصیه مهندسی {COMPANY_INFO.name}:
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                {propertyType === 'residential-villa' && `بر اساس مصرف روزانه حدود ${(totalDailyWh / 1000).toFixed(1)} کیلووات‌ساعت، سیستم فوق با بانک باتری لیتیومی LiFePO4 با طول عمر بالای ۱۰ سال و راندمان ۹۵٪ پیشنهاد می‌شود.`}
                {propertyType === 'office-commercial' && `برای ${officeComputers} کامپیوتر و سایر بارهای حساس اداری با مصرف روزانه حدود ${(totalDailyWh / 1000).toFixed(1)} کیلووات‌ساعت، اینورتر تمام سینوسی با قابلیت Zero Transfer Time جهت جلوگیری از ری‌استارت سیستم‌ها پیشنهاد می‌گردد.`}
                {propertyType === 'industrial-warehouse' && `برای بارهای صنعتی و روشنایی سوله با مصرف روزانه ${(totalDailyWh / 1000).toFixed(1)} کیلووات‌ساعت، محاسبه بر اساس تحمل جریان استارت هجومی و پایداری در اوج بار خط تولید انجام شده است.`}
              </p>
            </div>

            {/* Direct WhatsApp CTA with Generated Calculation */}
            <div className="space-y-2 pt-1">
              <a
                href={`${COMPANY_INFO.whatsappUrl}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all active:scale-98 cursor-pointer"
                id="calculator-whatsapp-submit"
                title="ارسال این برآورد به واتساپ مهندس نظام الشعرایی"
              >
                <MessageCircle className="w-4 h-4 stroke-[2.2]" />
                <span>ارسال این برآورد به واتساپ {COMPANY_INFO.manager}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 cursor-pointer"
                title={`تماس تلفنی با ${COMPANY_INFO.name}`}
              >
                <span>تماس مستقیم: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
