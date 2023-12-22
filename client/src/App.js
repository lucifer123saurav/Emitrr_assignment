import {Routes, Route} from "react-router-dom"
import { Login } from "./pages/Login";
import QuizContainer from "./pages/QuizContainer";
import { Home } from "./pages/Home";
import { Results } from "./pages/Results";
import { See } from "./pages/See";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import {NotFound} from "./pages/NotFound"
import { Register } from "./pages/Register";
import { PublishQuestion } from "./pages/PublishQuestion";
import { Logout } from "./pages/Logout";
function App() {
  return (
    <Routes>
      <Route element={<NotFound/>}/>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/quiz/:languagePreference/:level" element={<QuizContainer/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/publish" element={<PublishQuestion/>} />
      <Route path="/see" element={<See/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/logout" element={<Logout/>}/>

    </Routes>
  );
}

export default App;
