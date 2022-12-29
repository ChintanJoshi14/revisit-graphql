import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { REMOVE_PROJECT } from "../mutations/ProjectMutations";
import { GET_PROJECTS } from "../queries/ProjectQueries";

const RemoveProject = ({ projectId }) => {
  const { push } = useRouter();
  const [removeProject] = useMutation(REMOVE_PROJECT, {
    variables: {
      id: projectId,
    },
    onCompleted: () => push("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    removeProject(projectId);
  };
  return (
    <div className="d-flex mt-5 ms-auto">
      <button
        className="btn btn-danger m-2 d-flex align-items-center"
        onClick={handleDelete}
      >
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default RemoveProject;
