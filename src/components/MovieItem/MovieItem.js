import React, { Component } from "react";
import { connect } from "react-redux";
import { store } from "../..";
import "./MovieItem.css";

class MovieItem extends Component {
  // handleClick = () => {
  //   console.log(this.props.Title);
  // };

  render() {
    const { Title, Year, Poster, imdbID } = this.props;
    // console.log(this.props.Title);

    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={Poster} alt={Title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            onClick={() =>
              store.dispatch({
                type: "ADD_FAVORITE",
                payload: {
                  imdbID: this.props.imdbID,
                  Title: this.props.Title,
                  Year: this.props.Year,
                },
              })
            }
            type="button"
            className="movie-item__add-button"
          >
            Добавить в список
          </button>
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  return { favMovie: state.favMovie };
};
export default connect(mapStateToProps)(MovieItem);
