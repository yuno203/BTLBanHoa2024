import React, { useState } from "react";
import '../assets/css/user.css';
import { Login, Register } from "../services/User.services";
import { useNavigate } from 'react-router-dom';



const User: React.FC<any> = () => {
    const [loginForm, setLoginForm] = useState({
        loginUser: "",
        loginPassword: ""
    });

    const [registerForm, setRegisterForm] = useState({
        registerUser : "",
        registerEmail: "",
        registerPassword: "",
        registerName: "",
        registerPhoneNumber: "",
        registerAddress: ""
    });
   
    const navigate = useNavigate();
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterForm((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Gọi API đăng nhập từ backend và xử lý phản hồi
        try{
            const LoginData = {
                username: loginForm.loginUser,
                password: loginForm.loginPassword,
               
              };
              const response = await Login(LoginData);
              localStorage.setItem('user', JSON.stringify(response));
              // Xử lý kết quả trả về từ API tại đây
              alert("đăng nhập tài khoản thành công");
              console.log("đã đăng nhập tài khoản:", response);
              navigate('/');
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const RegisterData = {
                tenTaiKhoan: registerForm.registerUser,
                hoTen: registerForm.registerName,
                diaChi: registerForm.registerAddress,
                soDienThoai: registerForm.registerPhoneNumber,
                matKhau: registerForm.registerPassword,
                email: registerForm.registerEmail,
                token: ""
              };
              const response = await Register(RegisterData);
              // Xử lý kết quả trả về từ API tại đây
              alert("đăng ký tài khoản thành công");
              console.log("tài khoản đã đuọc tạo:", response);
              navigate('/');
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
        }
    };

    return (
        <>
            <div id="content">
                <div className="wrapper">
                    <div className="form_ctrl">
                        {/* Form Đăng Ký */}
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="col_1_2 m_r12">
                                <div className="frm_content">
                                    <h2>Chưa có tài khoản?</h2>
                                    <p className="desc">
                                        Khi tạo tài khoản tại cửa hàng chúng tôi, đơn hàng của bạn sẽ được xử lý
                                        nhanh hơn, bạn sẽ có thể lưu lại các địa chỉ giao hàng, xem và theo dõi
                                        các đơn hàng trong tài khoản.
                                    </p>
                                    <div>
                                        <label htmlFor="registerUser">
                                            <span className="req">*</span>Tên tài khoản:
                                        </label>
                                        <input
                                            name="registerUser"
                                            type="text"
                                            maxLength={100}
                                            id="registerUser"
                                            value={registerForm.registerUser}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="registerEmail">
                                            <span className="req">*</span>Email của bạn:
                                        </label>
                                        <input
                                            name="registerEmail"
                                            type="text"
                                            maxLength={100}
                                            id="registerEmail"
                                            value={registerForm.registerEmail}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="registerPassword">
                                            <span className="req">*</span>Mật khẩu:
                                        </label>
                                        <input
                                            name="registerPassword"
                                            type="password"
                                            maxLength={20}
                                            id="registerPassword"
                                            value={registerForm.registerPassword}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="registerName">
                                            <span className="req">*</span>Họ Tên:
                                        </label>
                                        <input
                                            name="registerName"
                                            type="text"
                                            maxLength={150}
                                            id="registerName"
                                            value={registerForm.registerName}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="registerPhoneNumber">
                                            <span className="req">*</span>Điện thoại:
                                        </label>
                                        <input
                                            name="registerPhoneNumber"
                                            type="text"
                                            maxLength={25}
                                            id="registerPhoneNumber"
                                            value={registerForm.registerPhoneNumber}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="registerAddress">Địa chỉ:</label>
                                        <input
                                            name="registerAddress"
                                            type="text"
                                            maxLength={250}
                                            id="registerAddress"
                                            value={registerForm.registerAddress}
                                            onChange={handleRegisterChange}
                                        />
                                    </div>
                                    <div className="button">
                                        <input
                                            type="submit"
                                            value="Tạo tài khoản mới"
                                            className="create"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Form Đăng Nhập */}
                        <form onSubmit={handleLoginSubmit}>
                            <div className="col_1_2">
                                <div className="frm_content">
                                    <h2>Đã có tài khoản</h2>
                                    <p className="desc">
                                        Nếu bạn đã có tài khoản tại trang web Hoayeuthuong.com, xin hãy đăng
                                        nhập.
                                    </p>
                                    <div>
                                        <label htmlFor="loginUser">
                                            <span className="req">*</span>Email của bạn:
                                        </label>
                                        <input
                                            name="loginUser"
                                            type="text"
                                            maxLength={100}
                                            id="loginUser"
                                            value={loginForm.loginUser}
                                            onChange={handleLoginChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="loginPassword">
                                            <span className="req">*</span>Mật khẩu:
                                        </label>
                                        <input
                                            name="loginPassword"
                                            type="password"
                                            maxLength={20}
                                            id="loginPassword"
                                            value={loginForm.loginPassword}
                                            onChange={handleLoginChange}
                                        />
                                    </div>
                                    <div className="button">
                                        <input
                                            type="submit"
                                            value="ĐĂNG NHẬP"
                                            className="login"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
