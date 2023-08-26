import Projects from "../components/Projects";
import AddClient from "../components/AddClient";
import Clients from "../components/Clients";

export default function Home() {
  return (
    <div>
      <Projects />
      <AddClient />
      <Clients />
    </div>
  );
}
