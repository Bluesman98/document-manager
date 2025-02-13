import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { generateClient } from "aws-amplify/data";
//import { Schema } from "../amplify/data/resource";/import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Home from "./Components/Home";
import Upload from "./Components/Upload";

import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
//import "./App.css";

//const client = generateClient<Schema>();

Amplify.configure(outputs);

function App() {
  return (
    
    <Router>
      <Authenticator>
      {({ signOut, user }) => (
        <main>
             <h1 onClick={signOut}>Hello {user?.username}</h1>
          {true && (
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home  />} />
                  <Route path="/upload" element={<Upload  />} />
                </Routes>
              </div>
          )}
        </main>
        )}
      </Authenticator>
    </Router>
   
  );
}

/*const components = {
  Header() {
    return (
      <div className="header-image-container">
        <img src="https://logos-world.net/wp-content/uploads/2022/05/Avis-Symbol-700x394.png" alt="Avis Logo" />
      </div>
    );
  }
};*/

export default App;
