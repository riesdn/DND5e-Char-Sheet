
function editPoints(statBtn, availablePts) {
	
	console.log("button was clicked, editPoints() function activated");
	console.log("total available points: " + availablePts);
	var operator, statsBar, statsPts;
  
	operator = statBtn.text();
	console.log("var operator = " + operator);
	statsBar = statBtn.closest("tr").find("meter");
		// select the meter object relative to button clicked
	statsPts = statsBar.val();
	console.log("var statsPts = " + statsPts);
	
  if (operator === "+" && statsPts < 20) {
    statsPts++;
    availablePts--;
  } else if (operator === "-" && statsPts > 0) {
    statsPts--;
    availablePts++;
  } // else do nothing
  
  statsBar.val(statsPts);
  $("#availablePts").val(availablePts);
  $("#avPtsText").val(availablePts + "/100");
  console.log("modified statsPts = " + statsPts);
  
  // put current points in points column
  // take current points and translate them into general stats modifier scores

} // END editPoints()

$(document).ready(function(){
	
	$("button").click(function() {
		editPoints($(this), $("#availablePts").val());
	});
	
}); // END $(document).ready

/* 
  FEATURES TO ADD:
  - BASE STATS points change automatically effects all skill modifiers as well and autopopulates in each skill's modifiers text box
  - RACE selection changes base stat points available
    > preferrably shown in different color than assigned points??
  - CLASS selection changes skill modifiers and if a skill is marked with proficiency or not (Seperate from base mods from base stats / in addition to mods from base stats)
*/