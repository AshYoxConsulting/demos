/** @jsx React.DOM */

var Test = React.createClass({

    loadBand: function(){
        $.ajax({
            url: this.props.url + "/Jam",
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
        this.loadBand();
    }
   ,
    render: function() {

        return (
            <form >
                <div>{this.state.all.band }</div>
                <div>{this.state.all.name}</div>
            </form>
        );
    }

});

React.render(<Test url="http://localhost:3000/albums/fi"  />, document.getElementById('content'));