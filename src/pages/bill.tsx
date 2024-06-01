import React, { useEffect, useState } from "react";
import '../assets/css/user.css';
import { getBill } from "../services/oder.services";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

const Bill: React.FC<any> = () => {
    const [billDetail, setBillDetail] = useState<any[]>([]);
    const { id } = useParams();
    const [maTaiKhoan, setMaTaiKhoan] = useState<string | null>(null);

    // Lấy dữ liệu từ localStorage khi component được render
    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData && userData.maTaiKhoan) {
                setMaTaiKhoan(userData.maTaiKhoan);
            }
        }
    }, []);

    useEffect(() => {
        if (maTaiKhoan) {
            fetchData(); // Call the fetchData function here
        }
    }, [maTaiKhoan]);

    // Move the fetchData function outside of the component function
    async function fetchData() {
        try {
            const data = await getBill(maTaiKhoan);
            setBillDetail(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching bill detail:", error);
        }
    }
    return (
        <>
            <div id="content">
                <div className="wrapper">
                <div className="col_1_1">
                <div className="order-box-header-left">Thông tin đơn hàng</div>
                        <div className="order-box-header-right">
                            <p>{billDetail.length} order</p>
                        </div>
                </div>
                {billDetail.map((bill: any, index: number) => (
                    <div className="order-box">
                        <div className="order-box-header">
                       
                        
                        <div className="clear"></div>
                        </div>
                        <div className="order-row">
                        <div className="order-row-col1">
                            <p>
                            <strong>Mã {bill.maHoaDon}</strong>
                            </p>
                            <p>Ngày giao</p>
                            <p>
                            {bill.ngayDuyet}
                            </p>
                        </div>
                        <div className="order-row-col2">
                            <ul>
                            <li>
                            <img src={bill.anhDaiDien} alt={bill.tenSanPham} />
                            </li>
                            </ul>
                        </div>
                        <div className="order-row-col3">
                            <p>
                            <strong />
                            </p>
                            <p />
                            <p>
                            Trạng thái: <strong>{bill.trangthai ? "Chưa thanh toán" : "Đã ghi nhận đơn hàng"}</strong>
                            </p>
                        </div>
                        <div className="order-row-col4">
                            <br/>
                            <p>{(bill.donGia).toLocaleString('vi-VN',{style: 'currency',currency: 'VND'})}</p>
                        </div>
                        <div className="order-row-col5">
                            <p>
                            <a
                                className="view-more"
                                title="Xem thêm"
                            >
                                Xem thêm
                            </a>
                            {/* <a
                                className="paymemt"
                            >
                                Thanh toán
                            </a> */}
                            </p>
                        </div>
                        <div className="clear"></div>
                        </div>
                        
                      
                        <div className="paging">&nbsp;</div>
                    </div>
       ))}
                    </div>

                </div>
          
        </>
    );
};

export default Bill;
