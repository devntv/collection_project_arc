type UserLevel = 'LEVEL_SLIVER' | 'LEVEL_SILVER' | 'LEVEL_GOLD' | 'LEVEL_PLATINUM' | 'LEVEL_DIAMOND';

interface InfoProps {
  date: string;
  number: string;
  place: string;
}
interface LincenseProps {
  name: string;
  publicURL: string;
}

export interface UserProps {
  accountID: number;
  address: string;
  businessImages: [];
  businessName: string;
  code: string;
  color: string;
  companyAddress: string;
  companyName: string;
  confirmedTime: string;
  createdTime: string | null;
  customerID: number;
  districtCode: string;
  email: string;
  examinationAndTreatmentLicense: [];
  examinationAndTreatmentLicenseInfo: InfoProps;
  firstOrderAt: string;
  gpp: [];
  gppInfo: InfoProps;
  isActive: boolean;
  isNewBie: boolean;
  isUploadLicense: boolean;
  lastOrderAt: string;
  lastUpdatedTime: string | null;
  legalRepresentative: string;
  level: UserLevel;
  levelPoint: number;
  licenseInfo: InfoProps;
  licenses: LincenseProps[];
  name: string;
  ordersCount: number;
  pharmacyEligibilityLicense: [];
  pharmacyEligibilityLicenseInfo: InfoProps;
  phone: string;
  point: number;
  provinceCode: string;
  scope: string;
  status: string;
  supporterAccountID: number;
  taxCode: string;
  totalPoint: number;
  wardCode: string;
  isQuest: boolean;
}
