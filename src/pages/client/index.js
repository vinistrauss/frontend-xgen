import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MaskedInput from "react-text-mask";
import {
  faPlusSquare,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import "./styles.css";
import { toast } from "react-toastify";

export default function Client({ history }) {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState([]);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const loadClient = async () => {
      if (id > 0) {
        const response = await api.get(`/clients/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      }
    };

    loadClient();
  }, [id]);

  const addAddress = () => {
    setAddress(addAddress =>
      addAddress.concat({
        clientAddresss: newAddress
      })
    );
    setNewAddress("");
  };

  const deleteAddress = async id_address => {
    if (id_address > 0) {
      await api.delete(`/clients/address/${id_address}`);
      setAddress(address.filter(address => address.id !== id_address));
    } else {
      setAddress(
        address.filter(address => address.clientAddresss !== id_address)
      );
    }

    toast.error("Endereço excluído com sucesso");
  };

  const handleSubmit = async () => {
    if (id === "0") {
      await api.post("/clients", {
        email,
        name,
        phone,
        address
      });

      toast.success("Cliente cadastrado com sucesso");
    } else {
      await api.put(`/clients/${id}`, {
        id,
        email,
        name,
        phone,
        address
      });

      toast.success("Cliente atualizado com sucesso");
    }

    setName("");
    setEmail("");
    setPhone("");
    setAddress("");

    history.push("/");
  };

  return (
    <div className="client-info">
      <div>
        <label htmlFor="name"> CLIENTE *</label>
        <input
          id="name"
          placeholder="Vinicius Strauss"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
        <label htmlFor="email"> E-MAIL *</label>
        <input
          id="email"
          placeholder="exemplo@exemplo.com"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <label htmlFor="email"> TELEFONE *</label>
        <MaskedInput
          mask={[
            "(",
            /[1-9]/,
            /\d/,
            ")",
            " ",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/
          ]}
          value={phone}
          onChange={event => setPhone(event.target.value)}
          showMask={true}
        />

        <label htmlFor="street"> ENDEREÇO *</label>
        <div className="inputClass">
          <input
            id="street"
            placeholder="Liberdade, 240 - apto.: 91"
            value={newAddress}
            onChange={e => setNewAddress(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={faPlusSquare}
            onClick={addAddress}
          ></FontAwesomeIcon>
        </div>
        {address.length !== 0 ? (
          <>
            <h3> Lista de usuários: </h3>
            <div className="boxAddress">
              <div className="resumeAddress">
                {address.map(address => (
                  <div
                    key={address.id > 0 ? address.id : address.clientAddresss}
                  >
                    <p>
                      <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                      {address.clientAddresss}
                    </p>
                    <p
                      onClick={
                        address.id > 0
                          ? () => deleteAddress(address.id)
                          : () => deleteAddress(address.clientAddresss)
                      }
                    >
                      Excluir
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <button type="submit" className="btn" onClick={() => handleSubmit()}>
          {id === "0" ? "CADASTRAR" : "EDITAR"}
        </button>
      </div>
    </div>
  );
}
