import {
  mxGraph,
  mxRubberband,
  mxKeyHandler,
  mxClient,
  mxUtils,
  mxEvent,
  mxEdgeHandler, mxCell, mxCellRenderer, mxConstants, mxEdgeStyle, mxCellOverlay, mxShape
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

    graph.getModel().beginUpdate();
    try {
      //mxGrapg component
      var doc = mxUtils.createXmlDocument();
      var node = doc.createElement("S");
      node.setAttribute("ComponentID", "[P01]");


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


  

    // Enables rubberband (marquee) selection and a handler for basic keystrokes
    var rubberband = new mxRubberband(graph);
    var keyHandler = new mxKeyHandler(graph);
  }
}
