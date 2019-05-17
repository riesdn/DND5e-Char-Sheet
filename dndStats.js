
function findMod(statsPts, bonusPts) {
  
  
  
}

function editPoints(statBtn, availablePts) {
	
	console.log("button was clicked, editPoints() function activated");
	console.log("total available points: " + availablePts);
	var operator, statsBar, statsPts, bonusPts, modifier;
  
  // determine which button was clicked, plus or minus and get initial point value
	operator = statBtn.text();
	console.log("var operator = " + operator);
	statsBar = statBtn.closest("tr").find("meter");
		// select the meter object relative to button clicked
	statsPts = statsBar.val();
	console.log("var statsPts = " + statsPts);
	
  if (operator === "+" && statsPts < 20 && availablePts > 0) {
    statsPts++;
    availablePts--;
  } else if (operator === "-" && statsPts > 0) {
    statsPts--;
    availablePts++;
  } // else do nothing
  
  statsBar.val(statsPts);
  $("#availablePts").val(availablePts);
  $("#avPtsText").val(availablePts + "/75");
  console.log("updated statsPts = " + statsPts);
  
  // put current points in points column, dont need to use a for loop bc of THIS keyword
  statBtn.closest("tr").find(".statsPts").val(statsPts);
  
  // add statsPts and bonusPts together!!
  // bonusPts do effect the modifier even though they are seperate from statsPts
  // also convert bonusPts to a number: js reads it as a string since its grabbed from a textbox
  bonusPts = Number(statBtn.closest("tr").find(".bonusPts").val());
  console.log("var bonusPts = " + bonusPts);
  statsPts += bonusPts;
  console.log("statsPts including bonusPts = " + statsPts)
  
  // take current points and translate them into general stats modifier scores
  // to determine modifier: subtract 10 from the statPts and then divide the result by 2 and round down.
  modifier = Math.floor((statsPts - 10) / 2); 
  console.log("modifier value is: " + modifier);
  
  // formatting conditional to show positive number symbol, bc users will ADD their modifier to their dice roll
  if (modifier > 0) {
    statBtn.closest("tr").find(".statsMod").val("+" + modifier);
  } else {
    statBtn.closest("tr").find(".statsMod").val(modifier); 
  }
  
} // END editPoints()

function editBonus(charRace) {
  
  // clear all fields first, so if a race is previously selected its bonus goes away on selection of a different race
  $(".bonusPts").val(0);
  
  if (charRace === "noneRace") {
    $(".bonusPts").val(0);
    
  } else if (charRace === "dragon") {
    $("#strength .bonusPts").val(2);
    $("#charisma .bonusPts").val(1);
    
  } else if (charRace === "dwarf") {
    $("#constitution .bonusPts").val(2);
    
  } else if (charRace === "elf") {
    $("#dexterity .bonusPts").val(2);
    
  } else if (charRace === "gnome") {
    $("#intelligence .bonusPts").val(2);
    
  } else if (charRace === "notHobbit") {
    $("#dexterity .bonusPts").val(2);
    
  } else if (charRace === "halfElf") {
    $("#charisma .bonusPts").val(2);
    $("#dexterity .bonusPts").val(1);
    $("#wisdom .bonusPts").val(1);
    
  } else if (charRace === "halfOrc") {
    $("#strength .bonusPts").val(2);
    $("#constitution .bonusPts").val(1);
    
  } else if (charRace === "human") {
    $("#strength .bonusPts").val(1);
    $("#dexterity .bonusPts").val(1);
    $("#constitution .bonusPts").val(1);
    $("#intelligence .bonusPts").val(1);
    $("#wisdom .bonusPts").val(1);
    $("#charisma .bonusPts").val(1);
    
  } else if (charRace === "tiefling") {
    $("#charisma .bonusPts").val(2);
    $("#intelligence .bonusPts").val(1);
  }
  
}

function editProficiency(charClass) {
  
  if (charClass === "noneClass") {
    $("#profBonus").val(0);
    
  } else if (charClass === "barbarian") {
    $("#profBonus").val(0);
    
  } else if (charClass === "bard") {
    $("#profBonus").val(0);
    
  } else if (charClass === "cleric") {
    $("#profBonus").val(0);
    
  } else if (charClass === "druid") {
    $("#profBonus").val(0);
    
  } else if (charClass === "fighter") {
    $("#profBonus").val(0);
    
  } else if (charClass === "monk") {
    $("#profBonus").val(0);
    
  } else if (charClass === "paladin") {
    $("#profBonus").val(0);
    
  } else if (charClass === "ranger") {
    $("#profBonus").val(0);
    
  } else if (charClass === "rogue") {
    $("#profBonus").val(0);
    
  } else if (charClass === "sorcerer") {
    $("#profBonus").val(0);
    
  } else if (charClass === "warlock") {
    $("#profBonus").val(0);
    
  } else if (charClass === "wizard") {
    $("#profBonus").val(0);
    
  }
  
}

$(document).ready(function(){
  
  $("#metaRace").change(function() {
    editBonus($(this).val());
  });
  $().change(function() {
    editProficiency($(this).val());
  });
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
