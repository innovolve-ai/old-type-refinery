

        //----------------------------------------
        // key id functions
        var getLinkId = function (d) {
            return d.source.index + "-" + d.target.index;
        };
        var getNodeId = function (d, i) {
            return d.G_id + "-" + i;
        };

        var the_d3cola = {}

        //------------------------------------------
        // visualisation component
        //-----------------------------------------
        var SG_graph = (function () {

            // regular tick
            var regularTick = function (link, node, label, group) {
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
                         return d.y + h/4;
                     });
            };

            SG_graph.prototype.clear = function () {
                console.log(']]]]]]]]]]]]]]]]]]]]]]]]')
                console.log('executing inside clear')
                the_d3cola = this.d3cola
                    .nodes([])
                    .links([])
                    .groups([])
                    .symmetricDiffLinkLengths(30)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .start(30);

                

                console.log('d3 loaded')

                this.group = this.groupgroup.selectAll(".group")
                    .data([]);

                this.group.exit().remove();
                    
                this.link = this.edgegroup.selectAll(".link")
                    .data([]);

                this.link.exit().remove();
                    
                this.node = this.nodegroup.selectAll(".node")
                    .data([]);

                this.node.exit().remove();
                    
                this.label = this.nodegroup.selectAll(".label")
                    .data([]);

                this.label.exit().remove();                

            }

            // load file
            function SG_graph(graph, local_screen_svg) {
                var _this = this;

                console.log('------- Opening data -------')
                console.log(graph)
                

                this.d3cola = cola.d3adaptor(d3)
                    .convergenceThreshold(1e-4)
                    .size([width, height]);

                console.log('cola loaded')

                this.svg = local_screen_svg

                console.log('internal svg setup')

                this.groupgroup = this.svg.append("g")
                this.edgegroup = this.svg.append("g")
                this.nodegroup = this.svg.append("g")               
                

                console.log('DOM groups setup')
                
            
                console.log('========')
                console.log(graph)
                _this.edgelist = graph.links;
                _this.nodelist = graph.nodes;
                _this.grouplist = graph.groups;
                _this.constraintlist = graph.constraints;
                _this.data = graph;
                console.log('+++++++++++++++++++++++++++++++ basic lists loaded +++++++++++++++++++++++++++++++')
                console.log('node list is ', graph.nodes)
                console.log('edge list is ', graph.links)
                console.log('node list is ', graph.groups)

                

                console.log('=============== in show graph ================================')
                console.log('d3cola is ', this.d3cola)
                console.log('nodes are ', this.nodelist)
                console.log('groups is ', this.grouplist)
                console.log('edges are ', this.edgelist)

                this.d3cola
                    .nodes(_this.nodelist)
                    .links(_this.edgelist)
                    .groups(_this.grouplist)
                    .constraints(_this.constraintlist)
                    .symmetricDiffLinkLengths(30)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .start(30);

                console.log('d3 loaded')

                this.group = this.groupgroup.selectAll(".group")
                    .data(_this.grouplist);

                this.group.exit().remove();
                    
                this.groupmerge = this.group.enter().append("rect")
                    .attr("rx", grp_corner).attr("ry", grp_corner)
                    .attr("class", "group")
                    .style("fill", function (d, i) { 
                        return colours.find(colour => colour.name == d.colour_list)['colors'][d.level];
                    })
                        .attr("stroke-width", 1)
                        .attr("stroke", function (d, i) { 
                        return colours.find(colour => colour.name == d.colour_list)['colors'][7];
                    })
                    .call(_this.d3cola.drag)
                    .merge(_this.group);

                    console.log('groups setup')
            
                //this.group.append("title")
                  //  .text(function (d) { return d.label; });

                this.link = this.edgegroup.selectAll(".link")
                    .data(_this.edgelist, getLinkId);

                this.link.exit().remove();
                    
                this.linkmerge = this.link.enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", '1px')
                    .attr('stroke', 'black')
                    .merge(_this.link)
                    .attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                    console.log('links are setup')

                this.node = this.nodegroup.selectAll(".node")
                    .data(_this.nodelist, getNodeId);

                this.node.exit().remove();
                    
                this.nodemerge = this.node.enter().append("rect")
                    .attr('class', function (d) {
                        return "node " + d.type + ' ' + d.G_name ;
                    })
                    .attr('id', d => d.G_id)
                    .merge(_this.node);

                    console.log('nodes are loaded')

                this.label = this.nodegroup.selectAll(".label")
                    .data(_this.nodelist, getNodeId);

                this.label.exit().remove();

                this.labelmerge = this.label.enter()
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
                    .merge(_this.label);

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
        
                this.nodemerge
                    .attr('width', d => nodeWidth(d))
                    .attr('height', d => d.height)
                    .attr('rx', d => d.corner)
                    .attr('ry', d=> d.corner)     
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)   
                    .style("fill", d => d.colour)
                    .on("start", dragstart)
                    .on("drag", dragged)
                    .on("dblclick", click)
                    .call(_this.d3cola.drag);

                    console.log('node 2 is loaded')
                
                function click(event, d) {
                    delete d.fx;
                    delete d.fy;
                    d3.select(this).classed("fixed", false);
                    the_d3cola.start();
                }
                
                function dragstart() {
                    d3.select(this).classed("fixed", true);
                }
            
                function dragged(event, d) {
                    d.fx = event.x;
                    d.fy = event.y;
                    the_d3cola.start();
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

               this.d3cola.on("tick", function () { regularTick(_this.linkmerge, _this.nodemerge, _this.labelmerge, _this.groupmerge) });
                

            };

            return SG_graph;

        } ) ();
