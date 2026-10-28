/**
 * Site Content — سان پرتو انرژی (SunParto Energy)
 * Thin view over src/data/solarData.ts, which is the single source of truth for all site data.
 * Edit company info, FAQs, services, etc. in solarData.ts only.
 * All ⚠️ PLACEHOLDER items are documented in CONTENT-TODO.md
 */

import {
  BRANDS,
  CAREERS_INFO,
  CERTIFICATIONS,
  COMPANY_INFO,
  SERVICE_AREAS,
  WARRANTY_INFO,
} from '../src/data/solarData';

export const siteContent = {
  company: {
    nameFa: COMPANY_INFO.name,
    nameEn: COMPANY_INFO.nameEn,
    tagline: COMPANY_INFO.tagline,
    website: COMPANY_INFO.website,
    phoneMobile: COMPANY_INFO.phoneDisplay,
    address: COMPANY_INFO.address,
    city: COMPANY_INFO.city,
  },

  serviceAreas: SERVICE_AREAS,
  certifications: CERTIFICATIONS,
  brands: BRANDS,
  warranty: WARRANTY_INFO,
  careers: CAREERS_INFO,

  about: {
    companyDescription: COMPANY_INFO.description,
    ceoName: COMPANY_INFO.manager,
    ceoBio: COMPANY_INFO.managerBio,
    showTeamPhoto: COMPANY_INFO.showTeamPhoto,
  },

  branding: {
    logos: {
      mark: '/brand/Logo.svg',
      typeRegular: '/brand/Logotype_Regular.svg',
      typeLight: '/brand/Logotype_light.svg',
      typeVertical: '/brand/Logotype_Regular_vertical.svg',
    },
    mascot: '/mascot.webp',
    colors: {
      ink: '#0C1730',
      inkSoft: '#152449',
      sun: '#F2B134',
      sunSoft: '#FFD166',
      mist: '#F5F6F8',
      paper: '#FFFFFF',
    },
  },
};

export default siteContent;
