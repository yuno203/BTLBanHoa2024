import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../services/detail.services";
import '../assets/css/chitietsp.css';
import { addtoCart } from "../utils/cart";
import { useRecoilCallback, useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
import { getList } from "../services/list.services";
const Detail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<any>(null);
  const [cart, setCart] = useRecoilState(cartState);
  const [data, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getItem(id);
        setProductDetail(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    }

    fetchData();
  }, [id]);
  useEffect(() => {
    async function loadData(id: any) {
      try {
        const items = await getList({
          page: page,
          pageSize: pageSize,
          maChuyenMuc: productDetail.maChuyenMuc, // Using maChuyenMuc from productDetail
        });
        setDatas(items.data);
      } catch (error) {
        console.error("Error fetching list data:", error);
      }
    }
    if (productDetail) {
      loadData(id);
    }
  }, [productDetail, page, pageSize]);;

  // Kiểm tra xem productDetail đã được tải chưa
  if (!productDetail) {
    return <div>Loading...</div>;
  }
  return (
   <>
   <div id="content">
  <div className="wrapper">
    <ul className="hang">
      <li>
        <h4>
          <a href="#">Trang chủ</a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#">Cây may mắn</a>
        </h4>
      </li>
      <li>
        <h4>
          <a href="#">Lan hồ điệp</a>
        </h4>
      </li>
    </ul>
    <div className="ttchitiet">
      <div className="dulieu_trai">
        <div className="imgchitiet">
          <img width={300} height={360} src={productDetail.anhDaiDien} />
        </div>
        <a
          style={{ display: "block", textAlign: "center", color: "#2f80ed" }}
          href="#"
        >
          {productDetail.maChuyenMuc}
          Xem ảnh thực tế
        </a>
      </div>
      <div className="dulieu_phai">
        <h2>
        {productDetail.tenSanPham}
        </h2>
        <div className="giatt">
          <span className="giacu">1.000.000đ</span>
          <span className="giamoi">
          {productDetail.gia}đ
          </span>
        </div>
        <p className="vat">Giá đã bao gồm 10% VAT</p>
        <div className="gach" />
        <div className="luuytritiet" style={{ fontSize: 14 }}>
          Lưu ý: Kệ chúc mừng size để bàn, kích thước: 40 x 60 (cm)
        </div>
        <h4 style={{ color: "#a6a6a6", marginTop: 10, fontSize: 14 }}>
          Sản phẩm bao gồm:{" "}
        </h4>
        <ul className="ndsanpham">
          <li>Cẩm chướng đơn đỏ : 7</li>
          <li>Hoa Cúc Lưới Xanh: 5</li>
          <li>Hồng đỏ Ecuador DL: 10</li>
          <li>Lan bò cạp : 10</li>
          <li>Sen đá lớn: 1</li>
          <li>Đồng tiền trắng : 10</li>
        </ul>
        <p>
          <i>
            Sản phẩm thực nhận có thể khác với hình đại diện trên website (đặc
            điểm thủ công và tính chất tự nhiên của hàng nông nghiệp)
          </i>
        </p>
        <p className="giaohangnhanh">Hoa giao nhanh 60 phút Hồ Chí Minh</p>
        <div className="luuy">
          <h4>LƯU Ý</h4>
          <p>Sản phẩm bạn đang chọn là sản phẩm được thiết kế đặc biệt!</p>
          <p>
            Hiện nay, Hoayeuthuong.com chỉ thử nghiệm cung cấp cho thị trường
            <strong>Tp. Hồ Chí Minh và Hà Nội</strong>
          </p>
        </div>
        <div className="nutbam">
          <button className="btnAdd" id="giohang" onClick={() =>{
              addtoCart({ maSanPham: productDetail.maSanPham,
                anhDaiDien : productDetail.anhDaiDien, 
              tenSanPham: productDetail.tenSanPham, 
              gia: productDetail.gia, 
            });
              let list = JSON.parse(localStorage.getItem('cart')||"[]");
              setCart(list);
          }}>  
            Thêm giỏ hàng
          </button>
          <a href="./giohang.html" className="muahang" ng-click="cart()">
            Mua ngay
          </a>
        </div>
        <div className="sodienthoai">
          <a style={{ color: "#4caf50" }} href="#">
            Gọi ngay : 0327000908
          </a>
        </div>
        <div className="luuy" style={{ marginTop: 20 }}>
          <h4>ƯU ĐÃI ĐẶC BIỆT</h4>
          <ul >
            <li>Tặng Banner Hoặc Thiệp (Trị Giá 20.000đ - 50.000đ) Miễn Phí</li>
            <li>
              Giảm Tiếp 3% Cho Đơn Hàng Bạn Tạo ONLINE Lần Thứ 2, 5% Cho Đơn
              Hàng Bạn Tạo ONLINE Lần Thứ 6 Và 10% Cho Đơn Hàng Bạn Tạo ONLINE
              Lần Thứ 12.
            </li>
            <li>Giao Miễn Phí Trong Nội Thành 63/63 Tỉnh</li>
            <li>Giao Gấp Trong Vòng 2 Giờ</li>
            <li>Cam Kết 100% Hoàn Lại Tiền Nếu Bạn Không Hài Lòng</li>
            <li>Cam Kết Hoa Tươi Trên 3 Ngày</li>
          </ul>
        </div>
        <div className="sp_items">
          <h2>CÁC NHÓM HOA</h2>
          <a href="#">Hoa khai trương</a>
          <a href="#">Hoa chúc mừng </a>
          <a href="#">Hoa chúc sức khỏe</a>
          <a href="#">Hoa tặng bạn bè </a>
          <a href="#">Hoa tặng mẹ</a>
          <a href="#">Hoa tặng cho nam</a>
          <a href="#">Hộp hoa tươi</a>
          <a href="#">Hoa hồng</a>
          <a href="#">Màu đỏ</a>
          <a href="#">Hoa tình yêu</a>
        </div>
      </div>
    </div>
    <div className="wrapper">
      <h3 className="h3_gioithieu">
        TẠI SAO BẠN NÊN DÙNG DỊCH VỤ CỦA CHÚNG TÔI?
      </h3>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-free-ship.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Miễn phí giao hàng 63 tỉnh </div>
            <div className="nd_gt">Free shipping (nội thành)</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-support-247.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Phục vụ 24/24</div>
            <div className="nd_gt">24/7 service</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-vat.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Giá đã gồm 10% VAT</div>
            <div className="nd_gt">Price iclude VAT</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-quick-delivery.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Giao nhanh trong 60 phút</div>
            <div className="nd_gt">60 minutes quick delivery</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-guarantee-smile.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Cam kết hài lòng 100%</div>
            <div className="nd_gt">100% guarantee smile</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-fresh-warranty.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Cam kết hoa tươi 3+ ngày</div>
            <div className="nd_gt">3+ day fresh warranty</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-postcard.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Tặng thiệp cao cấp</div>
            <div className="nd_gt">Free greeting cards</div>
          </div>
        </a>
      </div>
      <div className="gioithieu">
        <a href="#">
          <div className="img_gioithieu">
            <img src="../anhhoa/icon-discount.png" alt="" />
          </div>
          <div className="text_gioithieu">
            <div className="title_gt">Giảm giá đến 10%</div>
            <div className="nd_gt">Receive 3-10% discount</div>
          </div>
        </a>
      </div>
    </div>
    <div className="dulieu4">
      <h4>NHỮNG MẪU HOA TƯƠI CÙNG LOẠI KHÁC</h4>
      {data.map((x: any )=>(
      <div className="sanpham">
        <div className="i">
          <a>
            <img src={x.anhDaiDien} />
          </a>
        </div>
        <div className="t">
          <a href="">{x.tenSanPham}</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>{x.gia}</em>
          </span>
          <span className="selebe">Sale</span>
          <span className="view" style={{color:'black'}}>👁️{x.luotXem}</span>
        </div>
      </div>
       ))}
      {/* <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa2.png" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa3.jpg" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa4.png" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
          <span className="moi" />
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa5.png" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa6.png" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa7.png" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
          <span className="moi" />
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa8.png" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
          <span className="moi" />
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa9.jpg" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
        </div>
      </div>
      <div className="sanpham">
        <div className="i">
          <a>
            <img src="../anhhoa/hoa10.jpg" />
          </a>
        </div>
        <div className="t">
          <a href="">white roses</a>
          <br />
          <span className="thuoctinh">
            <em className="gianiemiet">450.000d</em>
            <em>350.000d</em>
          </span>
          <span className="selebe">Sale</span>
          <span className="moi" />
        </div>
      </div> */}
    </div>
   
  </div>
  <a href="#" className="xemthem">
      "Xem thêm, còn 38 sản phẩm"
    </a>
</div>

   </>
  );
};
export default Detail;