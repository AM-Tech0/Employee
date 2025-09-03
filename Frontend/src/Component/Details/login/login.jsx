import React, { useState } from "react";
import "./login.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IMG from "../../../assets/Frontimg-remove.png";
import IMG1 from "../../../assets/BatalogoBgremove.png"; // Assuming you have a logo image

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // 👈 add this state
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://employee-backend-fawn.vercel.app//api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (data.token) {
        toast.success("Login Successful");
        navigate("/employee-details", { state: { user: data.user } });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className=" login-box">
          <img className="login-logo" src={IMG1} alt="Logo" />
          <h2>Welcome Back!</h2>
          <h3>Employee Login</h3>
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
          />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}  // 👈 toggle here
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div className="">
            <input
              className="login-checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // 👈 toggle state
            />
            <label className="pass">Show password</label>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>

        <img className="login-image" src={IMG} alt="" />
      </div>
    </div>
  );
};

export default Login;
// import React, { useState } from "react";
// import "./login.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import IMG from "../../../assets/Frontimg-remove.png";
// import IMG1 from "../../../assets/BatalogoBgremove.png";

// const Login = () => {
//   const [userId, setUserId] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👈 add this state
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("https://employee-backend-fawn.vercel.app//api/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, password }),
//       });

//       const data = await res.json();

//       if (data.token) {
//         toast.success("Login Successful");
//         navigate("/employee-details", { state: { user: data.user } });
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login">
//         <div className="login-box">
//           <img className="login-logo" src={IMG1} alt="Logo" />
//           <h2>Welcome Back!</h2>
//           <h3>Employee Login</h3>

//           <label>User ID</label>
//           <input
//             type="text"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             placeholder="Enter your User ID"
//           />

//           <label>Password</label>
//           <input
//             type={showPassword ? "text" : "password"}  // 👈 toggle here
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />

//           <div className="flex items-center gap-2 mt-2">
//             <input
//               className="login-checkbox"
//               type="checkbox"
//               checked={showPassword}
//               onChange={() => setShowPassword(!showPassword)} // 👈 toggle state
//             />
//             <label className="pass">Show password</label>
//           </div>

//           <button onClick={handleLogin}>Login</button>
//         </div>

//         <img className="login-image" src={IMG} alt="" />
//       </div>
//     </div>
//   );
// };

// export default Login;
