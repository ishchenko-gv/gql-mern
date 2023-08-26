import Projects from "../components/Projects";
import AddClient from "../components/AddClientModal";
import Clients from "../components/Clients";
import Button from "../components/Button";
import { useCallback, useState } from "react";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  const [isAddProjectModalOpened, setIsAddProjectModalOpened] = useState(false);
  const [isAddClientModalOpened, setIsAddClientModalOpened] = useState(false);

  const handleAddProjectModalClose = useCallback(() => {
    setIsAddProjectModalOpened(false);
  }, []);

  return (
    <div className="prose">
      <div className="flex items-center justify-between">
        <h2 className="m-0">Projects</h2>
        <Button
          text="Add project"
          onClick={() => setIsAddProjectModalOpened(true)}
        />
      </div>
      <AddProjectModal
        isOpened={isAddProjectModalOpened}
        onClose={() => handleAddProjectModalClose()}
      />
      <Projects />
      <div className="flex items-center justify-between mt-8">
        <h2 className="m-0">Clients</h2>
        <Button
          text="Add client"
          onClick={() => setIsAddClientModalOpened(true)}
        />
      </div>
      <AddClient
        isOpened={isAddClientModalOpened}
        onClose={() => setIsAddClientModalOpened(false)}
      />
      <Clients />
    </div>
  );
}
