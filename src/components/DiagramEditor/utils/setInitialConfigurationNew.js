import {
  mxGraph,
  mxRubberband,
  mxKeyHandler,
  mxClient,
  mxUtils,
  mxEvent,
  mxEdgeHandler, mxCell, mxCellRenderer, mxConstants, mxEdgeStyle, mxCellOverlay, mxShape, mxSwimlaneLayout, mxPerimeter, mxGeometry, mxImage
  // mxShape,mxCellRenderer
} from "mxgraph-js";
import initToolbar from "./initToolbar";

export default function setInitialConfiguration(graph, toolbarRef) {





  //mxCellRenderer.registerShape('imageShape', ImageShape);

  // var style = graph.getStylesheet().getDefaultVertexStyle();
  var style = graph.getStylesheet().getDefaultVertexStyle();
  style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
  // style[mxConstants.STYLE_FONTSIZE] = '2.5em';
  //style[mxConstants.ALIGN_TOP] = 'top';

  style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_TOP;
  style[mxConstants.STYLE_FONTSIZE] = '20';
  style[mxConstants.STYLE_FONTSTYLE] = 1;
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_TARGET_PORT_CONSTRAINT] = mxConstants.DIRECTION_EAST;

  style[mxConstants.STYLE_TARGET_PORT_CONSTRAINT] = mxConstants.DIRECTION_NORTH;


  // style[mxConstants.sty] = '2.5em';

  //style[mxConstants.STYLE_FONTCOLOR] = '#000000';

  //style[mxConstants.SHAPE_IMAGE] = 'image=https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png';
  // style[mxConstants.STYLE_IMAGE_BACKGROUND] = 'images/data-server.gif';
  //style[mxConstants.STYLE_IMAGE_BACKGROUND] = 'https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png';
  //style[mxConstants.SHAPE_IMAGE] = 'images=images/data-server.gif';



  var style1 = graph.getStylesheet().getDefaultEdgeStyle();


  /* style1[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
   style1[mxConstants.STYLE_STROKECOLOR] = '#080700';
   style1[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
   style1[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
   style1[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
   style1[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC_THIN;
   style1[mxConstants.STYLE_FONTSIZE] = '20'; */

  // style1[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;




  //style[mxEdgeStyle.STYLE_TARGET_PORT_CONSTRAINT] =mxConstants.DIRECTION_EAST ;

  // style[mxEdgeStyle.STYLE_TARGET_PORT_CONSTRAINT] =mxConstants.DIRECTION_MASK_ALL;

  /*style1[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
  style1[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
  style1[mxConstants.STYLE_FONTSIZE] = 20;
  style1[mxConstants.STYLE_FONTFAMILY] = 'Helvetica';
  style1[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
  style1[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style1[mxConstants.STYLE_ROUNDED] = 1;
  // style1[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_BLOCK;
  style1[mxConstants.STYLE_STARTSIZE] = 8;
  style1[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;
  style1[mxConstants.STYLE_ENDSIZE] = 8;
  style1[mxConstants.STYLE_STROKECOLOR] = '#aaaaaa'; */



  style1[mxConstants.STYLE_ROUNDED] = true;
  style1[mxConstants.STYLE_STROKEWIDTH] = 3;
  style1[mxConstants.STYLE_EXIT_X] = 0.5; // center
  style1[mxConstants.STYLE_EXIT_Y] = 1.0; // bottom


  // style1[mxConstants.STYLE_EXIT_PERIMETER] = 0; // disabled
  style1[mxConstants.STYLE_ENTRY_X] = 0.5; // center
  style1[mxConstants.STYLE_ENTRY_Y] = 0; // top
  // style1[mxConstants.STYLE_ENTRY_PERIMETER] = 0; // disabled

  // Disable the following for straight lines
  style1[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;

  graph.getStylesheet().putDefaultEdgeStyle(style1);



  // mxConstants.STYLE_IMAGE_BACKGROUND

  // mxCellRenderer.registerShape('box', BoxShape);






  if (!mxClient.isBrowserSupported()) {
    // Displays an error message if the browser is not supported.
    mxUtils.error("Browser is not supported!", 200, false);
  } else {
    initToolbar(graph, toolbarRef.current);

    // Enables rubberband selection
    new mxRubberband(graph);

    // Gets the default parent for inserting new cells. This is normally the first
    // child of the root (ie. layer 0).
    var parent = graph.getDefaultParent();

    // Enables tooltips, new connections and panning

    graph.setPanning(true);
    graph.setTooltips(true);
    graph.setConnectable(true);
    graph.setEnabled(true);
    graph.setEdgeLabelsMovable(false);
    graph.setVertexLabelsMovable(false);
    graph.setGridEnabled(true);
    graph.setAllowDanglingEdges(false);

    mxEdgeHandler.prototype.addEnabled = true;


    var layout = new mxSwimlaneLayout(graph);

    // Moves stuff wider apart than usual
    //layout.forceConstant = 80;

    // Reference to the transition checkbox
    var animate = document.getElementById('animate');

    style = [];
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_STROKECOLOR] = '#a0a0a0';
    style[mxConstants.STYLE_FONTCOLOR] = '#606060';
    style[mxConstants.STYLE_FILLCOLOR] = '#E0E0DF';
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[mxConstants.STYLE_STARTSIZE] = 30;
    style[mxConstants.STYLE_ROUNDED] = false;
    style[mxConstants.STYLE_FONTSIZE] = 12;
    style[mxConstants.STYLE_FONTSTYLE] = 0;
    style[mxConstants.STYLE_HORIZONTAL] = false;
    // To improve text quality for vertical labels in some old IE versions...
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#efefef';
    graph.getStylesheet().putCellStyle('swimlane', style);



    var group = new mxCell();
    group.setVertex(true);
    // group.setVisible(true);
    group.setValue('group');
    group.setStyle('swimlane');
    group.setCollapsed(false);
    group.setConnectable(false);

    var geometry = group.getGeometry();
    if (geometry) {
      // If the cell already has a geometry, update its attributes
      geometry.x = 100; // Set the x-coordinate of the cell
      geometry.y = 100; // Set the y-coordinate of the cell
      geometry.width = 200; // Set the width of the cell
      geometry.height = 100; // Set the height of the cell
      // Update any other relevant geometry attributes
    } else {
      var geometry = new mxGeometry(100, 100, 200, 100);
    }
    // group.setGridEnabled(true);
    //group.setVertexLabelsMovable(true);
    group.setGeometry(geometry);
    //group.setEnabled(true);


    style = [];
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_STROKECOLOR] = '#a0a0a0';
    style[mxConstants.STYLE_FONTCOLOR] = '#606060';
    style[mxConstants.STYLE_FILLCOLOR] = '#E0E0DF';
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[mxConstants.STYLE_STARTSIZE] = 30;
    style[mxConstants.STYLE_ROUNDED] = false;
    style[mxConstants.STYLE_FONTSIZE] = 12;
    style[mxConstants.STYLE_FONTSTYLE] = 0;
    style[mxConstants.STYLE_HORIZONTAL] = false;
    // To improve text quality for vertical labels in some old IE versions...
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#efefef';
    graph.getStylesheet().putCellStyle('swimlane', style);


    //var group = new mxCell('Group', new mxGeometry(10, 10, 200, 100), 'group');
    //group.setVertex(true);


    graph.getModel().beginUpdate();
    try {
      //mxGrapg component
      var doc = mxUtils.createXmlDocument();
      var node = doc.createElement("S");
      node.setAttribute("ComponentID", "[P01]");

      graph.addCell(group, parent);


      graph.enterGroup(group);

      // Create and add child cells
      var child1 = graph.insertVertex(group, null, 'Child 1', 300, 150, 80, 30);
      var child2 = graph.insertVertex(group, null, 'Child 2', 150, 300, 80, 30);

      // You can continue adding more child cells to the group as needed

      // Exit the group
      graph.exitGroup();
      /* var lane1 = graph.insertVertex(parent, null, 'Lane 1', 0, 0, 1000, 100, 'swimlane');
        var lane2 = graph.insertVertex(parent, null, 'Lane 2', 0, 100, 1000, 100, 'swimlane');
        lane1.setConnectable(false);
        lane2.setConnectable(false);
  
        layout.orientation = mxConstants.DIRECTION_EAST;
  
        layout.resizeParent = false;
        layout.execute(parent, [lane1, lane2]); */


      /* Experiment 
      
      var vertexStyle = 'shape=rectangle;fillColor=white;strokeColor=#000000;strokeWidth=2;rounded=1;';


      var vertex1 = graph.insertVertex(parent, null, 'Vertex 1', 20, 20, 100, 50, vertexStyle);
      var vertex2 = graph.insertVertex(parent, null, 'Vertex 2', 150, 20, 100, 50, vertexStyle);


      function createBoundaryOverlay() {
        var overlay = new mxCellOverlay(new mxShape(), '');
        overlay.update = function (canvas, cell) {
          var bounds = cell.getGeometry();
          var strokeWidth = parseFloat(mxUtils.getValue(this.style, mxConstants.STYLE_STROKEWIDTH, '1'));
          var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#f70a0a');

          canvas.setStrokeColor(strokeColor);
          canvas.setStrokeWidth(strokeWidth);
          canvas.rect(bounds.x, bounds.y, bounds.width, bounds.height);
          canvas.stroke();
        };

        return overlay;
      }

      var overlay1 = createBoundaryOverlay();
      graph.addCellOverlay(vertex1, overlay1);

      var overlay2 = createBoundaryOverlay();
      graph.addCellOverlay(vertex2, overlay2);

      */

      var vx = graph.insertVertex(
        parent,
        null,
        node,
        75,
        75,
        75,
        75,
        // "shape=ellipse;fillColor=yellow;image=https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png"
        //'port;image=images/rectangle.gif;align=right;imageAlign=right;spacingRight=18'

        ';shape=image;verticalAlign=middle;align=center;fil…=#6482B9;fontColor=#774400;image=images/start.png'
      );


      /* var vertex = graph.insertVertex(parent, null, 'Hello, World!', 50, 50, 50, 50,
         'databasestyle');
 
 
 
 
       var v1 = graph.insertVertex(
         parent,
         null,
         "shape1",
         20,
         120,
         80,
         30,
         "rounded=1;strokeColor=red;fillColor=orange"
        
       );
       var v2 = graph.insertVertex(parent, null, "shape2", 300, 120, 80, 30);
       var v3 = graph.insertVertex(parent, null, "shape3", 620, 180, 80, 30);
       var e1 = graph.insertEdge(
         parent,
         null,
         "",
         v1,
         v2,
         "strokeWidth=2;endArrow=block;endSize=2;endFill=1;strokeColor=blue;rounded=1;"
       );
       var e2 = graph.insertEdge(parent, null, "Edge 2", v2, v3);
       var e3 = graph.insertEdge(parent, null, "Edge 3", v1, v3);*/


    } finally {
      // Updates the display
      graph.getModel().endUpdate();
    }



    // Creates a new overlay with an image and a tooltip and makes it "transparent" to events
    var overlay = new mxCellOverlay(
      new mxImage('editors/images/overlays/check.png', 16, 16),
      'Overlay tooltip');

    var mxCellRendererInstallCellOverlayListeners = mxCellRenderer.prototype.installCellOverlayListeners;
    mxCellRenderer.prototype.installCellOverlayListeners = function (state, overlay, shape) {
      mxCellRendererInstallCellOverlayListeners.apply(this, arguments);
      var graph = state.view.graph;

      mxEvent.addGestureListeners(shape.node,
        function (evt) {
          graph.fireMouseEvent(mxEvent.MOUSE_DOWN,
            new mxMouseEvent(evt, state));
        },
        function (evt) {
          graph.fireMouseEvent(mxEvent.MOUSE_MOVE,
            new mxMouseEvent(evt, state));
        });

      if (!mxClient.IS_TOUCH) {
        mxEvent.addListener(shape.node, 'mouseup', function (evt) {
          overlay.fireEvent(new mxEventObject(mxEvent.CLICK,
            'event', evt, 'cell', state.cell));
        });
      }
    };

    // Sets the overlay for the cell in the graph
    //  graph.addCellOverlay(v1, overlay);

    // Configures automatic expand on mouseover
    graph.popupMenuHandler.autoExpand = true;

    // Installs context menu
    graph.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
      menu.addItem('Item 1', null, function () {
        alert('Item 1');
      });

      menu.addItem('Item 2', null, function () {
        alert('Item 2');
      });

      menu.addSeparator();

      var submenu1 = menu.addItem('Submenu 1', null, null);

      menu.addItem('Subitem 1', null, function () {
        alert('Subitem 1');
      }, submenu1);
      menu.addItem('Subitem 1', null, function () {
        alert('Subitem 2');
      }, submenu1);
    };


    // Enables rubberband (marquee) selection and a handler for basic keystrokes
    var rubberband = new mxRubberband(graph);
    var keyHandler = new mxKeyHandler(graph);
  }
}
