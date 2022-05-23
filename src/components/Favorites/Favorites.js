import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../..";
import "./Favorites.css";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.enterLink = React.createRef();
    this.closeLink = React.createRef();
    this.deleteButton = React.createRef();
  }

  state = {
    id: "",
    title: "",
    movies: [],
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
    // console.log(this.state.title);
  };

  postList = () => {
    this.enterLink.current.style.display = "block";
    this.closeLink.current.style.display = "none";
    this.deleteButton.current.style.display = "none";
    fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "title": this.state.title,
        "movies":
            this.props.favMovie,
      })
    }).then(res => res.json())
      .then(data => {
        this.setState({id:data.id})
      })
      .catch(data => {
        console.log(data)
      })
  }

  render() {
    return (
      <div className="favorites">
        <input
          onChange={this.handleChange}
          value={this.title}
          className="favorites__name"
        />
        <ul className="favorites__list">
          {this.props.favMovie.map((item, index) => {
            // console.log(item);
            return (
              <li key={item.imdbID}>
                {item.Title} ({item.Year})
                <button
                ref={this.deleteButton}
                  onClick={() =>
                    store.dispatch({
                      type: "DELETE_FAVORITE",
                      payload: index,
                    })
                  }
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>
        <div ref={this.enterLink} className="enterLink"><a href={`list/${this.state.id}`}>Link</a></div>
        <button onClick={this.postList} ref={this.closeLink} disabled={!this.state.title} type="button" className="favorites__save">
          Сохранить список
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { favMovie: state.favMovie };
};
export default connect(mapStateToProps)(Favorites);
