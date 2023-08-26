import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../queries/projects";

export default function Project() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <span className="loading loading-dots loading-xl" />;
  if (error) return <p className="alert alert-error">{error.toString()}</p>;

  return (
    <div>
      <p>{data.project.name}</p>
      <p>{data.project.description}</p>
      <p>{data.project.status}</p>
    </div>
  );
}
