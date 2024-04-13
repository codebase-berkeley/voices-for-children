"use client";
import Image from "next/image";
import LoginPage from "../Components/loginpage";
import {Route, Router} from 'React-router-dom';

export default function Home() {
  return (
      <div>
        <LoginPage/>
      {/* <Route path="/loginpage" component={LoginPage}/> */}
      </div>

  );
}
