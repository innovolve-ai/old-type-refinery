

        //----------------------------------------
        // key id functions
        var getLinkId = function (d) {
            return d.source.index + "-" + d.target.index;
        };
        var getNodeId = function (d, i) {
            return d.G_id + "-" + i;
        };

        

        //------------------------------------------
        // visualisation component
        //-----------------------------------------
        var G_graph = (function () {

            

            // load file
            function G_graph(graph, local_svg, theme) {
                var _this = this;

                this.theme = theme
                console.log('width is -> ', width)
                console.log('height is -> ', height)

                console.log('------- Opening data -------')
                console.log(graph)

                this.d3cola = cola.d3adaptor(d3)
                    .size([width, height])
                    .linkDistance(100)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .alpha(0);

                console.log('cola loaded')

                this.svg = local_svg;

                console.log('svg setup')


                this.groupgroup = this.svg.append("g")
                this.edgegroup = this.svg.append("g")
                this.nodegroup = this.svg.append("g")
                
                

                console.log('DOM groups setup')
                
            
                console.log('========')
                console.log(graph)
                _this.edgelist = graph.basic.links;
                _this.nodelist = graph.basic.nodes;
                _this.grouplist = graph.basic.groups;
                _this.constraintlist = graph.basic.constraints;
                _this.data = graph;
                console.log('basic lists loaded')
                console.log('node list is ', graph.basic.nodes)
                console.log('edge list is ', graph.basic.links)
                console.log('node list is ', graph.basic.groups)
                console.log('constraint list is ', graph.basic.constraints)

                this.showGraph();                           
               
                                
                
                
                
            };

            // add constraints
            G_graph.prototype.addConstraints = function () {
                console.log('add constraints')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;

                this.d3cola = cola.d3adaptor(d3)
                    .size([width, height])
                    .linkDistance(100)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .alpha(0);
                
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.edgelist = this.data.grouped.links;
            	this.nodelist = this.data.grouped.nodes;
                this.grouplist = this.data.grouped.groups;
                this.constraintlist = this.data.grouped.constraints

                console.log('====================== add constraints ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish constraints ============================')
                
                
                
                // go to setup
                this.showGraph();

            };

            // add constraints
            G_graph.prototype.removeConstraints = function () {
                console.log('add constraints')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;

                this.d3cola = cola.d3adaptor(d3)
                    .size([width, height])
                    .linkDistance(100)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .alpha(0);
                
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.edgelist = this.data.grouped.links;
            	this.nodelist = this.data.grouped.nodes;
                this.grouplist = this.data.grouped.groups;
                this.constraintlist = []

                console.log('====================== removeConstraints constraints ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish removeConstraints ============================')
                
                
                
                // go to setup
                this.showGraph();

            };

            // add constraints
            G_graph.prototype.addCollapsed = function (cgraph) {
                console.log('add constraints')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;

                this.d3cola = cola.d3adaptor(d3)
                    .size([width, height])
                    .linkDistance(100)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .alpha(0);
                
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.edgelist = cgraph.links;
            	this.nodelist = cgraph.nodes;
                this.grouplist = cgraph.groups;
                this.constraintlist = []

                console.log('====================== add constraints ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish constraints ============================')
                
                
                
                // go to setup
                this.showGraph();

            };

            // remove collapsed
            G_graph.prototype.removeCollapsed = function () {
                console.log('add constraints')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;

                this.d3cola = cola.d3adaptor(d3)
                    .size([width, height])
                    .linkDistance(100)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .alpha(0);
                
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.edgelist = this.data.grouped.links;
            	this.nodelist = this.data.grouped.nodes;
                this.grouplist = this.data.grouped.groups;
                this.constraintlist = []

                console.log('====================== removeConstraints constraints ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish removeConstraints ============================')
                
                
                
                // go to setup
                this.showGraph();

            };


            // add shadows
            G_graph.prototype.addShadows = function () {
                console.log('add shadows')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.edgelist = this.data.grouped.links;
            	this.nodelist = this.data.grouped.nodes;
                this.grouplist = [];
                this.constraintlist = [];

                this.d3cola = cola.d3adaptor(d3)
                    .size([width, height])
                    .linkDistance(100)
                    .avoidOverlaps(true)
                    .handleDisconnected(false)
                    .alpha(0);

                console.log('====================== add addShadows ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish addShadows ============================')
                
                
                // go to setup
                this.showGraph();

            };

            // back to basics
            G_graph.prototype.backtoBasics = function () {
                console.log('back to basics')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.grouplist = this.data.basic.groups;
                this.edgelist = this.data.basic.links;
                this.nodelist = this.data.basic.nodes;
                this.constraintlist = this.data.basic.constraints

                this.d3cola = cola.d3adaptor(d3)
                        .size([width, height])
                        .linkDistance(100)
                        .avoidOverlaps(true)
                        .handleDisconnected(false)
                        .alpha(0);

                console.log('back to basics, going to show graph')

                console.log('====================== add backtoBasics ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish backtoBasics ============================')
                
                
                // go to setup
                this.showGraph();

            };

            // disconnect node
            G_graph.prototype.disconnAttributes = function () {
                console.log('disconnect attributes')
                var _this = this;
                this.d3cola.stop();
                //this.d3cola = null;
                //this.d3cola.on("tick", null);   
                this.prev_edgelist = this.edgelist
                this.edgelist = this.edgelist.filter(function (e, i) {
                    return e.is_act_Attr == false;
                })
                console.log('====================== disconnAttributes ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish disconnAttributes ============================')

                this.d3cola = cola.d3adaptor(d3)
                        .size([width, height])
                        .linkDistance(100)
                        .avoidOverlaps(true)
                        .handleDisconnected(false)
                        .alpha(0);

                // go to setup
                this.showGraph();
            };

            // connect node
            G_graph.prototype.connAttributes = function () {
                console.log('connect attributes')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;
                //this.d3cola.on("tick", null);   
                this.edgelist = this.prev_edgelist
                console.log(this.edgelist)

                this.d3cola = cola.d3adaptor(d3)
                        .size([width, height])
                        .linkDistance(100)
                        .avoidOverlaps(true)
                        .handleDisconnected(false)
                        .alpha(0);

                console.log('====================== connAttributes ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish connAttributes ============================')

                // go to setup
                this.showGraph();
            };

            // setup groups
            G_graph.prototype.setupGroups = function () {
                console.log('setup Groups')
                var _this = this;
                this.d3cola.stop();
                //this.d3cola = null;
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.edgelist = this.data.grouped.links;
                this.nodelist = this.data.grouped.nodes;
                this.grouplist = this.data.grouped.groups;
                this.constraintlist = []

                this.d3cola = cola.d3adaptor(d3)
                        .size([width, height])
                        .linkDistance(100)
                        .avoidOverlaps(true)
                        .handleDisconnected(false)
                        .alpha(0);


                console.log('====================== setupGroups ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish setupGroups ============================')

                // go to setup
                this.showGraph();

            };

            // dissolve groups
            G_graph.prototype.dissolveGroups = function () {
                console.log('dissolve groups')
                var _this = this;
                this.d3cola.stop();
                this.d3cola = null;
                //this.d3cola.on("tick", null);   
                // change to grouped dataset for nodes and links
                this.grouplist = this.data.basic.groups;
                this.constraintlist = this.data.basic.constraints

                this.d3cola = cola.d3adaptor(d3)
                        .size([width, height])
                        .linkDistance(100)
                        .avoidOverlaps(true)
                        .handleDisconnected(false)
                        .alpha(0);

                console.log('====================== dissolveGroups ============================')
                console.log('edges are -> ', this.edgelist)
                console.log('nodes are -> ', this.nodelist)
                console.log('groups are -> ', this.grouplist)
                console.log('constraints are -> ', this.constraintlist)
                console.log('d3coal is -> ',this.d3cola)
                console.log('====================== finish dissolveGroups ============================')
                // go to setup
                this.showGraph();

            };

            
            // regular tick
            var regularTick = function (link, node, label, group, offset) {
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

            

            //-----------------------------------------
            // tooltip stuff
            //----------------------------------------------
            // A function that change this tooltip when the user hover a point.
            // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
            G_graph.prototype.mouseover = function(d) {
                //console.log('i am inside mouseover ', this.tooltip)
                var tt_options = this.theme.tt_description
                var tt_theme = this.theme.tooltip
                var loc_theme = this.theme

                function get2ndLeafSummary(int_list1, tt_options, dash, indent) {
                    var local_desc = '';
                    local_layer = int_list1[0]
                    console.log('getLeaf, level 2')
                    console.log('local layer, ', local_layer)
                    local_desc += indent + dash
                    if (local_layer.direction == "down") {
                        local_desc += '<i>links '+ local_layer.role + '</i> '
                    } else {
                        local_desc += '<i>plays '+ local_layer.role + '</i> '
                    }
                    local_desc += getLeafSummary(int_list1, tt_options, dash, indent)

                    return local_desc

                }

                function getLeafSummary(int_list1, tt_options, dash, indent) {
                    var local_desc = '';
                    console.log('-------------- Leaf Summary ------------------')
                    console.log('list is ', int_list1)
                    // title
                    local_layer = int_list1[0]
                    console.log('getLeaf, level 1')
                    console.log('local layer, ', local_layer)
                    local_desc += (tt_options.title) ? ('<b>'+local_layer.title + '</b>') : '';
                    local_desc += (tt_options.boldtitle) ? '<br/>' : '<br/>';
                    // main leaf
                    console.log('getLeaf, level 1')
                    local_layer = int_list1[1]
                    console.log('local layer, ', local_layer)
                    local_desc += indent + dash;
                    local_desc += (tt_options.type) ? ('('+ local_layer.type + ') ') : '';
                    local_desc += (tt_options.name) ? (local_layer.name + ' ') : '';
                    local_desc += (tt_options.value) ? (' :' + local_layer.value) : '';
                    local_desc += '<br/>'
                    console.log('end of Leaf, level 1')
                    // secondary leaves
                    for (i = 2; i < int_list1.length; i++) {
                        console.log('getLeaf, level ', i)
                        local_layer = int_list1[i]
                        local_desc += indent + dash;
                        local_desc += (tt_options.role) ? ('<i>'+ local_layer.role + '</i> ') : '';
                        local_desc += (tt_options.type) ? ('('+ local_layer.type + ') ') : '';
                        local_desc += (tt_options.name) ? (local_layer.name + ' ') : '';
                        local_desc += (tt_options.value) ? (' :' + String(local_layer.value)) : '';
                        local_desc += '<br/>'
                    }              

                    return local_desc

                }

                function getGroupSummary(int_list2, tt_options, dash, indent) {
                    var local_desc = '';
                    // title
                    local_layer = int_list2[0]
                    local_desc += (tt_options.title) ? ('<b>'+local_layer.title + '</b>') : '';
                    local_desc += (tt_options.boldtitle) ? '<br/>' : '<br/>';
                    // number of sub groups
                    local_layer = int_list2[1]
                    local_desc += indent + dash;
                    local_desc += (tt_options.number) ? (String(local_layer.number) + ' x ') : '';
                    local_desc += (tt_options.subtitle) ? (local_layer.subtitle) : '';
                    local_desc += '<br/>'
                    // condition for sub groups
                    local_layer = int_list2[2]
                    local_desc += indent + dash;
                    local_desc += (tt_options.where) ? ('<i>'+ 'where' + '</i> ') : '';
                    local_desc += (tt_options.g_G_name) ? (local_layer.condition_g_G_name + ' ') : '';
                    local_desc += (tt_options.g_role) ? ('<i>'+ local_layer.condition_g_role+ '</i> ' + ' ') : '';
                    local_desc += (tt_options.v_G_name) ? (local_layer.condition_v_G_name + ' = ') : '';
                    local_desc += (tt_options.v_Value) ? String(local_layer.condition_value) : '';
                    local_desc += '<br/>'
                                  
                    return local_desc

                }



                const space = '          ';
                const dash = ' - ';
                const nil = '';
                var desc_string, desc_string2;
                var pgraph_style = '<p style="font-size:' + toString(tt_theme.tsize) + '">'
                pgraph_style += '<font color="' + tt_theme.tcolour +'">'
                if ('group_type' in d) {
                    var groupType = d.group_type;
                    
                    switch (groupType) {
                        case "group_of_leaves":
                            list1 = d.leaf_description
                            desc_string = pgraph_style
                            desc_string += getLeafSummary(list1, tt_options, dash, nil)
                            desc_string += '</p>'
                            break

                        case "leaves_to_group":
                            list1 = d.leaf_description
                            list2 = d.group_description
                            desc_string = pgraph_style
                            console.log('=========================================')
                            console.log('leaves to group')
                            desc_string += getLeafSummary(list1, tt_options, dash, nil)
                            console.log('description 1, ', desc_string)
                            console.log('list 2 is  ', list2)
                            desc_string += get2ndLeafSummary(list2[0], tt_options, dash, space)
                            console.log('description 2, ', desc_string)
                            console.log('=======================================')
                            desc_string += '</p>'
                            break

                        case "group_of_groups":
                            list2 = d.group_description
                            desc_string = pgraph_style
                            desc_string += getGroupSummary(list2, tt_options, dash, nil)
                            desc_string += '</p>'
                            break

                        case "leaves_to_group_of_groups":
                            list1 = d.leaf_description
                            list2 = d.group_description
                            desc_string = pgraph_style
                            desc_string += getLeafSummary(list1, tt_options, dash, nil)
                            desc_string += getGroupSummary(list2, tt_options, dash, space)
                            desc_string += '</p>'
                            break

                        default:
                            desc_string = 'Problem with group type'
                    }

                } else {
                    // its an attribute, entity or relation
                    desc_string = pgraph_style
                    switch(d.type) {
                        case 'entity':
                            local_title = 'Entity : '+ d.G_name
                            desc_string += (tt_options.title) ? ('<b>'+local_title+ '</b>') : '';
                            desc_string += (tt_options.boldtitle) ? '<br/>' : '<br/>';
                            // iid
                            desc_string += dash + 'iid : '
                            desc_string += this.get_local_iid(d.G_id, loc_theme.entity.iid_shorten)
                            desc_string += '<br/>'
                            // has
                            for (var i=0; i<d.has.length; i++) {
                                desc_string += dash + '(has) - '
                                desc_string += this.get_local_iid(d.has[i], loc_theme.entity.iid_shorten)
                                desc_string += '<br/>'
                            }
                            break

                        case 'attribute':
                            local_title = 'Attribute : '+ d.G_name
                            desc_string += (tt_options.title) ? ('<b>'+local_title+ '</b>') : '';
                            desc_string += (tt_options.boldtitle) ? '<br/>' : '<br/>';
                            // iid
                            desc_string += dash + 'value : '
                            desc_string += d.value
                            desc_string += '<br/>'
                            // has
                            for (var i=0; i<d.has.length; i++) {
                                desc_string += dash + '(has) - '
                                desc_string += this.get_local_iid(d.has[i], loc_theme.entity.iid_shorten)
                                desc_string += '<br/>'
                            }
                            break

                        case 'relation':
                            local_title = 'Relation : '+ d.G_name
                            desc_string += (tt_options.title) ? ('<b>'+local_title+ '</b>') : '';
                            desc_string += (tt_options.boldtitle) ? '<br/>' : '<br/>';
                            // iid
                            desc_string += dash + 'iid : '
                            desc_string += this.get_local_iid(d.G_id, loc_theme.relation.iid_shorten)
                            desc_string += '<br/>'
                            // has
                            for (var i=0; i<d.has.length; i++) {
                                desc_string += dash + '(has) - '
                                desc_string += this.get_local_iid(d.has[i], loc_theme.relation.iid_shorten)
                                desc_string += '<br/>'
                            }
                            break
                    }
                    desc_string += '</p>'                            

                }                


                this.tooltip
                .style("opacity", 1)
                .html(desc_string);
            }

            G_graph.prototype.get_local_iid = function (G_id, iid_shorten) {
                if (iid_shorten != true) {
                    return G_id
                } else {
                    var regex_check = /[0]{4,}/
                    var regex_replace = '0..0'
                    return G_id.replace(regex_check, regex_replace)
                }
            }

            G_graph.prototype.mousemove = function(d) {
                //console.log('i am inside mousemove ', this.tooltip)
                this.tooltip
                .style("opacity", 1)
                .style("top", (event.pageY - mouseTipX)+"px")
                .style("left",(event.pageX + mouseTipY)+"px");
                
            }

            // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
            G_graph.prototype.mouseleave = function(d) {
                //console.log('i am inside mouseleave ', this.tooltip)
                this.tooltip
                .transition()
                .duration(200)
                .style("opacity", 0);
            }

            // loaded
            G_graph.prototype.showGraph = function () {
                var _this = this;

                

                console.log('in show graph')
                console.log('d3cola is ', this.d3cola)
                console.log('nodes are ', this.nodelist)
                console.log('groups is ', this.grouplist)
                console.log('edges are ', this.edgelist)

                this.d3cola
                    .nodes(_this.nodelist)
                    .links(_this.edgelist)
                    .groups(_this.grouplist)
                    .constraints(_this.constraintlist)
                    .handleDisconnected(false)
                    .start(5);

                console.log('d3 loaded')

                this.group = this.groupgroup.selectAll(".group")
                    .data(_this.grouplist);

                this.group.exit().remove();
                    
                this.groupmerge = this.group.enter().append("rect")
                    .attr("rx", grp_corner).attr("ry", grp_corner)
                    .attr("class", "group")
                    .style("fill", function (d, i) { 
                        return colors.find(colour => colour.name == d.colour_list)['colors'][d.level];
                    })
                        .attr("stroke-width", 1)
                        .attr("stroke", function (d, i) { 
                        return colors.find(colour => colour.name == d.colour_list)['colors'][7];
                    })
                    .call(_this.d3cola.drag)
                    .on("mouseover", d => _this.mouseover(d))
                    .on("mousemove", d => _this.mousemove(d))
                    .on("mouseout", d => _this.mouseleave(d))
                    .merge(_this.group);

                    console.log('groups setup')
            
                //this.group.append("title")
                  //  .text(function (d) { return d.label; });

                this.link = this.edgegroup.selectAll(".link")
                    .data(_this.edgelist, getLinkId);

                this.link.exit().remove();
                    
                this.linkmerge = this.link.enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", _this.theme.edges.stroke)
                    .attr('stroke', _this.theme.edges.colour)
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
                    .style("pointer-events", "none")
                    .attr('id', d => 'heading-' + d.G_id)
                    //.style('text-anchor', 'middle')
                    //.style('color', d => text_colour(d))
                    //.style('fill', d => text_colour(d))
                    .text(d => getLabelText(d))
                    .call(wrapLabel)
                    .call(_this.d3cola.drag)
                    .merge(_this.label);

                        console.log('labels loaded')

                // function to setup tooltip
                this.tooltip = d3.select("body")
                    .append("div")
                        .style('display', 'block')
                        .style("position", "absolute")
                        .style("opacity", 0)
                        .style("background-color", _this.theme.tooltip.fill)
                        .style("border", "solid")
                        .style("border-width",  _this.theme.tooltip.stroke)
                        .style("border-color",  _this.theme.tooltip.scolour)
                        .style("border-radius",  _this.theme.tooltip.corner)
                        .style("padding",  _this.theme.tooltip.padding);

                // function to handle the text
                function getLabelText(d) {
                    var loc_type = d.type;
                    loc_str = ''
                    switch(loc_type) {
                        case 'attribute':                                
                            if (_this.theme.attribute.label_name == true) {
                                loc_str = loc_str + d.G_name 
                            }
                            if ((_this.theme.attribute.label_name == true) & (_this.theme.attribute.label_iid == true)) {
                                loc_str = loc_str + ': '
                            }
                            if (_this.theme.attribute.label_value == true) {
                                loc_str = loc_str + d.value
                            }       
                            if (d.dtype == 'actual'){
                                d.tcolour = _this.theme.attribute.tcolour
                            } else {
                                d.tcolour = _this.theme.shadow.tcolour
                            }         
                            d.tsize = _this.theme.attribute.tsize            
                            d.split = _this.theme.attribute.split_line
                            console.log('attribute ', loc_str)
                            break;

                        case 'entity':
                            if (_this.theme.entity.label_name == true) {
                                loc_str = loc_str + d.G_name 
                            }
                            if ((_this.theme.entity.label_name == true) & (_this.theme.entity.label_iid == true)) {
                                loc_str = loc_str + ': '
                            }
                            if (_this.theme.entity.label_iid == true) {
                                loc_str = loc_str + _this.get_local_iid(d.G_id, _this.theme.entity.iid_shorten)
                            }
                            d.tcolour = _this.theme.entity.tcolour
                            d.tsize = _this.theme.entity.tsize
                            d.split = _this.theme.entity.split_line
                            console.log('entity ', loc_str)
                            break

                        case 'relation':
                            if (_this.theme.relation.label_name == true) {
                                loc_str = loc_str + d.G_name + ': '
                            }
                            if ((_this.theme.relation.label_name == true) & (_this.theme.relation.label_iid == true)) {
                                loc_str = loc_str + ': '
                            }
                            if (_this.theme.relation.label_iid == true) {
                                loc_str = loc_str + _this.get_local_iid(d.G_id, _this.theme.relation.iid_shorten)
                            }
                            d.tcolour = _this.theme.relation.tcolour
                            d.tsize = _this.theme.relation.tsize
                            d.split = _this.theme.relation.split_line
                            console.log('relation ', loc_str)
                            break

                        case 'super':
                            if (_this.theme.super.label_name == true) {
                                loc_str = loc_str + d.G_name 
                            }
                            if ((_this.theme.super.label_name == true) & (_this.theme.super.label_iid == true)) {
                                loc_str = loc_str + ': '
                            }
                            if (_this.theme.super.label_iid == true) {
                                loc_str = loc_str + _this.get_local_iid(d.G_id, _this.theme.super.iid_shorten)
                            }
                            d.tsize = _this.theme.super.tsize
                            d.split = _this.theme.super.split_line
                            console.log('super ', loc_str)
                            
                            break

                        default:
                            loc_str = 'default string'
                            d.tcolour = 'black'
                            d.tsize = '10px'
                            d.split = false
                            console.log('default ', loc_str)
                            
                    }
                    if (loc_str = '') {
                        loc_str = ' '
                    }
                
                return loc_str    
                }

                function wrapLabel(text) {
                    text.each(function() {
                        var text = d3.select(this)    
                        console.log('el is ', text)
                        console.log('d is ', d)
                        console.log('d.label is', text.text())     
                        
                        var words = []
                        if (text.split) {
                            words = text.text().split(/\s+/);
                        } else {
                            words.push(text.text())
                        }
                        
                        d.text(null);
                        var lineNumber = 0,
                        lineHeight = 1.1, //em's
                        y = d.attr('y'),
                        dy = parseFloat(d.attr("dy"))


                        for (var i = 0; i < words.length; i++) {
                            var tspan = d.append('tspan').text(words[i]);
                            tspan.attr('x', 0).attr('y', y)
                                .attr("font-size", d.tsize)
                                .attr("fill", d.tcolour)
                                .attr("dy", ++lineNumber * lineHeight + dy + "em");
                        } 
                    });  
                }

                this.labelmerge.each(d => handleLabels(d))

                console.log('about to do node merge')
        
                this.nodemerge
                    .attr('width', d => nodeWidth(d))
                    .attr('height', d => d.height)
                    .attr('rx', d => d.corner)
                    .attr('ry', d=> d.corner)     
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)   
                    .style("fill", d => d.colour)
                    .on("mouseover", d => _this.mouseover(d))
                    .on("mousemove", d => _this.mousemove(d))
                    .on("mouseout", d => _this.mouseleave(d))
                    .on('dblclick', releasenode)
                    .call(_this.d3cola.drag()
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
                          if (!_this.d3cola.active) _this.d3cola.start();
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
                        if (!_this.d3cola.active) _this.d3cola.start();
                        // Allows NODE FIXING
                        d.fx = null;
                        d.fy = null;
                    }
                    function releasenode(d) {
                        console.log('================= release node ==========')
                        console.log('cola is   ',cola)
                        console.log('d.fx  ',d.fx, ' d.fy ',d.fy)
                        console.log('d.x  ',d.x, ' d.y ',d.y)
                    d3.select(this).classed("fixed", d.fixed = false);
                        d.fx = null;
                        d.fy = null;
                        if (!_this.d3cola.active) _this.d3cola.start();
                    }
                
                
                // function to set dimensions and colours for shapes
                function nodeWidth(d) {
                    let headingid = '#heading-' + d.G_id;
                    let headingbbox = d3.select(headingid).node().getBBox();    

                    d.width = d3.max([5, headingbbox.width]) + (textPadding * 2)
                    d.height = headingbbox.height  + textPadding * 2       
                    
                    function double_px(px_value) {
                        // split string
                        var local_val = px_value.slice(0, -2)
                        var local_int = parseInt(local_val)
                        return toString(2*local_int) + "px"
                    }

                    // attributes and entities rounded rectangle, relation is circle
                    switch (d.type) {
                        case 'attribute':
                            d.corner = _this.theme.attribute.corner
                            d.x = headingbbox.x - textPadding
                            d.y = headingbbox.y - textPadding
                            if (d.dtype === 'shadow'){
                                    d.colour =  _this.theme.shadow.colour;                       
                            } else {
                                    d.colour =  _this.theme.attribute.colour; 
                            }
                            break;

                        case 'entity':
                            d.corner = _this.theme.entity.corner
                            d.colour = _this.theme.entity.colour
                            d.x = headingbbox.x - textPadding
                            d.y = headingbbox.y - textPadding
                            break;

                        case 'relation':
                            d.width = _this.theme.relation.radius * 2
                            d.height = _this.theme.relation.radius * 2
                            d.corner = _this.theme.relation.radius
                            d.colour = _this.theme.relation.colour
                            d.x = headingbbox.x + (headingbbox.width)/2 - d.width/2
                            d.y = headingbbox.y + d.height/2
                            break;

                        case 'super':
                            d.width = _this.theme.super.radius * 2
                            d.height = _this.theme.super.radius * 2
                            d.corner = _this.theme.super.radius
                            d.colour = colors.find(colour => colour.name == d.colour_list)['colors'][d.level];
                            d.x = headingbbox.x + (headingbbox.width)/2 - d.width/2
                            d.y = headingbbox.y + d.height/2
                            break;

                        default:
                            break;
                    }
                    return d.width;
                };

                console.log('d3 cola is -> ',this.d3cola)

               this.d3cola.on("tick", function () { regularTick(_this.linkmerge, _this.nodemerge, _this.labelmerge, _this.groupmerge, _this.theme.relation.label_offset) });
                

            };

            return G_graph;

        } ) ();
