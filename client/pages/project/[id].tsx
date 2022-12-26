import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PROJECT } from "../../src/queries/ProjectQueries";

const SingleProjectDetails = () => {
  const {
    query: { id },
  } = useRouter();

  const { loading, error, data } = useQuery(GET_SINGLE_PROJECT, {
    variables: {
      id,
    },
  });
  return <div className="container">A Single Project with id: {id}</div>;
};

export default SingleProjectDetails;
