import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { useState } from "react";
import { GET_CLIENTS } from "../queries/clients";
import { Client } from "../types";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [clientAddError, setClientAddError] = useState<null | unknown>(null);

  if (loading)
    return (
      <div className="flex justify-center p-5">
        <span className="loading loading-dots loading-lg" />
      </div>
    );

  if (error) {
    console.error(error);
    return "error";
  }

  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map(({ id, name, email, phone }: Client) => (
            <ClientRow
              id={id}
              name={name}
              email={email}
              phone={phone}
              onError={(error: unknown) => setClientAddError(error)}
            />
          ))}
        </tbody>
      </table>
      {clientAddError && (
        <p className="alert alert-error">{clientAddError.toString()}</p>
      )}
    </>
  );
}
