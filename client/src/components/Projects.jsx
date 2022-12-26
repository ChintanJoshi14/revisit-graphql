import Spin from "../components/Spin";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import ProjectCard from "./ProjectCard";
import Error from "./Error";

const Projects = () => {
  const { loading, data, error } = useQuery(GET_PROJECTS);
  if (loading) return <Spin />;
  if (error) return <Error message={error.message} />;
  console.log(data);

  return (
    <>
      {data?.projects?.length > 0 ? (
        <div className="row mt-4">
          {data?.projects?.map((project) => {
            return <ProjectCard key={project?.id} project={project} />;
          })}
        </div>
      ) : (
        <Error message={"No Projects Added Yet"} />
      )}
    </>
  );
};

export default Projects;
