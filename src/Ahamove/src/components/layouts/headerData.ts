export type ButtonDropdownProps = {
    id: string;
    title: string;
    icon?: string;
    desc?: string;
    href: string;
    type?: 'icon' | 'desc' | 'normal';
    items?: ButtonDropdownProps[];
    childrenUrls?: string[];
  };
  
  export type PopOverProps = {
    id: string;
    title: string;
    href?: string;
    childrenUrls?: string[];
    items?: ButtonDropdownProps[];
  };
  
  export const headerData: PopOverProps[] = [
    {
      id: 'p1',
      title: 'service',
      href: '/service/aha-delivery',
      childrenUrls: [
        '/service/aha-delivery',
        '/service/aha-delivery/price',
        '/service/aha-truck',
        '/service/aha-truck/price',
        '/service/cooperate',
        '/service/cooperate/onwheel',
        '/service/cooperate/warehouse',
        '/service/cooperate/fulfillment',
      ],
      items: [
        {
          id: 'p1c1',
          title: 'AhaDelivery',
          type: 'icon',
          icon: '/static/icons/AhaShip.svg',
          href: '/service/aha-delivery',
          childrenUrls: ['/service/aha-delivery/price'],
        },
        {
          id: 'p1c3',
          title: 'AhaTruck',
          type: 'icon',
          icon: '/static/icons/AhaTruck.svg',
          href: '/service/aha-truck',
          childrenUrls: ['/service/aha-truck/price'],
        },
        {
          id: 'p1c4',
          title: 'Dịch vụ doanh nghiệp',
          icon: '/static/icons/AhaSupply.svg',
          type: 'icon',
          href: '/service/cooperate',
          childrenUrls: [
            '/service/cooperate/onwheel',
            '/service/cooperate/warehouse',
            '/service/cooperate/fulfillment',
          ],
          items: [
            {
              id: 'p1c4c1',
              type: 'normal',
              title: 'SaaS / OnWheel',
              href: '/service/cooperate/onwheel',
            },
            {
              id: 'p1c4c2',
              type: 'normal',
              title: 'Warehouse',
              href: '/service/cooperate/warehouse',
            },
            {
              id: 'p1c4c3',
              type: 'normal',
              title: 'Fulfillment',
              href: '/service/cooperate/fulfillment',
            },
          ],
        },
      ],
    },
    {
      id: 'p2',
      title: 'customer',
      href: '/customer/merchant',
      childrenUrls: [
        '/customer/merchant',
        '/customer/cooperate',
        '/customer/help-center',
      ],
      items: [
        {
          id: 'p2c1',
          title: 'Khách hàng cá nhân',
          type: 'normal',
          href: '/customer/merchant',
        },
        {
          id: 'p2c2',
          title: 'Khách hàng doanh nghiệp',
          type: 'normal',
          href: '/customer/cooperate',
        },
        {
          id: 'p2c3',
          title: 'Cộng đồng khách hàng',
          type: 'normal',
          href: '/customer-community',
        },
        {
          id: 'p2c3',
          title: 'Trung tâm hỗ trợ',
          type: 'normal',
          href: '/customer/help-center',
        },
      ],
    },
    {
      id: 'p3',
      title: 'driver',
      href: '/driver',
      childrenUrls: [
        '/driver',
        '/blog?category=tai-xe',
        '/driver/handbook',
        '/driver/help-center',
      ],
      items: [
        {
          id: 'p3c1',
          title: 'Đăng ký tài xế mới',
          type: 'normal',
          href: '/driver',
        },
        {
          id: 'p3c2',
          title: 'Cộng đồng tài xế',
          type: 'normal',
          href: '/tai-xe-ahamove',
        },
        {
          id: 'p3c3',
          title: 'Cẩm nang tài xế',
          type: 'normal',
          href: '/driver/handbook',
        },
        {
          id: 'p3c4',
          title: 'Trung tâm hỗ trợ',
          type: 'normal',
          href: '/driver/help-center',
        },
      ],
    },
    {
      id: 'p4',
      title: 'recruitment',
      href: '/recruitment',
      childrenUrls: [
        '/about-us',
        '/ahamover-story',
        '/job',
        '/recruitment',
        '/apprentice-program',
      ],
      items: [
        {
          id: 'p4c1',
          title: 'Về chúng tôi',
          type: 'normal',
          href: '/about-us',
        },
        {
          id: 'p4c2',
          title: 'Câu chuyện Ahamovers',
          type: 'normal',
          href: '/ahamover-story',
        },
        {
          id: 'p4c3',
          title: 'Gia nhập Ahamove ngay',
          type: 'normal',
          href: '/recruitment',
        },
        {
          id: 'p4c4',
          title: 'Dành cho Sinh Viên/ For Students',
          type: 'normal',
          href: '/apprentice-program',
        },
      ],
    },
    {
      id: 'p5',
      title: 'blog',
      href: '/blog',
    },
  ];
  