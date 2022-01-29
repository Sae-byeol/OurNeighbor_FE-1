import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import RegisterPage from "./RegisterPage";

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용

  const [loading, setLoading] = useState(false);

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    props.onClose();
    props.setAddress(fullAddress);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "15%",
    left: "20%",
    width: "300px",
    height: "420px",
    padding: "5px 5px 13px 5px",
    borderRadius: "5px",
    borderColor: "#FFC961",
    borderWidth: "2px",
    backgroundColor: "#FFC961",
    zIndex: "1",
  };

  return (
    <>
      <div style={postCodeStyle}>
        <DaumPostcode onComplete={handlePostCode} />
        <button
          type="button"
          onClick={() => {
            props.onClose();
          }}
          className="postCode_btn"
        >
          닫기
        </button>
      </div>
    </>
  );
};

export default PopupPostCode;
