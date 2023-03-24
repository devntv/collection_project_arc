/*
Cách tạo file client gọi sang 1 API ngoài 
STEP 1 : xác định url cần gọi tới 
ở đây ta có curl url sẽ là : 
curl --location --request GET 'http://api.v2-stg.thuocsi.vn/warehouse/core/v1/qrcode?code=P042023S04MEDXL041231E041222V015R07PO57139U39T131628568537879C10T1PMK9ISP8I071000000' \
--header 'Authorization: Basic UEFSVE5FUi92MS5lcnA6MWtzOHI5Y3BBanM='

vậy path để gọi sẽ là /warehouse/core/v1/qrcode
phần sau dấu ? sẽ là params 
params là sau dấu ? 
body là dùng cho POST PUT 

vậy ta có 
method: GET 
PATH : /warehouse/core/v1/qrcode
params là code=

=> ta sẽ dùng GET từ clients 
import { GET } from 'clients';

=> API ta gọi đến path , với params chứa code 
ta đặt tên hàm là getInfoQrCode 

const getInfoQrCode = ({ ctx, code }) => GET({ ctx, url: '/warehouse/core/v1/qrcode', params: { code } });


nếu giả sử phương thức là POST hoặc PUT thì sao 

nếu ta cần gửi theo phương thức post với body là code thì sẽ là :
const getInfoQrCode = ({ ctx, code }) => POST({ ctx, url: '/warehouse/core/v1/qrcode', body: { code } });

nếu ta cần gửi theo phương thức put với body là code thì sẽ là :
const getInfoQrCode = ({ ctx, code }) => PUT({ ctx, url: '/warehouse/core/v1/qrcode', body: { code } });

nếu ta cần gửi theo phương thức delete với body là code thì sẽ là :
const getInfoQrCode = ({ ctx, code }) => DELETE({ ctx, url: '/warehouse/core/v1/qrcode', body: { code } });

Cách dùng

const qrCodeRes = await QrCodeClient.getInfoQrCode({ctx,code});

nếu là server-side thì cần ctx , vì ctx chứa header trong đó có chứa authorization, cần truyền vào để lấy và gọi lên server 

*/

import { GET } from 'clients';

const getInfoQrCode = ({ ctx, code }) => GET({ ctx, url: '/warehouse/core/v1/qrcode', params: { code }, isBasic: true });

export default { getInfoQrCode };
