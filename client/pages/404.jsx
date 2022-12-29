import { FaDAndDBeyond } from "react-icons/fa";
import ErrorComponent from "../src/components/ErrorComponent";

const ErrorPage = () => {
  return (
    <ErrorComponent
      errorCode={404}
      errorMessage="Not Found"
      description="The page you are trying to access does not exist!!"
      redirectLink="/"
    />
  );
};  
  
export default ErrorPage;
