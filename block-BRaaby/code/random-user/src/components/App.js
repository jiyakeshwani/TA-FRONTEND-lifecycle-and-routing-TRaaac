import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendar,
  faMap,
  faPhone,
  faLock,
  faTachographDigital,
} from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      userData: [],
      loading: true,
      title: "",
      value: "",
      content: "",
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())

      // .then((userData) =>
      //   userData.results.map((user) => ({
      //     name: `${user.name.first} ${user.name.last}`,
      //     email: `${user.email}`,
      //     image: `${user.picture.large}`,
      //     dob: `${user.dob.date}`,
      //     location: `${user.location.city}, ${user.location.state}, ${user.location.country}`,
      //     phone: `${user.phone}`,
      //     username: `${user.login.username}`,
      //   }))
      // )
      .then((userData) =>
        this.setState({
          userData: this.state.userData.concat(userData.results[0]),
          loading: false,
        })
      );
  }

  handleRandomUser = (e) => {
    fetch("https://randomuser.me/api/?results=8")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ userData: [data.results[0]] });
      });
  };

  handleDataChange = (data) => {
    console.log(data);
    switch (data) {
      case "username":
        this.setState(
          {
            title: "My username is",
            value: this.state.userData[0]
              ? this.state.userData[0].login.username
              : "",
          },
          () => console.log(this.state.title)
        );
        break;
      case "email":
        this.setState({
          title: "My email is",
          value: this.state.userData[0] ? this.state.userData[0].email : "",
        });
        break;
      case "age":
        this.setState({
          title: "My age is",
          value: this.state.userData[0] ? this.state.userData[0].dob.age : "",
        });
        break;

      case "street":
        this.setState({
          title: "My street is",
          value: this.state.userData[0]
            ? this.state.userData[0].location.street.name
            : "",
        });
        break;

      case "phone":
        this.setState({
          title: "My contact-no is",
          value: this.state.userData[0] ? this.state.userData[0].phone : "",
        });
        break;

      case "password":
        this.setState({
          title: "My password is",
          value: this.state.userData[0]
            ? this.state.userData[0].login.password
            : "",
        });
        break;

      default:
        break;
    }
    this.setState({
      content: data,
    });
  };

  render() {
    let { userData, content, title, value } = this.state;
    console.log(userData);
    if (!userData) {
      return <h1>Loading...</h1>;
    }

    return (
      <>
        <section className="container">
          <figure>
            <img
              className="img"
              src={userData[0] ? userData[0].picture.large : ""}
              alt="img"
            />
          </figure>
          <div className="para">
            <p className="p1">{!content ? "My Name is" : title}</p>
            <p className="p2">
              {!content
                ? userData[0]
                  ? `${userData[0].name.first} ${userData[0].name.last}`
                  : ""
                : value}
            </p>
          </div>
          <div className="icons">
            <FontAwesomeIcon
              onClick={() => this.handleDataChange("username")}
              className="i"
              icon={faUser}
            />
            <FontAwesomeIcon
              onClick={() => this.handleDataChange("email")}
              className="i"
              icon={faEnvelope}
            />
            <FontAwesomeIcon
              onClick={() => this.handleDataChange("age")}
              className="i"
              icon={faCalendar}
            />
            <FontAwesomeIcon
              onClick={() => this.handleDataChange("street")}
              className="i"
              icon={faMap}
            />
            <FontAwesomeIcon
              onClick={() => this.handleDataChange("phone")}
              className="i"
              icon={faPhone}
            />
            <FontAwesomeIcon
              onClick={() => this.handleDataChange("password")}
              className="i"
              icon={faLock}
            />
          </div>
          <button onClick={this.handleRandomUser} className="btn">
            {userData ? "Get Random User" : "loading..."}
          </button>
        </section>
      </>
    );
  }
}

export default App;
