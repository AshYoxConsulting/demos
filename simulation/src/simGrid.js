var simGrid = React.createClass({

    getInitialState: function(){
      var columnDefs = [
          {headerName: "Make", field: "make"},
          {headerName: "Model", field: "model"},
          {headerName: "Price", field: "price"}
      ];

      var rowData = [
          {make: "Toyota", model: "Celica", price: 35000},
          {make: "Ford", model: "Mondeo", price: 32000},
          {make: "Porsche", model: "Boxter", price: 72000}
      ];

      var gridOptions = {
          columnDefs: columnDefs,
          rowData: rowData,
          suppressRowClickSelection: true,
          dontUseScrolls: true // because so little data, no need to use scroll bars
      };
        return gridOptions;
    },


    componentDidMount: function() {
      //this.loadStateFromServer();
      console.log( this.state.gridOptions);
      angularGrid('#myGrid', this.state.gridOptions);
    },
    render: function() {


        return       <div id="myGrid" style="height: 100%;" class="ag-fresh"></div>;


    }
});



// Render the SearchExample component on the page

React.render(<simGrid />, document.getElementById('example'));
