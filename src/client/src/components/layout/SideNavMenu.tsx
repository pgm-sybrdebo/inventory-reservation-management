import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import close from "../../assets/close.svg";
import jwt_decode from "jwt-decode";
import { TokenInfo } from "../../interfaces";

function SideNavMenu({ setModalVisible }: any) {
  const token = localStorage.getItem("token");

  const data = jwt_decode<TokenInfo>(token!);
  let navigate = useNavigate();
  return (
    <Modal>
      <img
        src={close}
        alt="close icon"
        onClick={() => setModalVisible(false)}
      />
      <ul>
        <li onClick={() => navigate("/edit-profile")}>Edit Profile</li>
        <li onClick={() => navigate("/my-reservations")}>My Reservations</li>

        <li
          className={data && data.role > 0 ? "available" : "disabled"}
          onClick={() => navigate("/dashboard-home")}
        >
          Admin Panel
        </li>
        <li
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Log Out
        </li>
      </ul>
    </Modal>
  );
}
const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f58732;
  position: fixed;
  top: 0px;
  right: 0;
  z-index: 1000;
  @media (min-width: 1050px) {
    width: 33vw;
  }
  @media (min-width: 1300px) {
    width: 20vw;
  }

  & img {
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 32px;
    right: 32px;
    fill: white;
    transition: all 0.2s ease-in-out;
    @media (min-width: 768px) {
      top: 64px;
      right: 64px;
    }
    @media (min-width: 1050px) {
      top: 106px;
      right: 45px;
    }
    &:hover {
      transform: rotate(90deg);
    }
  }
  & ul {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 32px;
    @media (min-width: 768px) {
      padding: 0 128px;
    }
    @media (min-width: 1050px) {
      padding: 0 32px;
    }

    & li {
      cursor: pointer;
      width: 100%;
      border-bottom: 1px solid #c0c0c0;
      padding-bottom: 24px;
      margin-bottom: 48px;
      color: white;
      font-size: 18px;
      font-weight: 600;
      transition: all 0.2s ease-in;
      @media (min-width: 768px) {
        padding-bottom: 24px;
        margin-bottom: 48px;
        font-size: 20px;
      }
      @media (min-width: 1050px) {
        padding-bottom: 24px;
        margin-bottom: 48px;
        font-size: 18px;
      }
    }
    & li:hover {
      transform: scale(1.05);
    }
    & .available {
      display: block;
    }
    & .disabled {
      display: none;
    }
  }
`;

export default SideNavMenu;
