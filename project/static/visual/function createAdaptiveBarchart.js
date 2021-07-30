function createAdaptiveBarchart(){
//this code is actually in a separate file. It draws the initial barchart
//based on the width of its containing element, which is a div in my case 
// with the id = barchart
// The div has a css width expressed in percentage.

var barchartContainer = d3.select("#barchart");

        var chartWidth = parseInt(barchartContainer.style("width"),10);     
        var chartHeight = chartWidth * this.width_height_ratio; 
        var sideMargin = Math.round(chartWidth * this.marginfactor);
        var bottomMargin = Math.round(chartHeight * 0.3);
        var fontsize = (chartWidth/this.font_to_width_ratio) + "em";


        var svg = barchartContainer.append("svg")
                                .attr({
                                    width:chartWidth,
                                    height:chartHeight
                                });


        var xScale = d3.scale.ordinal()
                                .domain(mydata) 
                                .rangeRoundBands([sideMargin, chartWidth - sideMargin], .1);
        var yScale = d3.scale.linear()
                                .domain([1, d3.max(monthsarray, function(d){return d.amountMonths;})]) 
                                .range([chartHeight - bottomMargin, sideMargin]); 
        drawChart();

        function drawChart() {
            var bars = svg.selectAll("rect")
                                .data(monthsarray)
                                .enter()
                                .append("g")
                                    .attr("transform", function(d){return "translate(" + xScale(d.turnover) + ",2)";})
                                .append("rect")
                                    .attr({
                                            x:0, 
                                            y:function(d){return yScale(d.amountMonths);},
                                            width:xScale.rangeBand(),
                                            height:function(d){ return chartHeight - bottomMargin - yScale(d.amountMonths);},
                                            fill:"rgba(85, 214, 221, 0.1)",
                                            stroke:"#00ffff"
                                        });
            var xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient("bottom");

            var yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient("left");

            svg.append("g")
                    .attr("transform",function(){return "translate(0," + (chartHeight - bottomMargin + 3) + ")"; })
                    .attr("class","axis")
                    .call(xAxis)
                    .selectAll("text")  
                        .style("text-anchor", "end") /*  all of this is to rotate the text a bit: first achor it, reposition, rotate */
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("font-size", fontsize) // making the font-size in relation to the svg width;
                        .attr("transform", function(d) {
                            return "rotate(-65)" 
                            });

            svg.append("g")
                    .attr("transform","translate(" + sideMargin + ",3)")
                    .attr("class","axis")
                    .call(yAxis)
                    .selectAll("text")
                        .attr("font-size", fontsize);

};

/* THIS IS THEN THE CODE WHICH IS IN MY HTML FILE */

<script>

        createAdaptiveBarchart(); //the function I declared above

        d3.select(window).on("resize",resize); //capturing the resizing event

        function resize() {
            /* resetting the visualisation */
            d3.selectAll("svg").remove();           
            createAdaptiveBarchart();
        }


    </script>