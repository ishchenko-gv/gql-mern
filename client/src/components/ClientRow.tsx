import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Button from "./Button";
import { GET_CLIENTS } from "../queries/clients";
import { Client } from "../types";

type Props = {
  id: string;
  name: string;
  email: string;
  phone: string;
  onError: (error: unknown) => void;
};

const REMOVE_CLIENT = gql`
  mutation RemoveClient($id: ID!) {
    removeClient(id: $id) {
      id
    }
  }
`;

export default function ClientRow(props: Props) {
  const { id, name, email, phone, onError } = props;

  const [removeClient, { loading, error }] = useMutation(REMOVE_CLIENT, {
    update(cache, { data: { removeClient } }) {
      const { clients }: { clients: Client[] } = cache.readQuery({
        query: GET_CLIENTS,
      })!;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== removeClient.id),
        },
      });
    },
  });

  useEffect(() => {
    if (error) onError(error);
  });

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <span className="mr-2">
          <Button text={<AiFillEdit />} onClick={() => {}} />
        </span>
        <Button
          text={<AiFillDelete />}
          isLoading={loading}
          onClick={() => removeClient({ variables: { id } })}
        />
      </td>
    </tr>
  );
}
