import Image from "next/image";
import LoginPage from "./Components/loginpage";

export default function Home() {
  return (
    <Router>
      <div>
      <Route path="fc/src/Components/loginpage" component={LoginPage}/>
      </div>
    </Router>
  );
}
