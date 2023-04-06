export const driverBenefitsData = [
    {
      id: 's1',
      icon: '/static/icons/driver/Clock.svg',
      title: 'Thời gian linh hoạt',
      desc: 'Dễ dàng làm việc vào bất kỳ thời gian nào mà bạn mong muốn, không gò bó và cố định.',
    },
    {
      id: 's2',
      icon: '/static/icons/driver/Trust.svg',
      title: 'Tin cậy tuyệt đối',
      desc: 'Giao hàng ứng tiền với những khách hàng đã được xác thực hồ sơ.',
    },
    {
      id: 's3',
      icon: '/static/icons/driver/Money.svg',
      title: 'Thu nhập hấp dẫn',
      desc: 'Nhanh chóng nhận được tiền cước ngay khi hoàn thành đơn hàng, lương thưởng hấp dẫn. ',
    },
    {
      id: 's4',
      icon: '/static/icons/driver/Form.svg',
      title: 'Đăng ký dễ dàng',
      desc: 'Sau khi đăng ký, Ahamove sẽ liên lạc xác nhận và hướng dẫn thủ tục tham gia đào tạo, kích hoạt tài khoản.',
    },
  ];
  
  export const driverPartnerData = [
    {
      id: '1',
      title: 'Ưu đãi',
      desc: 'Tặng bạn vô vàn ưu đãi đa dạng về ăn uống, sửa chữa xe máy/xe tải, khám-chữa bệnh,...cực hấp dẫn khi trở thành Đối tác của Ahamove.',
    },
    {
      id: '2',
      title: 'Chính sách thưởng',
      desc: 'Cơ hội gia tăng thu nhập mỗi ngày với hàng ngàn chương trình thưởng hấp dẫn của Ahamove. Tại sao không?',
    },
    {
      id: '3',
      title: 'Bảo hiểm, tài chính',
      desc: 'Vững chắc tay lái, an tâm hơn khi giao hàng với AhaCare.',
    },
  ];
  export type DriverHandbookItemProp = {
    id: string;
    icon: string;
    title: string;
    desc: string;
    href: string;
    items: Array<string>;
  };
  
  export const driverHandbookData: DriverHandbookItemProp[] = [
    {
      id: '1',
      icon: '/static/images/driver/handbook-1.webp',
      title: 'Quy trình giao - nhận hàng',
      desc: 'Cùng Ahamove ôn tập kiến thức giao hàng tại đây Đối tác nhé!',
      href: '/quy-trinh-giao-nhan-hang',
      items: [
        'Quy trình giao hàng dịch vụ xe máy',
        'Quy trình giao hàng dịch vụ xe ba gác - xe tải',
      ],
    },
    {
      id: '2',
      icon: '/static/images/driver/handbook-2.webp',
      title: 'Hướng dẫn thao tác trên ứng dụng',
      desc: 'Tất tần tật về các thao tác trên ứng dung Tài xế Aha - Xem ngay kẻo lỡ!',
      href: '/thao-tac-ung-dung',
      items: [
        'Hướng dẫn nạp & rút tiền',
        'Hướng dẫn đăng ký tài khoản mới',
        'Hướng dẫn mở khóa tài khoản',
        'Hướng dẫn nộp COD và một số thao tác khác',
      ],
    },
    {
      id: '3',
      icon: '/static/images/driver/handbook-3.webp',
      title: 'Quy tắc ứng xử',
      desc: 'Để chuyên nghiệp hơn trong mắt Khách hàng, bí kíp ngay đây nha Đối tác!',
      href: '/quy-tac-ung-xu',
      items: [
        'Bộ Quy định đảm bảo chất lượng',
        'Tiêu chuẩn Đối tác 6 sao',
        'Quy chuẩn đồng phục',
      ],
    },
    {
      id: '4',
      icon: '/static/images/driver/handbook-4.webp',
      title: 'Thắc mắc hỗ trợ',
      desc: 'Trăm ngàn thắc mắc đi đơn, Aha giải đáp ngay trong mục này!',
      href: '/thac-mac-va-ho-tro',
      items: [
        'Thủ tục mở khóa tài khoản lâu không hoạt động',
        'Cập nhật giấy tờ',
        'Dán decal và xác thực (Truck)',
        'Cập nhật bảng giá theo thuế mới',
      ],
    },
    {
      id: '5',
      icon: '/static/images/driver/handbook-5.webp',
      title: 'Thư viện tổng hợp (Đối tác xe máy)',
      desc: '1 nghìn lẻ 1 câu hỏi vì sao trong quá trình giao hàng xe máy đã được giải đáp tại THƯ VIỆN dưới đây nhé Đối tác!',
      href: '/thu-vien-xe-may',
      items: [
        'Các thao tác quan trọng',
        'Các trường hợp khóa tài khoản',
        'Sự cố đơn hàng Câu hỏi thường gặp',
      ],
    },
    {
      id: '6',
      icon: '/static/images/driver/handbook-6.webp',
      title: 'Thư viện tổng hợp (Đối tác xe tải)',
      desc: 'Đối tác xe tải cũng có THƯ VIỆN hỗ trợ riêng biệt, chẳng tìm đâu xa - ở ngay đây rồi!',
      href: '/thu-vien-xe-tai',
      items: [
        'Các thao tác quan trọng',
        'Các trường hợp khóa tài khoản',
        'Sự cố đơn hàng',
        'Câu hỏi thường gặp',
      ],
    },
  ];
  