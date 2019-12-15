import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { toast } from "react-toastify";

export default function Client() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      const response = await api.get("/clients");

      setClients(response.data);
    };

    loadClients();
  }, []);

  const handleDeleteClient = async id => {
    await api.delete(`/clients/${id}`);

    setClients(clients.filter(client => client.id !== id));

    toast.error("Cliente excluído com sucesso");
  };

  return (
    <>
      <div className="client-list">
        <Link to={`clients/0`}>
          <FontAwesomeIcon icon={faUserPlus} />
          ADICIONAR
        </Link>
        {clients.map(client => (
          <article key={client.id}>
            <div>
              <div className="resume">
                <p>
                  <b>Cliente:</b> {client.name}
                </p>
                <p>
                  <b>E-mail:</b> {client.email}
                </p>
                <p>
                  <b>Telefone:</b> {client.phone}
                </p>
                <p>
                  <b>Endereço: </b>{" "}
                  {client.address.map(
                    address => ` | ${address.clientAddresss}`
                  )}
                </p>
              </div>
              <div
                className="trashImage"
                onClick={() => handleDeleteClient(client.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
              </div>
            </div>
            <Link to={`clients/${client.id}`}>EDITAR</Link>
          </article>
        ))}
      </div>
    </>
  );
}
