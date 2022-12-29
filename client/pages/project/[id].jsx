import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROJECT } from "../../src/queries/ProjectQueries";
import Spin from "../../src/components/Spin";
import Error from "../../src/components/Error";
import ClientInfo from "../../src/components/ClientInfo";
import RemoveProject from "../../src/components/RemoveProject";
import EditProject from "../../src/components/EditProject";

const SingleProjectDetails = () => {
  const {
    query: { id },
  } = useRouter();

  const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
    variables: {
      id,
    },
  });
  if (loading) return <Spin />;
  if (error) return <Error />;

  return (
    <div className="container d-flex">
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link href="/">
            <a className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</a>
          </Link>
          <h1>{data?.project?.name}</h1>
          <p>{data?.project?.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data?.project?.status}</p>

          <ClientInfo client={data?.project?.client} />

          <EditProject project={data?.project} />

          <RemoveProject projectId={data?.project?.id} />
        </div>
      )}
    </div>
  );
};

export default SingleProjectDetails;
