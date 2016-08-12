
var TodoApp = React.createClass({
  loadTodos: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadTodos();
  },
  render: function() {
    return (
      <div className="panel panel-primary">
	    <div className="panel-heading">
		  <h3 className="panel-title">Todo List</h3>
	    </div>
	    <div className="panel-body">
		  <TodoList data={this.state.data} />
	    </div>
	    <div className="panel-footer">
		  <TodoForm />
	    </div>
	  </div>
    );
  }
});

var TodoList = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render: function() {
	var t = this.props.data.map(function(t) {
	  return (
	    <li key={t.id}>{t.text}</li>
	  )
	});
    return (
      <ul className="todoList">
	  {t}
	  </ul>
    );
  }
});

var Todo = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <p>todo</p>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
	return {};
  },
  componentDidMount: function() {
  },
  render: function() {
    return (
      <p>form</p>
    );
  }
});

ReactDOM.render(
  <TodoApp url="/api/todo"/>,
  document.getElementById('todoApp')
);
