import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projects";
import { Project } from "../types";
import { Link } from "react-router-dom";

export default function Projects() {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <span className="loading loading-dots"></span>;
  if (error) return <p className="alert alert-error">{error.toString()}</p>;

  console.log(data);

  if (!data.projects.length)
    return <p className="alert alert-warning">There are no projects</p>;

  return data.projects.map((project: Project) => (
    <div key={project.id}>
      <Link to={`/project/${project.id}`}> {project.name}</Link>
    </div>
  ));
}
