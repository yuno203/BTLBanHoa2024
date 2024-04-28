import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import '../assets/css/giohang.css';
import { Link } from "react-router-dom";

interface CartItem {
  anhDaiDien: string;
  tenSanPham: string;
  gia: number;
  quantity: number;
}


const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice , settotalPrice] =useState<Number>(0); 
  useEffect(() => {
    let list: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(list);
  }, []);

  useEffect(()=>{
    const totalPrice = cart.reduce((total, item)=> total + item.gia * item.quantity,0)
    settotalPrice(totalPrice);
  },[cart]);
  const handleDecreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (index >= 0 && index < updatedCart.length && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (index >= 0 && index < updatedCart.length) {
      updatedCart[index].quantity++;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
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
          <div className="nhieugiohang">
            {cart.map((x :any, index: any) => (
              <div key={index} className="giohang">
                <div className="anhchitiet">
                  <img src={x.anhDaiDien} alt="" />
                </div>
                <div className="chitietphai">
                  <span>
                    <a
                      style={{
                        color: "#bd2026",
                        display: "block",
                        fontWeight: 600,
                        fontSize: 14
                      }}
                      href=""
                    >
                      {x.tenSanPham}
                    </a>
                  </span>
                  <br />
                  <p>
                    <span className="gia">
                      {x.gia}
                    </span>
                    <sup>đ</sup>
                  </p>
                  <div className="soluong">
                    <div className="giam" onClick={() => handleDecreaseQuantity(index)} />
                    <input type="text" className="dem" value={x.quantity} readOnly />
                    <div className="tang" onClick={() => handleIncreaseQuantity(index)} style={{ marginLeft: "-1px" }} />
                  </div>
                </div>
                <div className="huy" onClick={() => handleRemoveItem(index)}>
                  <span className="X">
                    X
                  </span>
                  <div className="choosesp" style={{ display: "flex" }}>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>
            ))}
          </div>
   
      
          <div className="tong">
              <div className="tamtinh">
                <span>Tạm tính : </span>
                <strong>{totalPrice.toString()}</strong>
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
                <span>Hóa đơn VAT(5%) : </span>
                <strong>0</strong>
              </div>
              <div
                style={{ width: "100%", height: "0.5px", backgroundColor: "#e1e1e1" }}
              ></div>
              <div className="tongcong" style={{ marginBottom: 10 }}>
                <span>Tổng cộng : </span>
                <strong>0</strong>
              </div>
             
              <div className="datmua">
              <Link to={"/oder"}>Đặt Mua
              </Link>
              </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default Cart;
