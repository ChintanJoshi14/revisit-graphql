import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorComponent = ({
  errorCode,
  errorMessage,
  description,
  redirectLink,    
}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle className="text-danger" size="5em" />
      <h1>{errorCode}</h1>    
      <h2>{errorMessage}</h2>
      <p className="lead">{description}</p>       
      <Link href={`${redirectLink}`}>
        <a className="btn btn-primary">Go Back</a>
      </Link>
    </div>
  );
};

export default ErrorComponent;
         