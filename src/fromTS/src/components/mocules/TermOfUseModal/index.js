import { Dialog } from 'components/organisms';

const TermOfUseModal = ({ ...restProps }) => (
  <Dialog {...restProps} title=" ĐIỀU KHOẢN SỬ DỤNG">
    <div className="container my-3 my-sm-5">
      <div className="col-inner">
        <h3>1. GIỚI THIỆU</h3>
        <p>
          <span>
            1.1 Chào mừng bạn đến với nền tảng thuocsi.vn (bao gồm website và ứng dụng di động thuocsi.vn) được được vận hành bởi{' '}
            <b>Công ty TNHH Buymed</b> và các công ty liên kết (gọi riêng và gọi chung là, "thuocsi.vn", "chúng tôi", hay "của chúng tôi"), vui lòng
            đọc kỹ các Điều Khoản Dịch Vụ dưới đây và Quy Chế Hoạt Động Sàn Giao Dịch Thương Mại Điện Tử thuocsi.vn để hiểu rõ quyền lợi và nghĩa vụ
            hợp pháp của mình đối với thuocsi.vn và các công ty liên kết và công ty con của thuocsi.vn. “Dịch Vụ” chúng tôi cung cấp hoặc sẵn có bao
            gồm (a) Trang thuocsi.vn, (b) các dịch vụ được cung cấp bởi Trang thuocsi.vn và bởi phần mềm dành cho khách hàng của thuocsi.vn có sẵn
            trên Trang thuocsi.vn, và (c) tất cả các thông tin, đường dẫn, tính năng, dữ liệu, văn bản, hình ảnh, biểu đồ, âm nhạc, âm thanh, video,
            tin nhắn, tags, nội dung, chương trình, phần mềm, ứng dụng dịch vụ (bao gồm bất kỳ ứng dụng dịch vụ di động nào) hoặc các tài liệu khác có
            sẵn trên Trang thuocsi.vn hoặc các dịch vụ liên quan đến Trang thuocsi.vn (“Nội Dung”). Bất kỳ tính năng mới nào được bổ sung hoặc mở rộng
            đối với Dịch Vụ đều thuộc phạm vi điều chỉnh của Điều Khoản Dịch Vụ này. Điều Khoản Dịch Vụ này điều chỉnh việc bạn sử dụng Dịch Vụ cung
            cấp bởi thuocsi.vn.
          </span>
        </p>
        <p>
          <span>
            1.2 Dịch Vụ bao gồm dịch vụ sàn giao dịch trực tuyến nhằm kết nối và mang đến cơ hội kinh doanh cho người mua (“Người Mua”) và người bán
            (“Người Bán”) (gọi chung là “Bạn”, “Người Sử Dụng” hoặc “Các Bên”).. Các Bên liên quan đến giao dịch mua bán sẽ chịu trách nhiệm đối với
            hợp đồng mua bán giữa họ, việc đăng bán hàng hóa, bảo hành sản phẩm và các vấn đề tương tự. thuocsi.vn không can thiệp vào các giao dịch
            mua bán giữa những Người Sử Dụng với nhau. thuocsi.vn có thể hoặc không sàng lọc trước Người Sử Dụng hoặc Nội Dung hoặc bất kỳ thông tin
            nào được cung cấp bởi Người Sử Dụng nhưngthuocsi.vn bảo lưu quyền loại bỏ bất cứ Nội Dung hoặc thông tin nào trên Trang thuocsi.vn theo
            Mục 6.4 bên dưới.. Lưu ý, thuocsi.vn sẽ là bên trung gian quản lý tình trạng hàng hóa và mua bán giữa Người Mua và Người Bán và quản lý
            vấn đề vận chuyển hàng hoá..
          </span>
        </p>
        <p>
          <span>
            1.3 Trước khi trở thành Người Sử Dụng của Trang thuocsi.vn, bạn cần đọc và chấp nhận mọi điều khoản và điều kiện được quy định hoặc dẫn
            chiếu đến Điều Khoản Dịch Vụ này và Chính Sách Bảo Mật được quy định tại Mục C trên đây.
          </span>
        </p>
        <p>
          <span>
            1.4 thuocsi.vn bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm dứt tất cả hoặc bất kỳ phần nào của Trang thuocsi.vn hoặc Dịch Vụ
            vào bất cứ thời điểm nào theo quy định pháp luật. Phiên Bản thử nghiệm của Dịch Vụ hoặc tính năng của Dịch Vụ có thể không hoàn toàn giống
            với phiên bản được cập nhât cuối cùng.
          </span>
        </p>
        <p>
          <span>
            1.5 thuocsi.vn bảo lưu quyền từ chối yêu cầu mở Tài Khoản hoặc các truy cập của bạn tới Trang thuocsi.vn hoặc Dịch Vụ theo quy định pháp
            luật và Điều khoản dịch vụ.
          </span>
        </p>
        <p>
          <span>
            BẰNG VIỆC SỬ DỤNG DỊCH VỤ HAY TẠO TÀI KHOẢN TẠI thuocsi.vn, BẠN ĐÃ CHẤP NHẬN VÀ ĐỒNG Ý VỚI NHỮNG ĐIỀU KHOẢN DỊCH VỤ VÀ CHÍNH SÁCH BỔ SUNG
            ĐƯỢC QUY ĐỊNH TẠI VĂN BẢN NÀY.
          </span>
        </p>
        <h3>
          <span>2. QUYỀN RIÊNG TƯ</span>
        </h3>

        <span>
          thuocsi.vn coi trọng việc bảo mật thông tin của bạn. Để bảo vệ quyền lợi người dùng, thuocsi.vn cung cấp Chính Sách Bảo Mật tại
          thuocsi.vn.vn để giải thích chi tiết các hoạt động bảo mật của thuocsi.vn. Vui lòng tham khảo Chính Sách Bảo Mật để biết cách thức
          thuocsi.vn thu thập và sử dụng thông tin liên quan đến Tài Khoản và/hoặc việc sử dụng Dịch Vụ của Người Sử Dụng (“Thông Tin Người Sử Dụng”).
          Điều Khoản Dịch Vụ này có liên quan mật thiết với Chính Sách Bảo Mật. Bằng cách sử dụng Dịch Vụ hoặc cung cấp thông tin trên Trang
          thuocsi.vn, Người Sử Dụng cho phép thuocsi.vn thực hiện, thu thập, công bố hoặc xử lý các Nội dung, các dữ liệu cá nhân của Người dùng theo
          Chính Sách Bảo Mật được quy định trên đây.
        </span>

        <h3>
          <span>3. CÁC LOẠI TRỪ VÀ GIỚI HẠN TRÁCH NHIỆM</span>
        </h3>

        <p>
          <span>
            3.1 thuocsi.vn trao cho Người Sử Dụng quyền phù hợp để truy cập và sử dụng các Dịch Vụ theo các điều khoản và điều kiện được quy định
            trong Điều Khoản Dịch Vụ này. Tất cả các Nội Dung, thương hiệu, nhãn hiệu dịch vụ, tên thương mại, biểu tượng và tài sản sở hữu trí tuệ
            khác (“Tài Sản Sở Hữu Trí Tuệ”) hiển thị trên Trang thuocsi.vn đều thuộc sở hữu độc quyền của thuocsi.vn. Không một bên nào truy cập vào
            Trang thuocsi.vn được cấp quyền hoặc cấp phép trực tiếp hoặc gián tiếp để sử dụng hoặc sao chép bất kỳ Tài Sản Sở Hữu Trí Tuệ nào. Bằng
            cách sử dụng hoặc truy cập Dịch Vụ, bạn đồng ý tuân thủ các quy định pháp luật liên quan đến bản quyền, thương hiệu, nhãn hiệu dịch vụ
            hoặc bất cứ quy định pháp luật nào khác bảo vệ Dịch Vụ, Trang thuocsi.vn và Nội Dung của Trang thuocsi.vn. Bạn đồng ý không được phép sao
            chép, nhân bản, chỉnh sửa, phát tán, tái bản, chuyển giao, công bố công khai, thực hiện công khai, sửa đổi, phỏng tác, cho thuê, bán, hoặc
            tạo ra các sản phẩm phái sinh của bất cứ phần nào thuộc Dịch Vụ, Trang thuocsi.vn và Nội Dung của Trang thuocsi.vn. Ngoài ra, bạn đồng ý
            rằng bạn sẽ không sử dụng bất kỳ robot, chương trình do thám (spider) hay bất kỳ thiết bị tự động hoặc phương thức thủ công nào để theo
            dõi hoặc sao chép Nội Dung của thuocsi.vn khi chưa có sự đồng ý trước bằng văn bản của thuocsi.vn (sự chấp thuận này được xem như áp dụng
            cho các công cụ tìm kiếm cơ bản trên các website tìm kiếm trên mạng kết nối người dùng trực tiếp đến website đó).
          </span>
        </p>
        <p>
          <span>
            3.2 thuocsi.vn cho phép kết nối từ website của Người Sử Dụng đến Trang thuocsi.vn, với điều kiện website của Người Sử Dụng không được diễn
            giải là bất kỳ sự xác nhận hoặc liên quan nào đến thuocsi.vn.
          </span>
        </p>
        <p>
          <span>
            3.3 thuocsi.vn không kiểm soát và không đảm bảo hoặc chấp nhận trách nhiệm đối với: (a) sự phù hợp mục đích, sự tồn tại, chất lượng, độ an
            toàn hoặc tính pháp lý của các sản phẩm có sẵn trên trang thuocsi.vn; hoặc (b) khả năng Người Bán bán các sản phẩm hoặc khả năng của Người
            Mua mua và thanh toán cho các sản phẩm. Nếu có tranh chấp liên quan đến một hoặc nhiều Người Sử Dụng, thì những Người Sử Dụng này đồng ý
            tự giải quyết tranh chấp trực tiếp với nhau và miễn trừ thuocsi.vn và các công ty liên kết của thuocsi.vn khỏi khiếu nại, yêu cầu và tổn
            thất phát sinh hoặc liên quan đến tranh chấp.
          </span>
        </p>
        <p>
          <span>
            3.4 NGƯỜI SỬ DỤNG CẦN THỪA NHẬN RẰNG MỌI RỦI RO PHÁT SINH NGOÀI VIỆC SỬ DỤNG HOẶC VẬN HÀNH CỦA TRANG thuocsi.vn VÀ/HOẶC DỊCH VỤ thuocsi.vn
            SẼ THUỘC VỀ NGƯỜI SỬ DỤNG TRONG GIỚI HẠN TỐI ĐA PHÁP LUẬT CHO PHÉP: THIỆT HẠI GIÁN TIẾP, NGẪU NHIÊN, ĐẶC BIỆT HOẶC MANG TÍNH HỆ QUẢ NÀO
            (GỒM BẤT KỲ MẤT MÁT NÀO VỀ DỮ LIỆU, GIÁN ĐOẠN DỊCH VỤ, MÁY TÍNH, ĐIỆN THOẠI HOẶC CÁC THIẾT BỊ DI ĐỘNG KHÁC) PHÁT SINH TỪ HOẶC LIÊN QUAN
            ĐẾN VIỆC SỬ DỤNG TRANG thuocsi.vn HOẶC DỊCH VỤ, BAO GỒM THIỆT HẠI PHÁT SINH TỪ ĐÓ, NGAY CẢ KHI thuocsi.vn ĐÃ ĐƯỢC THÔNG BÁO VỀ KHẢ NĂNG
            CỦA CÁC THIỆT HẠI ĐÓ HOẶC ĐƯỢC GỢI Ý PHẢI CHỊU TRÁCH NHIỆM.
          </span>
        </p>
        <p>
          <span>
            3.5 TRƯỜNG HỢP thuocsi.vn, THEO PHÁN QUYẾT CỦA TÒA ÁN CÓ THẨM QUYỀN, PHẢI CHỊU TRÁCH NHIỆM TRONG GIỚI HẠN TỐI ĐA PHÁP LUẬT CHO PHÉP (BAO
            GỒM ĐỐI VỚI LỖI BẤT CẨN KHÔNG ĐÁNG KỂ) THÌ TRÁCH NHIỆM CỦA thuocsi.vn ĐỐI VỚI BẠN HOẶC BẤT KỲ BÊN THỨ BA NÀO CHỈ GIỚI HẠN TRONG MỨC THẤP
            HƠN ĐỐI VỚI (A) KHOẢN PHÍ PHẢI TRẢ CHO BẠN THEO CHÍNH SÁCH thuocsi.vn ĐẢM BẢO; VÀ (B) 2.000.000 VND (HAI TRIỆU ĐỒNG CHẴN) HOẶC KHOẢN TIỀN
            KHÁC NHƯ XÁC ĐỊNH CỤ THỂ TRONG PHÁN QUYẾT CHUNG THẨM CỦA TÒA ÁN CÓ THẨM QUYỀN.
          </span>
        </p>

        <h3>
          <span>4. PHẦN MỀM</span>
        </h3>

        <span>
          Bất kỳ phần mềm nào được cung cấp bởi thuocsi.vn tới Người Sử Dụng đều thuộc phạm vi điều chỉnh của các Điều Khoản Dịch Vụ này. thuocsi.vn
          bảo lưu tất cả các quyền liên quan đến phần mềm không được cấp một cách rõ ràng bởi thuocsi.vn mà trong đó bất kỳ tập lệnh hoặc mã code,
          liên kết đến hoặc dẫn chiếu từ Dịch Vụ, đều được cấp phép cho bạn bởi các bên thứ ba là chủ sở hữu của tập lệnh hoặc mã code đó mà không
          phải bởi thuocsi.vn.
        </span>

        <h3>
          <span>5. TÀI KHOẢN VÀ BẢO MẬT</span>
        </h3>
        <p>
          <span>
            5.1 Một vài tính năng của Dịch Vụ chúng tôi yêu cầu phải đăng ký một Tài Khoản bằng cách lựa chọn một tên người sử dụng hoặc số điện thoại
            để đăng nhập và mật khẩu, đồng thời cung cấp một số thông tin cá nhân nhất định. Bạn được phép sử dụng Tài Khoản của mình để truy cập vào
            các sản phẩm, website hoặc dịch vụ khác mà thuocsi.vn cho phép, có mối liên hệ hoặc đang hợp tác. thuocsi.vn không kiểm tra và không chịu
            trách nhiệm đối với bất kỳ nội dung, tính năng, bảo mật, dịch vụ, chính sách riêng tư, hoặc cách thực hiện khác của các sản phẩm, website
            hay dịch vụ đó.
          </span>
          <p />
          <span>
            5.2 Bạn đồng ý (a) giữ bí mật mật khẩu và chỉ sử dụng số điện thoại và mật khẩu để đăng nhập, (b) đảm bảo bạn sẽ đăng xuất khỏi tài khoản
            của mình sau mỗi phiên đăng nhập trên Trang thuocsi.vn, và (c) thông báo ngay lập tức với thuocsi.vn nếu phát hiện bất kỳ việc sử dụng
            trái phép nào đối với Tài Khoản, Tên Đăng Nhập và/hoặc mật khẩu của bạn. Bạn phải chịu trách nhiệm với hoạt động dưới Tên Đăng Nhập và Tài
            Khoản của mình, bao gồm tổn thất hoặc thiệt hại phát sinh từ việc sử dụng trái phép liên quan đến mật khẩu hoặc từ việc không tuân thủ
            Điều Khoản này của Người Sử Dụng.
          </span>
          <p />
          <span>
            5.3 Bạn đồng ý rằng thuocsi.vn có toàn quyền xóa Tài Khoản và Tên Đăng Nhập của Người Sử Dụng ngay lập tức, gỡ bỏ hoặc hủy từ Trang
            thuocsi.vn bất kỳ Nội Dung nào liên quan đến Tài Khoản và Tên Đăng Nhập của Người Sử Dụng vào bất kỳ thời điểm nào mà không cần thông báo
            hay chịu trách nhiệm với Người Sử Dụng hay bên thứ ba nào khác. Căn cứ để thực hiện các hành động này có thể bao gồm (a) Tài Khoản và Tên
            Đăng Nhập không hoạt động trong thời gian dài, (b) vi phạm điều khoản hoặc tinh thần của các Điều Khoản Dịch Vụ này, (c) có hành vi bất
            hợp pháp, lừa đảo, quấy rối, xâm phạm, đe dọa hoặc lạm dụng, (d) có nhiều tài khoản người dùng khác nhau, (e) lạm dụng mã giảm giá hoặc
            tài trợ hoặc quyền lợi khuyến mại (bao gồm việc bán mã giảm giá cho các bên thứ ba cũng như lạm dụng mã giảm giá ở Trang thuocsi.vn), (f)
            có hành vi gây hại tới những Người Sử Dụng khác, các bên thứ ba hoặc các lợi ích kinh tế của thuocsi.vn, (e) theo yêu cầu của cơ quan nhà
            nước. Việc sử dụng Tài Khoản cho các mục đích bất hợp pháp, lừa đảo, quấy rối, xâm phạm, đe dọa hoặc lạm dụng có thể được cung cấp cho cơ
            quan nhà nước có thẩm quyền theo quy định pháp luật.
          </span>
          <p />
          <span>
            5.4 Người Sử Dụng cũng có thể yêu cầu xóa tài khoản bằng cách thông báo bằng văn bản đến thuocsi.vn qua email{' '}
            <a href="mailto:hotro@thuocsi.vn" style={{ color: '#0000EE', textDecoration: 'underline' }}>
              {' '}
              hotro@thuocsi.vn
            </a>
            . Tuy nhiên, Người Sử Dụng vẫn phải chịu trách nhiệm và nghĩa vụ đối với bất kỳ giao dịch nào chưa hoàn thành (phát sinh trước hoặc sau
            khi tài khoản bị xóa) hay việc vận chuyển hàng hóa liên quan đến tài khoản bị yêu cầu xóa. Khi đó, theo Điều Khoản Dịch Vụ, Người Sử Dụng
            phải liên hệ với thuocsi.vn sau khi đã hoàn tất việc thực hiện và hoàn thành các giao dịch chưa hoàn tất.
          </span>
        </p>
        <h3>
          <span>6. ĐIỀU KHOẢN SỬ DỤNG</span>
        </h3>

        <p>
          <span>
            6.1 Quyền được phép sử dụng Trang thuocsi.vn và Dịch Vụ có hiệu lực cho đến khi thuocsi.vn ra quyết định chấm dứt quyền sử dụng. Quyền sử
            dụng hoặc Quyền truy cập sẽ bị chấm dứt theo Điều Khoản Dịch Vụ này hoặc trường hợp Người Sử Dụng vi phạm bất cứ điều khoản hoặc điều kiện
            nào được quy định tại Điều Khoản Dịch Vụ này mà thuocsi.vn có thể chấm dứt việc sử dụng của Người Sử Dụng và không cần thông báo.
          </span>
        </p>
        <p>
          <span>6.2 Người Sử Dụng không được phép:</span>
        </p>
        <p>
          <span>
            (a) Tải lên, đăng, truyền tải hoặc bằng cách khác công khai bất cứ Nội Dung nào trái pháp luật, có hại, đe dọa, lạm dụng, quấy rối, gây
            hoang mang, lo lắng, xuyên tạc, phỉ báng, xúc phạm, khiêu dâm, bôi nhọ, xâm phạm quyền riêng tư của người khác, hoặc gây căm phẫn, hoặc
            phân biệt chủng tộc, dân tộc hoặc bất kỳ nội dung không đúng đắn nào khác;
          </span>
        </p>
        <p>
          <span>(b) Vi phạm pháp luật, quyền lợi của bên thứ ba hoặc Chính Sách Cấm/Hạn Chế Sản Phẩm của thuocsi.vn;</span>
        </p>
        <p>
          <span>
            (c) Đăng tải, truyền tin, hoặc bằng bất kỳ hình thức nào khác hiển thị bất kỳ Nội dung nào có sự xuất hiện của người chưa thành niên hoặc
            sử dụng Dịch vụ gây tổn hại cho người chưa thành niên dưới bất kỳ hình thức nào;
          </span>
        </p>
        <p>
          <span>
            (d) Sử dụng Dịch Vụ hoặc đăng tải Nội Dung để mạo danh bất kỳ cá nhân hoặc tổ chức nào, hoặc bằng cách nào khác xuyên tạc cá nhân hoặc tổ
            chức đó;
          </span>
        </p>
        <p>
          <span>
            (e) Giả mạo các tiêu đề hoặc bằng cách khác ngụy tạo các định dạng nhằm che giấu nguồn gốc của bất kỳ Nội Dung nào được truyền tải thông
            qua Dịch Vụ;
          </span>
        </p>
        <p>
          <span>(f) Gỡ bỏ bất kỳ thông báo độc quyền nào từ Trang thuocsi.vn;</span>
        </p>
        <p>
          <span>
            (g) Sử dụng Dịch Vụ phục vụ lợi ích của bất kỳ bên thứ ba nào hoặc bất kỳ hành vi nào không được chấp nhận theo Điều Khoản Dịch Vụ này;
          </span>
        </p>
        <p>
          <span>(h) Sử dụng Dịch Vụ hoặc đăng tải Nội Dung cho mục đích gian lận, không hợp lý, sai trái, gây hiểu nhầm hoặc gây nhầm lẫn;</span>
        </p>
        <p>
          <span>
            (i) Mở và vận hành nhiều tài khoản người dùng khác nhau liên quan đến bất kỳ hành vi nào vi phạm điều khoản hoặc tinh thần của Điều Khoản
            Dịch Vụ này;
          </span>
        </p>
        <p>
          <span>
            (j) Truy cập sàn giao dịch thương mại điện tử thuocsi.vn, mở tài khoản hoặc bằng cách khác truy cập tài khoản người dùng của mình thông
            qua bất kỳ phần mềm hoặc phần cứng không được chấp thuận hoặc cung cấp bởi thuocsi.vn, bao gồm phần mềm giả lập, thiết bị giả lập, phần
            mềm tự động hoặc bất kỳ phần mềm, thiết bị hoặc phần cứng nào có chức năng tương tự;
          </span>
        </p>
        <p>
          <span>(k) Chỉnh sửa giá của bất kỳ sản phẩm nào hoặc can thiệp vào danh mục hàng hóa của Người Sử Dụng khác;</span>
        </p>
        <p>
          <span>(l) Thực hiện bất kỳ hành động nào làm sai lệch hệ thống đánh giá hoặc tiếp nhận phản hồi của thuocsi.vn;</span>
        </p>
        <p>
          <span>
            (m) Cố gắng chuyển đổi mã chương trình, đảo ngược kỹ thuật, tháo gỡ hoặc xâm nhập (hack) Dịch Vụ (hoặc bất cứ hợp phần nào của Dịch Vụ);
            hoặc phá bỏ hoặc vượt qua bất kỳ công nghệ mã hóa hoặc biện pháp bảo mật nào được thuocsi.vn áp dụng đối với các Dịch Vụ và/hoặc các dữ
            liệu được truyền tải, xử lý hoặc lưu trữ bởi thuocsi.vn;
          </span>
        </p>
        <p>
          <span>
            (n) Khai thác hoặc thu thập bất kỳ thông tin nào liên quan đến Tài Khoản của Người Sử Dụng khác, bao gồm bất kỳ thông tin hoặc dữ liệu cá
            nhân nào;
          </span>
        </p>
        <p>
          <span>
            (o) Tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác công khai bất kỳ Nội Dung nào dẫn đến trường hợp vi phạm các quyền về
            sáng chế, thương hiệu, bí quyết kinh doanh, bản quyền hoặc bất cứ đặc quyền nào của bất cứ bên nào;
          </span>
        </p>
        <p>
          <span>
            (p) Tải lên, gửi thư điện tử, đăng, chuyển tải hoặc bằng cách khác công khai bất cứ tài liệu chứa các loại vi-rút, worm, trojan hoặc bất
            kỳ các mã, tập tin hoặc chương trình máy tính được thiết kế để trực tiếp hoặc gián tiếp gây cản trở, điều khiển, gián đoạn, phá hỏng hoặc
            hạn chế các chức năng hoặc tổng thể của bất kỳ phần mềm hoặc phần cứng hoặc dữ liệu hoặc thiết bị viễn thông của máy tính;
          </span>
        </p>
        <p>
          <span>
            (q) Làm gián đoạn các dòng tương tác thông thường, đẩy nhanh tốc độ “lướt (scroll)” màn hình hơn những Người Sử Dụng khác có thể đối với
            Dịch Vụ, hoặc bằng cách khác thực hiện thao tác gây ảnh hưởng tiêu cực đến khả năng tham gia giao dịch thực của những Người Sử Dụng khác,
          </span>
        </p>
        <p>
          <span>
            (r) Can thiệp, điều khiển hoặc làm gián đoạn hoặc thực hiện bất kỳ hành động hoặc hành vi nào có thể trực tiếp hoặc gián tiếp vô hiệu hoá,
            làm quá tải, hoặc làm suy yếu, phá hủy: (i) Dịch Vụ hoặc máy chủ hoặc (ii) hệ thống được liên kết với Dịch Vụ hoặc (iii) tới việc sử dụng
            và trải nghiệm Dịch Vụ của Người Sử Dụng khác; hoặc không tuân thủ bất kỳ các yêu cầu, quy trình, chính sách và luật lệ đối với các hệ
            thống được liên kết với Trang thuocsi.vn;
          </span>
        </p>
        <p>
          <span>
            (s) Sử dụng Dịch Vụ có chủ ý hoặc vô ý để vi phạm pháp luật, quy chế, quy tắc, chỉ thị, hướng dẫn, chính sách áp dụng của địa phương, liên
            bang, quốc gia hoặc quốc tế (có hoặc chưa có hiệu lực) liên quan đến phòng chống rửa tiền hoặc phòng chống khủng bố;
          </span>
        </p>
        <p>
          <span>
            (t) Sử dụng Dịch Vụ để xâm hại tới quyền riêng tư của người khác hoặc để “lén theo dõi” hoặc bằng cách khác quấy rối người khác, hoặc sử
            dụng Dịch vụ để thu thập hoặc lưu trữ dữ liệu cá nhân của Người Sử Dụng khác;
          </span>
        </p>
        <p>
          <span>
            (u) Đăng bán các hàng hóa xâm phạm quyền tác giả, nhãn hiệu hoặc các quyền sở hữu trí tuệ khác của các bên thứ ba hoặc sử dụng Dịch Vụ
            theo các cách thức có thể xâm phạm đến quyền sở hữu trí tuệ của thuocsi.vn, bao gồm bất kỳ quyền sở hữu trí tuệ nào và khả năng gây nhầm
            lẫn cho các quyền đó;
          </span>
        </p>
        <p>
          <span>
            6.3 Người Sử Dụng hiểu rằng các Nội Dung, dù được đăng công khai hoặc truyền tải riêng tư, là hoàn toàn thuộc trách nhiệm của người đã tạo
            ra Nội Dung đó. Người Sử Dụng hiểu rằng bằng cách sử dụng Trang thuocsi.vn, bạn có thể gặp phải Nội Dung mà bạn cho là phản cảm, không
            đúng đắn hoặc chưa phù hợp. thuocsi.vn sẽ không chịu trách nhiệm đối với Nội Dung, bao gồm lỗi hoặc thiếu sót liên quan đến Nội Dung, hoặc
            tổn thất hoặc thiệt hại xuất phát từ việc sử dụng, hoặc dựa trên, Nội Dung được đăng tải, gửi thư, chuyển tải hoặc bằng cách khác công bố
            trên Trang thuocsi.vn.
          </span>
        </p>
        <p>
          <span>
            6.4 Người Sử Dụng thừa nhận rằng thuocsi.vn và các bên được chỉ định của mình có toàn quyền (nhưng không có nghĩa vụ) sàng lọc, từ chối,
            xóa, dừng, tạm dừng, gỡ bỏ hoặc dời bất kỳ Nội Dung có sẵn trên Trang thuocsi.vn, bao gồm bất kỳ Nội Dung hoặc thông tin nào bạn đã đăng.
            thuocsi.vn có quyền gỡ bỏ Nội Dung (i) xâm phạm đến Điều Khoản Dịch Vụ; (ii) trong trường hợp thuocsi.vn nhận được khiếu nại hơp lệ theo
            quy định pháp luật từ Người Sử Dụng khác; (iii) trong trường hợp thuocsi.vn nhận được thông báo hợp lệ về vi phạm quyền sở hữu trí tuệ
            hoặc yêu cầu pháp lý cho việc gỡ bỏ; hoặc (iv) những nguyên nhân khác theo quy định pháp luật. thuocsi.vn có quyền chặn các liên lạc (bao
            gồm việc cập nhật trạng thái, đăng tin, truyền tin và/hoặc tán gẫu) về hoặc liên quan đến Dịch Vụ nhằm bảo vệ Dịch Vụ hoặc Người Sử Dụng
            của thuocsi.vn, hoặc bằng cách khác thi hành các điều khoản trong Điều Khoản Dịch Vụ này. Người Sử Dụng đồng ý rằng mình phải đánh giá và
            chịu mọi rủi ro liên quan đến, việc sử dụng bất kỳ Nội Dung nào, bao gồm bất kỳ việc dựa vào tính chính xác, đầy đủ, hoặc độ hữu dụng của
            Nội Dung đó.
          </span>
        </p>
        <p>
          <span>
            6.5 Người Sử Dụng chấp thuận và đồng ý rằng thuocsi.vn có thể truy cập, duy trì và tiết lộ thông tin Tài Khoản của Người Sử Dụng trong
            trường hợp pháp luật có yêu cầu hoặc theo lệnh của tòa án hoặc cơ quan nhà nước có thẩm quyền hoặc những nguyên nhân khác theo quy định
            pháp luật mà liên quan đến các vấn đề: (a) tuân thủ các thủ tục pháp luật; (b) thực thi Điều Khoản Dịch Vụ; (c) phản hồi các khiếu nại về
            việc Nội Dung xâm phạm đến quyền lợi của bên thứ ba; (d) phản hồi các yêu cầu của Người Sử Dụng liên quan đến chăm sóc khách hàng; hoặc
            (e) bảo vệ các quyền, tài sản hoặc an toàn của thuocsi.vn, Người Sử Dụng và/hoặc cộng đồng.
          </span>
        </p>

        <h3>
          <span>7. VI PHẠM ĐIỀU KHOẢN DỊCH VỤ</span>
        </h3>
        <p>
          <span>7.1 Việc vi phạm chính sách này có thể dẫn tới một số hành động, bao gồm bất kỳ hoặc tất cả các hành động sau:</span>
        </p>
        <p>
          <span>(a) Xóa danh mục sản phẩm;</span>
        </p>
        <p>
          <span>(b) Giới hạn quyền sử dụng Tài Khoản;</span>
        </p>
        <p>
          <span>(c) Đình chỉ và chấm dứt Tài Khoản;</span>
        </p>
        <p>
          <span>
            (d) Thu hồi tiền/tài sản có được do hành vi gian lận, và các chi phí có liên quan như chi phí vận chuyển của đơn hàng, phí thanh toán…;
          </span>
        </p>
        <p>
          <span>(e) Cáo buộc hình sự;</span>
        </p>
        <p>
          <span>(f) Áp dụng biện pháp dân sự, bao gồm khiếu nại bồi thường thiệt hại và/hoặc áp dụng biện pháp khẩn cấp tạm thời;</span>
        </p>
        <p>
          <span>(g) Các hành động hoặc biện pháp chế tài khác theo Tiêu Chuẩn Cộng Đồng, Quy Chế Hoạt Động, hoặc các Chính Sách thuocsi.vn.</span>
        </p>
        <p>
          <span>
            7.2 Nếu bạn phát hiện Người Sử Dụng trên Trang thuocsi.vn của chúng tôi có hành vi vi phạm Điều Khoản Dịch Vụ, vui lòng liên hệ thuocsi.vn
            qua email{' '}
            <a href="mailto:hotro@thuocsi.vn" style={{ color: '#0000EE', textDecoration: 'underline' }}>
              {' '}
              hotro@thuocsi.vn
            </a>
            .
          </span>
        </p>

        <h3>
          <span>8. BÁO CÁO HÀNH VI CÓ KHẢ NĂNG XÂM PHẠM QUYỀN SỞ HỮU TRÍ TUỆ</span>
        </h3>
        <span>
          Nếu bạn là chủ sở hữu quyền sở hữu trí tuệ (“Chủ Sở Hữu Quyền SHTT”) hoặc là đại diện được ủy quyền Chủ Sở Hữu Quyền SHTT (“Đại Diện Quyền
          SHTT”) và bạn tin rằng các quyền của bản thân hoặc của thân chủ có khả năng bị xâm phạm, vui lòng báo bằng văn bản tới thuocsi.vn qua email
          <a href="mailto:hotro@thuocsi.vn" style={{ color: '#0000EE', textDecoration: 'underline' }}>
            {' '}
            hotro@thuocsi.vn
          </a>{' '}
          và cung cấp cho chúng tôi các tài liệu như được hướng dẫn sau đó để hỗ trợ việc giải quyết khiếu nại. Chúng tôi sẽ xử lý các thông tin được
          cung cấp trong một khoảng thời gian hợp lý. thuocsi.vn sẽ phản hồi khiếu nại của bạn trong vòng 10 (mười) ngày làm việc kể từ ngày nhận được
          khiếu nại của bạn. Vui lòng sử dụng đơn khiếu nại mẫu và chuẩn bị các hồ sơ cần thiết qua email{' '}
          <a href="mailto:hotro@thuocsi.vn" style={{ color: '#0000EE', textDecoration: 'underline' }}>
            {' '}
            hotro@thuocsi.vn
          </a>
          .
        </span>
        <h3>
          <span>9. ĐẶT HÀNG VÀ THANH TOÁN</span>
        </h3>

        <p>
          <span>9.1 Vào từng thời điểm, thuocsi.vn hỗ trợ một hoặc nhiều phương thức thanh toán như sau:</span>
        </p>
        <p>
          <span>
            (i) Thanh Toán Khi Nhận Hàng (COD): thuocsi.vn cung cấp dịch vụ COD, người mua có thể trả tiền mặt trực tiếp cho người vận chuyển vào thời
            điểm nhận hàng.
          </span>
        </p>
        <p>
          <span>
            (ii) Thanh Toán Bằng Chuyển Khoản: thuocsi.vn cung cấp dịch vụ chuyển khoản, người mua có thể chuyển khoản trực tiếp vào tài khoản chính
            thức của thuocsi.vn.
          </span>
        </p>
        <p>
          <span>9.2 Người Mua chỉ có thể thay đổi kênh thanh toán trước khi thực hiện thanh toán.</span>
        </p>
        <p>
          <span>
            9.3 thuocsi.vn không chịu trách nhiệm cũng như có nghĩa vụ nào đối với bất kỳ tổn thất hoặc thiệt hại nào mà Người Mua hoặc Người Bán phải
            chịu từ việc nhập sai thông tin vận chuyển và/hoặc thông tin thanh toán cho đơn hàng đã đặt và/hoặc sử dụng phương thức thanh toán không
            được liệt kê ở Điều 9.1 ở trên. thuocsi.vn bảo lưu quyền kiểm tra tính hợp pháp quyền sử dụng phương thức thanh toán của Người Mua và có
            quyền đình chỉ giao dịch cho đến khi xác nhận được tính hợp pháp hoặc hủy các giao dịch liên quan nếu không thể xác nhận tính hợp pháp
            này.{' '}
          </span>
        </p>
        <p>
          <span>
            9.4 Người Sử Dụng cần cung cấp cho thuocsi.vn thông tin tài khoản ngân hàng để nhận thanh toán, nghĩa là thanh toán cho sản phẩm đã bán
            hoặc hoàn lại từ thuocsi.vn.
          </span>
        </p>
        <h3>
          <span>10. HỆ THỐNG ĐIỂM TÍCH LŨY CỦA thuocsi.vn </span>
        </h3>
        <p>
          <span>
            10.1 Người Sử Dụng có thể tích lũy điểm thưởng khi mua hàng trên Trang thuocsi.vn. Nhìn chung, thuocsi.vn sẽ ghi nhận vào Tài Khoản của
            Người Sử Dụng sau khi hoàn tất giao dịch hoặc giao dịch thành công được thuocsi.vn chấp thuận.{' '}
          </span>
        </p>
        <p>
          <span>
            10.2 Giao dịch chưa hoàn thành trên Trang thuocsi.vn sẽ không đủ điều kiện tham gia hệ thống điểm tích lũy thuocsi.vn. thuocsi.vn có toàn
            quyền loại trừ các mặt hàng không thuộc đối tượng của hệ thống điểm tích lũy của thuocsi.vn.
          </span>
        </p>
        <p>
          <span>
            10.3 Điểm tích lũy không có giá trị tiền tệ, không cấu thành tài sản của Người Sử Dụng và không thể được mua, bán, chuyển nhượng hoặc quy
            đổi thành tiền mặt.
          </span>
        </p>
        <p>
          <span>
            10.4 Tùy thuộc vào các quy tắc và quy định được thuocsi.vn quyết định, thay đổi và chỉnh sửa vào từng thời điểm, tùy thuộc vào hạn mức
            theo toàn quyền quyết định của thuocsi.vn, Người Sử Dụng có thể sử dụng điểm tích lũy bằng cách gửi yêu cầu đến thuocsi.vn và sử dụng điểm
            tích lũy để khấu trừ vào giá sản phẩm khi thực hiện giao dịch mua hàng trên Trang thuocsi.vn theo quy định của thuocsi.vn vào từng thời
            điểm. Tất cả các khoản hoàn tiền phải tuân thủ theo Chính Sách Trả Hàng và Hoàn Tiền tại Mục 12.2.
          </span>
        </p>
        <p>
          <span>
            10.5 Vào từng thời điểm, thuocsi.vn sẽ thông tin đến bạn điểm tích lũy sẽ được áp dụng đối với Hoạt Động Hợp Lệ cụ thể nào. Hoạt Động Hợp
            Lệ có thể bao gồm việc bạn thực hiện mua sắm với Người Bán đang tham gia chương trình hoặc các chương trình khuyến mãi cụ thể của Thuocsi.
          </span>
        </p>
        <p>
          <span>
            10.6 Nếu bạn có khiếu nại liên quan đến số lượng điểm tích lũy nhận được từ Hoạt Động Hợp Lệ, thì khiếu nại đó phải được gửi đến Thuocsi
            qua email{' '}
            <a href="mailto:hotro@thuocsi.vn" style={{ color: '#0000EE', textDecoration: 'underline' }}>
              {' '}
              hotro@thuocsi.vn
            </a>{' '}
            trong vòng 01 (một) tháng kể từ ngày bạn thực hiện giao dịch thành công. Chúng tôi có thể yêu cầu bạn cung cấp bằng chứng để hỗ trợ cho
            việc khiếu nại của bạn. thuocsi.vn bảo lưu quyền từ chối giải quyết khiếu nại nếu thời hạn gửi khiếu nại đã qua.
          </span>
        </p>
        <p>
          <span>
            10.7 thuocsi.vn bảo lưu quyền: (i) ngưng hệ thống điểm tích lũy thuocsi.vn bất cứ lúc nào, và (ii) hủy hoặc hoãn quyền tham gia vào hệ
            thống điểm tích lũy thuocsi.vn của Người Sử Dụng, bao gồm cả khả năng có được hoặc sử dụng điểm tích lũy.
          </span>
        </p>
        <h3>
          <span>11. HỦY ĐƠN HÀNG, TRẢ HÀNG VÀ HOÀN TIỀN</span>
        </h3>

        <p>
          <span>11.1 Người Mua có thể yêu cầu trả hàng và hoàn tiền theo Chính Sách Trả Hàng và Hoàn Tiền của thuocsi.vn.</span>
        </p>
        <p>
          <span>
            11.2 Nếu bạn dùng Điểm tích lũy để đổi mã giảm giá để thanh toán và được hoàn trả dựa trên Chính Sách Trả Hàng và Hoàn Tiền của
            thuocsi.vn, thuocsi.vn sẽ tách biệt khoản hoàn trả bạn đã thanh toán cho món hàng đó và số điểm tích lũy bạn đã dùng vào Tài Khoản của
            bạn.
          </span>
        </p>

        <h3>
          <span>12. TRÁCH NHIỆM CỦA NGƯỜI BÁN </span>
        </h3>

        <p>
          <span>
            12.1 Người Bán phải quản lý và đảm bảo độ chính xác và đầy đủ của các thông tin chẳng hạn liên quan đến giá cả và chi tiết sản phẩm, số
            lượng sản phẩm trong kho cũng như các điều khoản và điều kiện bán hàng được cập nhật trong danh mục sản phẩm của Người Bán và không được
            phép đăng tải các thông tin không chính xác hoặc gây nhầm lẫn.
          </span>
        </p>
        <p>
          <span>
            12.2 Giá sản phẩm được Người Bán toàn quyền quyết định, trừ các sản phẩm được ấn định giá bởi cơ quan có thẩm quyền. Nếu thông tin giá
            hàng hóa hoặc dịch vụ niêm yết không thể hiện rõ giá đó đã bao gồm hay chưa bao gồm những chi phí liên quan đến việc mua hàng hóa hoặc
            dịch vụ như thuế, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác thì giá sản phẩm lúc này được hiểu là đã bao gồm mọi chi phí
            liên quan nói trên.
          </span>
        </p>
        <p>
          <span>
            12.3 Trong giới hạn pháp luật cho phép, Người Bán đồng ý rằng thuocsi.vn có thể, theo toàn quyền quyết định của mình, thực hiện các hoạt
            động khuyến mãi để hỗ trợ các giao dịch giữa Người Bán và Người Mua thông qua việc giảm, chiết khấu hoặc hoàn lại phí hoặc thông qua những
            cách khác. Giá cuối cùng Người Mua cần thanh toán thực tế là giá đã áp dụng những điều chỉnh trên.
          </span>
        </p>
        <p>
          <span>12.4 Người Bán chịu trách nhiệm cung cấp hóa đơn hợp lệ cho Người Mua theo quy định pháp luật.</span>
        </p>
        <p>
          <span>
            12.5 Người Bán thừa nhận và đồng ý rằng Người Bán chịu trách nhiệm chi trả các loại thuế, phí hải quan và bất kỳ loại phí nào đối với sản
            phẩm được bán và thuocsi.vn không cung cấp bất kỳ tư vấn pháp lý hay tư vấn thuế nào liên quan đến vấn đề này.
          </span>
        </p>
        <p>
          <span>
            12.6 Người Bán thừa nhận và đồng ý rằng bất kỳ sự vi phạm nào của Người Bán đối với các chính sách của thuocsi.vn sẽ dẫn đến việc bị xử lý
            theo các quy định tại Mục 7.1.
          </span>
        </p>
        <h3>
          <span>13. PHÍ</span>
        </h3>
        <span>
          Nếu có bất kỳ khoản phí nào phải trả, khoản phí đó cũng là đối tượng chịu thuế theo quy định pháp luật có liên quan. Người Bán thừa nhận và
          đồng ý rằng thuocsi.vn có thể khấu trừ các khoản phí phải trả cho thuocsi.vn và các khoản thuế áp dụng từ số tiền bán hàng được thanh toán
          bởi Người Mua. thuocsi.vn sẽ xuất biên lai hoặc hóa đơn tài chính hợp lệ cho khoản phí và khoản thuế do Người Bán chi trả nếu có yêu cầu.
        </span>
        <h3>
          <span>14. TRANH CHẤP VÀ LUẬT ÁP DỤNG</span>
        </h3>

        <p>
          <span>
            14.1 Trường hợp phát sinh vấn đề liên quan đến giao dịch, Người Bán và Người Mua đồng ý thương lượng với nhau để cố gắng giải quyết tranh
            chấp và thuocsi.vn sẽ cố gắng một cách hợp lý để thu xếp. Nếu vấn đề không được giải quyết bằng thương lượng giữa hai bên, Người Sử Dụng
            có thể khiếu nại lên cơ quan có thẩm quyền của địa phương để giải quyết tranh chấp phát sinh đối với giao dịch.
          </span>
        </p>
        <p>
          <span>
            14.2 Mỗi Người Bán và Người Mua cam kết và đồng ý rằng mình sẽ không tiến hành thủ tục tố tụng hoặc bằng cách khác khiếu nại đối với
            thuocsi.vn hoặc các công ty liên kết của thuocsi.vn (trừ trường hợp thuocsi.vn hoặc các công ty liên kết của mình là Người Bán sản phẩm
            liên quan đến khiếu nại đó) liên quan đến bất kỳ giao dịch nào được thực hiện trên Trang thuocsi.vn hoặc bất kỳ tranh chấp nào liên quan
            đến giao dịch đó.
          </span>
        </p>
        <p>
          <span>
            14.3 Các Điều Khoản Dịch Vụ này sẽ được điều chỉnh và diễn giải theo luật pháp của Việt Nam. Bất kỳ tranh chấp, tranh cãi, khiếu nại hoặc
            sự bất đồng dưới bất cứ hình thức nào phát sinh từ hoặc liên quan đến các Điều Khoản Dịch Vụ này mà liên quan đến thuocsi.vn hoặc bất kỳ
            Bên Được Bồi Thường nào thuộc đối tượng của các Điều Khoản Dịch Vụ này sẽ được giải quyết bằng Trung Tâm Trọng Tài Quốc Tế Việt Nam
            (VIAC). Ngôn ngữ phán xử của trọng tài là Tiếng Việt.
          </span>
        </p>
        <h3>
          <span>15. PHẢN HỒI VÀ ĐÓNG GÓP</span>
        </h3>

        <p>
          <span>
            15.1 thuocsi.vn luôn đón nhận những thông tin và phản hồi từ phía Người Sử Dụng nhằm giúp thuocsi.vn cải thiện chất lượng Dịch Vụ. Vui
            lòng xem thêm quy trình phản hồi của thuocsi.vn dưới đây:
          </span>
        </p>
        <p>
          <span>(i) Phản hồi cần được thực hiện bằng văn bản qua email hoặc sử dụng mẫu phản hồi có sẵn trên ứng dụng;</span>
        </p>
        <p>
          <span>(ii) Tất cả các phản hồi ẩn danh đều không được chấp nhận;</span>
        </p>
        <p>
          <span>(iii) Những phản hồi không rõ ràng và mang tính phỉ báng sẽ không được chấp nhận</span>
        </p>
        <p>
          <span>
            15.2 Khi gửi bất kỳ Nội Dung nào cho thuocsi.vn, bạn khẳng định và bảo đảm rằng bạn đã có đầy đủ tất cả các quyền và/hoặc các chấp thuận
            cần thiết để cấp các quyền dưới đây cho thuocsi.vn. Bạn cũng thừa nhận và đồng ý rằng bạn là người chịu trách nhiệm duy nhất đối với bất
            cứ nội dung gì bạn đăng tải hoặc tạo sẵn trên hoặc qua Dịch Vụ, bao gồm trách nhiệm về độ chính xác, độ tin cậy, tính nguyên bản, rõ ràng
            của các quyền, tính tuân thủ pháp luật và các giới hạn pháp lý liên quan đến bất kỳ Nội Dung được đóng góp nào. Quyền mà bạn trao cho
            chúng tôi chỉ chấm dứt khi bạn hoặc thuocsi.vn loại bỏ Nội Dung đóng góp ra khỏi Dịch Vụ. Bạn hiểu rằng sự đóng góp của bạn có thể được
            chuyển giao sang nhiều hệ thống khác nhau và được thay đổi để phù hợp và đáp ứng các yêu cầu về kỹ thuật.
          </span>
        </p>
        <p>
          <span>
            15.3 Bất kỳ Nội Dung, tài liệu, thông tin hoặc ý tưởng nào Người Sử Dụng đăng tải hoặc thông qua Dịch Vụ, hoặc bằng cách khác chuyển giao
            cho thuocsi.vn dưới bất kỳ hình thức nào (mỗi hình thức được gọi là “Nội Dung Gửi”), sẽ không được bảo mật bởi thuocsi.vn và có thể được
            phổ biến hoặc sử dụng bởi thuocsi.vn hoặc các công ty liên kết mà không phải trả phí hoặc chịu trách nhiệm với Người Sử Dụng, để phục vụ
            bất kỳ mục đích nào, bao gồm việc phát triển, sản xuất và quảng bá sản phẩm. Khi thực hiện Nội Dung Gửi đến thuocsi.vn, bạn thừa nhận và
            đồng ý rằng thuocsi.vn và/hoặc các bên thứ ba có thể độc lập phát triển các phần mềm, ứng dụng, giao diện, sản phẩm và chỉnh sửa và nâng
            cấp các phần mềm, ứng dụng, giao diện, sản phẩm mà chúng đồng nhất hoặc tương tự với các ý tưởng được nêu trong Nội Dung Gửi của bạn về
            chức năng, mã hoặc các đặc tính khác. Điều khoản này không áp dụng đối với các thông tin cá nhân là đối tượng của chính sách bảo mật của
            thuocsi.vn trừ khi bạn công khai những thông tin đó trên hoặc thông qua Dịch Vụ.
          </span>
        </p>
        <p>
          <span>
            15.4 Mỗi một bên đóng góp cho Dịch Vụ về dữ liệu, tin nhắn, hình ảnh, âm thanh, video, phần mềm và Nội Dung khác, sẽ chịu trách nhiệm về
            độ chính xác, độ tin cậy, tính nguyên bản, rõ ràng của các quyền, tính tuân thủ pháp luật và các giới hạn pháp lý liên quan đến bất kỳ Nội
            Dung đóng góp nào. thuocsi.vn sẽ loại bỏ khỏi website/Ứng dụng những thông tin bán hàng giả, hàng nhái, hàng nhập lậu, hàng vi phạm quyền
            sở hữu trí tuệ và các hàng hóa, dịch vụ, thông tin vi phạm pháp luật khác khi phát hiện hoặc nhận được phản ánh có căn cứ xác thực về
            những thông tin này. Người Sử Dụng không có quyền yêu cầu thuocsi.vn phải chịu trách nhiệm đối với bất kỳ các hoạt động nào của Người Sử
            Dụng, bao gồm nhưng không giới hạn, các vấn đề họ đăng tải hoặc bằng cách khác tạo sẵn qua Dịch Vụ.
          </span>
        </p>
        <p>
          <span>
            15.5 Ngoài ra, Trang thuocsi.vn có thể chứa các đường dẫn tới sản phẩm, website, dịch vụ và các lời mời chào của bên thứ ba. Những đường
            dẫn, sản phẩm, websites, dịch vụ và các lời mời chào của bên thứ ba này không thuộc sở hữu và quản lý của thuocsi.vn mà được thực hiện
            bởi, và là tài sản của bên thứ ba tương ứng, và được bảo vệ bởi luật pháp và các điều ước về bản quyền hoặc quyền sở hữu trí tuệ khác.
            thuocsi.vn không xem xét, và không có trách nhiệm đối với những nội dung, chức năng, độ an toàn, dịch vụ, các chính sách bảo mật, hoặc các
            hoạt động khác của những bên thứ ba này. thuocsi.vn khuyến khích Người Sử Dụng tìm hiểu các điều khoản và các chính sách khác được niêm
            yết bởi bên thứ ba trên các website hoặc phương tiện khác của họ. Ngoài ra bạn thừa nhận và đồng ý rằng thuocsi.vn có thể vô hiệu hóa việc
            sử dụng của bạn, hoặc gỡ bỏ bất kỳ các đường dẫn của bên thứ ba nào, hoặc các ứng dụng trên Dịch Vụ trong giới hạn bên thứ ba vi phạm các
            Điều Khoản Dịch Vụ này.
          </span>
        </p>
        <h3>
          <span>16. KHẲNG ĐỊNH VÀ ĐẢM BẢO CỦA NGƯỜI SỬ DỤNG</span>
        </h3>
        <p>
          <span>Người Sử Dụng khẳng định và đảm bảo rằng:</span>
        </p>
        <p>
          <span>
            (a) Người Sử Dụng sở hữu năng lực, (và đối với trường hợp vị thành niên, có sự đồng ý hợp lệ từ cha mẹ hoặc người giám hộ hợp pháp), quyền
            và khả năng hợp pháp để giao kết các Điều Khoản Dịch Vụ này và để tuân thủ các điều khoản theo đó;
          </span>
        </p>
        <p>
          <span>
            (b) Người Sử Dụng chỉ sử dụng Dịch Vụ cho các mục đích hợp pháp và theo quy định của các Điều Khoản Dịch Vụ này cũng như tất cả các luật,
            quy tắc, quy chuẩn, chỉ thị, hướng dẫn, chính sách và quy định áp dụng.
          </span>
        </p>
        <h3>
          <span>17. BỒI THƯỜNG</span>
        </h3>
        <span>
          Bạn đồng ý bồi thường, bảo vệ và không gây hại cho thuocsi.vn, các công ty liên kết, giám đốc, đồng sở hữu thương hiệu hoặc đối tác, và nhân
          viên của thuocsi.vn (gọi chung là “Bên Được Bồi Thường”) liên quan đến việc khiếu nại, hành động, thủ tục tố tụng, và các vụ kiện cũng như
          nghĩa vụ, tổn thất, thanh toán, khoản phạt, tiền phạt, chi phí và phí tổn có liên quan (bao gồm chi phí giải quyết tranh chấp) phát sinh từ
          (a) giao dịch được thực hiện trên Trang thuocsi.vn, hoặc tranh chấp liên quan đến giao dịch đó (trừ trường hợp thuocsi.vn hoặc các công ty
          liên kết của thuocsi.vn là Người Bán đối với giao dịch liên quan đến khiếu nại), (b) Chính Sách Đảm Bảo của thuocsi.vn, (c) việc tổ chức,
          hoạt động, quản trị và/hoặc điều hành các Dịch Vụ được thực hiện bởi hoặc đại diện cho thuocsi.vn, (d) vi phạm hoặc không tuân thủ bất kỳ
          điều khoản nào trong các Điều Khoản Dịch Vụ này hoặc bất kỳ chính sách hoặc hướng dẫn nào được tham chiếu theo đây, (e) việc bạn sử dụng
          hoặc sử dụng không đúng Dịch Vụ, hoặc (f) vi phạm của bạn đối với bất kỳ luật hoặc bất kỳ các quyền của bên thứ ba nào, hoặc (g) bất kỳ Nội
          Dung nào được đăng tải bởi Người Sử Dụng.
        </span>

        <h3>
          <span>18. TÍNH RIÊNG LẺ</span>
        </h3>
        <span>
          Nếu bất kì điều khoản nào trong Điều Khoản Dịch Vụ này không hợp pháp, bị bãi bỏ, hoặc vì bất kỳ lý do nào không thể thực thi theo pháp
          luật, thì điều khoản đó sẽ được tách ra khỏi các điều khoản và điều kiện này và sẽ không ảnh hưởng tới hiệu lực cũng như tính thi hành của
          bất kỳ điều khoản còn lại nào cũng như không ảnh hưởng tới hiệu lực cũng như tính thi hành của điều khoản sẽ được xem xét theo luật.
        </span>
        <h3>
          <span>19. QUY ĐỊNH CHUNG</span>
        </h3>
        <p>
          <span>19.1 thuocsi.vn bảo lưu tất cả các quyền lợi không được trao theo Điều Khoản Dịch Vụ này.</span>
        </p>
        <p>
          <span>
            19.2 thuocsi.vn có quyền chỉnh sửa các Điều Khoản Dịch Vụ này vào bất cứ thời điểm nào thông qua việc đăng tải các Điều Khoản Dịch Vụ được
            chỉnh sửa lên Trang thuocsi.vn. Việc Người Dùng tiếp tục sử dụng Trang thuocsi.vn sau khi việc thay đổi được đăng tải sẽ cấu thành việc
            Người Sử Dụng chấp nhận các Điều Khoản Dịch Vụ được chỉnh sửa.
          </span>
        </p>
        <p>
          <span>
            19.3 Người Sử Dụng không được phép chuyển giao, cấp lại quyền hoặc chuyển nhượng bất kỳ các quyền hoặc nghĩa vụ được cấp cho Người Sử Dụng
            theo Điều Khoản Dịch Vụ này.
          </span>
        </p>
        <p>
          <span>
            19.4 Không một quy định nào trong các Điều Khoản Dịch Vụ này sẽ cấu thành quan hệ đối tác, liên doanh hoặc quan hệ đại lý – chủ sở hữu
            giữa bạn và thuocsi.vn.
          </span>
        </p>
        <p>
          <span>
            19.5 Tại bất kỳ hoặc các thời điểm nào, nếu thuocsi.vn không thể thực hiện được bất kỳ điều khoản nào theo đây thì sẽ không ảnh hưởng,
            dưới bất kỳ hình thức nào, đến các quyền của thuocsi.vn vào thời điểm sau đó để thực thi các quyền này trừ khi việc thực thi các quyền này
            được miễn trừ bằng văn bản.
          </span>
        </p>
        <p>
          <span>
            19.6 Các Điều Khoản Dịch Vụ này hoàn toàn phục vụ cho lợi ích của thuocsi.vn và Người Sử Dụng thay vì lợi ích của bất kỳ cá nhân hay tổ
            chức nào khác, trừ các công ty liên kết và các công ty con của thuocsi.vn (và cho từng bên kế thừa hay bên nhận chuyển giao của thuocsi.vn
            hoặc của các công ty liên kết và công ty con của thuocsi.vn).
          </span>
        </p>
        <p>
          <span>
            19.7 Việc các bên giao kết thỏa thuận được tạo thành theo các Điều Khoản Dịch Vụ này, các bên không dựa vào bất kỳ tuyên bố, khẳng định,
            đảm bảo, cách hiểu, cam kết, lời hứa hoặc cam đoan nào của bất kỳ người nào trừ những điều được nêu rõ trong các Điều Khoản Dịch Vụ này.{' '}
          </span>
        </p>
        <p>
          <span>
            19.8 Nếu bạn có bất kỳ câu hỏi hay thắc mắc nào liên quan đến Điều Khoản Dịch Vụ hoặc các vấn đề phát sinh liên quan đến Điều Khoản Dịch
            Vụ trên Trang thuocsi.vn, vui lòng liên hệ thuocsi.vn qua email{' '}
            <a href="mailto:hotro@thuocsi.vn" style={{ color: '#0000EE', textDecoration: 'underline' }}>
              {' '}
              hotro@thuocsi.vn
            </a>
          </span>
        </p>
        <p>
          <span>
            TÔI ĐÃ ĐỌC CÁC ĐIỀU KHOẢN DỊCH VỤ NÀY VÀ ĐỒNG Ý VỚI TẤT CẢ CÁC ĐIỀU KHOẢN NHƯ TRÊN CŨNG NHƯ BẤT KỲ ĐIỀU KHOẢN NÀO ĐƯỢC CHỈNH SỬA SAU NÀY.
            BẰNG CÁCH BẤM NÚT “ĐĂNG KÝ” HOẶC “ĐĂNG KÝ QUA FACEBOOK” KHI ĐĂNG KÝ SỬ DỤNG TRANG thuocsi.vn, TÔI HIỂU RẰNG TÔI ĐANG TẠO CHỮ KÝ ĐIỆN TỬ MÀ
            TÔI HIỂU RẰNG NÓ CÓ GIÁ TRỊ VÀ HIỆU LỰC TƯƠNG TỰ NHƯ CHỮ KÝ TÔI KÝ BẰNG TAY.
          </span>
        </p>
      </div>
    </div>
  </Dialog>
);

export default TermOfUseModal;
