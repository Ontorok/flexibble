import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPrevPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch;
  const projectToDisplay = data?.projectSearch.edges || [];

  if (projectToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No Project Found, Please add one</p>
      </section>
    );
  }
  return (
    <section className="flexStart flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {projectToDisplay.map(({ node }) => (
          <ProjectCard key={node.id} project={node} />
        ))}
      </section>
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
