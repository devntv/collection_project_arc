/* eslint-disable arrow-body-style */

import Image from 'next/image';
import styles from './styles.module.css';

const ChinhSachDangTaiSanPham = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>QUY ĐỊNH VỀ KIỂM SOÁT THÔNG TIN ĐĂNG TẢI</h1>
      <p className={styles.colorRed}>
        Từ ngày 01/01/2022, thuocsi.vn áp dụng các quy định mới về kiểm duyệt thông tin đăng bán hàng hóa, dịch vụ theo Nghị định 85/2021/NĐ-CP (Nghị
        định 85) của Chính phủ về thương mại điện tử (TMĐT)
      </p>
      <h2>I. Về việc cung cấp thông tin đăng bán hàng hóa/dịch vụ trên thuocsi.vn theo Nghị định 85/2021/NĐ-CP</h2>
      <p>
        - Cung cấp đầy đủ thông tin về đặc tính của hàng hóa, dịch vụ; <br />
        - Thông tin phải bao gồm các nội dung bắt buộc thể hiện trên nhãn hàng hóa theo quy định; <br />
        - Có giấy phép, giấy chứng nhận đủ điều kiện, văn bản xác nhận, hoặc các hình thức văn bản khác theo quy định; <br />- Chính sách kiểm hàng,
        hoàn trả, bao gồm thời hạn hoàn trả, phương thức trả (Nếu có).
      </p>
      <p>
        Từ ngày 01/01/2022, các sản phẩm/dịch vụ đăng bán trên thuocsi.vn phải thể hiện đầy đủ các thông tin trên. Nhà bán hàng cần rà soát, kiểm tra
        và cập nhật theo quy định.
      </p>
      <br />
      <table border="1" className={styles.table} cellPadding="10px">
        <tbody>
          <tr className={styles.bgLightGreen}>
            <td colSpan="4">NỘI DUNG BẮT BUỘC PHẢI THỂ HIỆN TRONG PHẦN THÔNG TIN CHI TIẾT CỦA SẢN PHẨM</td>
          </tr>
          <tr className={styles.bgLightGreen}>
            <td colSpan="3">
              Nội dung thể hiện giống như trên nhãn hàng hóa theo Nghị định 43/2017/NĐ-CP áp dụng cho TẤT CẢ các loại hàng hóa/dịch vụ
            </td>
            <td rowSpan="2" className={styles.bgGreen}>
              Hướng dẫn cập nhật trên thuocsi.vn Seller Center
            </td>
          </tr>
          <tr className={styles.bgLightGreen}>
            <td>STT</td>
            <td>Nội dung</td>
            <td>Yêu cầu</td>
          </tr>
          <tr>
            <td rowSpan="2" className={styles.textBold}>
              1
            </td>
            <td rowSpan="2" className={styles.textBold}>
              Tên hàng hóa
            </td>
            <td>Không được làm hiểu sai lệch về bản chất, công dụng và thành phần của hàng hóa</td>
            <td rowSpan="2">
              - Nhà bán hàng cập nhật tên sản phẩm tại thuộc tính <b>"Tên sản phẩm"</b> trên Seller Center <br /> - Nhà bán hàng đặt tên sản phẩm theo
              công thức đã được quy định. Xem chi tiết{' '}
              <a
                href="https://thuocsisellercenter.helpwise.help/thuocsisellersupport/cach-dien-thong-tin-khi-tao-san-pham-moi"
                className={styles.linkBlue}
                target="_blank"
                rel="noreferrer"
              >
                tại đây
              </a>
            </td>
          </tr>
          <tr>
            <td>
              Nếu tên của thành phần được sử dụng làm tên hay một phần của tên hàng hóa thì thành phần đó phải ghi định lượng, trừ trường hợp quy định
              tại khoản 4 Điều 13 của Nghị định 43/2017/NĐ-CP
            </td>
          </tr>

          <tr>
            <td rowSpan="3" className={styles.textBold}>
              2
            </td>
            <td rowSpan="3" className={styles.textBold}>
              Tên và địa chỉ của tổ chức, cá nhân chịu trách nhiệm về hàng hóa
            </td>
            <td>Hàng hóa được sản xuất trong nước thì ghi tên của tổ chức, cá nhân và địa chỉ cơ sở sản xuất hàng hóa đó</td>
            <td rowSpan="5">
              - Nhà bán hàng cập nhật tên tổ chức, cá nhân chịu trách nhiệm về hàng hóa tại thuộc tính "Nhà sản xuất" trên Seller Center <br /> <br />
              <i>
                (Nếu hệ thống chưa có Nhà sản xuất đúng thì Nhà bán hàng hãy chọn <b>"Nhãn khác"</b> rồi ghi rõ, đúng tên Nhà sản xuất ở phần{' '}
                <b>"Thông tin chung"</b> )
              </i>{' '}
              <br /> <br /> - Nhà bán hàng đăng tải hình ảnh liên quan đến giấy phép và các văn bản liên quan tại thuộc tính <b>"Hồ sơ sản phẩm"</b>{' '}
              trên Seller Center <br /> <br /> - Nhà bán hàng cập nhật Địa chỉ của tổ chức, cá nhân chịu trách nhiệm về hàng hóa, xuất xứ hàng hóa và
              các thông tin khác liên quan tại thuộc tính <b>"Thông tin chung"</b> trên Seller Center
            </td>
          </tr>
          <tr>
            <td>
              Hàng hóa được nhập khẩu để lưu thông tại Việt Nam thì ghi tên và địa chỉ của tổ chức, cá nhân sản xuất (gắn với xuất xứ của trang thiết
              bị y tế) và ghi tên, địa chỉ của tổ chức, cá nhân nhập khẩu (chủ sở hữu số đăng ký lưu hành trang thiết bị y tế)
            </td>
          </tr>
          <tr>
            <td>
              Hàng hóa của tổ chức, cá nhân làm đại lý bán hàng trực tiếp cho thương nhân nước ngoài nhập khẩu hàng hóa vào Việt Nam thì ghi tên và
              địa chỉ của tổ chức, cá nhân sản xuất và tên, địa chỉ của tổ chức, cá nhân làm đại lý bán hàng hóa đó.
            </td>
          </tr>

          <tr>
            <td rowSpan="2" className={styles.textBold}>
              3
            </td>
            <td rowSpan="2" className={styles.textBold}>
              Xuất xứ hàng hóa
            </td>
            <td>
              Cách ghi xuất xứ hàng hóa được quy định như sau: Ghi cụm từ “sản xuất tại” hoặc “chế tạo tại”, “nước sản xuất”, “xuất xứ” hoặc “sản xuất
              bởi” kèm tên nước hoặc vùng lãnh thổ sản xuất ra hàng hóa đó.
            </td>
          </tr>
          <tr>
            <td>Tên nước hoặc vùng lãnh thổ sản xuất ra hàng hóa đó không được viết tắt.</td>
          </tr>

          <tr>
            <td className={styles.textBold}>4</td>
            <td className={styles.textBold}>Thành phần, thành phần định lượng</td>
            <td>
              Ghi thành phần là ghi tên nguyên liệu kể cả chất phụ gia dùng để sản xuất ra hàng hóa và tồn tại trong thành phẩm kể cả trường hợp hình
              thức nguyên liệu đã bị thay đổi.
            </td>
            <td>
              Nhà bán hàng cập nhật thành phần, thành phần định lượng tại thuộc tính <b>"Thành phần"</b> trên Seller Center <br /> <br />
              <i>
                (Nếu không tìm thấy Thành phần, Nhà bán hàng bổ dung đầy đủ ở thuộc tính <b>"Thông tin chung"</b> theo cấu trúc:{' '}
                <b className={styles.colorGray}>"Thành phần - Hàm lượng"</b> hoặc <b className={styles.colorGray}>"Thành phần: Hàm lượng"</b>)
              </i>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold}>5</td>
            <td className={styles.textBold}>Định lượng hàng hóa</td>
            <td>
              Cách ghi định lượng hàng hóa quy định tại Phụ lục II của <b>Nghị định 43/2017/NĐ-CP</b>
            </td>
            <td>
              Nhà bán hàng điền thông tin về định lượng hàng hóa tại thuộc tính <b>"Quy cách đóng gói"</b> và <b>"Đơn vị"</b> trên Seller Center
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="3">
              6
            </td>
            <td className={styles.textBold} rowSpan="3">
              Ngày sản xuất, hạn sử dụng
            </td>
            <td>
              Ghi theo thứ tự ngày, tháng, năm của năm dương lịch. Trường hợp ghi theo thứ tự khác thì phải có chú thích thứ tự đó bằng tiếng Việt
            </td>
            <td rowSpan="3">
              - Nhà bán hàng nhập hạn sử dụng của sản phẩm tại thuộc tính <b>"Hạn sử dụng"</b> khi tạo Phiếu gửi hàng. <br /> - Hoặc, Nhà bán hàng cập
              nhật thông tin về ngày sản xuất, hạn sử dụng tại thuộc tính <b>"Thông tin chung"</b>
            </td>
          </tr>

          <tr>
            <td>
              Mỗi số chỉ ngày, chỉ tháng, chỉ năm ghi bằng hai chữ số, được phép ghi số chỉ năm bằng bốn chữ số. Số chỉ ngày, tháng, năm của một mốc
              thời gian phải ghi cùng một dòng <br />
              <i>- Trường hợp quy định ghi tháng sản xuất thì ghi theo thứ tự tháng, năm của năm dương lịch</i> <br />
              <i>- Trường hợp quy định ghi năm sản xuất thì ghi bốn chữ số chỉ năm của năm dương lịch</i>
            </td>
          </tr>

          <tr>
            <td>“Ngày sản xuất”, “hạn sử dụng” hoặc “hạn dùng” được ghi đầy đủ hoặc ghi tắt bằng chữ in hoa là: “NSX”, “HSD” hoặc “HD”</td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="3">
              7
            </td>
            <td className={styles.textBold} rowSpan="3">
              Các nội dung khác
            </td>
            <td>
              Thể hiện nội dung cơ bản, cần thiết về hàng hóa lên nhãn hàng hóa để người tiêu dùng nhận biết, làm căn cứ lựa chọn, tiêu thụ và sử dụng
            </td>
            <td>
              Nhà bán hàng cập nhật đầy đủ thông tin sản phẩm tại các thuộc tính:
              <br />
              <i>
                Chỉ định <br />
                Liều lượng - Cách dùng
                <br />
                Chống chỉ định
                <br />
                Tương tác thuốc
                <br />
                Bảo quản
                <br />
                Quá liều
              </i>
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <h2>II. Hướng dẫn cập nhật thông tin trên thuocsi.vn Seller Center</h2>
      <p>
        <b>Bước 1:</b> Kiểm tra những nội dung bắt buộc theo tính chất hàng hóa/dịch vụ{' '}
        <a
          href="https://docs.google.com/spreadsheets/d/1PZVTT2BYAdnSL69vXhfGsgeFfa0XM9593qpTLDfoMyY/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <b>TẠI ĐÂY</b>
        </a>
      </p>

      <table border="1" className={styles.table} cellPadding="10px">
        <tbody>
          <tr className={styles.bgYellow}>
            <td colSpan="4">NỘI DUNG BẮT BUỘC PHẢI THỂ HIỆN THEO TÍNH CHẤT CỦA HÀNG HÓA</td>
          </tr>
          <tr className={styles.bgYellow}>
            <td>STT</td>
            <td>TÊN NHÓM HÀNG HÓA ĐĂNG BÁN TRÊN thuocsi.vn</td>
            <td>
              NỘI DUNG BẮT BUỘC <br /> <i style={{ fontWeight: 400 }}>(Theo Phụ lục I Nghị định số 43/2017/NĐ-CP)</i>
            </td>
            <td className={styles.bgGreen}>VỊ TRÍ ĐIỀN THÔNG TIN TRÊN thuocsi.vn SELLER CENTER</td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="7">
              1
            </td>
            <td className={styles.textBold} rowSpan="7">
              Thực phẩm
            </td>
          </tr>
          <tr>
            <td>a) Định lượng;</td>
            <td>
              <b>Quy cách đóng gói</b> và <b>Đơn vị</b>
            </td>
          </tr>
          <tr>
            <td>b) Ngày sản xuất;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>c) Hạn sử dụng;</td>
            <td>
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>d) Thành phần hoặc thành phần định lượng;</td>
            <td>
              <b>Thành phần</b> <i>(Điền thành phần chính kèm hàm lượng nếu có)</i>, <b>Thông tin chung</b>{' '}
              <i>(Điền đầy đủ thành phần kèm hàm lượng nếu có)</i>
            </td>
          </tr>
          <tr>
            <td>đ) Thông tin, cảnh báo;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>e) Hướng dẫn sử dụng, hướng dẫn bảo quản.</td>
            <td>
              <b>Thông tin chung, bảo quản, quá liều</b>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="9">
              2
            </td>
            <td className={styles.textBold} rowSpan="9">
              Thực phẩm bảo vệ sức khỏe
            </td>
          </tr>
          <tr>
            <td>a) Định lượng;</td>
            <td>
              <b>Quy cách đóng gói</b> và <b>Đơn vị</b>
            </td>
          </tr>
          <tr>
            <td>b) Ngày sản xuất;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>c) Hạn sử dụng;</td>
            <td>
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>d) Thành phần hoặc thành phần định lượng;</td>
            <td>
              <b>Thành phần</b> <i>(Điền thành phần chính kèm hàm lượng nếu có)</i>, <b>Thông tin chung</b>{' '}
              <i>(Điền đầy đủ thành phần kèm hàm lượng nếu có)</i>
            </td>
          </tr>
          <tr>
            <td>đ) Hướng dẫn sử dụng, hướng dẫn bảo quản;</td>
            <td>
              <b>Thông tin chung, bảo quản</b>
            </td>
          </tr>
          <tr>
            <td>e) Công bố khuyến cáo về nguy cơ (nếu có);</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>
          <tr>
            <td>g) Ghi cụm từ: “Thực phẩm bảo vệ sức khỏe”;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>h) Ghi cụm từ: “Thực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="7">
              3
            </td>
            <td className={styles.textBold} rowSpan="7">
              Đồ uống (trừ rượu)
            </td>
          </tr>
          <tr>
            <td>a) Định lượng;</td>
            <td>
              <b>Quy cách đóng gói</b> và <b>Đơn vị</b>
            </td>
          </tr>
          <tr>
            <td>b) Ngày sản xuất;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>c) Hạn sử dụng;</td>
            <td>
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>d) Thành phần hoặc thành phần định lượng;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>đ) Thông tin, cảnh báo;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>e) Hướng dẫn sử dụng, hướng dẫn bảo quản.</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="9">
              4
            </td>
            <td className={styles.textBold} rowSpan="9">
              Thuốc, nguyên liệu làm thuốc dùng cho người
            </td>
          </tr>

          <tr>
            <td>a) Thành phần định lượng, hàm lượng, nồng độ hoặc khối lượng dược chất, dược liệu của thuốc, nguyên liệu làm thuốc;</td>
            <td>
              <b>Thành phần</b> <i>(Điền thành phần chính kèm hàm lượng)</i>, <b>Thông tin chung</b> <i>(Điền đầy đủ thành phần kèm hàm lượng)</i>
            </td>
          </tr>

          <tr>
            <td>b) Ngày sản xuất;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>

          <tr>
            <td>c) Hạn sử dụng/hạn dùng;</td>
            <td>
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>

          <tr>
            <td>d) Dạng bào chế trừ nguyên liệu làm thuốc;</td>
            <td>
              <b>Thông tin chung, Quy cách đóng gói</b>
            </td>
          </tr>

          <tr>
            <td>đ) Quy cách đóng gói, tiêu chuẩn chất lượng;</td>
            <td>
              <b>Quy cách đóng gói</b> và <b>Đơn vị</b>
            </td>
          </tr>

          <tr>
            <td>e) Số đăng ký hoặc số giấy phép nhập khẩu, số lô sản xuất;</td>
            <td>
              <b>Hồ sơ sản phẩm Lô</b> <i>(Khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>

          <tr>
            <td>g) Thông tin, cảnh báo vệ sinh, an toàn, sức khỏe;</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>

          <tr>
            <td>h) Hướng dẫn sử dụng trừ nguyên liệu làm thuốc, hướng dẫn (điều kiện) bảo quản.</td>
            <td>
              <b>Chỉ định; Liều lượng - cách dùng; Chống chỉ định; Tương tác thuốc; Bảo quản</b>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="5">
              5
            </td>
            <td className={styles.textBold} rowSpan="5">
              Trang thiết bị y tế
            </td>
          </tr>

          <tr>
            <td>a) Số lưu hành hoặc số giấy phép nhập khẩu trang thiết bị y tế;</td>
            <td>
              <b>Hồ sơ sản phẩm</b> hoặc <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>b) Số lô hoặc số sê ri của trang thiết bị y tế;</td>
            <td>
              <b>Hồ sơ sản phẩm</b> hoặc <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>
              c) Ngày sản xuất, hạn sử dụng: Trang thiết bị y tế tiệt trùng, sử dụng một lần, thuốc thử, chất hiệu chuẩn, vật liệu kiểm soát, hóa chất
              phải ghi hạn sử dụng. Các trường hợp khác ghi ngày sản xuất hoặc hạn sử dụng;
            </td>
            <td>
              <b>Thông tin chung</b> <br />
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>
              d) Thông tin cảnh báo, hướng dẫn sử dụng, hướng dẫn bảo quản, cơ sở bảo hành: Có thể được thể hiện trực tiếp trên nhãn trang thiết bị y
              tế hoặc ghi rõ hướng dẫn tra cứu các thông tin này trên nhãn trang thiết bị y tế.
            </td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="8">
              6
            </td>
            <td className={styles.textBold} rowSpan="8">
              Mỹ phẩm
            </td>
          </tr>
          <tr>
            <td>a) Định lượng;</td>
            <td>
              <b>Quy cách đóng gói</b> và <b>Đơn vị</b>
            </td>
          </tr>
          <tr>
            <td>b) Thành phần hoặc thành phần định lượng;</td>
            <td>
              <b>Thành phần</b> hoặc <b>Thông tin chung</b> <i>(Nếu không tìm thấy thành phần)</i>
            </td>
          </tr>
          <tr>
            <td>c) Số lô sản xuất;</td>
            <td>
              <b>Lô</b> <i>(Khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>d) Ngày sản xuất hoặc hạn sử dụng/hạn dùng;</td>
            <td>
              <b>Thông tin chung</b> <br />
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>đ) Với những sản phẩm có độ ổn định dưới 30 tháng, bắt buộc phải ghi ngày hết hạn;</td>
            <td>
              <b>Thông tin chung</b> <br />
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>e) Hướng dẫn sử dụng trừ khi dạng trình bày đã thể hiện rõ cách sử dụng của sản phẩm;</td>
            <td>
              Chỉ định; Liều lượng - cách dùng; <br /> Chống chỉ định; Bảo quản
            </td>
          </tr>
          <tr>
            <td>g) Thông tin, cảnh báo.</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="7">
              7
            </td>
            <td className={styles.textBold} rowSpan="7">
              Bỉm, băng vệ sinh, khẩu trang, bông tẩy trang, bông vệ sinh tai, giấy vệ sinh
            </td>
          </tr>

          <tr>
            <td>a) Thành phần;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>b) Thông số kỹ thuật;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>c) Hướng dẫn sử dụng;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>d) Thông tin cảnh báo (nếu có);</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>
          <tr>
            <td>đ) Tháng sản xuất;</td>
            <td>
              <b>Thông tin chung</b> <br />
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>
          <tr>
            <td>e) Hạn sử dụng.</td>
            <td>
              <b>Thông tin chung</b> <br />
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="6">
              8
            </td>
            <td className={styles.textBold} rowSpan="6">
              Bàn chải đánh răng
            </td>
          </tr>

          <tr>
            <td>a) Thành phần;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>b) Thông số kỹ thuật;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>c) Hướng dẫn sử dụng;</td>
            <td>
              <b>Liều lượng - Cách dùng</b>
            </td>
          </tr>
          <tr>
            <td>d) Thông tin cảnh báo (nếu có);</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>
          <tr>
            <td>đ) Tháng sản xuất</td>
            <td>
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="7">
              9
            </td>
            <td className={styles.textBold} rowSpan="7">
              Khăn ướt
            </td>
          </tr>

          <tr>
            <td>a) Thành phần;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>b) Thông số kỹ thuật;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>c) Hướng dẫn sử dụng;</td>
            <td>
              <b>Liều lượng - Cách dùng</b>
            </td>
          </tr>
          <tr>
            <td>d) Thông tin cảnh báo (nếu có);</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>
          <tr>
            <td>đ) Ngày sản xuất;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
          <tr>
            <td>e) Hạn sử dụng.</td>
            <td>
              <b>Hạn sử dụng</b> <i>(khi tạo Phiếu gửi hàng)</i>
            </td>
          </tr>

          <tr>
            <td className={styles.textBold} rowSpan="7">
              10
            </td>
            <td className={styles.textBold} rowSpan="7">
              Máy móc, dụng cụ làm đẹp
            </td>
          </tr>

          <tr>
            <td>a) Thông số kỹ thuật;</td>
            <td>
              <b>Thông tin chung </b>
            </td>
          </tr>
          <tr>
            <td>b) Hướng dẫn sử dụng;</td>
            <td>
              <b>Liều lượng - Cách dùng</b>
            </td>
          </tr>
          <tr>
            <td>c) Thông tin cảnh báo (nếu có);</td>
            <td>
              <b>Tương tác thuốc</b> hoặc <b>Quá liều</b>
            </td>
          </tr>
          <tr>
            <td>d) Năm sản xuất;</td>
            <td>
              <b>Thông tin chung</b>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <b>Bước 2:</b> Rà soát lại tất cả sản phẩm đang đăng bán trên thuocsi.vn và tiến hành bổ sung các thông tin sau:
      </p>
      <Image src="/images/chinh-sach-dang-tai-san-pham/step2.jpg" width={400} height={800} />

      <p>
        <b>Bước 3:</b> Đối với thông tin <span className={styles.textGreen}>Hạn sử dụng</span> và{' '}
        <span className={styles.textGreen}>số lô sản xuất</span>, Nhà bán hàng điền{' '}
        <span className={styles.textGreen}>khi tạo mới Phiếu gửi hàng</span> như sau:
      </p>
      <Image src="/images/chinh-sach-dang-tai-san-pham/step3.jpg" width={600} height={160} />
      <p>
        Xem chi tiết cách tạo Phiếu gửi hàng{' '}
        <a
          target="_blank"
          href="https://thuocsisellercenter.helpwise.help/thuocsisellersupport/huong-dan-tao-phieu-gui-hang"
          className={styles.textGreen}
          style={{ textDecoration: 'underline' }}
          rel="noreferrer"
        >
          TẠI ĐÂY
        </a>
      </p>
    </>
  );
};

export default ChinhSachDangTaiSanPham;
