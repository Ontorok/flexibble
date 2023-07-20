import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { useRef } from "react";

export const metadata = {
  title: "Flexiby - Create Project",
  description: "Showcase and discover remarkable developer projects",
};

const CreateProject = () => {
  return (
    <Modal>
      <h3 className="modal-head-text">Create a new Project</h3>
      <ProjectForm />
    </Modal>
  );
};

export default CreateProject;
