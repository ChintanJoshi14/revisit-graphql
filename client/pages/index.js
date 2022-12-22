import Clients from "../src/components/Clients";
import AddClient from "../src/components/Modals/AddClient";

export default function Home() {
  //on this page set redirection to a specific page using useRouter() hook after routing is implemented and there call the Clients component
  return (
    <div class="container">
      <AddClient />
      <Clients />
    </div>
  );
}
