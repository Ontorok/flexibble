import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type Props = {
  searchParams: SearchParams;
};

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

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectSearch;
  const projectToDisplay = data?.projectSearch?.edges || [];

  if (projectToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No Project Found, Please add one</p>
      </section>
    );
  }
  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />
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
