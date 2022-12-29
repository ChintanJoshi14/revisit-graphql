import Clients from "../src/components/Clients";
import AddClient from "../src/components/Modals/AddClient";
import Projects from "../src/components/Projects";

export default function Home() {
  //on this page set redirection to a specific page using useRouter() hook after routing is implemented and there call the Clients component
  return (
    <div className="container">
      <div class="d-flex gap-3 mb-4">
        <AddClient />
      </div>
      <Projects />
      <hr />
      <Clients />
    </div>
  );
}
