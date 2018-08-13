import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotes, addNote, updateNote, deleteNote } from "../../dux/reducer";
import moment from "moment";
import { stack as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./Notes.css";

class Notes extends Component {
  constructor() {
    super();
    this.state = {
      note: "",
      notecopy: "",
      editFlag: false,
      editId: 0
    };
  }
  componentDidMount() {
    this.props.getNotes();
  }

  handleNewNote() {
    this.props.addNote(this.state.note, moment().format("ll"));
    this.setState({ note: "" });
  }
  handleEdit(editId, note) {
    this.setState({ editFlag: true, editId, notecopy: note });
    this.handleEditInput(note);
  }
  handleUpdate(id) {
    const { notecopy } = this.state;
    this.props.updateNote(id, notecopy);
    this.setState({ editFlag: false });
  }
  handleEditInput(note) {
    return note.slice();
  }
  render() {
    let notes = this.props.notes.map(e => (
      <div className="each_note" key={e.id}>
        <p>{e.date}</p>
        <p>
          {this.state.editFlag && this.state.editId === e.id ? (
            <span>
              <textarea
                className="edit_box"
                onChange={e => this.setState({ notecopy: e.target.value })}
                defaultValue={this.state.notecopy}
                type="text"
              />

              <button
                className="submit"
                onClick={() => this.handleUpdate(e.id)}
              >
                Submit
              </button>
            </span>
          ) : (
            e.note
          )}
        </p>
        <button className="delete" onClick={() => this.props.deleteNote(e.id)}>
          Delete
        </button>
        {!this.state.editFlag && (
          <button
            className="edit"
            onClick={() => this.handleEdit(e.id, e.note)}
          >
            Edit
          </button>
        )}
        {/* {this.state.editFlag && this.state.editId === e.id ? <input value={this.state.notecopy}type="text"/>:e.note} */}
      </div>
    ));
    // console.log(this.props.notes.map(e => e));
    return (
      <div className="whole_cont">
        <Menu>
          <Link to="/"> Home</Link>
          <Link to="/dashboard"> Dashboard</Link>
          <Link to="/limits"> Goals</Link>
          <Link
            to="/"
            onClick={() =>
              (window.location.href = process.env.REACT_APP_LOGOUT)
            }
          >
            Logout
          </Link>
        </Menu>
        <div className="new_note">
          <h1 className="header">Notes</h1>
          <div className="textbox_button">
            <textarea
              className="text_box"
              type="text"
              defaultValue={this.state.note}
              placeholder="Enter new note here"
              onChange={e => this.setState({ note: e.target.value })}
            />
            <button className="add_but" onClick={() => this.handleNewNote()}>
              Add
            </button>
          </div>
        </div>
        <div className="notes">{notes}</div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ notes: state.notes });

export default connect(
  mapStateToProps,
  { getNotes, addNote, updateNote, deleteNote }
)(Notes);
