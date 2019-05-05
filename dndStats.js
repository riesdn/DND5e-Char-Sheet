
function editPoints(statBtn, availablePts) {
	
	console.log("button was clicked, editPoints() function activated");
	console.log("total available points: " + availablePts);
	var operator, statsBar, statsPts, modifier;
  
	operator = statBtn.text();
	console.log("var operator = " + operator);
	statsBar = statBtn.closest("tr").find("meter");
		// select the meter object relative to button clicked
	statsPts = statsBar.val();
	console.log("var statsPts = " + statsPts);
	
  /* 
    ***** ADD A CONDITIONAL FOR CHECKING AVAILABLE POINTS !!!! *****
    -> it's glitching so that all 100 points will be used but you 
       can keep adding more points to that stat bar. 
  */
  if (operator === "+" && statsPts < 20) {
    statsPts++;
    availablePts--;
  } else if (operator === "-" && statsPts > 0) {
    statsPts--;
    availablePts++;
  } // else do nothing
  
  statsBar.val(statsPts);
  $("#availablePts").val(availablePts);
  $("#avPtsText").val(availablePts + "/75");
  console.log("modified statsPts = " + statsPts);
  
  // put current points in points column, dont need to use a for loop bc of THIS keyword
  statBtn.closest("tr").find("#statsPts").val(statsPts);
  
/*

  THIS IS NOT THE CORRECT RESULT, MAY NEED ANOTHER VARIABLE

  // take current points and translate them into general stats modifier scores
  // To determine an ability modifier without consulting the table, subtract 10 from the 
     ability score and then divide the result by 2 and round down.
  modifier = (statsPts - 10) / 2; // subtract 10 then divide by 2
  console.log("modifier value is: " + modifier);
  // determine if we need to round down
  if (modifier % 2 == 1) {
    modifier -= 0.5;
    console.log("modifier value rounded to: " + modifier);
  } 
  
*/

} // END editPoints()

$(document).ready(function(){
  
	$("button").click(function() {
		editPoints($(this), $("#availablePts").val());
	});
	
}); // END $(document).ready

/* 
  FEATURES TO ADD:
  - BASE STATS points change automatically effects all skill modifiers as 
      well and autopopulates in each skill's modifiers text box
  - RACE selection changes base stat points available
    > preferrably shown in different color than assigned points?? maybe??
  - CLASS selection changes skill modifiers and if a skill is marked with 
      proficiency or not (Seperate from base mods from base stats / in 
      addition to mods from base stats)
  - DOWNLOAD TO PDF
    > currently (May 2019) user has nothing to do with this information 
      other than copy it down by hand
*/
