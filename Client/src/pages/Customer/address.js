import React, { useEffect, useState } from "react";
import Addressbox from "./addressbox";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchaddress,
  deleteAddress,
} from "../../redux/features/product/addressSlice";

function Address() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState([]);
  const handleNewAddress = () => {
    const newaddress = [...address, 1];
    setAddress(newaddress);
  };

  const addresses = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchaddress());
  }, []);

  return (
    <>
      {address.map((i) => {
        return (
          <>
            <Addressbox edit="true" save="true" show="true" />
          </>
        );
      })}
      <div className="fs-5 mb-3">SAVED ADDRESSES</div>
      {addresses && addresses.addresses.length ? (
        addresses.addresses.map((i) => {
          return (
            <>
              <Addressbox
                edit="false"
                update="true"
                show="true"
                _id={i._id}
                firstname={i.firstname}
                lastname={i.lastname}
                phone={i.phone}
                addresslineOne={i.addresslineOne}
                addresslineTwo={i.addresslineTwo}
                city={i.city}
                state={i.state}
                zip={i.zip}
              />
            </>
          );
        })
      ) : (
        <></>
      )}
      <a
        className="mt-2"
        type="button"
        style={{ color: "blue" }}
        onClick={handleNewAddress}
      >
        + Add address
      </a>
    </>
  );
}

export default Address;
