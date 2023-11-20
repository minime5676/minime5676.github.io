let keyframes = [
  {
    activeVerse: 1,
    activeLines: [1, 2, 3, 4],
    svgUpdate: drawRelationPieChart,
  },
  {
    activeVerse: 2,
    activeLines: [1, 2, 3, 4],
    svgUpdate: drawMurderByFamily,
  },
  {
    activeVerse: 3,
    activeLines: [1],
    svgUpdate: drawMurderByOther
  },
  {
    activeVerse: 3,
    activeLines: [2],
    svgUpdate : drawAgeOfVictims
    // svgUpdate: () => highlightColour("Red", "red"),
  },
  {
    activeVerse: 3,
    activeLines: [3],
    svgUpdate: draWwomenExpViolence,
  },
  {
    activeVerse: 3,
    activeLines: [4],
    svgUpdate : drawAgeOfVictims
  },
  {
    activeVerse: 4,
    activeLines: [1],
    svgUpdate: drawMurderByOther
  },
  {
    activeVerse: 4,
    activeLines: [2],
    svgUpdate: drawMurderByFamily,
  },
  {
    activeVerse: 4,
    activeLines: [3],
    svgUpdate: drawAgeOfVictims,
  },
  {
    activeVerse: 4,
    activeLines: [4],
    svgUpdate: draWwomenExpViolence
  },
  {
    activeVerse: 5,
    activeLines: [1, 2, 3, 4],
    svgUpdate: drawMurderByOther
  },
];
// TODO update the keyframe displaying the 4th line of the 3rd verse so that every bar gets highlighted in its respective colour
// TODO update keyframes for verse 4 to show each line one by one

// TODO write a function which will display the rose data sorted from highest to lowest
// HINT Be careful when sorting the data that you don't change the rosechartData variable itself, otherwise when you a user clicks back to the start it will always be sorted
// HINT If you have correctly implemented your updateBarchart function then you won't need to do anything extra to make sure it animates smoothly (just pass a sorted version of the data to updateBarchart)
function sortedRoseData() {
  data = roseChartData;
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  updateBarChart(sortedData, "Distribution of Rose Colours");
}
// TODO add svgUpdate fields to keyframes

// TODO write a function that highlights every bar in the colour it represents

// TODO define global variables
let svg = d3.select("#svg");
let keyframeIndex = 0;
const width = 500;
const height = 400;
let murderbyfamily;
let murderbyother;
let murderbyrelationship;
let roseChartData;
let violetChartData;
let chart;
let chartWidth;
let chartHeight;

// Declare both scales too
let xScale;
let yScale;

// TODO add event listeners to the buttons
document
  .getElementById("forward-button")
  .addEventListener("click", forwardClicked);
document
  .getElementById("backward-button")
  .addEventListener("click", backwardClicked);

// TODO write an asynchronous loadData function
async function loadData() {
  await d3.json("../../assets/data/rose_colours.json").then((data) => {
    roseChartData = data;
  });
  await d3.json("../../assets/data/violet_colours.json").then((data) => {
    violetChartData = data;
  });
  await d3.json("../../assets/data/murder_by_family.json").then((data) => {
    murderbyfamily = data;
  });
  await d3.json("../../assets/data/murder_by_other.json").then((data) => {
    murderbyother = data;
  });
  await d3.json("../../assets/data/murder_by_relationship.json").then((data) => {
    murderbyrelationship = data;
  });

  await d3.json("../../assets/data/age_of_victims_first_exp.json").then((data) =>{
    age_of_victims_first_exp = data;
  });

  await d3.json("../../assets/data/women_exp_violence.json").then((data) =>{
    women_exp_violence = data;
  });
}


// TODO draw a bar chart from the rose dataset
function drawRoseColours() {
  updateBarChart(roseChartData, "Distribution of Rose Colours");
}

// TODO draw a bar chart from the violet dataset
function drawVioletColours() {
  updateBarChart(violetChartData, "Distribution of Violet Colours");
}

//Draw pie chart

// TODO update the keyframe displaying the 4th line of the 3rd verse so that every bar gets highlighted in its respective colour
function highlightAllBars() {
  svg
    .selectAll(".bar")
    .transition()
    .duration(500)
    .attr("fill", (d) => {
      if (d.colour === "Red") return "red";
      else if (d.colour === "White") return "white";
      else if (d.colour === "Pink") return "pink";
      else if (d.colour === "Yellow") return "yellow";
      else if (d.colour === "Orange") return "orange";
      else return "#999";
    });
}
// TODO update it's fill colour
function unhighlightAllBars() {
  svg
    .selectAll(".bar")
    .transition()
    .duration(500)
    .attr("fill", (d) => {
      return "#999";
    });
}

function highlightColour(colourName, highlightColour) {
  svg
    .selectAll(".bar")
    .transition() // call transition immediately before the attribute that you are changing
    .duration(500) // decide how long you want that transition to last in milliseconds
    .attr("fill", (d) => (d.colour === colourName ? highlightColour : "#999"));
  // TODO select bar that has the right value
  // TODO update it's fill colour

  //TODO add a transition to make it smooth
}

// TODO recreate the updateBarchart function from the tutorial
function updateBarChart(data, title = "") {
  // TODO Update the xScale domain to match new order
  // TODO Update the yScale domain for new values
  xScale.domain(data.map((d) => d.colour));
  yScale.domain([0, d3.max(data, (d) => d.count)]).nice();

  // TODO remove any bars no longer in the dataset
  // TODO move any bars that already existed to their correct spot
  // TODO Add any new bars

  // TODO update the x and y axis

  // TODO update the title

  // TODO add animation to ALL aspects of updating the bar chart (removing bars, moving bars, adding bars, updating axes, updating the title)
  // HINTS for adding animation remember to call .transition().duration(num_of_ms) immediately before the fields you change
  // for removing bars - you want the height to go down to 0 and the y value to change too. Then you can call .remove()
  // for moving existing bars - you'll have to update their x, y, and height values
  // for adding new bars - see the tutorial
  // for the axes all you need to do is add a transition before the .call function we use in the tutorial
  // for the title .text is the function that actually changes the title

  // We want to make a selection of the existing bars in the chart
  // This line of code will bind the new data we have loaded to our bars
  // TODO select all the existing bars
  const bars = chart.selectAll(".bar").data(data, (d) => d.colour);

  // First we want to remove any bars that we no longer want to display
  // bars.exit() is a d3 selection that will return any bars that are not in the new selection.
  // when we call this function to initially draw the bar chart this won't return anything because their were no bars to begin with
  // when we call this to draw the violet bar chart when the rose one was being displayed the exit selection will be the bars that had values in the rose dataset but don't exist in the violet one
  // calling remove on this selection will remove all these bars from the graph
  // TODO remove any bars no longer in the dataset
  // TODO move any bars that already existed to their correct spot
  // TODO Add any new bars
  bars.exit().remove();

  // Now we want to move any bars that had values in the old dataset but now have new values or locations
  bars
    .attr("x", (d) => xScale(d.colour))
    .attr("y", (d) => yScale(d.count))
    .attr("height", (d) => chartHeight - yScale(d.count));

  // Finally we will add any bars that are new
  // To do that we will use the d3 built in function .enter() which provides a selection of any new values
  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.colour))
    .attr("width", xScale.bandwidth())
    .attr("fill", "#999")
    .transition() // Declare we want to do a transition
    .duration(1000) // This one is going to last for one second
    .attr("y", (d) => yScale(d.count))
    .attr("height", (d) => chartHeight - yScale(d.count));

  // Next let's update the axes so they are displayed correctly
  chart.select(".x-axis").call(d3.axisBottom(xScale));

  chart.select(".y-axis").call(d3.axisLeft(yScale));

  // And finally if a new title has been specified we will update the title too
  if (title.length > 0) {
    svg.select("#chart-title").text(title);
  }
}

function drawMurderByFamily() {
  drawBarchart(murderbyfamily, "Murder by Family in 2019", "Relation", "Victims");
  $("#description").html(
    "The data presents a harrowing picture: among family-related homicides, wives constitute the majority of victims. This stark statistic underscores a troubling reality—those who identify as wives are disproportionately slain, shedding light on the alarming prevalence of Intimate Partner Violence (IPV) against women. It is a sobering reminder of the urgent need to address the safety and equality of women within domestic spheres."
  );
}

function drawMurderByOther() {
  drawBarchart(murderbyother, "Murder by Other in 2019",  "Relation", "Victims");
  $("#description").html("The majority of homicide victims were not strangers to their assailants but rather acquaintances, with a significant number having the relationship status of a girlfriend. This indicates that many victims are tragically slain in contexts where they should expect trust and safety, not violence. It underscores the particular vulnerability of women in intimate partner relationships to lethal outcomes.");
}


function drawAgeOfVictims() {
  drawBarchart(age_of_victims_first_exp, "Age of Victims that First Experience Intimate Partner Violence", "Ages", "%");
  $("#description").html("This data indicates that the majority of victims who experience intimate partner violence are young adults 18-24, in the age category to be college educated people. Women are disproportionately affected by intimate partner violence by 30.2% (1 out of 3), as well as Black women at 40%. This also indicates many of the victims are young Black women which will be the primary focus of this visualization. The lighter shade of purple indicates groups that are not impacted as much, while darker shades of purple represents groups that are highly impacted.");
}
function draWwomenExpViolence() {
  drawBarchart(women_exp_violence, "Women who Experience Violence Based in 2016-2017 ",  "Ages", "%");
  $("#description").html("This 2016-2017 dataset from the National Survey of Intimate Partner Violence highlights how women of color suffer from Intimate Partner Violence the most, with Black Women, Multiracial Women, and Indian Women being the highest women to experience this. This is important to highlight since these women are not the majority of the population in the United States, yet the highest to experience this sort of crime.The lighter shade of purple indicates groups that are not impacted as much, while darker shades of purple represents groups that are highly impacted.");
}

function drawBarchart(data, title, xlabel, ylabel) {
  // TODO Update the xScale domain to match new order
  // TODO Update the yScale domain for new values
  chart.selectAll(".arc").remove();
  chart.selectAll(".bar").remove();
  chart.selectAll(".x-axis").remove();
  chart.selectAll(".y-axis").remove();
  svg.selectAll(".x_label").remove();
  svg.selectAll(".y_label").remove();
  // var data = murderbyfamily;
  // var title = "Murder by Family in 2019"
  
  xScale = d3.scaleBand().domain([]).range([0, chartWidth]).padding(0.1);
  yScale = d3.scaleLinear().domain([0, 1]).nice().range([chartHeight, 0]);

  // Add x-axis
  chart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text");

  svg.append("text")
    .attr("class", "x_label")
    .attr("text-anchor", "end")
    .attr("x", width - 6)
    .attr("y", height - 10)
    .style("fill", "white")
    .text(xlabel);

  // Add y-axis
  chart
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    .selectAll("text");

  svg.append("text")
    .attr("class", "y_label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".5em")
    .attr("dx", "-1.75em")
    .attr("transform", "rotate(-90)")
    .style("fill", "white")
    .text(ylabel);

  // Add title
  svg
    .append("text")
    .attr("id", "chart-title")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "top")
    .style("font-size", "18px")
    .style("fill", "white")
    .text("");


  xScale.domain(data.map((d) => d.relation));
  yScale.domain([0, d3.max(data, (d) => d.count)]).nice();

  const bars = chart.selectAll(".bar").data(data, (d) => d.relation);

  bars
    .attr("x", (d) => xScale(d.relation))
    .attr("y", (d) => yScale(d.count))
    .attr("height", (d) => chartHeight - yScale(d.count));

  bars
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.relation))
    .attr("width", xScale.bandwidth())
    .attr("fill", (d) => d.colour)
    .transition() // Declare we want to do a transition
    .duration(1000) // This one is going to last for one second
    .attr("y", (d) => yScale(d.count))
    .attr("height", (d) => chartHeight - yScale(d.count));

  // Next let's update the axes so they are displayed correctly
  chart.select(".x-axis").call(d3.axisBottom(xScale));

  chart.select(".y-axis").call(d3.axisLeft(yScale));

  // And finally if a new title has been specified we will update the title too
  if (title.length > 0) {
    svg.select("#chart-title").text(title);
  }
}

function forwardClicked() {
  // TODO define behaviour when the forwards button is clicked
  keyframeIndex = (keyframeIndex + 1) % keyframes.length;
  drawKeyframe(keyframeIndex);
}

function backwardClicked() {
  keyframeIndex = (keyframeIndex - 1 + keyframes.length) % keyframes.length;
  drawKeyframe(keyframeIndex);
  // TODO define behaviour when the backwards button is clicked
}

function drawKeyframe(kfi) {
  // TODO get keyframe at index position
  let kf = keyframes[kfi];
  // TODO reset any active lines
  resetActiveLines();
  // TODO update the active verse
  updateActiveVerse(kf.activeVerse);
  // TODO update any active lines
  for (line of kf.activeLines) {
    updateActiveLine(kf.activeVerse, line);
  }
  // TODO update the svg
  if (kf.svgUpdate) {
    kf.svgUpdate();
  }

  // Check if it's the fourth verse and update the click behavior accordingly
  if (kf.activeVerse === 4) {
    makeRedClickable();
  } else {
    removeRedClickEvent();
  }
}

function removeRedClickEvent() {
  // Select the bar associated with the "red" value and remove the click event listener
  const redBar = chart.select(".bar").filter((d) => [d.colour === "Red"]);
  redBar.on("click", null);
}

// TODO write a function to reset any active lines
function resetActiveLines() {
  d3.selectAll(".line").classed("active-line", false);
}

// TODO write a function to update the active verse
function updateActiveVerse(id) {
  // Reset the current active verse - in some scenarios you may want to have more than one active verse, but I will leave that as an exercise for you to figure out
  d3.selectAll(".verse").classed("active-verse", false);

  // Update the class list of the desired verse so that it now includes the class "active-verse"
  d3.select("#verse" + id).classed("active-verse", true);

  // Scroll the column so the chosen verse is centred
  scrollLeftColumnToActiveVerse(id);
}
// TODO write a function to update the active line
function updateActiveLine(vid, lid) {
  let thisVerse = d3.select("#verse" + vid);
  thisVerse.select("#line" + lid).classed("active-line", true);
}

// TODO write a function to scroll the left column to the right place
function scrollLeftColumnToActiveVerse(id) {
  var leftColumn = document.querySelector(".left-column-content");
  var activeVerse = document.getElementById("verse" + id);

  if (leftColumn && activeVerse) {
    var verseRect = activeVerse.getBoundingClientRect();
    var leftColumnRect = leftColumn.getBoundingClientRect();

    var desiredScrollTop =
      verseRect.top +
      leftColumn.scrollTop -
      leftColumnRect.top -
      (leftColumnRect.height - verseRect.height) / 2;

    leftColumn.scrollTo({
      top: desiredScrollTop,
      behavior: "smooth",
    });
  }
}


// HINT when you 'mouseout' of the word the bar should return to it's original colour
// HINT you will wamt to edit the html and css files to achieve this
// HINT this behaviour should be global at all times so make sure you call it when you intialise everything
function makeRedClickable() {
  d3.select(".red-span").on("click", () => highlightColour("Red", "red"));
}

// TODO select the div displaying the left column content
// TODO select the verse we want to display
// TODO calculate the bounding rectangles of both of these elements
// TODO calculate the desired scroll position
// TODO scroll to the desired position
// TODO call this function when updating the active verse

// TODO write a function to initialise the svg properly

// TODO write a function to make every instance of "red" and "purple" in the poem hoverable. When you hover the corresponding bar in the chart (if it exists) should be highlighted in its colour
// TODO write a function so that when you click on the red bar when verse 4 is displayed (and only when verse 4 is displayed) every instance of the word red in the poem are highlighted in red
// HINT you will need to update the keyframes to do this and ensure it isn't global behaviour
// HINT you will again have to edit the html and css
function makePurpleBarHoverable() {
  // Add a mouseover event listener
  d3.selectAll(".red-span").on("mouseover", () => {
    highlightColour("Red", "red");
  });
  d3.selectAll(".purple-span").on("mouseover", () => {
    highlightColour("Purple", "purple");
  });

  // Add a mouseout event listener
  d3.selectAll(".red-span").on("mouseout", () => {
    resetBarColor("Red");
  });
  d3.selectAll(".purple-span").on("mouseout", () => {
    highlightColour("", "");
    resetBarColor("Purple");
  });
}

function makeRedBarHoverable() {
  const redBar = chart.select(".bar").filter(d => d.colour === "Red");

    // Add a mouseover event listener
    redBar.on("mouseover", () => {
        d3.selectAll(".red-span").classed("red-text", true); //This will select all elements with the class name "red-span" not just one.
    });

};

function initialiseSVG() {
  svg.attr("width", width);
  svg.attr("height", height);
  // svg.selectAll("*").remove();

  const margin = { top: 30, right: 30, bottom: 50, left: 50 };
  chartWidth = width - margin.left - margin.right;
  chartHeight = height - margin.top - margin.bottom;

  chart = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  xScale = d3.scaleBand().domain([]).range([0, chartWidth]).padding(0.1);
  yScale = d3.scaleLinear().domain([0, 1]).nice().range([chartHeight, 0]);

  // Add x-axis
  chart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale))
    .selectAll("text");

  // Add y-axis
  chart
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale))
    .selectAll("text");

  // Add title
  svg
    .append("text")
    .attr("id", "chart-title")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "top")
    .style("font-size", "18px")
    .style("fill", "white")
    .text("");
}

// TODO update the html to add a fifth verse
// TODO add keyframe(s) for your new fifth verse
// TODO the first keyframe should update the svg and display a pie chart of either the roses or violets dataset
// TODO the first keyframe should update the svg and display a pie chart of either the roses or violets dataset

function drawRelationPieChart() {
  var link = '<a target="_blank" href="https://www.lacasa.org/blog/2023/2/22/black-history-month-shining-a-light-on-domestic-violence-in-the-african-american-community">Please Click to Learn More</a>'
  $("#description").html("41% of the victims knew who they were murdered by, indicating that a large percentage of victims are slain by people they know. To dive deeper into this, Black women are killed at a 3 times more likely to die by an intimate partner than a White women meaning that a majority of these victims are Black women. " + link);

  svg.selectAll("*").remove();
  const margin = { top: 60, right: 30, bottom: 50, left: 50 };
  chartWidth = width - margin.left - margin.right;
  chartHeight = height - margin.top - margin.bottom;

  chart = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  xScale = d3.scaleBand().domain([]).range([0, chartWidth]).padding(0.1);

  yScale = d3.scaleLinear().domain([]).nice().range([chartHeight, 0]);

  // Select the dataset you want to use for the pie chart
  const dataset = murderbyrelationship;

  // Set up pie chart parameters
  const radius = Math.min(chartWidth, chartHeight) / 2;
  const colors = d3.scaleOrdinal(d3.schemeCategory10);
  const pie = d3.pie().value((d) => d.count);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  // Remove existing bars
  chart.selectAll(".bar").remove();

  // Create arcs for the pie chart segments
  const arcs = chart
    .selectAll(".arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", `translate(${chartWidth / 2},${chartHeight / 2})`);

  // Append paths for the arcs
  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => {
      return d.data.colour;
    })
    .transition()
    .duration(1000) // Transition duration in milliseconds
    .attrTween("d", function (d) {
      var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });

  // Append text labels for the pie chart segments
  arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("dy", "-0.5em")
    .attr("dx", "-0.5em")
    .text((d) => d.data.relation )
    .style("text-anchor", "middle")
    .style("fill", "white")
    .style("opacity", 0) // Start with opacity 0 (invisible)
    .transition()
    .delay(500) // Delay the text label transition
    .duration(500) // Text label transition duration in milliseconds
    .style("opacity", 1); // Fade in the text label
  
    arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.8em")
    .text((d) => d.data.count + "%")
    .style("text-anchor", "middle")
    .style("fill", "white")

    arcs
    .append("text")
    .attr("transform", (d) => `translate(${arc.centroid(d)})`)
    .attr("dy", "2.5em")
    .text((d) => d.data.victims + " victims")
    .style("text-anchor", "middle")
    .style("font-size", "11px")
    .style("fill", "white")

  // Add title
  svg
    .append("text")
    .attr("id", "chart-title")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("fill", "white")
    .text("");
  // Update the chart title
  svg
    .select("#chart-title")
    .transition()
    .duration(1000)
    .text("Murder by Relationship in 2019"); // Change the title accordingly
}

async function initialise() {
  // TODO load the data
  await loadData();

  // TODO initalise the SVG
  initialiseSVG();

  // TODO draw the first keyframe
  drawKeyframe(keyframeIndex);

  makePurpleBarHoverable();
}

initialise();
