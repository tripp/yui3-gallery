YUI.add("gallery-graphics-vml",function(d){var b=document.createStyleSheet();b.addRule(".vmlgroup","behavior:url(#default#VML)",b.rules.length);b.addRule(".vmlgroup","display:inline-block",b.rules.length);b.addRule(".vmlgroup","zoom:1",b.rules.length);b.addRule(".vmlshape","behavior:url(#default#VML)",b.rules.length);b.addRule(".vmlshape","display:inline-block",b.rules.length);b.addRule(".vmloval","behavior:url(#default#VML)",b.rules.length);b.addRule(".vmloval","display:inline-block",b.rules.length);b.addRule(".vmlrect","behavior:url(#default#VML)",b.rules.length);b.addRule(".vmlrect","display:block",b.rules.length);b.addRule(".vmlfill","behavior:url(#default#VML)",b.rules.length);b.addRule(".vmlstroke","behavior:url(#default#VML)",b.rules.length);function a(){}a.prototype={_currentX:0,_currentY:0,curveTo:function(h,g,m,l,k,j){var i,e,f,n;k=Math.round(k);j=Math.round(j);this._path+=" c "+Math.round(h)+", "+Math.round(g)+", "+Math.round(m)+", "+Math.round(l)+", "+k+", "+j;this._currentX=k;this._currentY=j;i=Math.max(k,Math.max(h,m));f=Math.max(j,Math.max(g,l));e=Math.min(k,Math.min(h,m));n=Math.min(j,Math.min(g,l));this._trackSize(i,f);this._trackSize(e,n);},quadraticCurveTo:function(j,i,l,k){var f=this._currentX,e=this._currentY,h=f+0.67*(j-f),g=e+0.67*(i-e),n=h+(l-f)*0.34,m=g+(k-e)*0.34;this.curveTo(h,g,n,m,l,k);},drawRect:function(e,i,f,g){this.moveTo(e,i);this.lineTo(e+f,i);this.lineTo(e+f,i+g);this.lineTo(e,i+g);this.lineTo(e,i);this._currentX=e;this._currentY=i;return this;},drawRoundRect:function(e,k,f,i,g,j){this.moveTo(e,k+j);this.lineTo(e,k+i-j);this.quadraticCurveTo(e,k+i,e+g,k+i);this.lineTo(e+f-g,k+i);this.quadraticCurveTo(e+f,k+i,e+f,k+i-j);this.lineTo(e+f,k+j);this.quadraticCurveTo(e+f,k,e+f-g,k);this.lineTo(e+g,k);this.quadraticCurveTo(e,k,e,k+j);return this;},drawWedge:function(g,k,i,h,f,e){var j=f*2;e=e||f;this._path+=this._getWedgePath({x:g,y:k,startAngle:i,arc:h,radius:f,yRadius:e});this._trackSize(j,j);this._currentX=g;this._currentY=k;return this;},_getWedgePath:function(h){var g=h.x,l=h.y,j=h.startAngle,i=h.arc,f=h.radius,e=h.yRadius||f,k;if(Math.abs(i)>360){i=360;}j*=-65535;i*=65536;k=" m "+g+" "+l+" ae "+g+" "+l+" "+f+" "+e+" "+j+" "+i;return k;},end:function(){this._draw();},lineTo:function(k,j,g){var f=arguments,h,e;if(typeof k==="string"||typeof k==="number"){f=[[k,j]];}e=f.length;if(!this._path){this._path="";}this._path+=" l ";for(h=0;h<e;++h){this._path+=" "+Math.round(f[h][0])+", "+Math.round(f[h][1]);this._trackSize.apply(this,f[h]);this._currentX=f[h][0];this._currentY=f[h][1];}var l=this._path;return this;},moveTo:function(e,f){if(!this._path){this._path="";}this._path+=" m "+Math.round(e)+", "+Math.round(f);this._trackSize(e,f);this._currentX=e;this._currentY=f;},_trackSize:function(e,g){var i=this._width||0,f=this._height||0;if(e>i){this._width=e;}if(g>f){this._height=g;}}};d.Drawing=a;d.Shape=d.Base.create("shape",d.Base,[],{initializer:function(){this.publish("shapeUpdate");this._addListeners();this._draw();},_getNode:function(){var e=this._createGraphicNode();e.setAttribute("id",this.get("id"));d.one(e).addClass("yui3-"+this.name);return e;},_addListeners:function(){this.after("strokeChange",this._strokeChangeHandler);this.after("fillChange",this._fillChangeHandler);},_strokeChangeHandler:function(n){var h=this.get("node"),o=this.get("stroke"),p,g,l="",f,j,k=0,m;if(o&&o.weight&&o.weight>0){p=o.alpha;g=o.dashstyle||"none";j=o.endcap||"flat";o.color=o.color||"#000000";o.weight=o.weight||1;o.alpha=d.Lang.isNumber(p)?p:1;h.stroked=true;h.endcap=j;h.strokeColor=o.color;h.strokeWeight=o.weight+"px";if(!this._strokeNode){this._strokeNode=this._createGraphicNode("stroke");h.appendChild(this._strokeNode);}this._strokeNode.opacity=o.alpha;if(d.Lang.isArray(g)){l=[];m=g.length;for(k=0;k<m;++k){f=g[k];l[k]=f/o.weight;}}this._strokeNode.dashstyle=l;}else{h.stroked=false;}},_fillChangeHandler:function(j){var h=this.get("node"),i=this.get("fill"),f,g;if(i&&i.color){g=i.alpha;h.filled=true;if(d.Lang.isNumber(g)){g=Math.max(Math.min(g,1),0);if(!this._fillNode){this._fillNode=this._createGraphicNode("fill");h.appendChild(this._fillNode);}i.alpha=g;this._fillNode.opacity=g;this._fillNode.color=i.color;}else{if(this._fillNode){h.removeChild(this._fillNode);this._fillNode=null;}h.fillColor=i.color;}}else{h.filled=false;}},translate:function(e,k){var j=this.get("node"),g=this.get("width"),i=this.get("height"),f=j.coordSize;e=0-(f.x/g*e);k=0-(f.y/i*k);this._translateX=e;this._translateY=k;j.coordOrigin=e+","+k;this.fire("shapeUpdate");},skewX:function(e){},skewY:function(e){},rotate:function(f,g){var e=this.get("node");e.style.rotation=f;this.fire("shapeUpdate");},scale:function(e){},matrix:function(h,g,l,k,j,i){},_draw:function(){var i=this.get("node"),e=this.get("x"),j=this.get("y"),f=this.get("width"),g=this.get("height");i.style.visible="hidden";i.style.position="absolute";i.style.left=e+"px";i.style.top=j+"px";i.style.width=f+"px";i.style.height=g+"px";this._fillChangeHandler();this._strokeChangeHandler();this.fire("shapeUpdate");i.style.visible="visible";},_createGraphicNode:function(e){e=e||this._type;return document.createElement("<"+e+' xmlns="urn:schemas-microsft.com:vml" class="vml'+e+'"/>');},getBounds:function(){var g=this.get("width"),i=this.get("height"),k=this.get("stroke"),f=this.get("x"),l=this.get("y"),e=0,j={};if(k&&k.weight){e=k.weight;}j.left=f-e;j.top=l-e;j.right=f+g+e;j.bottom=l+i+e;return j;}},{ATTRS:{x:{value:0,setter:function(f){var e=this.get("node");e.style.left=f+"px";return f;}},y:{value:0,setter:function(f){var e=this.get("node");e.style.top=f+"px";return f;}},node:{readOnly:true,valueFn:"_getNode"},id:{valueFn:function(){return d.guid();},setter:function(f){var e=this.get("node");e.setAttribute("id",f);return f;}},width:{value:0,setter:function(f){var e=this.get("node");e.setAttribute("width",f);e.style.width=f+"px";return f;}},height:{value:0,setter:function(f){var e=this.get("node");e.setAttribute("height",f);e.style.height=f+"px";return f;
}},visible:{value:true,setter:function(f){var e=f?"visible":"hidden";this.get("node").style.visibility=e;return f;}},fill:{setter:function(g){var f,e=this.get("fill")||this._getAttrCfg("fill").defaultValue;f=(g)?d.merge(e,g):null;if(f&&f.color){if(f.color===undefined||f.color=="none"){f.color=null;}}return f;}},stroke:{valueFn:function(){return{weight:1,dashstyle:"none",color:"#000",alpha:1};},setter:function(f){var e=this.get("stroke")||this._getAttrCfg("stroke").defaultValue;return(f)?d.merge(e,f):null;}},autoSize:{value:false},pointerEvents:{value:"visiblePainted"},graphic:{setter:function(e){this.after("shapeUpdate",d.bind(e.updateSize,e));return e;}}}});d.Path=d.Base.create("path",d.Shape,[d.Drawing],{_type:"shape",_draw:function(){var l=this.get("fill"),k=this.get("stroke"),g=this.get("node"),e=this.get("width"),f=this.get("height"),j=this.get("path"),i="";g.style.visible="hidden";this._fillChangeHandler();this._strokeChangeHandler();if(j){if(l&&l.color){i+=" x";}if(k){i+=" e";}}if(j){g.path=j+i;}if(e&&f){g.coordSize=e+", "+f;g.style.position="absolute";g.style.width=e+"px";g.style.height=f+"px";}this.set("path",j);this.fire("shapeUpdate");g.style.visible="visible";},end:function(){this._draw();},clear:function(){this.set("path","");}},{ATTRS:{width:{getter:function(){return this._width;},setter:function(e){this._width=e;return e;}},height:{getter:function(){return this._height;},setter:function(e){this._height=e;return e;}},path:{getter:function(){return this._path;},setter:function(e){this._path=e;return e;}}}});d.Rect=d.Base.create("rect",d.Shape,[],{_type:"rect"});d.Ellipse=d.Base.create("ellipse",d.Shape,[],{_type:"oval"},{ATTRS:{xRadius:{lazyAdd:false,getter:function(){var e=this.get("width");e=Math.round((e/2)*100)/100;return e;},setter:function(f){var e=f*2;this.set("width",e);return f;}},yRadius:{lazyAdd:false,getter:function(){var e=this.get("height");e=Math.round((e/2)*100)/100;return e;},setter:function(f){var e=f*2;this.set("height",e);return f;}}}});d.Circle=d.Base.create("circle",d.Shape,[],{_type:"oval"},{ATTRS:{radius:{lazyAdd:false,value:0,setter:function(g){var f=this.get("node"),e=g*2;f.style.width=e+"px";f.style.height=e+"px";return g;}},width:{readOnly:true,getter:function(){var e=this.get("radius"),f=e&&e>0?e*2:0;return f;}},height:{readOnly:true,getter:function(){var e=this.get("radius"),f=e&&e>0?e*2:0;return f;}}}});var c=function(e){this.initializer.apply(this,arguments);};c.prototype={initializer:function(f){f=f||{};var e=f.width||0,g=f.height||0;this.id=d.guid();this.node=this._createGraphic();this.node.setAttribute("id",this.id);this.setSize(e,g);this._initProps();},clear:function(){this._path="";this._removeChildren(this.node);},destroy:function(){this._removeChildren(this.node);this.node.parentNode.removeChild(this.node);},_removeChildren:function(e){if(e.hasChildNodes()){var f;while(e.firstChild){f=e.firstChild;this._removeChildren(f);e.removeChild(f);}}},toggleVisible:function(e){this._toggleVisible(this.node,e);},_toggleVisible:function(j,k){var h=d.one(j).get("children"),f=k?"visible":"hidden",g=0,e;if(h){e=h.length;for(;g<e;++g){this._toggleVisible(h[g],k);}}j.style.visibility=f;},setSize:function(e,f){e=Math.round(e);f=Math.round(f);this.node.style.width=e+"px";this.node.style.height=f+"px";this.node.coordSize=e+" "+f;this._canvasWidth=e;this._canvasHeight=f;},setPosition:function(e,f){e=Math.round(e);f=Math.round(f);this.node.style.left=e+"px";this.node.style.top=f+"px";},render:function(e){var f=parseInt(e.getComputedStyle("width"),10),g=parseInt(e.getComputedStyle("height"),10);e=e||d.config.doc.body;e.appendChild(this.node);this.setSize(f,g);this._initProps();return this;},_trackSize:function(e,f){if(e>this._width){this._width=e;}if(f>this._height){this._height=f;}},_initProps:function(){this._fillColor=null;this._strokeColor=null;this._strokeOpacity=null;this._strokeWeight=0;this._fillProps=null;this._path="";this._width=0;this._height=0;this._x=0;this._y=0;this._fill=null;this._stroke=0;this._stroked=false;this._dashstyle=null;},_createGraphic:function(){var e=this._createGraphicNode("group");e.style.display="block";e.style.position="absolute";return e;},_createGraphicNode:function(e){return document.createElement("<"+e+' xmlns="urn:schemas-microsft.com:vml" class="vml'+e+'"/>');},addShape:function(e){var f=e.get("node");e.set("graphic",this);this.node.appendChild(f);if(!this._graphicsList){this._graphicsList=[];}if(!this._shapes){this._shapes={};}this._graphicsList.push(f);this._shapes[e.get("id")]=e;},getShape:function(e){return this._shapes[e];},addChild:function(e){this.node.appendChild(e);},updateSize:function(o){var n,l=0,k,j=this._graphicsList,f=j.length,g,m;this._left=0;this._right=0;this._top=0;this._bottom=0;for(;l<f;++l){k=this.getShape(j[l].getAttribute("id"));n=k.getBounds();this._left=Math.min(this._left,n.left);this._top=Math.min(this._top,n.top);this._right=Math.max(this._right,n.right);this._bottom=Math.max(this._bottom,n.bottom);}g=this._width=this._right-this._left;m=this._height=this._bottom-this._top;this.setSize(this._width,this._height);},_left:0,_right:0,_top:0,_bottom:0};d.Graphic=c;},"@VERSION@",{requires:["graphics"],skinnable:false});