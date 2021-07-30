// Main rendering function
const render = (colaGraph, local_svg, theme) => {
  console.log('my svg is -> ', local_svg)
    // Setup Basic Variables
    const d3nodes = colaGraph.basic.nodes;
    const d3edges = colaGraph.basic.links;
    //const gTypes = JSON.parse(JSON.stringify(colaGraph.details));
    // setup group for all graph objects
    const g = local_svg.append('g'). attr('class', 'graph');

    // setup the simulation forces
    var simulation = d3.forceSimulation()
        .force('link', d3.forceLink()
                        .id(function(d) { return d.id; })
                        .distance(theme.d3sim.linkdistance))
        .force('charge', d3.forceManyBody(theme.d3sim.charge))
        .force('center', d3.forceCenter(width / 2, height / 2))
    ;  

    // Setup Links
    const edge = g.append('g')
        .attr('class', 'edges')
        .selectAll("line")
        .data(d3edges)
        .enter()
          .append('line')
          .attr('stroke-width', theme.edges.stroke)
    			.attr('stroke', theme.edges.colour);  

    // Setup Nodes Without Shape First
    const node = g.append('g')
    		.attr('class', 'nodes')
    		.selectAll('g') 
        .data(d3nodes)    
        .enter()
        	.append('g')
    			.attr('class', d => d.type)
    			.attr('id', d => d.id);

		// Setup Shapes Variable, so it draws before text
		const shape = node.append("rect") 
            .attr('class', d => d.G_name)
    				.attr('id', d => d.id);
    			//.on('contextmenu', (d, i) => {
          //  createContextMenu(d, menuItems, width, height, 'SVG');
         // });
  
    function get_local_iid(G_id, iid_shorten) {
          if (iid_shorten != true) {
              return G_id
          } else {
              var regex_check = /[0]{4,}/
              var regex_replace = '0..0'
              return G_id.replace(regex_check, regex_replace)
          }
      }
  	// setup the text, headings, without descriptions, to start for each node
    var headings = node.append('text')
        .text( function (d) {
                var loc_type = d.type;
                loc_str = ''
                switch(loc_type) {
                    case 'attribute':                                
                        if (theme.attribute.label_name == true) {
                            loc_str = loc_str + d.G_name + ': '
                        }
                        if (theme.attribute.label_value == true) {
                            loc_str = loc_str + d.value
                        }
                        break;

                    case 'entity':
                        if (theme.entity.label_name == true) {
                            loc_str = loc_str + d.G_name + ': '
                        }
                        if (theme.entity.label_iid == true) {
                            loc_str = loc_str + get_local_iid(d.G_id, theme.entity.iid_shorten)
                        }
                        break

                    case 'relation':
                        if (theme.relation.label_name == true) {
                            loc_str = loc_str + d.G_name + ': '
                        }
                        if (theme.relation.label_iid == true) {
                            loc_str = loc_str + get_local_iid(d.G_id, theme.relation.iid_shorten)
                        }
                        break

                    case 'super':
                        loc_str = d.G_name
                        break

                    default:
                        loc_str = 'default string'
                }
                return loc_str
            })
        .attr('id', d => 'heading-' + d.id)
        .style('font-size', 10)
        .style('text-anchor', 'middle')
        .style('color', d => text_colour(d))
        .style('fill', d => text_colour(d))
        .style("pointer-events", "none");

		// setup heading colours for attribute, entity and relation
    function text_colour(d) {
      let colour = 'black'
      switch (d.type) {
          case 'attribute':
              if (d.dtype == 'actual'){
                  colour = theme.attribute.tcolour
              } else {
                  colour = theme.shadow.tcolour
              }
              break;            
          case 'entity':
              colour = theme.entity.tcolour
              break;
          case 'relation':
              colour = theme.relation.tcolour
              break;
          default:
              colour = 'black'
              break;
      }
      return colour;
    }

		// draw the shape depnding on heading width, node-type, and color  
    shape.attr('width', d => nodeWidth(d))
        .attr('height', d => d.height)
        .attr('rx', d => d.corner)
        .attr('ry', d=> d.corner)     
        .attr('x', d => d.x)
        .attr('y', d => d.y)   
        .attr("class", d => d.G_name) 
        .style("fill", d => d.colour)
  			.classed("fixed", d => d.fx !== undefined);         

    // function to set dimensions and colours for shapes
    function nodeWidth(d) {
        let headingid = '#heading-' + d.id;
        let headingbbox = d3.select(headingid).node().getBBox();    

        d.width = d3.max([5, headingbbox.width]) + (textPadding * 2)
        d.height = headingbbox.height  + textPadding * 2        

        // attributes and entities rounded rectangle, relation is circle
        switch (d.type) {
          case 'attribute':
            d.corner = theme.attribute.corner
            d.x = headingbbox.x - textPadding
            d.y = headingbbox.y - textPadding
            if (d.dtype === 'shadow'){
                    d.colour =  theme.shadow.colour;                       
            } else {
                    d.colour =  theme.attribute.colour; 
            }
            break;

        case 'entity':
            d.corner = theme.entity.corner
            d.colour = theme.entity.colour
            d.x = headingbbox.x - textPadding
            d.y = headingbbox.y - textPadding
            break;

        case 'relation':
            d.width = theme.relation.radius * 2
            d.height = theme.relation.radius * 2
            d.corner = theme.relation.radius
            d.colour = theme.relation.colour
            d.x = headingbbox.x + (headingbbox.width)/2 - d.width/2
            d.y = headingbbox.y + d.height/2
            break;

        
        default:
            break;
        }
        return d.width;
    };
		
  	// Simulation Run Time
  	simulation
        .nodes(d3nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(d3edges);

    function ticked() {
        edge
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("transform", function(d) {
            	return "translate(" + d.x + "," + d.y + ")";
            })
    }


    // Setup the svg zooming
    
  
  node
    		.on('dblclick', releasenode)           

var drag_handler = d3.drag()
	.on("start", drag_start)
	.on("drag", drag_drag)
	.on("end", drag_end);	
	
drag_handler(node);
  	
  	//Drag functions 
//d is the node 
function drag_start(d) {
 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

//make sure you can't drag the circle outside the box
function drag_drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function drag_end(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3);
  d.fx = d.x;
  d.fy = d.y;
}
function releasenode(d) {
    console.log('================= release node ==========')
    console.log('d.fx  ',d.fx, ' d.fy ',d.fy)
    console.log('d.x  ',d.x, ' d.y ',d.y)
d3.select(this).classed("fixed", d.fixed = false);
    d.fx = null;
    d.fy = null;
  if (!d3.event.active) simulation.alphaTarget(0.9);
}
    
  

}; // end of render