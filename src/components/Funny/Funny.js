import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import swal from "sweetalert";


class Funny extends Component {
 

  deleteFav = remove => {
    this.props.dispatch({ type: "REMOVE_FAV", payload: remove });
  };

  editFav = edit => {
    console.log("In editFav", edit);
    swal("Pick a category for your favorite", {
      buttons: {
        funny: {
          text: "Funny!",
          value: "funny"
        },
        cohort: {
          text: "Cohort!",
          value: "cohort"
        },
        cartoon: {
          text: "Cartoon!",
          value: "cartoon"
        },
        nsfw: {
          text: "NSFW",
          value: "nsfw"
        },
        misc: {
          text: "MISC!",
          value: "misc"
        }
      }
    }).then(value => {
      switch (value) {
        case "funny":
          swal("Awesome!", "Changing to funny favorites!", "success");
          this.props.dispatch({
            type: "CHANGE_FAV",
            payload: {
              sendId: edit,
              sendCat: "1"
            }
          });
          break;

        case "cohort":
          swal("Awesome!", "Changing to cohort favorites!", "success");
          this.props.dispatch({
            type: "CHANGE_FAV",
            payload: {
              sendId: edit,
              sendCat: "2"
            }
          });
          break;

        case "cartoon":
          swal("Awesome!", "Changing to cartoon favorites!", "success");
          this.props.dispatch({
            type: "CHANGE_FAV",
            payload: {
              sendId: edit,
              sendCat: "3"
            }
          });
          break;

        case "nsfw":
          swal("Awesome!", "Changing to NSFW favorites!", "success");
          this.props.dispatch({
            type: "CHANGE_FAV",
            payload: {
              sendId: edit,
              sendCat: "4"
            }
          });
          break;

        case "misc":
          swal("Awesome!", "Changing to misc favorites!", "success");
          this.props.dispatch({
            type: "CHANGE_FAV",
            payload: {
              sendId: edit,
              sendCat: "5"
            }
          });
          break;

        default:
          swal("Something went wrong!");
      }
    });
  };

  render() {
    return (
      <div className="funny">
        <div className="nav">
          <Link to="/funny" className="favoriteLink">
            Funny
          </Link>
          <Link to="/cohort" className="favoriteLink">
            Cohort
          </Link>
          <Link to="/cartoon" className="favoriteLink">
            Cartoon
          </Link>
          <Link to="/nsfw" className="favoriteLink">
            NSFW
          </Link>
          <Link to="/misc" className="favoriteLink">
            MISC
          </Link>
        </div>
        <h1>Funny</h1>
        <div className="container">
          <div>
            {this.props.reduxState.categoryReducer && (
              <div className="display">
                {this.props.reduxState.categoryReducer.map(image => {
                  return image.category_id === 1 ? (
                    <div className="gif" key={image.id}>
                      <img alt="title" src={image.url} />
                      <br />
                      <div className="title">
                        {image.title}
                        <br />
                        <button onClick={() => this.deleteFav(image.id)}>
                          Remove From Favorites
                        </button>
                        <br />
                        <br></br>
                        <button onClick={() => this.editFav(image.id)}>
                          Change Categories
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
  export default connect(putReduxStateOnProps)(Funny);