/**
 * Verified Site Content — سان پرتو انرژی (SunParto Energy)
 * Generated from client questionnaire and verified data.
 * All ⚠️ PLACEHOLDER items are documented in CONTENT-TODO.md
 */

export interface StatItem {
  value: number | null;
  suffix: string;
  label: string;
  display?: string;
  icon?: string;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  isFlagship?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isIncomplete?: boolean;
  isPlaceholder?: boolean;
}

export const siteContent = {
  company: {
    nameFa: "سان پرتو انرژی",
    nameEn: "SunParto Energy",
    tagline: "برق مستقل، از آفتاب خودتان",
    website: "sunparto.ir",
    phoneLandline: "۰۹۱۲۱۸۷۳۰۴۴",
    phoneMobile: "۰۹۱۲۱۸۷۳۰۴۴",
    address: "دماوند، سه راه گیلاوند، جنب پمپ بنزین قدیمی، پلاک ۳۳۵",
    city: "دماوند",
  },

  stats: [
    { value: 200, suffix: "+", label: "پروژه اجرا شده" },
    { value: 1393, suffix: "", label: "سال تأسیس", display: "از ۱۳۹۳" },
    { value: 1000, suffix: " kW", label: "ظرفیت نصب شده" },
    { value: null, suffix: "", label: "گارانتی کتبی", icon: "check" },
  ] as StatItem[],

  serviceAreas: ["تهران", "دماوند", "مازندران", "کرج"],

  certifications: [
    "پروانه کسب",
    "عضویت نظام مهندسی",
    "تأییدیه از برند Growatt",
    "نماد اعتماد الکترونیکی",
    "پروانه از سازمان فنی و حرفه ای، وزارت کار",
    "تکنسین مورد تأیید Growatt",
  ],

  brands: {
    panels: ["JA Solar", "Jinko", "AE Solar", "Trina", "SunPro"],
    inverters: ["Growatt", "Marsriva"],
    batteries: ["Marsriva", "Growatt", "Uniwatt"],
    officialDealer: "Growatt",
  },

  services: [
    {
      id: "service-1",
      title: "سیستم‌های خورشیدی مستقل از شبکه (Off-Grid)",
      description: "طراحی، مهندسی و اجرای صفر تا صد سیستم‌های برق خورشیدی مستقل مجهز به بانک باتری لیتیومی برای تامین ۲۴ ساعته برق بدون نیاز به شبکه برق سراسری.",
      tags: ["ویلا", "منزل مسکونی", "دفتر اداری", "واحد صنعتی"],
      isFlagship: true,
    },
    {
      id: "service-2",
      title: "سیستم‌های متصل به شبکه (On-Grid) و درآمدزایی",
      description: "احداث نیروگاه‌های خورشیدی متصل به شبکه جهت کاهش چشمگیر قبوض برق و فروش برق تولیدی بر اساس قرارداد خرید تضمینی ۲۰ ساله ساتبا.",
      tags: ["مسکونی", "صنعتی", "سقف سوله", "قرارداد ساتبا"],
    },
    {
      id: "service-3",
      title: "سیستم‌های برق اضطراری و پشتیبان (UPS)",
      description: "راهکار هوشمند ذخیره‌ساز لیتیومی با قابلیت شارژ از برق شهر جهت پیشگیری ۱۰۰ درصدی از خاموشی در زمان قطعی‌های برق حتی بدون نیاز به پنل خورشیدی.",
      tags: ["آپارتمان", "مسکونی", "اداری", "بدون قطعی"],
    },
    {
      id: "service-4",
      title: "پمپ آب خورشیدی و سیستم‌های کشاورزی",
      description: "راه‌اندازی پمپ‌های شناور و کف‌کش خورشیدی بدون نیاز به باتری و بدون نیاز به سوخت گازوئیل برای باغات و اراضی کشاورزی.",
      tags: ["کشاورزی", "باغات", "پمپ شناور", "حذف گازوئیل"],
    },
  ] as ServiceData[],

  faq: [
    {
      id: "q1",
      question: "قیمت چقدر است؟",
      answer: "قیمت بستگی به میزان مصرف شما دارد. با ما تماس بگیرید و مشاورهی رایگان دریافت نمایید.",
    },
    {
      id: "q2",
      question: "برق خورشیدی چگونه کار میکند؟",
      answer: "سیستم برق خورشیدی تلفیقی از سه بخش است: پنلهای خورشیدی که نور آفتاب را تأمین میکنند، باتری که انرژی را ذخیره میکند، و اینورتر که...",
      isIncomplete: true,
    },
    {
      id: "q3",
      question: "آیا میتواند برق تمام واحد ما را تأمین کند؟",
      answer: "سیستمهای خورشیدی توانهای متفاوتی دارند، از ۱.۲ کیلووات تا توانهای بسیار بالاتر، و با توجه به میزان مصرف واحد، پکیج مناسب طراحی و اجرا میشود تا پاسخگوی هر نوع مصرفکنندهای باشد.",
    },
    {
      id: "q4",
      question: "چقدر طول میکشد نصب سیستم خورشیدی؟",
      answer: "بین ۲ تا ۳ روز، بسته به...",
      isIncomplete: true,
    },
    {
      id: "q5",
      question: "⚠️ PLACEHOLDER — سوال متداول ۵",
      answer: "⚠️ PLACEHOLDER — پاسخ توسط کارفرما هنوز ارائه نشده است.",
      isPlaceholder: true,
    },
    {
      id: "q6",
      question: "⚠️ PLACEHOLDER — سوال متداول ۶",
      answer: "⚠️ PLACEHOLDER — پاسخ توسط کارفرما هنوز ارائه نشده است.",
      isPlaceholder: true,
    },
  ] as FaqItem[],

  warranty: {
    installationWarranty: "۶ ماه",
    equipmentWarranty: null,
    afterSalesService: "دو مرتبه بازدید ماهیانه",
  },

  about: {
    companyDescription:
      "شرکت سان پرتو انرژی فعالیت رسمی خود را از سال ۱۳۹۳ آغاز نموده و بخش تخصصی انرژی خورشیدی شرکت از سال ۱۳۹۸ به طور متمرکز آغاز به کار کرده است. با شرکت در رویدادهای بین‌المللی انرژی‌های پاک و تکیه بر دانش فنی مهندسی روز، کوله‌باری از تجربه در تامین انرژی پایدار گردآوری کرده‌ایم؛ و مفتخریم که کارفرمایان و مشتریان عزیز همواره با اعتماد کامل از ما یاد می‌کنند.",
    ceoName: "مهندس قاسم نظام الشعرایی",
    ceoBio:
      "فارغ التحصیل دانشگاه علم و صنعت، با ۳۵ سال سابقه ی فعالیت در پروژه های حوزه ی انرژی.",
    showTeamPhoto: false,
  },

  careers: {
    openRoles: [
      "نمایندگی فروش در شهرستان",
      "تکنسین نصب",
      "کارشناس فروش",
      "پیمانکار اجرایی B2B",
    ],
    representativeTerms: null,
  },

  branding: {
    logos: {
      mark: "/brand/Logo.svg",
      typeRegular: "/brand/Logotype_Regular.svg",
      typeLight: "/brand/Logotype_light.svg",
      typeVertical: "/brand/Logotype_Regular_vertical.svg",
    },
    mascot: "/mascot.png",
    colors: {
      ink: "#0C1730",
      inkSoft: "#152449",
      sun: "#F2B134",
      sunSoft: "#FFD166",
      mist: "#F5F6F8",
      paper: "#FFFFFF",
    },
  },
};

export default siteContent;
