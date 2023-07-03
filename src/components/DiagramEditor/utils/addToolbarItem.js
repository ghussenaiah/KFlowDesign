import { default as MxGraph } from "mxgraph";
import { getStyleStringByObj } from ".";
import _ from 'lodash';
import CircularJSON from 'circular-json';


const { mxEvent, mxUtils, mxCell } = MxGraph();

export default function addToolbarItem(graph, toolbar, prototype, image) {
  // Function that is executed when the image is dropped on
  // the graph. The cell argument points to the cell under
  // the mousepointer if there is one.
  var funct = function (graph, evt, cell, x, y) {

    graph.stopEditing(false);

    var vertex = graph.getModel().cloneCell(prototype);

    vertex.geometry.x = x;

    vertex.geometry.y = y;

    graph.addCell(vertex);

    graph.setSelectionCell(vertex);

  };

  // Creates the image which is used as the drag icon (preview)
  var img = toolbar.addMode(null, image, function (evt, cell) {

    var pt = this.graph.getPointForEvent(evt);

    funct(graph, evt, cell, pt.x, pt.y);
  });

  // Disables dragging if element is disabled. This is a workaround
  // for wrong event order in IE. Following is a dummy listener that
  // is invoked as the last listener in IE.
  /* mxEvent.addListener(img, "mousedown", function (evt) {
     // do nothing
   });*/

  // This listener is always called first before any other listener
  // in all browsers.
  /*mxEvent.addListener(img, "mousedown", function (evt) {

    if (!img.enabled) {

      mxEvent.consume(evt);

    }
  });*/







  function updateBoundaryOverlay(vertex) {

    //graph.boundaryOverlay(vertex)

    //var boundaryOverlay = graph.getCellOverlay(vertex);
    var boundaryOverlay = graph.boundaryOverlay(vertex);


    if (!boundaryOverlay) {
      boundaryOverlay = new mxCellOverlay(new mxImage('path/to/boundary.png', 200, 100), 'Overlay tooltip');
      graph.addCellOverlay(vertex, boundaryOverlay);
    }

    // Calculate the boundary size based on the vertex's size
    var boundaryWidth = vertex.geometry.width + 10; // Adjust as needed
    var boundaryHeight = vertex.geometry.height + 10; // Adjust as needed

    // Update the boundary overlay size
    boundaryOverlay.bounds = new mxRectangle(
      vertex.geometry.x - 5, // Adjust as needed
      vertex.geometry.y - 5, // Adjust as needed
      boundaryWidth,
      boundaryHeight
    );



    graph.refresh(); // Refresh the graph to update the overlay
  }

  var parent = graph.getDefaultParent();



  graph.addListener(mxEvent.ADD_CELLS, function (sender, evt) {

    var cells = evt.getProperty('cells');

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];

      var vertex = cell;

      // Check if the added cell is a vertex
      if (graph.getModel().isVertex(cell)) {
        var targetCell = graph.getModel().getParent(cell);


        var groups = graph.getChildVertices(parent);
        for (var i = 0; i < groups.length; i++) {
          var groupCell = groups[i];

          /*groupCell.geometry.x
          groupCell.geometry.y
          groupCell.geometry.width
          groupCell.geometry.height

          vertex.geometry.x
          vertex.geometry.y
          vertex.geometry.width
          vertex.geometry.height */

          var totalwidth = groupCell.geometry.x + groupCell.geometry.width;
          var totalheight = groupCell.geometry.y + groupCell.geometry.height;

          var flag = true;
          // !containsObject(groupCell.children, vertex) &&  vertex.style.indexOf("swimlane") < 0 &&
          if (!containsObject(groupCell.children, vertex) && groupCell.id != vertex.id && groupCell.geometry.x <= vertex.geometry.x && groupCell.geometry.y <= vertex.geometry.y &&
            totalwidth >= vertex.geometry.x && totalheight >= vertex.geometry.y
          ) {

            var swimlaneId = groupCell.id;
            var swimlaneCell = graph.getModel().getCell(swimlaneId);

            graph.addCell(cell, swimlaneCell);

            //  if (groupCell != null && groupCell.children != null) {
            //  groupCell.children.push(vertex);
            // }


            // Check if the target cell is a swimlane
            /* if (graph.isSwimlane(targetCell)) {
               // Set the swimlane as the parent of the vertex cell
               graph.addCell(cell, targetCell);
             }*/
          }
        }
      }
    }

  });

  graph.addListener(mxEvent.CELLS_MOVED, function (sender, evt) {
    var cells = evt.getProperty('cells');

    //cells[0].setStyle(';shape=swimlane;verticalAlign=middle;align=center;fillColor=#E6295A;strokeColor=#6482B9;fontColor=#774400;verticalLabelPosition=top;fontSize=20;fontStyle=1;rounded=true;undefined=north');
    /*for (var i = 0; i < cells.length; i++) {
      if (cells[i].isVertex()) {
        var isPartOfGroup = false;

        var vertex = cells[i];

        var groups = graph.getChildVertices(parent);
        for (var i = 0; i < groups.length; i++) { } */

    var cells = evt.getProperty('cells');

    for (var i = 0; i < cells.length; i++) {

      var cell = cells[i];

      // Check if the cell is contained within a swimlane
      // if (graph.isSwimlane(graph.getModel().getParent(cell))) {
      // Remove the cell from the swimlane
      //  graph.removeCells([cell]);

      var parentCell = graph.getModel().getParent(cell);

      if (graph.isSwimlane(parentCell)) {

        // graph.getModel().setParent(cell, null);
        graph.removeCells([cell]);
      }

    }
    /* var groupCell = groups[i];
 
 
     var valuemm = groupCell.value;
     if (valuemm == 'Lane 1' && groupCell.children) {
 
       // var cell = groupCell.children[0];
 
       const emptyObject = groupCell.children[0];
 
       const cell = _.cloneDeep(emptyObject);
       
 
       //const jsonString = CircularJSON.stringify(graph);
       //console.log(jsonString);
 
 
 
 
       if (!containsObject(groupCell.children, cells[0]) && cells[0].style != "swimlane;fillColor=#FFA500" && cells[0].style != "fillColor=lightgreen") {
 
         cell.setStyle(cells[0].style);
         cell.setId(cells[0].id);
         cell.parent.children.push(emptyObject);
         cell.setValue("vertex100");
         //cell.mxObjectId(cells[0].mxObjectId);
         //cells[0].setParent(cell.parent);
         cell.mxObjectId = 'mxCell#11';
 
         groupCell.children.push(cell);
 
         graph.model.cells[cells[0].id] = cell;
 
         const propertyToCompare = 'value';
         const valueToCompare = 'undefined';
 
         var cellObjects = graph.model.cells;
 
        
         graph.getView().refresh();
         graph.refresh();
       }
 
       // containsObject(groupCell.children.push(cells[0]);
       // var mmgfdgdgf = groupCell.children;
 
       //groupCell.children.push(cells[0]);
 
     }
     //  break;
     var groupGeometry = groupCell.getGeometry();
 
     // var doOverlap = groupGeometry.intersects(vertex.getGeometry());
 
     // if (doOverlap) {
     console.log('The vertices overlap.');
     //} else {
     console.log('The vertices do not overlap.');
     // }
     */


    /*  if (isPartOfGroup) {
        console.log('The vertex is part of a group.');
      } else {
        console.log('The vertex is not part of a group.');
      } */

  });


  /* graph.addListener(mxEvent.SWIMLANE_COLLAPSED, function(sender, evt) {
     var swimlane = evt.getProperty('swimlane');
   
   //  graph.getModel().setVisible(graph.model.cells[6], false);
   
     // Handle the swimlane collapsed event here
     console.log('Swimlane collapsed:', swimlane);
   }); 
   
   graph.addListener(mxEvent.SWIMLANE_EXPANDED, function(sender, evt) {
     var swimlane = evt.getProperty('swimlane');
   
     // Handle the swimlane expanded event here
     console.log('Swimlane expanded:', swimlane);
   });*/

  /*
    graph.addListener(mxEvent.CELLS_COLLAPSED, function (sender, evt) {
      var cells = evt.getProperty('cells'); // Get the collapsed cells
   
      
      //graph.getModel().setVisible(graph.model.cells[6], false);
      // Handle the collapsed cells as needed
      console.log('Cells collapsed:', cells);
    });
   
    graph.addListener(mxEvent.CELLS_EXPANDED, function (sender, evt) {
      var cells = evt.getProperty('cells'); // Get the expanded cells
      // Handle the expanded cells as needed
      console.log('Cells expanded:', cells);
    }); */



  function containsObject(list, obj) {
    var i;
    if (list != null) {
      for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
          return true;
        }
      }

    }

    return false;
  }

  graph.addListener(mxEvent.RESIZE_CELLS, function (sender, evt) {
    var cells = evt.getProperty('cells');

    // var cells = evt.getProperty('cells');

    // Check if the resized cell is a swimlane

    for (var i = 0; i < cells.length; i++) {
      if (cells[i].isVertex()) {
        //updateBoundaryOverlay(cells[i]);
      }
    }
  });





  function showPopup(cell, x, y) {
    // Create the popup element
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = 'Popup content';

    // Position the popup at the specified coordinates
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';

    // Append the popup to the document body
    document.body.appendChild(popup);

    // Register a click event listener on the popup to remove it when clicked outside
    document.addEventListener('click', function (e) {
      if (!popup.contains(e.target)) {
        // Remove the popup from the document body
        document.body.removeChild(popup);
      }
    });
  }


  graph.addListener(mxEvent.CELLS_FOLDED, function (sender, evt) {

    //  graph.getModel().setVisible(graph.model.cells[6], false);
    var cells = evt.getProperty('cells'); // Get the folded or expanded cells
    var collapsed = evt.getProperty('collapsed'); // Get the collapsed state (true or false)
    var collapsed = evt.properties.collapse;
    cells[0].setStyle('swimlane;fillColor=#FFA500');
    // Handle the event based on the collapsed state and the affected cells
    if (collapsed) {
      // Swimlane collapsed
      // cell.setConnectable(false);
      graph.getModel().setVisible(graph.model.cells[6], false);
      // graph.model.cells[6].setConnectable(false);
      console.log('Swimlane collapsed:', cells);
    } else {
      // Swimlane expanded
      // graph.getModel().setVisible(graph.model.cells[6], false);

      graph.getModel().setVisible(graph.model.cells[6], true);
      console.log('Swimlane expanded:', cells);
    }
  });



  // Add listener for before collapse event
  /*graph.addListener(mxEvent.BEFORE_COLLAPSE, function (sender, evt) {
    var cell = evt.getProperty('cell'); // Get the swimlane cell that is about to be collapsed
   
    // Prevent collapsing specific swimlanes if needed
    // if (cell.getId() === 'specificSwimlaneId') {
    // evt.consume(); // Cancel the collapse event
    console.log('Cannot collapse this swimlane');
    //}
  });*/


  graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
    var cell = evt.getProperty('cell');

    if (cell === undefined || cell === null) {

      // The vertex is a swimlane
      console.log('Swimlane vertex');
    } else {
      // The vertex is a regular vertex
      console.log('Regular vertex');

      var popupDialog = document.getElementById('popupDialog');
      var vertexName = document.getElementById('vertexName');
      vertexName.innerText = cell.getValue(); // Set the vertex name in the dialog

      popupDialog.style.display = 'block';
    }
  });



  document.addEventListener('click', function(event) {
    var popupDialog = document.getElementById('popupDialog');
  
    if (!event.target.closest('#popupDialog') && popupDialog.style.display === 'block') {
      popupDialog.style.display = 'none';
    }
  });







  var initialStyle = 'fillColor=lightblue'; // Example initial style
  var targetStyle = 'fillColor=lightgreen'; // Example target style


  /*graph.addListener(mxEvent.DRAG_ENTER, function (sender, evt) {
    var cell = evt.getProperty('cell');
    var swimlane = graph.isSwimlane(cell);

    if (swimlane) {
      // applyStyle(cell, targetStyle);
    }
  }); 

  graph.addListener(mxEvent.DRAG_LEAVE, function (sender, evt) {
    var cell = evt.getProperty('cell');
    var swimlane = graph.isSwimlane(cell);

    if (swimlane) {
      //applyStyle(cell, initialStyle);
    }
  });

  function applyStyle(cell, style) {
    // graph.getModel().setStyle(cell, style);
    // graph.refresh(cell);
  }


  graph.addListener(mxEvent.DROP, function (sender, evt) {
    var cell = evt.getProperty('cell');
    var swimlane = graph.isSwimlane(cell);

    if (swimlane) {
      //applyStyle(cell, initialStyle);
    }
  }); */






  //graph.addListener(mxEvent.DRAG_ENTER, function (sender, evt) {
  //console.log('The vertex is not part of a group.');
  // Check if the dragged element is the vertex
  // if (evt.getProperty('event').target === vertex) {
  // Hide the vertex in the toolbar
  // vertex.style.display = 'none';
  // }
  //});


  //mxEvent.addGestureListeners(vertex, function(evt) {
  //console.log('The vertex is not part of a group.');
  // Custom logic to handle the drag behavior
  // var x = mxEvent.getClientX(evt);
  // var y = mxEvent.getClientY(evt);
  // var pt = mxUtils.convertPoint(container, x, y);

  //});

  /* graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
     if (cell.edge) {
       menu.addItem('First edge option', null, function () {
         alert('This is the first option of edge ');
       })
       menu.addItem('Second edge option', null, function () {
         alert('This is the second option of edge ');
       })
     }
     if (cell.vertex) {
       alert('This is the first option of vertex ');
       menu.addItem('First vertex option', null, function () {
   
       })
       menu.addItem('Second vertex option', null, function () {
         alert('This is the second option of vertex ');
       })
     }
   } */
  graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
    if (cell != null) {
      // Add custom menu items for cells
      menu.addItem("Custom Item 1", null, function () {
        // Custom action for item 1
        alert("Custom Item 1 clicked");
      });
      menu.addItem("Custom Item 2", null, function () {
        // Custom action for item 2
        alert("Custom Item 2 clicked");
      });
    } else {
      // Add custom menu items for the background
      menu.addItem("Custom Item 3", null, function () {
        // Custom action for item 3
        alert("Custom Item 3 clicked");
      });
    }
  };
  // Enable the default context menu
  //mxEvent.disableContextMenu(container);

  // Attach the popup menu handler to the graph
  graph.popupMenuHandler.setEnabled(true);


  mxUtils.makeDraggable(img, graph, funct);

  return img;
}
