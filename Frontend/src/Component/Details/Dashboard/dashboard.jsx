import React from "react";
import IMG from "../../../assets/Batalogo.png";
import "./dashboard.css";
const dashboard = () => {
  return (
    // <div>
    //   <div className="head">
    //     <img src={IMG} width="150px" alt="" />
    //     <div></div>
    //   </div>
    //   <div className="dash">
    //     <h3>Employee ID : 1234</h3>
    //   </div>
    //   <div className="dash-details">
    //     <div className="dash-de">
    //       <h2>Personal Details</h2>
    //       <div className="dash-det">
    //         <table>
    //           <tr>
    //             <td>Name :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Father name :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Age :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>PAN No :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Aadhar No :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //         </table>
    //       </div>
    //     </div>
    //     <div className="dash-de">
    //       <h2>Employee Details</h2>
    //       <div className="dash-det">
    //         <table>
    //           <tr>
    //             <td>Date of Joining :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Designation :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>PF No :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>UAN No :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Grtitute Name :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Date of Resigning :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //         </table>
    //       </div> 
    //     </div>
    //      <div className="dash-de">
    //       <h2>Bank Details</h2>
    //       <div className="dash-det">
    //         <table>
    //           <tr>
    //             <td>Account No :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>IFSC Code :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Bank Name :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //           <tr>
    //             <td>Nominee Name :</td>
    //             <td>Aman Mehta</td>
    //           </tr>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-lg font-semibold mb-2 text-red-500">Personal Info</h3>
    <p><strong>Name:</strong> Aman Mehta</p>
    <p><strong>Father Name:</strong> Aman Mehta</p>
    <p><strong>Age:</strong> 25</p>
    <p><strong>PAN:</strong> XXXX1234X</p>
  </div>

  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-lg font-semibold mb-2 text-blue-500">Employee Info</h3>
    <p><strong>Joining Date:</strong> 2023-01-01</p>
    <p><strong>Designation:</strong> Developer</p>
    <p><strong>UAN:</strong> 123456789012</p>
  </div>

  <div className="bg-white shadow rounded-xl p-6">
    <h3 className="text-lg font-semibold mb-2 text-green-500">Bank Info</h3>
    <p><strong>Account:</strong> 1234567890</p>
    <p><strong>IFSC:</strong> HDFC000123</p>
    <p><strong>Bank:</strong> HDFC</p>
  </div>
</div>

  );
};

export default dashboard;
