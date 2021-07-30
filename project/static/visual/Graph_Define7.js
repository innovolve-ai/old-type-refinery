

    //----------------------------------------
    // key id functions
    var getLinkId = function (d) {
        return d.source.index + "-" + d.target.index;
    };
    var getNodeId = function (d, i) {
        return d.G_id + "-" + i;
    };

    var d3cola = {}

    function graph_define(graph, local_screen_svg, local_local_theme) {
        // draw the graph for the defining
        console.log('------- Opening graph define viz data -------')
        console.log(graph)
        

        // Setup d3cola
        d3cola = cola.d3adaptor(d3)
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
        console.log('local_theme is ',  local_theme)
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
        console.log('d3cola clonstraints are -> ',d3cola._constraints)

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
            .style("stroke-width", local_theme.edges.stroke)
            .attr('stroke', local_theme.edges.colour)
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
            .text(d => getLabelText(d))
            .attr('id', d => 'heading-' + d.G_id)
            .style('font-size', d=> d.tsize)
            .style('text-anchor', 'middle')
            .style('fill', d => d.tcolour)
            .style("pointer-events", "none")
            .merge(label);

        console.log('labels loaded')

        
        // function to handle the text
        function getLabelText(d) {
            var loc_type = d.type;
            loc_str = ''
            switch(loc_type) {
                case 'attribute':                                
                    if (local_theme.attribute.label_name == true) {
                        loc_str = loc_str + d.G_name 
                    }
                    if ((local_theme.attribute.label_name == true) & (local_theme.attribute.label_value == true)) {
                        loc_str = loc_str + ': '
                    }
                    if (local_theme.attribute.label_value == true) {
                        loc_str = loc_str + d.value
                    }       
                    if (d.dtype == 'actual'){
                        d.tcolour = local_theme.attribute.tcolour
                    } else {
                        d.tcolour = local_theme.shadow.tcolour
                    }         
                    d.tsize = local_theme.attribute.tsize            
                    d.split = local_theme.attribute.split_line
                    d.label = loc_str
                    break;

                case 'entity':
                    if (local_theme.entity.label_name == true) {
                        loc_str = loc_str + d.G_name 
                    }
                    if ((local_theme.entity.label_name == true) & (local_theme.entity.label_iid == true)) {
                        loc_str = loc_str + ': '
                    }
                    if (local_theme.entity.label_iid == true) {
                        loc_str = loc_str + get_local_iid(d.G_id, local_theme.entity.iid_shorten)
                    }
                    d.tcolour = local_theme.entity.tcolour
                    d.tsize = local_theme.entity.tsize
                    d.split = local_theme.entity.split_line
                    d.label = loc_str
                    break

                case 'relation':
                    if (local_theme.relation.label_name == true) {
                        loc_str = loc_str + d.G_name 
                    }
                    if ((local_theme.relation.label_name == true) & (local_theme.relation.label_iid == true)) {
                        loc_str = loc_str + ': '
                    }
                    if (local_theme.relation.label_iid == true) {
                        loc_str = loc_str + get_local_iid(d.G_id, local_theme.relation.iid_shorten)
                    }
                    d.tcolour = local_theme.relation.tcolour
                    d.tsize = local_theme.relation.tsize
                    d.split = local_theme.relation.split_line
                    d.label = loc_str
                    break

                case 'super':
                    if (local_theme.super.label_name == true) {
                        loc_str = loc_str + d.G_name 
                    }
                    if ((local_theme.super.label_name == true) & (local_theme.super.label_iid == true)) {
                        loc_str = loc_str + ': '
                    }
                    if (local_theme.super.label_iid == true) {
                        loc_str = loc_str + get_local_iid(d.G_id, local_theme.super.iid_shorten)
                    }
                    d.tsize = local_theme.super.tsize
                    d.split = local_theme.super.split_line
                    d.label = loc_str
                    break

                default:
                    loc_str = 'default string'
                    d.tcolour = 'black'
                    d.tsize = '10px'
                    d.split = false
                    d.label = loc_str
                    
            }
        return loc_str    
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
                            d.corner = local_theme.attribute.corner
                            d.x = headingbbox.x - textPadding
                            d.y = headingbbox.y - textPadding
                            if (d.dtype === 'shadow'){
                                    d.colour =  local_theme.shadow.colour;                       
                            } else {
                                    d.colour =  local_theme.attribute.colour; 
                            }
                            break;

                        case 'entity':
                            d.corner = local_theme.entity.corner
                            d.colour = local_theme.entity.colour
                            d.x = headingbbox.x - textPadding
                            d.y = headingbbox.y - textPadding
                            break;

                        case 'relation':
                            d.width = local_theme.relation.radius * 2
                            d.height = local_theme.relation.radius * 2
                            d.corner = local_theme.relation.radius
                            d.colour = local_theme.relation.colour
                            d.x = headingbbox.x + (headingbbox.width)/2 - d.width/2
                            d.y = headingbbox.y + d.height/2
                            break;
                        
                        default:
                            break;
            }
            return d.width;
        };

        console.log('================= finsihed Setting Up Force Graph ==========')
        console.log('d3cola is   ',d3cola)
        console.log('================= Constraints Were =====================')
        console.log('d3cola constraints are   ',d3cola._constraints)
        d3cola.on("tick", function () { regularTick(linkmerge, nodemerge, labelmerge, groupmerge, local_theme.relation.label_offset) });
            
    }

    //------------------------------------------
    // visualisation component
    //-----------------------------------------
    function regularTick(link, node, label, group, offset) {
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
                            return d.y - h - offset;
                        }
                        
                    });
    };
            


