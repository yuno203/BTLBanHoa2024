import React,{useEffect,useState} from "react";
import '../assets/css/donhang.css';
import { createOrder } from "../services/oder.services";
import { Link } from "react-router-dom";
interface CartItem {
  maSanPham: number;
  anhDaiDien: string;
  tenSanPham: string;
  gia: number;
  quantity: number;
}

const Oder: React.FC = () => {
      const [cart, setCart] = useState<CartItem[]>([]);
      const [totalPrice, settotalPrice] = useState<Number>(0);
      const [shippingInfo, setShippingInfo] = useState({
        tenKH: "",
        sdt: "",
        email: "",
        diachi: "",
        diaChiGiaoHang: "",
        ngayTao: new Date(), // Thêm trường ngày tạo
        ngayDuyet: new Date() ,// Thêm trường ngày duyệt
        tongGia: totalPrice,
      
      });
      useEffect(() =>{
        let list :CartItem[] = JSON.parse(localStorage.getItem("cart")||"[]");
        setCart(list);
      },[])
      useEffect(() => {
        const totalPrice = cart.reduce((total, item) => total + item.gia * item.quantity, 0);
        settotalPrice(totalPrice);
      }, [cart]);
  
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'tongGia') {
          setShippingInfo(prevState => ({
            ...prevState,
            [name]: totalPrice // Cập nhật giá trị tổng giá vào shippingInfo
          }));
        } else {
          setShippingInfo(prevState => ({
            ...prevState,
            [name]: value
          }));
        }
      };
      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const orderData = {
            tenKH: shippingInfo.tenKH,
            diachi: shippingInfo.diachi,
            tongGia: totalPrice,
            email: shippingInfo.email,
            sdt: shippingInfo.sdt,
            diaChiGiaoHang: shippingInfo.diaChiGiaoHang,
            ngayTao: shippingInfo.ngayTao,
            ngayDuyet: shippingInfo.ngayDuyet, // Thêm ngày duyệt vào dữ liệu đơn hàng
            list_json_chitiethoadon: cart.map(item => ({
              maSanPham: item.maSanPham, // Thay thế maSanPham bằng trường nào đại diện cho mã sản phẩm
              soLuong: item.quantity,
              donGia: item.gia,
            }))
          };
          const response = await createOrder(orderData);
          // Xử lý kết quả trả về từ API tại đây
          alert("Đơn hàng đã được tạo thành công!");
          console.log("Đơn hàng đã được tạo:", response);
        } catch (error) {
          console.error("Lỗi khi tạo đơn hàng:", error);
        }
      };
    return(
        
        <div id="content">
  <div className="wrapper">
    <ul className="hang">
      <li>
        <h4>
          <a href="#">Trang chủ</a>
        </h4>
        <i className="fa-regular fa-slash-back" style={{ color: "#511f1f" }} />
      </li>
      <li>
        <h4 style={{ marginLeft: 20 }}>
          <a href="#">Giỏ hàng</a>
        </h4>
      </li>
    </ul>
  
    <div className="thongtin" style={{ marginTop: 10 }}>
    <form onSubmit={handleSubmit}>
      <div className="thongtinmua">
        <div>
          <h3>Thông tin người mua</h3>
          <label htmlFor="" style={{ marginTop: 10 }}>
            Lấy thông tin liên lạc từ:{" "}
          </label>
          <a href="" style={{ marginLeft: 10 }}>
            <img
              style={{ height: 15, marginTop: 10 }}
              src="../anhhoa/Screenshot 2023-03-25 104904.png"
              alt=""
            />{" "}
            Google
          </a>
        </div>
        <div>
          
          <label htmlFor="">
            <span className="red">*</span> Họ và tên:
          </label>
          <input
              id="tro"
              type="text"
              name="tenKH"
              value={shippingInfo.tenKH}
              onChange={handleInputChange}
              spellCheck="false"
              required
            />
          <span className="tttrave" id="tttrave" />
        </div>
        <div>
          <label htmlFor="">
            <span className="red">*</span> Điện thoại:
          </label>
          <input
              type="text"
              name="sdt"
              value={shippingInfo.sdt}
              onChange={handleInputChange}
              spellCheck="false"
              required
            />
          <span className="tttrave" id="tttravesdt" />
        </div>
        <div>
          <label htmlFor="">
            <span className="red">*</span>Email của bạn:
          </label>
          <input
              type="text"
              name="email"
              value={shippingInfo.email}
              onChange={handleInputChange}
              spellCheck="false"
              required
            />
          <span className="tttrave" id="tttraveemail" />
        </div>
        <div>
          <label htmlFor="">
            <span className="red">*</span>Địa chỉ :
          </label>
          <input
              type="text"
              name="diachi"
              value={shippingInfo.diachi}
              onChange={handleInputChange}
              spellCheck="false"
              required
            />
        </div>
        <input
        type="hidden"
        name="tongGia"
        value={totalPrice.toString()}
        onChange={handleInputChange}
        readOnly // Đảm bảo người dùng không thể thay đổi giá trị tổng giá tiền bằng cách nhập
        />
      </div>
      <div className="thongtinmua">
       
        <div>
          <label htmlFor="">
            <span className="red">*</span>Địa chỉ nhận :
          </label>
          <input
              type="text"
              name="diaChiGiaoHang"
              value={shippingInfo.diaChiGiaoHang}
              onChange={handleInputChange}
              spellCheck="false"
              required
            />
          <div style={{ display: "none" }} className="tttrave">
            Nhập địa chỉ người nhận
          </div>
        </div>
     
      </div>
      <div className="thongtinmua">
        <div>
          <h3>Lời nhắn</h3>
        </div>
        <div>
          <div className="thiep">
            <label htmlFor="">Thiệp gửi tặng cho:</label>
            <select name="" id="">
              <option value="" selected>
                Thiệp gửi cho
              </option>
              <option value="">Anh, chị em</option>
              <option value="">Bố mẹ </option>
              <option value="">Nguời yêu</option>
            </select>
          </div>
          <div className="thiep">
            <label htmlFor="">Nhân dịp:</label>
            <select name="" id="">
              <option value="" selected>
                Nhân dịp
              </option>
              <option value="">Sinh nhật</option>
              <option value="">kỉ niệm</option>
              <option value="">Vui </option>
            </select>
          </div>
          <div className="thongdiep">
            <label htmlFor="">Thông điệp:</label>
            <textarea
              style={{ marginTop: 10 }}
              name=""
              id=""
              cols={91}
              rows={3}
              defaultValue={""}
            />
          </div>
          <div className="thongdiep">
            <label style={{ width: "100%" }} htmlFor="">
              Lời nhắn cho Hoayeuthuong.com:
            </label>
            <textarea
              style={{ marginTop: 10 }}
              name=""
              id=""
              cols={91}
              rows={3}
              defaultValue={""}
            />
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Xuất hóa đơn GTGT</label>
          </div>
        </div>
        <div>
          <div className="datmua">
            <a href="">
            <button type="submit">Đặt mua</button>
            </a>
          </div>
        </div>
      </div>
      </form>
    </div>
    <div className="thongtinphai">
  {/* Hiển thị từng mặt hàng */}
  {cart.map((item, index) => (
    <div key={index} className="mathang">
      {item.maSanPham}
      <img src={item.anhDaiDien} alt={item.tenSanPham} />
      <div className="tttritiet">
        <a style={{ color: "#bd2026" }} href="#">
          {item.tenSanPham}
        </a>
        <p style={{ padding: "10px 0px 10px" }}>
          Số lượng: <span>{item.gia}đ</span>
        </p>
      </div>
    </div>
  ))}

  <div className="tong1">
    <div className="tamtinh">
      <span>Tạm tính : </span>
      <strong>{totalPrice.toString()}đ</strong>
    </div>
    <div className="phuphi">
      <span>phụ phí : </span>
      <strong>-</strong>
    </div>
    <div className="giamgia">
      <span>Giảm giá : </span>
      <strong>-</strong>
    </div>
    <div className="VAT">
      <span>Hóa đơn VAT : </span>
      <strong>10%</strong>
    </div>
    <div
      style={{
        width: "100%",
        height: "0.5px",
        backgroundColor: "#e1e1e1",
      }}
    ></div>
    <div className="tongcong" style={{ marginBottom: 10 }}>
      <span>Tổng cộng : </span>
      <strong>123.456</strong>
    </div>
  </div>
</div>

  </div>
</div>
    )
}
export default Oder;
