import { useEffect, useState } from "react";
import { apiUpdateView, getAllProducts, getBestSellingProducts } from "../services/home.services";
import Marquee from "react-fast-marquee";
import '../assets/css/Trangchu.css'
import { Link } from "react-router-dom";
import React from 'react';
import { Pagination } from 'antd';

interface Product {
  maSanPham: number;
  tenSanPham: string;
  gia: number;
  dacBiet : boolean;
  luotXem: number;
  soLuong:number;
  anhDaiDien: string;
  //định nghĩa cấu trúc của 1 sản phẩm
}
interface Product1 {
  maSanPham: number;
  tenSanPham: string;
  gia: number;
  dacBiet : boolean;
  luotXem: number;
  anhDaiDien: string;
  //định nghĩa cấu trúc của 1 sản phẩm
}
const Home: React.FC = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<Product1[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  //khai báo các state để lưu trữ thông tin san pham


  const [allProductsdb, setAllProductsdb] = useState<Product[]>([]);
  const [pagedb, setPagedb] = useState<number>(1);
  const [pageSizedb, setPageSizedb] = useState<number>(17);
  const [totalProductsdb, setTotalProductsdb] = useState<number>(0);

  const [viewCounts, setViewCounts] = useState<{ [key: number]: number }>({});
  //su dung useEfect để gọi API và lấy dữ diệu san pham khi cac component duoc render
  //dữ liệu từ các api sẽ đuoc luu vao state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchData = {
          page: page,
          pageSize: pageSize
        };
        const { data, totalItems }: any = await getAllProducts(page, pageSize, searchData);
        setAllProducts(data);
        setTotalProducts(totalItems);
        console.log(totalItems)
        
        // Fetch danh sách sản phẩm bán chạy nhất
        const bestSellingData = await getBestSellingProducts();
        setBestSellingProducts(bestSellingData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchData = {
          page: pagedb,
          pageSize: pageSizedb
        };
        const { data, totalItems }: any = await getAllProducts(page, pageSize, searchData);
        setAllProductsdb(data);
        setTotalProductsdb(totalItems);
        console.log(totalItems)
        
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      }
    };

    fetchData();
  }, [page, pageSize]);
  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };
  const handlePageChangedb = (currentPagedb: number) => {
    setPagedb(currentPagedb);
  };

  const handleProductClick = async (maSanPham: number) => {
    try {
      // Gửi yêu cầu API để tăng lượt xem
      await apiUpdateViewCount(maSanPham);

      // Cập nhật lượt xem trong danh sách hiển thị
      setViewCounts(prevState => ({
        ...prevState,
        [maSanPham]: (prevState[maSanPham] || 0) + 1
      }));
    } catch (error) {
      console.error("Lỗi khi cập nhật lượt xem:", error);
    }
  };

  const apiUpdateViewCount = async (maSanPham: number) => {
    try {
      await apiUpdateView({ maSanPham, luotXem: 1 }); // Gửi yêu cầu API để tăng lượt xem
    } catch (error) {
      throw new Error("Lỗi khi cập nhật lượt xem");
    }
  };


  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const images: string[] = ['../anhhoa/4.jpg','../anhhoa/1.jpg', '../anhhoa/2.jpg', '../anhhoa/3.jpg']; // Danh sách các đường dẫn hình ảnh

  useEffect(() => {
    // Tự động chuyển đổi hình ảnh sau mỗi khoảng thời gian
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000); // Thời gian chuyển đổi: 3 giây

    // Xóa interval khi component bị unmount
    return () => clearInterval(interval);
  }, []); // useEffect sẽ chỉ chạy một lần khi component được render

 
  return (
    <>
     <div id="Quangcao">
        <div className="wrapper">
          <div className="banner">
            <div className="image">
            <img id="img" src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} />
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
      </div>
   <main>
          <div className="icon_hoa">
    <div className="wrapper">
      <h2> MẪU HOA BÁN CHẠY 2023</h2>
      <ul>
      {bestSellingProducts.map((product, index) => (
              <li key={index}>
                 <img src={product.anhDaiDien}/>
              </li>
            ))}
      </ul>
    </div>
  </div>
  <div id="ds_muasp">
    <div className="wrapper">
      <div className="dulieu ">
        <h2>SẢN PHẨM</h2>
        {Array.isArray(allProducts) && allProducts.length > 0 ? (
            allProducts.map((product, index) => (
              <div className="sanphamTC" >
            
              <div key={index} className="item">
                  <Link
                      to={"/detail/" + product.maSanPham} onClick={() => handleProductClick(product.maSanPham)}
                    >
                          {product.soLuong === 0 && <span className="out-of-stock"> <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/445622359_1639688750204344_2840187658282405104_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHsY7OYJGhObHQX7y07EIoZsWC_h1zRdbGxYL-HXNF1sWPRXaGqsqJLYr_TO7GmmVJyCBkYj-5z644v6t5KaaXB&_nc_ohc=ZdYVYga_e60Q7kNvgGiNCk_&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QHJwsq9onzvArw1FNRdCsik8wlkolb-Rf8bQZUVq3RSTA&oe=668183F1"/></span>}
                <div className="i">
                  <a href="#">
                    <img src={product.anhDaiDien} alt={product.tenSanPham} />
                  </a>
                </div>
                <div className="t">
                  <a href="#">{product.tenSanPham}</a>
                  <br />
                  <span className="thuoctinh">
                    <em className="gianiemiet">1.000.000đ</em>
                    <em className="ng-binding">{(product.gia).toLocaleString('vi-VN',{style : 'currency',currency:'VND'})}</em>
                    {/* Hiển thị các thông tin khác của sản phẩm */}
                  </span>
                  <span className="selebe">Sale</span>
                  <span className="view" style={{color:'black'}}>👁️{product.luotXem}</span>
                </div>
                </Link>
              </div>
              </div>
            ))
            
          ) : (
            <div>Không có sản phẩm nào.</div>
          )}
                
        
      </div>
      <Pagination
        current={page}
        total={totalProducts}
        pageSize={pageSize}
        onChange={handlePageChange}
        style={{ textAlign: 'center' }}
      />
      
      <div className="dulieu_top">
        <h2 className="dulieu_tieude">HOA ĐẶC BIỆT</h2>
        <div className="dulieu_link">
          <a href="#">Bó hoa tươi</a>
          <a href="#">Hộp hoa tươi</a>
          <a href="#">Lãng hoa khai trương</a>
          <a href="#">Hoa khai trương</a>
        </div>
      </div>
      <div className="dulieu2">
      {allProductsdb
        .filter(product => product.dacBiet === true) // Lọc sản phẩm có trường dacBiet bằng 1
        .map((product, index) => (
          <Link
              to={"/detail/" + product.maSanPham}
          >
        <div className="sanpham">
          <div className="i">
            <a>
            <img src={product.anhDaiDien} alt={product.tenSanPham} />
            </a>
          </div>
          <div className="t">
          <a href="#">{product.tenSanPham}</a>
            <br />
            <span className="thuoctinh">
              <em className="gianiemiet">450.000d</em>
              <em className="ng-binding">{product.gia}đ</em>
            </span>
            <span className="selebe">Sale</span>
            <span className="view" style={{color:'black'}}>👁️{product.luotXem}</span>
          </div>
        </div>
        </Link>
       ))}
      </div>
      <Pagination
        current={pagedb}
        total={totalProductsdb}
        pageSize={pageSizedb}
        onChange={handlePageChangedb}
        style={{ textAlign: 'center' }}
      />


      <div className="anhsale">
        <img src="../anhhoa/3.jpg" />
        <div />
        <div />
      </div>
      <div className="dulieu_top">
        <h2 className="dulieu_tieude">KẸO NGỌT - QUÀ TẶNG</h2>
        <div className="dulieu_link">
          <a href="#">Bánh kem Tous les Jours</a>
          <a href="#">Bánh kem Brodard</a>
          <a href="#">Trái cây</a>
          <a href="#">Qùa tặng kèm</a>
        </div>
      </div>
      <div className="dulieu3">
        <div className="sanpham">
          <div className="i">
            <a>
              <img src="../anhhoa/hoa1.jpg" />
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
        </div>
      </div>
      <a href="#" className="xemthem">
        "Xem thêm, còn 76 sản phẩm"
      </a>
      <div className="dulieu_top">
        <h2 className="dulieu_tieude">CÂY TÌNH YÊU</h2>
        <div className="dulieu_link">
          <a href="#"> Lan hồ điệp</a>
          <a href="#">Cây văn phòng</a>
          <a href="#"> Cây thủy sinh</a>
          <a href="#">Cây để bàn</a>
          <a href="#"> Cây may mắn</a>
        </div>
      </div>
      <div className="dulieu4">
        <div className="sanpham">
          <div className="i">
            <a>
              <img src="../anhhoa/hoa1.jpg" />
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
  </div>
      </main>
</>
  );
};
export default Home;
