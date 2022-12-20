import React from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { REMOVE_CLIENT } from "../mutations/ClientMutations";

const ClientRow = ({ client }) => {
  const [removeClient] = useMutation(REMOVE_CLIENT, {
    variables: {
      id: client.id,
    },
    // TODO: Need to update cache to reflect changes in UI when removed a client
    // update(cache, {})
  });
  return (
    <tr key={client.id}>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={removeClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
