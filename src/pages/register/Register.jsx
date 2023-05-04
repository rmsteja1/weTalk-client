import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        city: city.current.value,
        from: from.current.value,
        relationship: relationship.current.value
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">WeTalk</h3>
          <span className="loginDesc">
            Connect with friends and the world
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <input
              placeholder="City"
              required
              ref={city}
              className="loginInput"
            />
            <input
              placeholder="From"
              required
              ref={from}
              className="loginInput"
            />
            <select className="loginInput" ref={relationship} >
              <option value="">Select Relationship</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" className="redirect">
            <button className="loginRegisterButton">Log into Account</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}