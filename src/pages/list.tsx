import { useEffect, useState } from "react";
import '../assets/css/danhmuc.css'
import { Link, useParams } from "react-router-dom";
import { getList } from "../services/list.services";
import ReactPaginate from "react-paginate";

type DataParams = {
  id: string;
};
const List = function () {
  const { id } = useParams<DataParams>();
  const [data, setDatas] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);



  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };
  const changeInputValue = (e:any) => {
    setPageSize(+e.target.value);
  }

  useEffect(() => {
    async function loadData(id: any) {
      let items = await getList({
        page: page,
        pageSize: pageSize,
        maChuyenMuc: id,
      });
      setDatas(items.data);
      setPageCount(Math.ceil(items.totalItems / pageSize));
    }
    loadData(id);
  }, [page,pageSize, id]);
  return (
    <>
     <div id="content">
  <div className="wrapper">
    <ul className="hang">
      <li style={{ margin: 0 }}>
        <a href="">Trang chủ</a>
      </li>
      <li>
        <a href="">Chủ đề</a>
      </li>
      <li>
        <a href="">Hoa sức khỏe</a>
      </li>
    </ul>
    <div className="noidung">
      <div className="ndtrai">
        {/* <div class="dip" id="dip" >
                      <h3>Danh Mục</h3>
                      <div ng-repeat="x in listCMAll">
                          <input type="checkbox" name="" id="" value="Hoa sinh nhat" >
                          <label for="">{{x.tenChuyenMuc}}</label>
                      </div>
                    

                  </div> */}
        <div className="doituong" id="doituong"></div>
        <div className="mucgia" id="mucgia">
          <h3>Giá</h3>
          {/* <div><button>Tất cả</button></div> */}
          <div>
            <button ng-click="setDefaults()">Dưới 250.000</button>
          </div>
          <div>
            <button ng-click="setDefaults1()">Từ 250.000 đến 500.000</button>
          </div>
          <div>
            <button>Từ 500.000 đến 1.000.000</button>
          </div>
          <div>
            <button>Từ 1.000.000 đến 2.000.000</button>
          </div>
          <div>
            <button ng-click="setDefaultsmax()">Trên 2.000.000</button>
          </div>
          <div>
            {" "}
            <h4>Khoảng giá</h4>
          </div>
          <div>
            <input type="number" ng-model="giaTo" name="" id="dau" />
            <span style={{ fontSize: 18 }}>-</span>
            <input type="number" ng-model="giaFrom" name="" id="cuoi" />
          </div>
          <button ng-click="LoadSanPham()" className="btn1">
            Apply
          </button>
        </div>
        <div className="canhtrinhbay" id="canhtrinhbay">
          <h3>CÁCH TRÌNH BÀY</h3>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Bó hoa tươi</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Giỏ hoa</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hộp hoa </label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa bình</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa thả bình </label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa chúc mừng</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa chia buồn</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Chậu lan Hồ điệp</label>
          </div>
        </div>
        <div className="mausac" id="mausac">
          <h3>MÀU SẮC</h3>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">White</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Màu đỏ</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Pink</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa tươi màu cam</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Purple</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Yellow&amp;Gold</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Blue&amp;Green</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Mix Color</label>
          </div>
        </div>
        <div className="loaihoa" id="loaihoa">
          <h3>LOẠI HOA</h3>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Only rose</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa hồng</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Thiên điểu</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa hạnh phúc</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hồng môn</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Tú cầu</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Mõm sói</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Thạch thảo</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hướng dương</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa sen</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Đồng tiền</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa lan</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Cẩm chướng</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Cát tường</label>
          </div>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Hoa baby</label>
          </div>
        </div>
      </div>
      <div className="ndphai">
        <div className="tieuchi">
          <ul>
            <li>
              <a className="macdinh" href="">
                MẶC ĐỊNH
              </a>
            </li>
            <li>
              <a href="">GIÁ TỪ THẤP TỚI CAO</a>{" "}
            </li>
            <li>
              <a href=""> GIÁ TỪ CAO TỚI THẤP</a>
            </li>
            <li>
              <a href=""> MỚI NHẤT</a>
            </li>
          </ul>
        </div>
        <div className="htcheckbox">
          <span>
            Hoa chúc mừng{" "}
            <a className="" href="">
              <img src="../anhhoa/f-close.png" alt="" />
            </a>
          </span>
          <span>
            Chủ đề hoa chúc sức khỏe{" "}
            <a className="" href="">
              <img src="../anhhoa/f-close.png" alt="" />
            </a>
          </span>
        </div>
        <div id="ds_muasp">
          <div className="dulieu " id="dulieu">
          <div className="sanpham1" id="sanpham1">
            {data.map((x: any) =>(
              <div className="sanpham sub" >
                <div className="i">
                  <a>
                    <img src={x.anhDaiDien} />
                  </a>
                </div>
                <div className="t">
                  <a>{x.tenSanPham}</a>
                  <br />
                  <span className="thuoctinh">
                    <em className="gianiemiet">450.000đ</em>
                    <em>
                      {x.gia}đ
                    </em>
                  </span>
                  <span className="selebe">Sale</span>
                </div>
              </div>
           
            ))}
             </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</div>

      <section className="page">
        <select name="pageSize" onChange={(e)=> changeInputValue(e)} value={pageSize}>
          <option value="5">6</option>
          <option value="10">12</option>
          <option value="15">18</option>
          <option value="20">24</option>
        </select>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
        />
      </section>
    </>
  );
};
export default List;
