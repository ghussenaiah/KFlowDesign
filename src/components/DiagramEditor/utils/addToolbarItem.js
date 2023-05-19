import { default as MxGraph } from "mxgraph";
import { getStyleStringByObj } from ".";

const { mxEvent, mxUtils } = MxGraph();

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
  mxEvent.addListener(img, "mousedown", function (evt) {
    // do nothing
  });

  // This listener is always called first before any other listener
  // in all browsers.
  mxEvent.addListener(img, "mousedown", function (evt) {

    if (!img.enabled) {

      mxEvent.consume(evt);

    }
  });







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
      if (cells[i].isVertex()) {
        //  updateBoundaryOverlay(cells[i]);
      }
    }
  });

  graph.addListener(mxEvent.CELLS_MOVED, function (sender, evt) {
    var cells = evt.getProperty('cells');
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].isVertex()) {
        var isPartOfGroup = false;

        var vertex=cells[i];

       var groups = graph.getChildVertices(parent);
       for (var i = 0; i < groups.length; i++) {
         var groupCell = groups[i];
         var groupGeometry = groupCell.getGeometry();

       if (groupGeometry.contains(vertex.getGeometry())) {
          isPartOfGroup = true;
          break;
         }
}

if (isPartOfGroup) {
  console.log('The vertex is part of a group.');
} else {
  console.log('The vertex is not part of a group.');
}
      }
    }
  });

  graph.addListener(mxEvent.RESIZE_CELLS, function (sender, evt) {
    var cells = evt.getProperty('cells');
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].isVertex()) {
        //updateBoundaryOverlay(cells[i]);
      }
    }
  });


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
  graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
    if (cell != null) {
      // Add custom menu items for cells
      menu.addItem("Custom Item 1", null, function() {
        // Custom action for item 1
        alert("Custom Item 1 clicked");
      });
      menu.addItem("Custom Item 2", null, function() {
        // Custom action for item 2
        alert("Custom Item 2 clicked");
      });
    } else {
      // Add custom menu items for the background
      menu.addItem("Custom Item 3", null, function() {
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
