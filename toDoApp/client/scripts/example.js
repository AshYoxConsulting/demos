/** @jsx React.DOM */

var Test = React.createClass({

    loadStateFromServer: function(){
      $.ajax({
            url: this.props.url + "/DAList2",
            dataType: 'json',
            cache: false,
            success: function(data) {
              console.log(data);
              this.setState({all: data[0]});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
    },
    getInitialState: function() {
      return {all: {"toDos": []}};
    },
    componentDidMount: function() {
      this.loadStateFromServer();
    },
    saveStateToServer: function(state){
      var t = JSON.stringify(state);
      console.log(t);
      $.ajax({
            url: this.props.url,
            contentType: "application/json",
            type: 'POST',
            data: t,
            success: function(data) {
              console.log(data);
              this.setState({ all: this.state.all });
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
    },
    onSubmit: function(e){
        e.preventDefault();
        var name = React.findDOMNode(this.refs.name).value.trim();
        console.log(name);
        if (!name) {
          return;
        }
        React.findDOMNode(this.refs.name).value = '';
        var state = this.state.all
        state.toDos.push({"name": name, "done": false});
        this.saveStateToServer(state);
    },
    render: function() {
        var checks =  this.state.all.toDos.map(function(d) {
          console.log(d);
          return (
              <div>
                  <input type="checkbox" checked={d.done} onChange={this.__changeSelection.bind(this, d.name)} />
                  {d.name}
                  <br />
              </div>
          );
        }.bind(this));
        return (
            <form onSubmit={this.onSubmit}>
              <div><input type="text" placeholder="add an item..." ref="name" /></div>
              <br />
              {checks}
            </form>
        );
    },
    __changeSelection: function(name) {
        var state = this.state.all.toDos.map(function(d) {
            return {
                name: d.name,
                done: (d.name === name ? !d.done : d.done)
            };
        });
        this.state.all.toDos=state;
        this.saveStateToServer(this.state.all);
    }
});

React.render(<Test url="http://localhost:3000/toDos"  />, document.getElementById('content'));
