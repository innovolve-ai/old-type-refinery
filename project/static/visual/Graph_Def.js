

    //----------------------------------------
    // key id functions
    var getLinkId = function (d) {
        return d.source.index + "-" + d.target.index;
    };
    var getNodeId = function (d, i) {
        return d.G_id + "-" + i;
    };

    

    function graph_define(graph, local_screen_svg) {
        // draw the graph for the defining
        console.log('------- Opening graph define viz data -------')
        console.log(graph)
        

        // Setup d3cola
        var d3cola = cola.d3adaptor(d3)
            .convergenceThreshold(1e-4)
            .size([width, height]);

        console.log('cola loaded', d3cola )

        var svg = local_screen_svg

        console.log('internal svg setup')

         
        var groupgroup = svg.append("g")
        var edgegroup = svg.append("g")
        var nodegroup = svg.append("g") 

        console.log('DOM groups setup')
        
    
        console.log('========')
        console.log(graph)
        var edgelist = graph.links;
        var nodelist = graph.nodes;
        var grouplist = graph.groups;
        var constraintlist = graph.constraints;
        var data = graph;
        console.log('+++++++++++++++++++++++++++++++ basic lists loaded +++++++++++++++++++++++++++++++')
        console.log('node list is ', graph.nodes)
        console.log('edge list is ', graph.links)
        console.log('node list is ', graph.groups)
        console.log('d3cola is ',  d3cola)
        console.log('nodes are ',  nodelist)
        console.log('groups is ',  grouplist)
        console.log('edges are ',  edgelist)
        console.log('=============== in show graph ================================')
        

        d3cola
            .nodes(nodelist)
            .links(edgelist)
            .groups(grouplist)
            .constraints(constraintlist)
            .symmetricDiffLinkLengths(30)
            .avoidOverlaps(true)
            .handleDisconnected(false)
            .start(30);

        console.log('d3cola loaded -> ',d3cola)
        console.log('d3cola clonstraints are -> ',d3cola.constraints)

        var group = groupgroup.selectAll(".group")
            .data(grouplist);

        group.exit().remove();
            
        var groupmerge = group.enter().append("rect")
            .attr("rx", grp_corner).attr("ry", grp_corner)
            .attr("class", "group")
            .style("fill", function (d, i) { 
                return colours.find(colour => colour.name == d.colour_list)['colors'][d.level];
            })
            .attr("stroke-width", 1)
            .attr("stroke", function (d, i) { 
                return colours.find(colour => colour.name == d.colour_list)['colors'][7];
            })
            .call(d3cola.drag)
            .merge(group);

        console.log('groups setup')
    
        //this.group.append("title")
            //  .text(function (d) { return d.label; });

        var link = edgegroup.selectAll(".link")
            .data(edgelist, getLinkId);

        link.exit().remove();
            
        var linkmerge = link.enter().append("line")
            .attr("class", "link")
            .style("stroke-width", '1px')
            .attr('stroke', 'black')
            .merge(link)
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        console.log('links are setup')

        var node = nodegroup.selectAll(".node")
            .data(nodelist, getNodeId);

        node.exit().remove();
            
        var nodemerge = node.enter().append("rect")
            .attr('class', function (d) {
                return "node " + d.type + ' ' + d.G_name ;
            })
            .attr('id', d => d.G_id)
            .merge(node);

        console.log('nodes are loaded')

        var label = nodegroup.selectAll(".label")
            .data(nodelist, getNodeId);

        label.exit().remove();

        var labelmerge = label.enter()
            .append("text")
            .attr("class", "label")
            .text(d => d.type == 'attribute' 
                    ? (d.G_name + ': ' + d.value) 
                    : (d.G_name + ': ' + d.G_id))
            .attr('id', d => 'heading-' + d.G_id)
            .style('font-size', 10)
            .style('text-anchor', 'middle')
            .style('color', d => text_colour(d))
            .style('fill', d => text_colour(d))
            .style("pointer-events", "none")
            .merge(label);

        console.log('labels loaded')

        


        // setup heading colours for attribute, entity and relation
        function text_colour(d) {
            let colour = 'black'
            switch (d.type) {
                case 'attribute':
                    if (d.dtype == 'actual'){
                        colour = att_t_colour
                    } else {
                        colour = shad_t_colour
                    }
                    break;            
                case 'entity':
                    colour = ent_t_colour
                    break;
                case 'relation':
                    colour = rel_t_colour
                    break;
                default:
                    colour = 'black'
                    break;
            }
            return colour;
        }

        nodemerge
            .attr('width', d => nodeWidth(d))
            .attr('height', d => d.height)
            .attr('rx', d => d.corner)
            .attr('ry', d=> d.corner)     
            .attr('x', d => d.x)
            .attr('y', d => d.y)   
            .style("fill", d => d.colour)
            .style("pointer-events", d => d.constraint_type != 'leaf' 
                                        ? 'none' 
                                        : 'auto')
            .on('dblclick', releasenode)
            .call(d3cola.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
                );

        console.log('node 2 is loaded')

        function dragstarted(d) {
            console.log('================= start drag ==========')
            console.log('cola is   ',cola)
            console.log('d.fx  ',d.fx, ' d.fy ',d.fy)
            console.log('d.x  ',d.x, ' d.y ',d.y)
              if (!d3cola.active) d3cola.start();
            d3.select(this).classed("fixed", d.fixed = true);
              d.fx = d.x;
              d.fy = d.y;
        }

        function dragged(d) {
            console.log('================= i am dragged ==========')
            console.log('cola is   ',cola)
            console.log('d.fx  ',d.fx, ' d.fy ',d.fy)
            console.log('d.x  ',d.x, ' d.y ',d.y)
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            console.log('================= end drag ==========')
            console.log('cola is   ',cola)
            console.log('d.fx  ',d.fx, ' d.fy ',d.fy)
            console.log('d.x  ',d.x, ' d.y ',d.y)
            if (!d3cola.active) d3cola.start();
            // Allows NODE FIXING
            // d.fx = null;
            // d.fy = null;
        }
        function releasenode(d) {
            console.log('================= release node ==========')
            console.log('cola is   ',cola)
            console.log('d.fx  ',d.fx, ' d.fy ',d.fy)
            console.log('d.x  ',d.x, ' d.y ',d.y)
        d3.select(this).classed("fixed", d.fixed = false);
            d.fx = null;
            d.fy = null;
            if (!d3cola.active) d3cola.start();
        }
        
        

        // function to set dimensions and colours for shapes
        function nodeWidth(d) {
            let headingid = '#heading-' + d.G_id;
            console.log('================= setup node dimensions ==========')
            console.log('heading id   ',headingid)
            console.log('headingbox  ',d3.select(headingid))
            let headingbbox = d3.select(headingid).node().getBBox();  


            d.width = d3.max([5, headingbbox.width]) + (textPadding * 2)
            d.height = headingbbox.height  + textPadding * 2        

            // attributes and entities rounded rectangle, relation is circle
            switch (d.type) {
                case 'attribute':
                    d.corner = corner
                    d.colour = att_colour
                    d.x = headingbbox.x - textPadding
                    d.y = headingbbox.y - textPadding
                        if (d.dtype === 'shadow'){
                            d.colour =  shad_colour;                       
                    } else {
                            d.colour =  att_colour; 
                    }
                    break;

                case 'entity':
                    d.corner = corner
                    d.colour = ent_colour
                    d.x = headingbbox.x - textPadding
                    d.y = headingbbox.y - textPadding
                        break;

                case 'relation':
                    d.width = 16
                    d.height = 16
                    d.corner = 8
                    d.colour = rel_colour
                    d.x = headingbbox.x + (headingbbox.width)/2 - d.width/2
                    d.y = headingbbox.y + d.height/2
                        break;

                default:
                    break;
            }
            return d.width;
        };

            d3cola.on("tick", function () { regularTick(linkmerge, nodemerge, labelmerge, groupmerge) });
            
    }

    //------------------------------------------
    // visualisation component
    //-----------------------------------------
    function regularTick(link, node, label, group) {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node.attr("x", function (d) { return d.x - d.width/2; })
                .attr("y", function (d) { return d.y - d.height/2; });

            group.attr("x", function (d) { return d.bounds.x -pad; })
                .attr("y", function (d) { return d.bounds.y - pad; })
                .attr("width", function (d) { return d.bounds.width() + 2 * pad; })
                .attr("height", function (d) { return d.bounds.height() + 2 * pad; });
            
            label.attr("x", function (d) { return d.x; })
                    .attr("y", function (d) {
                        var h = this.getBBox().height;
                        if (d.type != 'relation') {
                            return d.y + h/4;
                        } else {
                            return d.y - h;
                        }
                        
                    });
    };
            


