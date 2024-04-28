import React from 'react';
import { Link, useNavigate  } from "react-router-dom";
import { closeNav, closeNavMid, openNav, openNavMid } from "../utils/hide_menu";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
import { getMenus } from "../services/header.services";

const Header = function () {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useRecoilState(cartState);
  const navigate  = useNavigate(); // Sử dụng hook useHistory ở đây
  const [searchQuery, setSearchQuery] = useState('');
   useEffect(() => {
    let list = JSON.parse(localStorage.getItem('cart')||"[]")
    setCart(list);
    async function loadData() {
      let data = await getMenus();
      setMenus(data);
      console.log(data);
    }
    loadData();
  }, []);
  const handleSearch = () => {
    navigate(`/search/${encodeURIComponent(searchQuery)}`); 
  };
  
  return (
    <>
        <header>
        <div className="dropdown" style={{ float: "left", padding: 10 }}>
          <div style={{ float: "left" }}> Nơi Giao Hàng :</div>
          <button className="dropbtn">Hà Nội</button>
          <div className="dropdown-content">
            <a href="#">Hà Nội </a>
            <a href="#">Sài Gòn</a>
            <a href="#">Đà Nẵng</a>
          </div>
        </div>
      </header>
      <div className="wrapper">
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434428_dien-hoa.png" />
            <h2>Hoa bó</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434427_hoa-cat-canh.png" />
            <h2>hoa tươi</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434426_cay-xanh.png" />
            <h2>cây hoa</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434454_only-rose.png" />
            <h2>Hoa hồng</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434436_hoa-tet (1).png" />
            <h2>Hoa tết</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434425_lan-ho-diep.png" />
            <h2>Hoa lan</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434422_qua-tang-gau-bong.png" />
            <h2> Tặng gấu bông</h2>
          </a>
        </div>
        <div className="brand-tap">
          <a href="#">
            <img src="../anhhoa/434421_qua-tang-khac.png" />
            <h2>Quà tặng khác</h2>
          </a>
        </div>
      </div>
      <nav>
        <div className="wrapper">
          <div className="logo">
          <Link to={"/"} id="m">
              <img src="../anhhoa/logo-hoa-yeu-thuong.png" />
          </Link>
          </div>
          <div className="search">
        
            <input id="txtSearch"
              type="text"
              placeholder="Tìm sản phẩm"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button className='btntimkiem' onClick={handleSearch}>Tìm Kiếm</button>
              
            <a href="tel:032000907" className="support">
              <strong>Hotline miền Nam</strong>
              <span>032 7000907</span>
            </a>
            <a href="tel:0327000907" className="support">
              <strong>Hotline miền Bắc</strong>
              <span>032 7000907</span>
            </a>
            <a href="#" className="support zaloOA">
              <img src="../anhhoa/zalo-chat-icon.png" />
            </a>
          </div>
          <Link to={"/cart"} id="m">
          <div className="cart">
            <a id="shopping-cart" href="">
              <img src="../anhhoa/shopping-bag.png" />
              <strong>Giỏ hàng</strong>
               <span className="cart-item-count">{cart.length}</span>
            </a>
          </div>
          </Link>
          <div className="my-account">
            <img src="../anhhoa/user.png" style={{ borderWidth: 0 }} />
            <a title="Tai Khoan" href="#">
              Tài khoản{" "}
            </a>
            <div></div>
          </div>
        </div>
      </nav>
      <div id="top_menu">
        <div className="wrapper">
          <ul className="header_nav">
            <li>
              <strong>
                <a href="" title="Trang chủ">
                  Trang chủ
                </a>
              </strong>
            </li>
            <li className="has_child">
              <h2>
                <a title="Chủ đề">Chủ đề</a>
              </h2>
              <div>
                <h3>
                  <a
                    ng-click="ChiTiet(x.maChuyenMuc)"
                    href="#"
                    title="Hoa Sinh Nhật"
                  >
                    
                  </a>
                </h3>
              </div>
            </li>
            <li className="has_child">
              <h2>
                <a href="#" title="Đối Tượng">
                  Đối Tượng
                </a>
              </h2>
              <div>
              {menus.map((x: any) => (
                  <li>
                    <Link to={"/list/" + x.maChuyenMuc}>
                       <h3><a href="">{x.tenChuyenMuc}</a></h3>
                    </Link>
                  </li>
                ))}
              </div>
            </li>
            <li className="has_child">
              <h2>
                <a href="#" title="Kiểu Dáng">
                  Kiểu Dáng
                </a>
              </h2>
              <div>
                <h3>
                  <a href="#" title="Bó Hoa Tươi">
                    Bó Hoa Tươi
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Giỏ Hoa Tươi">
                    Giỏ Hoa Tươi
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hộp Hoa Tươi">
                    Hộp Hoa Tươi
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Bình Hoa Tươi ">
                    Bình Hoa Tươi{" "}
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hoa Thả Bình">
                    Hoa Thả Bình
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Lãng Hoa Khai Trương">
                    Lãng Hoa Khai Trương
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Lãng Hoa Chia Buồn">
                    Lãng Hoa Chia Buồn
                  </a>
                </h3>
              </div>
            </li>
            <li className="has_child">
              <h2>
                <a href="#" title="Hoa Tươi">
                  Hoa Tươi
                </a>
              </h2>
              <div>
                <h3>
                  <a href="#" title="Only Rose">
                    Only Rose
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hoa Hồng">
                    Hoa Hồng
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hoa Đồng Tiền">
                    Hoa Đồng Tiền
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Lan Hồ Điệp">
                    Lan Hồ Điệp
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Cẩm Chướng">
                    Cẩm Chướng
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hoa ly">
                    Hoa ly
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hoa Cát Tường">
                    Hoa Cát Tường
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hoa Cúc">
                    Hoa Cúc
                  </a>
                </h3>
              </div>
            </li>
            <li className="has_child">
              <h2>
                <a href="#" title="Màu Sắc ">
                  Màu Sắc
                </a>
              </h2>
              <div>
                <h3>
                  <a href="#" title="Màu đỏ ">
                    Màu đỏ
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu cam ">
                    Màu cam
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu vàng ">
                    Màu vàng{" "}
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu lục ">
                    Màu lục{" "}
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu lam">
                    Màu lam
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu tràm">
                    Màu tràm
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu tím">
                    Màu tím
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Màu hồng">
                    Màu hồng
                  </a>
                </h3>
              </div>
            </li>
            <li className="has_child">
              <h2>
                <a href="#" title="Quà Tặng Kèm">
                  Quà Tặng Kèm
                </a>
              </h2>
              <div>
                <h3>
                  <a href="#" title="Bánh Kem">
                    Bánh Kem
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Socola">
                    Socola
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Gấu bông">
                    Gấu bông
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Móc chìa Khóa">
                    Móc chìa Khóa
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Trái Cây">
                    Trái Cây
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Nến Thơm">
                    Nến Thơm
                  </a>
                </h3>
                <h3>
                  <a href="#" title="Hamter">
                    Hamter
                  </a>
                </h3>
              </div>
            </li>
            <li>
              <h2>
                <a href="#">Hoa Cưới</a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="#" title="Ý Nghĩa Hoa">
                  Ý nghĩa hoa
                </a>
              </h2>
            </li>
          </ul>
        </div>
      </div>
      {/* <div id="Quangcao">
        <div className="wrapper">
          <div className="banner">
            <div className="image">
              <img id="img"  src="../anhhoa/2.jpg" />
            </div>
          </div>
          <div className="filter">
            <h2
              style={{
                textAlign: "center",
                color: "#FFFFFF",
                fontSize: 20,
                marginTop: 20,
                marginBottom: 15
              }}
            >
              TƯ VẤN CHỌN HOA TƯƠI
            </h2>
            <div />
            <div className="f">
              <label htmlFor="">Chủ đề</label>
              <select name="" id="">
                <option value="chude" >
                  Hoa sinh nhật
                </option>
                <option value="chude">Hoa cưới</option>
                <option value="chude">Hoa chúc mừng</option>
                <option value="chude">Hoa chia buồn</option>
                <option value="chude">Hoa tốt nghiệp</option>
                <option value="chude">Hoa tình yêu</option>
              </select>
            </div>
            <div />
            <div className="f">
              <label htmlFor="">Mức giá</label>
              <select name="" id="">
                <option value="chude" >
                  Tất cả
                </option>
                <option value="chude">Dưới 250.000</option>
                <option value="chude">Từ 250.000 đến 500.000</option>
                <option value="chude">Từ 500.000 đến 1.000.000</option>
                <option value="chude">Từ 1.000.000 đến 2.000.000</option>
                <option value="chude">Trên 2.000.000</option>
              </select>
            </div>
            <div className="f">
              <button type="button">Tìm Kiếm</button>
            </div>
            <div className="d">
              *Bạn có thể gọi nhanh cho chúng tôi theo số <span>1800 6353 </span>để
              đặt hoa theo thiết kế riêng
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Header;
