import Modal from "./Modal";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../api/projects";
import { GET_CLIENTS } from "../api/clients";
import { Client } from "../types";

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

export default function AddProjectModal(props: Props) {
  const { isOpened, onClose } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [clientId, setClientId] = useState("");

  const {
    data: clientsData,
    loading: clientsLoading,
    error: clientsError,
  } = useQuery(GET_CLIENTS);

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT);

  useEffect(() => {
    setClientId(clientsData?.clients[0].id);
  }, [clientsData]);

  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <form className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="label mt-4">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="label mt-4">
          <span className="label-text">Status</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label className="label mt-4">
          <span className="label-text">Client</span>
        </label>
        <select
          className="select"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          disabled={clientsLoading || !!clientsError}
        >
          {clientsData?.clients.map((client: Client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <div className="mt-4">
          <Button
            text="Add"
            isLoading={loading}
            isDisabled={!name || !description || !status}
            fluid
            onClick={() =>
              addProject({ variables: { name, description, status, clientId } })
            }
          />
        </div>
        {error && <p className="alert alert-error">{error.toString()}</p>}
      </form>
    </Modal>
  );
}
