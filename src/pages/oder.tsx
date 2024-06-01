import React, { useEffect, useState } from "react";
import '../assets/css/donhang.css';
import { createOrder, apiUpdate, apiGetProductById } from "../services/oder.services";
import { useNavigate } from 'react-router-dom';

interface CartItem {
  maSanPham: number;
  anhDaiDien: string;
  tenSanPham: string;
  gia: number;
  quantity: number;
}

const Oder: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingInfo, setShippingInfo] = useState({
    tenKH: "",
    sdt: "",
    email: "",
    diachi: "",
    diaChiGiaoHang: "",
    ngayTao: new Date(),
    ngayDuyet: new Date(),
    tongGia: 0,
  });
  const [errors, setErrors] = useState({
    tenKH: "",
    sdt: "",
    email: "",
    diachi: "",
    diaChiGiaoHang: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let list: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(list);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      setShippingInfo(prevState => ({
        ...prevState,
        tenKH: user.hoTen || "",
        sdt: user.soDienThoai || "",
        email: user.email || "",
        diachi: user.diaChi || "",
      }));
    }
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => total + item.gia * item.quantity, 0);
    setTotalPrice(totalPrice);
    setShippingInfo(prevState => ({
      ...prevState,
      tongGia: totalPrice
    }));
  }, [cart]);

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "tenKH":
        if (!value) error = 'Họ và tên không được để trống.';
        break;
      case "sdt":
        const phonePattern = /^[0-9]{10}$/;
        if (!value || !phonePattern.test(value)) error = 'Số điện thoại không hợp lệ.';
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailPattern.test(value)) error = 'Email không hợp lệ.';
        break;
      case "diachi":
        if (!value) error = 'Địa chỉ không được để trống.';
        break;
      case "diaChiGiaoHang":
        if (!value) error = 'Địa chỉ nhận không được để trống.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
    const error = validateField(name, value);
    setErrors(prevState => ({
      ...prevState,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = Object.values(errors).every(error => error === "") &&
                    Object.values(shippingInfo).every(value => value !== "");
    if (!isValid) {
      alert("Vui lòng kiểm tra lại thông tin.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const maTaiKhoan = user.maTaiKhoan;
      if (!maTaiKhoan) {
        alert("Không thể tìm thấy mã tài khoản người dùng. Vui lòng đăng nhập lại.");
        return;
      }

      for (const item of cart) {
        const product = await apiGetProductById(item.maSanPham);
        if (product.soLuong < item.quantity) {
          alert(`Sản phẩm ${item.tenSanPham} không đủ số lượng. Chỉ còn ${product.soLuong} trong kho.`);
          return;
        }
      }

      const orderData = {
        tenKH: shippingInfo.tenKH,
        diachi: shippingInfo.diachi,
        maTaiKhoan: maTaiKhoan,
        tongGia: totalPrice,
        email: shippingInfo.email,
        sdt: shippingInfo.sdt,
        diaChiGiaoHang: shippingInfo.diaChiGiaoHang,
        ngayTao: shippingInfo.ngayTao,
        ngayDuyet: shippingInfo.ngayDuyet,
        list_json_chitiethoadon: cart.map(item => ({
          maSanPham: item.maSanPham,
          soLuong: item.quantity,
          donGia: item.gia,
        }))
      };

      const response = await createOrder(orderData);

      for (const item of cart) {
        await apiUpdate({
          maSanPham: item.maSanPham,
          soLuong: -item.quantity
        });
      }

      alert("Đơn hàng đã được tạo thành công!");
      console.log("Đơn hàng đã được tạo:", response);

      localStorage.removeItem("cart");
      setCart([]);
      navigate('/');
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
    }
  };

  return (
    <div id="content">
      <div className="wrapper">
        <ul className="hang">
          <li>
            <h4>
              <a href="/">Trang chủ</a>
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
                {errors.tenKH && <span className="error">{errors.tenKH}</span>}
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
                {errors.sdt && <span className="error">{errors.sdt}</span>}
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
                {errors.email && <span className="error">{errors.email}</span>}
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
                {errors.diachi && <span className="error">{errors.diachi}</span>}
              </div>
              <input
                type="hidden"
                name="tongGia"
                value={totalPrice.toString()}
                onChange={handleInputChange}
                readOnly
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
                {errors.diaChiGiaoHang && <span className="error">{errors.diaChiGiaoHang}</span>}
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
          {cart.map((item, index) => (
            <div key={index} className="mathang">
              <img src={item.anhDaiDien} alt={item.tenSanPham} />
              <div className="tttritiet">
                <a style={{ color: "#bd2026" }} href="#">
                  {item.tenSanPham}
                </a>
                <p style={{ padding: "10px 0px 10px" }}>
                  Số lượng: {item.quantity}
                  <br />
                  <span>{item.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </p>
              </div>
            </div>
          ))}
          <div className="tong1">
            <div className="tamtinh">
              <span>Tạm tính : </span>
              <strong>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
            </div>
            <div className="phuphi">
              <span>Phụ phí : </span>
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
              <strong>{(totalPrice * 1.1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oder;
