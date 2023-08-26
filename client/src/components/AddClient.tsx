import { useMutation } from "@apollo/client";
import { useState } from "react";
import Button from "./Button";
import { ADD_CLIENT, GET_CLIENTS } from "../queries/clients";
import { Client } from "../types";

export default function AddClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient, { loading, error }] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients }: { clients: Client[] } = cache.readQuery({
        query: GET_CLIENTS,
      })!;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        onChange={(e) => setName(e.target.value)}
      />
      <label className="label mt-4">
        <span className="label-text">Email</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="label mt-4">
        <span className="label-text">Phone</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="mt-4">
        <Button
          text="Add"
          isLoading={loading}
          isDisabled={!name || !email || !phone}
          fluid
          onClick={() => addClient({ variables: { name, email, phone } })}
        />
      </div>
      {error && <p className="alert alert-error">{error.toString()}</p>}
    </div>
  );
}
