import Image from 'next/image';
import Link from 'next/link';

export default function ContactFooter() {
  return (
    <div className="desktop:space-y-6 space-y-4">
      <h2 className="text-subtitle18 desktop:text-title24 desktop:font-bold text-left font-semibold text-black">
        Công ty Cổ Phần Dịch Vụ Tức Thời
      </h2>
      <ul className="text-body14 desktop:space-y-3 desktop:text-body16 space-y-4 text-left font-medium text-black">
        <li>
          <Link href="https://www.google.com/maps/place/C%C4%83n+H%E1%BB%99+Rivera+Park+S%C3%A0i+G%C3%B2n/@10.7694354,106.6614978,17z/data=!3m1!4b1!4m5!3m4!1s0x317528ca8aab0255:0x4b47df7371d378c9!8m2!3d10.7694216!4d106.6636905?hl=vi">
            <a
              className="hover:text-neutral-70 desktop:items-center flex space-x-3"
              title=""
            >
              <div className="relative inline-block h-5 w-5 shrink-0">
                <Image
                  src="/static/icons/LocationMarker.svg"
                  alt=""
                  layout="fill"
                />
              </div>
              <p className="inline-block">
                VP TPHCM: Tầng 1, Tòa nhà Rivera Park, 7/28 Thành Thái, Phường
                14, Quận 10
              </p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.google.com/maps/place/Chung+c%C6%B0+Mipec+T%C3%A2y+S%C6%A1n/@21.0058293,105.8209466,17z/data=!4m9!1m2!2m1!1zVMOyYSBuaMOgIE1pcGVjLCBz4buRIDIyOSBUw6J5IFPGoW4sIFBoxrDhu51uZyBOZ8OjIFTGsCBT4bufLCBRdeG6rW4gxJDhu5FuZyDEkGE!3m5!1s0x3135ab9dcd6b894b:0xc70c638ec4f545aa!8m2!3d21.0054388!4d105.8241089!15sClBUw7JhIG5ow6AgTWlwZWMsIHPhu5EgMjI5IFTDonkgU8ahbiwgUGjGsOG7nW5nIE5nw6MgVMawIFPhu58sIFF14bqtbiDEkOG7kW5nIMSQYVpPIk10w7JhIG5ow6AgbWlwZWMgc-G7kSAyMjkgdMOieSBzxqFuIHBoxrDhu51uZyBuZ8OjIHTGsCBz4bufIHF14bqtbiDEkeG7kW5nIMSRYZIBEmFwYXJ0bWVudF9idWlsZGluZ5oBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSTGVXOVBjelJCUlJBQg?hl=vi">
            <a
              className="hover:text-neutral-70 desktop:items-center flex flex-nowrap space-x-3"
              title=""
            >
              <div className="relative inline-block h-5 w-5 shrink-0">
                <Image
                  src="/static/icons/LocationMarker.svg"
                  alt=""
                  layout="fill"
                />
              </div>
              <p className="inline-block">
                VP Hà Nội: Tầng 9, Tòa nhà Mipec, số 229 Tây Sơn, Phường Ngã Tư
                Sở, Quận Đống Đa
              </p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.google.com/maps/place/66a+L%C3%AA+%C4%90%C3%ACnh+L%C3%BD,+V%C4%A9nh+Trung,+Thanh+Kh%C3%AA,+%C4%90%C3%A0+N%E1%BA%B5ng+550000/data=!4m2!3m1!1s0x314219b6575592b9:0x59494c351e1d2d43?utm_source=mstt_1&entry=gps&g_ep=CAESCTExLjcwLjMwNBgAIIgnKgBCAlZO">
            <a
              className="hover:text-neutral-70 desktop:items-center flex space-x-3"
              title=""
            >
              <div className="relative inline-block h-5 w-5 shrink-0">
                <Image
                  src="/static/icons/LocationMarker.svg"
                  alt=""
                  layout="fill"
                />
              </div>
              <p className="inline-block">
                VP Đà Nẵng: 66a Lê Đình Lý, Thanh Khê, Đà Nẵng
              </p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="mailto:support@ahamove.com">
            <a
              className="hover:text-neutral-70 desktop:items-center flex flex-nowrap space-x-3"
              title=""
            >
              <div className="relative inline-block h-5 w-5 shrink-0">
                <Image src="/static/icons/Mail.svg" alt="" layout="fill" />
              </div>
              <p className="inline-block">support@ahamove.com</p>
            </a>
          </Link>
        </li>
        <li>
          <Link href="tel:1900545411">
            <a
              className="hover:text-neutral-70 desktop:items-center flex flex-nowrap space-x-3"
              title=""
            >
              <div className="relative inline-block h-5 w-5 shrink-0">
                <Image src="/static/icons/Phone.svg" alt="" layout="fill" />
              </div>
              <p className="inline-block">1900545411</p>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
