import React, { useEffect, useState } from "react";
import '../assets/css/user.css';
import { getBill } from "../services/oder.services";
import { useParams } from "react-router-dom";

const Profile: React.FC<any> = () => {
    const [profileDetail, setProfileDetail] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<any>({
        email: "",
        hoTen: "",
        soDienThoai: "",
        diaChi: ""
    });

    const { id } = useParams();

    useEffect(() => {
        // Lấy dữ liệu người dùng từ LocalStorage khi component được render
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserInfo(userData);
        }
    }, []);

    // Xử lý sự kiện khi người dùng thay đổi các trường thông tin
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prevState: any)=> ({
            ...prevState,
            [name]: value
        }));
    };

    // Xử lý sự kiện khi người dùng nhấn nút "Lưu"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Thực hiện lưu thông tin người dùng vào LocalStorage hoặc gửi đến server để cập nhật
        console.log("Thông tin người dùng đã cập nhật:", userInfo);
        // Code lưu hoặc gửi thông tin đến server ở đây
    };

    return (
        <div id="content">
            <div className="wrapper">
                <div className="col_1_1">
                    <div className="frm_content">
                        <h2>Cập nhật thông tin tài khoản</h2>
                        <form onSubmit={handleSubmit}>
                        <div>
                                <label>
                                    <span className="req">*</span>Email:
                                </label>
                                <input
                                    type="text"
                                    name="Email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>
                                    <span className="req">*</span>Ho Tên:
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userInfo.hoTen}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>
                                    <span className="req">*</span>Điện thoại:
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={userInfo.soDienThoai}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>
                                    Địa chỉ:
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userInfo.diaChi}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="button">
                                <input
                                    type="submit"
                                    value="Lưu"
                                    className="save"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
