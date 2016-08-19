
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
  handleFormSubmit: function(d) {
	$.post(this.props.url,d).done(function() {
	  this.loadTodos();
	}.bind(this));
  },
  removeTodo: function(i) {
	var x = false, d = this.state.data;
	$.each(d, function(a,b) {
	  (b.id == i) && (x = a);
	});
	x >= 0 && d.splice(x,1) && this.setState({data: d});
	x >= 0 && $.post(this.props.url,{update: true, data: d});
  },
  render: function() {
	var th = this;
	var todoList = this.state.data.map(function(t) {
	  return (
	    <li className="list-group-item" key={t.id}>{t.text} <span className="rmv glyphicon glyphicon-remove-circle" onClick={() => th.removeTodo(t.id)}></span></li>
	  )
	});
    return (
      <div className="panel panel-primary">
	    <div className="panel-heading">
		  <h3 className="panel-title">Total Task: {this.state.data.length}</h3>
	    </div>
	    <div className="panel-body">
		  <ul className="list-group">
		    {todoList}
		  </ul>
	    </div>
	    <div className="panel-footer">
		  <TodoForm formsubmit={this.handleFormSubmit} />
	    </div>
	  </div>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return { tname: ''};
  },
  tnameChange: function(e) {
	this.setState({ tname: e.target.value});
  },
  cleanInput: function(e) {
	$(e.target).parent().hasClass("has-error") && $(e.target).parent().removeClass("has-error");
  },
  formSubmit: function(e) {
	e.preventDefault();
	if(!this.state.tname) {
	  $('#tname').parent().addClass("has-error");
	  return;
	}
	var d = {tname: this.state.tname};
	this.setState({ tname: ''});
	this.props.formsubmit(d);
  },
  render: function() {
    return (
      <form className="form-inline" onSubmit={this.formSubmit}>
		<div className="form-group">
		  <input type="text" className="form-control" size="100" id="tname" placeholder="Todo Text" value={this.state.tname} onChange={this.tnameChange} onFocus={this.cleanInput} />
		</div>
		<button type="submit" className="btn btn-primary" id="todoBtn">Add Todo</button>
	  </form>
    );
  }
});

ReactDOM.render(
  <TodoApp url="/api/todo"/>,
  document.getElementById('todoApp')
);
