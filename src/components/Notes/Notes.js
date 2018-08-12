import React, { Component } from "react";
import { connect } from "react-redux";
import { getNotes, addNote, updateNote, deleteNote } from "../../dux/reducer";
import moment from "moment";

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
      <div key={e.id}>
        <p>{e.date}</p>
        <p>
          {this.state.editFlag && this.state.editId === e.id ? (
            <span>
              <input
                onChange={e => this.setState({ notecopy: e.target.value })}
                defaultValue={this.state.notecopy}
                type="text"
              />
              <button onClick={() => this.handleUpdate(e.id)}>Submit</button>
            </span>
          ) : (
            e.note
          )}
        </p>
        <a onClick={() => this.props.deleteNote(e.id)}>Delete</a>
        {!this.state.editFlag && (
          <button onClick={() => this.handleEdit(e.id, e.note)}>Edit</button>
        )}
        {/* {this.state.editFlag && this.state.editId === e.id ? <input value={this.state.notecopy}type="text"/>:e.note} */}
      </div>
    ));
    console.log(this.props.notes.map(e => e));
    return (
      <div>
        <input
          type="text"
          value={this.state.note}
          placeholder="Enter note here"
          onChange={e => this.setState({ note: e.target.value })}
        />
        <button onClick={() => this.handleNewNote()}>Submit</button>
        {notes}
      </div>
    );
  }
}
const mapStateToProps = state => ({ notes: state.notes });

export default connect(
  mapStateToProps,
  { getNotes, addNote, updateNote, deleteNote }
)(Notes);
