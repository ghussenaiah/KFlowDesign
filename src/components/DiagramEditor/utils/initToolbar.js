import { default as MxGraph } from "mxgraph";
import { addToolbarItem, getStyleStringByObj } from "./";

const {
  mxEvent,
  mxRubberband,
  mxUtils,
  mxToolbar,
  mxClient,
  mxDivResizer,
  mxKeyHandler,
  mxGeometry,
  mxCell,
  mxEllipse,
  mxConstants,
  mxPerimeter,
  mxCellRenderer,
  mxText
} = MxGraph();

export default function initToolbar(graph, tbContainer) {
  // Creates new toolbar without event processing
  var toolbar = new mxToolbar(tbContainer);
  toolbar.enabled = false;

  // Workaround for Internet Explorer ignoring certain styles
  if (mxClient.IS_QUIRKS) {
    document.body.style.overflow = "hidden";
    new mxDivResizer(tbContainer);
  }






  //graph.setAutoSizeCells(true);


  // Enables new connections in the graph
  graph.setConnectable(true);

  // Allow multiple edges between two vertices
  graph.setMultigraph(false);


  // Stops editing on enter or escape keypress
  var keyHandler = new mxKeyHandler(graph);
  var rubberband = new mxRubberband(graph);

  var addVertex = function (icon, w, h, style, value = null) {
    var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);



    if (value) {
      vertex.value = value;
    }
    vertex.setVertex(true);


    var img = addToolbarItem(graph, toolbar, vertex, icon);
    img.enabled = true;

    graph.getSelectionModel().addListener(mxEvent.CHANGE, function () {
      var tmp = graph.isSelectionEmpty();
      // mxUtils.setOpacity(img, tmp ? 100 : 20);
      // mxUtils.setOpacity(img, tmp ? 100 : 20);
      img.enabled = tmp;
    });
  };

  var baseStyle = { ...graph.getStylesheet().getDefaultVertexStyle() };



  addVertex(
    "images/start.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/start.png"
    })

  );

  addVertex(
    "images/create.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/create.png"
    })

  );





  addVertex(
    "images/delete.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/delete.png"
    })

  );


  addVertex(
    "images/loop.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/loop.png"
    })

  );

  addVertex(
    "images/if.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/if.png"
    })

  );

  addVertex(
    "images/sms.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/sms.png"
    })

  );


  addVertex(
    "images/email.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/email.png"
    })

  );

  addVertex(
    "images/database.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/database.png"
    })

  );


  addVertex(
    "images/link.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/link.png"
    })

  );

  addVertex(
    "images/end.png",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle
      , [mxConstants.SHAPE_IMAGE]: "images/end.png"
    })

  );

  addVertex(
    "images/ellipse.gif",
    70,
    70,
    getStyleStringByObj({
      ...baseStyle,

      [mxConstants.STYLE_SHAPE]: "swimlane"
    })

  );







  // Compute Rectangle 

  /* 
    addVertex(
     "images/rectangle.gif",
     100,
     100,
 
     getStyleStringByObj({
       ...baseStyle
       ,
 
       [mxConstants.SHAPE_IMAGE]: "https://w7.pngwing.com/pngs/895/199/png-transparent-spider-man-heroes-download-with-transparent-background-free-thumbnail.png"
     })
 
   );
   
   
   addVertex(
     "images/ellipse.gif",
     40,
     40,
     getStyleStringByObj({
       ...baseStyle,
 
       [mxConstants.STYLE_SHAPE]: "ellipse"
     })
   ); */

  // console.log(mxText.getTextCss());
  /* addVertex(
     "images/text.gif",
     0,
     0,
     "text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];",
     "Text"
   );*/
}
