import { DELIVERY_APOLOGIZE, DELIVERY_FROM } from 'constants/Images';
import Image from 'next/image';

const ShippingPolicy = () => (
  <>
    <h1 style={{ textAlign: 'center' }}>CHÍNH SÁCH VẬN CHUYỂN</h1>
    <p>
      Bằng cách sử dụng dịch vụ vận chuyển được hỗ trợ trên sàn giao dịch TMĐT thuocsi.vn, bạn đã <strong>thừa nhận</strong> và{' '}
      <strong>đồng ý</strong> với các yêu cầu, và/hoặc các Chính Sách, thực tiễn áp dụng nêu trong Chính Sách Vận Chuyển này.
    </p>
    <p>
      Thông thường sau khi nhận được thông tin đặt hàng thuocsi.vn sẽ <strong>xử lý đơn hàng trong vòng 24h</strong> và phản hồi lại thông tin cho
      khách hàng về việc thanh toán và giao nhận. <strong>Thời gian giao hàng thường trong khoảng từ 3-5 ngày</strong> kể từ ngày xác nhận đơn hàng
      hoặc theo thỏa thuận với khách khi đặt hàng. Tuy nhiên, cũng có trường hợp việc giao hàng kéo dài hơn nhưng chỉ xảy ra trong những tình huống
      bất khả kháng như sau:
    </p>
    <p>&#8208; Đối tác vận chuyển/nhân viên công ty liên lạc với khách hàng qua điện thoại không được.</p>
    <p>&#8208; Địa chỉ giao hàng khách hàng cung cấp không chính xác hoặc khó tìm.</p>
    <p>&#8208; Số lượng đơn hàng của công ty tăng đột biến khiến việc xử lý đơn hàng bị chậm.</p>
    <p>
      &#8208; Bên cạnh đó những yếu tố khách quan từ thời tiết, lịch bay đối với vận chuyển bằng đường hàng không, thời gian bay, giờ kẹt xe, khu vực
      dịch… cũng là những yếu tố ảnh hưởng đến thời gian chuyển phát..
    </p>
    <p>
      Trong trường hợp đối tác vận chuyển chậm hơn so với thời gian dự kiến thuocsi.vn sẽ cố gắng liên hệ với đối tác vận chuyển để đi đơn cho khách
      hàng hoặc hỗ trợ chi phí vận chuyển tùy vào từng trường hợp.
    </p>
    <ol type="I">
      <h4>
        <li>Thời gian giao hàng dự kiến:</li>
      </h4>
      <p>Hiện nay, thời gian giao hàng dự kiến của thuocsi.vn sẽ tuỳ thuộc vào từng khu vực như sau:</p>
      <ol>
        <li>TP Hồ Chí Minh: Trong vòng 36h</li>
        <li>
          Miền Tây: 1 - 2 ngày làm việc <strong>*</strong>
        </li>
        <li>
          Miền Trung: 3 - 4 ngày làm việc <strong>*</strong>
        </li>
        <li>
          Miền Bắc: 5 - 6 ngày làm việc <strong>*</strong>
        </li>
      </ol>
      <h4>Lưu ý:</h4>
      <p>
        &#8208; Đây là thời gian giao hàng dự kiến ở các tỉnh thành ngoài TP.HCM. Sau khi xác nhận và nhận được thanh toán, thuocsi.vn sẽ giao hàng
        cho đơn vị vận chuyển trong 48h.
      </p>
      <p>
        &#8208; Đôi khi, thời gian thực tế có thể chậm hơn từ 1-2 ngày hoặc nhiều hơn do các nguyên nhân khách quan: dịch bệnh, thời tiết xấu, ...
        Mong quý khách hàng kiên nhẫn và thông cảm.
      </p>
      <h4>
        <li>Dịch vụ và phí giao hàng của thuocsi.vn</li>
      </h4>
      <p>Hiện tại thuocsi.vn có 2 hình thức giao hàng là hình thức giao hàng tiêu chuẩn và hình thức giao hàng nhanh.</p>
      <ol type="1">
        <h4>
          <li>Giao hàng tiêu chuẩn</li>
        </h4>
        <p>
          Hiện tại thuocsi.vn đang miễn phí giao hàng cho các hoá đơn tại TPHCM và các tỉnh thành tại Việt Nam với thời gian giao hàng tiêu chuẩn.
        </p>
        <h4>
          <li>Giao hàng nhanh (thuocsi.vn express)</li>
        </h4>
        <p>Hiện tại thuocsi.vn đang tiến hành ra mắt dịch vụ giao hàng nhanh, để nhằm đáp ứng tốt hơn cho nhà thuốc trong thời điểm cạnh tranh.</p>
        <p>Điều kiện áp dụng</p>
        <ol>
          <li>Nhà thuốc tại Thành phố Hồ Chí Minh.</li>
          <li>Đơn hàng có giá trị tối đa 5.000.000</li>
          <li>Phí dịch vụ 30.000.</li>
        </ol>
        <p>Các bước thực hiện</p>
        <p>Bước 1: Sau khi đặt hàng như bình thường, trang thanh toán sẽ thể hiện dịch vụ giao hàng để khách chọn lựa.</p>
        <Image src={DELIVERY_FROM} width={900} height={300} />
        <p>
          Bước 2: Sau khi chọn Giao hàng nhanh, hệ thống xác nhận đơn và tiến hành xử lí giao hàng trong 24 giờ tính từ lúc đơn được xác nhận , với
          bất kì sự thay đổi nào nhân viên chăm sóc khách hàng sẽ liên hệ với nhà thuốc.
        </p>
        <p>Bước 3: Nếu giá trị đơn hàng lớn hơn qui định, hệ thống sẽ hiện thông báo sau đây để nhà thuốc có thể dễ dàng chỉnh sửa.</p>
        <Image src={DELIVERY_APOLOGIZE} width={900} height={500} />
        <p>Chúng tôi cam kết giao hàng trong 24 giờ kể từ khi đơn hàng được xác nhận (không bao gồm ngày nghĩ lễ và thứ 7, chủ nhật).</p>
      </ol>
    </ol>
  </>
);

export default ShippingPolicy;
