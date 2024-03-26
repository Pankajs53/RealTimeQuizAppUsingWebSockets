import {Routes,Route} from "react-router-dom"
import { Suspense, lazy } from "react";

import Loading from "./pages/loading";
import PrivateRoute from "./pages/PrivateRoute";
// import SignUp from "./pages/signup";
const MainPage = lazy(()=>import("./pages/mainPage"))
const Login = lazy(()=>import("./pages/login"))
const SignUp = lazy(()=>import("./pages/signup"))
const CreateRoom = lazy(()=>import("./components/liveQuiz/createRoom"))
const CreateQuestion = lazy(()=>import("./components/liveQuiz/createQuestion"))
const QuizRoom = lazy(()=>import("./components/liveQuiz/quizRoom"))
const JoinRoom = lazy(()=>import("./components/studentInterface/joinRoom"))
const QuestionRoom = lazy(()=>import("./components/studentInterface/questionRoom"))

function App() {
  const user=true;
  return (
    <div>
     <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<MainPage/>} ></Route>
        {/* common routes for signup and login */}
        <Route path="login" element={<Login/>}></Route>
        <Route path="quiz-signup" element={<SignUp/>}></Route>
        
          {/* Live Quiz Routes  */}
          <Route path="create-room" element={<PrivateRoute user={user} redirect="/" >
            <CreateRoom/>
          </PrivateRoute>}></Route>

          <Route path="/create-questions/:roomId" element={<CreateQuestion/>}></Route>
          <Route path="/quiz-room/:roomId" element={<QuizRoom/>}></Route>
          <Route path="join-room" element={<JoinRoom/>}></Route>
          <Route path="joined-room/:roomId" element={<QuestionRoom/>}></Route>

      </Routes>
     </Suspense>
     
    </div>
  );
}

export default App;
