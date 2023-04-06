import { TELEGRAM_BOT_TOKEN } from './constants';

const apiRoutes = {
  user: {
    profile: '/api/v3/private/user/self',
  },
  form: {
    customer: '/web/v1/public/ahmsites/form/customer',
    cooperate: '/web/v1/public/ahmsites/form/cooperate',
    onwheel: '/web/v1/public/ahmsites/form/onwheel',
    driver: '/web/v1/public/ahmsites/form/driver',
    jobApplication: '/web/v1/public/ahmsites/post',
    uploadCV: '/web/public/v2/upload',
    ahaMartMerchant: '/v2/store/acquire',
  },
  cms: {
    location: {
      list: '/api/locations',
    },
    postTag: {
      list: '/api/post-tags',
    },
    category: {
      list: '/api/categories',
    },
    post: {
      list: '/api/posts?populate=*',
      listCategories:
        '/api/posts?populate=*&filters[$and][0][categories][name][$in][0]=Tài%20xế&filters[$and][0][categories][name][$in][1]=Khách%20hàng&filters[$and][0][categories][name][$in][2]=Ahamovers',
      postBySlug: (slug: string) => `/api/posts/${slug}?populate=*`,
    },
    job: {
      list: '/api/jobs?populate=*',
      jobBySlug: (slug: string) => `/api/jobs/${slug}?populate=*`,
      categories: '/api/job-categories?populate=*',
      types: '/api/job-types?populate=*',
    },
    homeBanner: {
      list: '/api/home-banner?populate[items][populate]=%2A',
    },
    onwheelBanner: {
      list: '/api/onwheel-banner?populate[items][populate]=%2A',
    },
    service: {
      list: '/api/services',
    },
    policy: {
      list: '/api/policy?populate=*',
    },
    helpCenter: {
      list: '/api/help-centers?populate[items][populate]=%2A',
    },
    office: {
      list: '/api/offices?populate=*',
    },
    onwheelPricing: {
      list: '/api/onwheel-pricing?populate[items][populate]=%2A',
    },
  },
  partner: {
    zendeskTicket: '/api/v3/public/partner-portal/zendesk-ticket',
  },
  telegram: {
    sendMessage: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
  },
};

export default apiRoutes;
