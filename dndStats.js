
function findMod() {
  
  console.log("findMod function activated!");
  
  var statsPts, bonusPts, totalPts, modifier;
  // update all the stats to reflect bonus points!
  // it's easier to just do all of them versus trying to grab each individual stat that had it's bonus points changed, and saves a lot of code.
  $(".trStats").each(function(i) {
    
    console.log("i = " + i);
    statsPts = Number($(this).find(".statsPts").val());
    console.log("statsPts = " + statsPts);
    bonusPts = Number($(this).find(".bonusPts").val());
    console.log("bonusPts = " + bonusPts);
    
    // add statsPts and bonusPts together!!
    // bonusPts do effect the modifier even though they are seperate from statsPts
    totalPts = statsPts + bonusPts;
    console.log("totalPts = " + totalPts);
    
    // take current points and translate them into general stats modifier scores
    // to determine modifier: subtract 10 from the statPts and then divide the result by 2 and round down.
    modifier = Math.floor((totalPts - 10) / 2); 
    console.log("modifier value is: " + modifier);
    
    // formatting conditional to show positive number symbol, bc users will ADD their modifier to their dice roll
    if (modifier > 0) {
      modifier = "+" + modifier;
    } // else modifier is unchanged
    
    // update base stat mod
    $(this).find(".statsMod").val(modifier);
  
    // auto-populate skill mods with base stat mod data
    if (i === 0) {
      $(".skillModStr").val(modifier);
    } else if (i === 1) {
      $(".skillModDex").val(modifier);
    } else if (i === 2) {
      // do nothing, constitution does not effect specific skills in DND5e
    } else if (i === 3) {
      $(".skillModInt").val(modifier);
    } else if (i === 4) {
      $(".skillModWis").val(modifier);
    } else if (i === 5) {
      $(".skillModCha").val(modifier);
    } 
  
  }); // end $(".trStats").each()
  
  
} // END findMod()

function editPoints(statBtn, availablePts) {
	
	console.log("button was clicked, editPoints() function activated");
	console.log("total available points: " + availablePts);
	var operator, statsBar, statsPts, bonusPts;
  
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
  
  // put current points in points column
  statBtn.closest("tr").find(".statsPts").val(statsPts);
 
  // update modifiers
  findMod();
  
} // END editPoints()

function editBonus(charRace) {
  
  console.log("Race selection changed, editBonus function activated.");
  
  // clear all fields first, so if a race is previously selected its bonus goes away on selection of a different race
  $(".bonusPts").val(0);
  
  switch (charRace) {
    default:
      $(".bonusPts").val(0);
      break;
    case "dragon":
      $("#strength .bonusPts").val(2);
      $("#charisma .bonusPts").val(1);
      break;
    case "dwarf":
      $("#constitution .bonusPts").val(2);
      break;
    case "elf":
      $("#dexterity .bonusPts").val(2);
      break;
    case "gnome":
      $("#intelligence .bonusPts").val(2);
      break;
    case "notHobbit":
      $("#dexterity .bonusPts").val(2);
      break;
    case "halfElf":
      $("#charisma .bonusPts").val(2);
      $("#dexterity .bonusPts").val(1);
      $("#wisdom .bonusPts").val(1);
      break;
    case "halfOrc":
      $("#strength .bonusPts").val(2);
      $("#constitution .bonusPts").val(1);
      break;
    case "human":
      $("#strength .bonusPts").val(1);
      $("#dexterity .bonusPts").val(1);
      $("#constitution .bonusPts").val(1);
      $("#intelligence .bonusPts").val(1);
      $("#wisdom .bonusPts").val(1);
      $("#charisma .bonusPts").val(1);
      break;
    case "tiefling":
      $("#charisma .bonusPts").val(2);
      $("#intelligence .bonusPts").val(1);
  }
  
  // update modifiers
  findMod();
  
} // END editBonus()

function editProficiency(charClass) {
  
  console.log("Class selection changed, editProficiency function activated.");
  
  // clear all fields first, so if a class is previously selected its bonuses go away on selection of a different class
  $("#profBonus").val(0);
  $(":checkbox").prop("checked", false);
  $(":checkbox").prop("disabled", true);
  $("#maxProf").hide();
  
  // stuff for any class
  if (charClass != "noneClass") {
    $("#profBonus").val("+2");
    $("#maxProf").show();
  } 

  // stuff for specific classes:
  // 1: max amount of skills user is able to select to be proficient in
  // 2: enable checkboxes for appropriate skills per class (referenced from Class Meta Data.txt)
  switch (charClass) {
    default: // default do nothing
      break;
    case "barbarian":
      $("#maxNumProf").text(2);
      $("[value=\"animalHandling\"]").prop("disabled", false);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"nature\"]").prop("disabled", false);
      $("[value=\"perception\"]").prop("disabled", false);
      $("[value=\"survival\"]").prop("disabled", false);
      break;
    case "bard":
      $("#maxNumProf").text(3);
      $("[value=\"acrobatics\"]").prop("disabled", false);
      $("[value=\"animalHandling\"]").prop("disabled", false);
      $("[value=\"arcana\"]").prop("disabled", false);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"deception\"]").prop("disabled", false);
      $("[value=\"history\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"investigation\"]").prop("disabled", false);
      $("[value=\"medicine\"]").prop("disabled", false);
      $("[value=\"nature\"]").prop("disabled", false);
      $("[value=\"perception\"]").prop("disabled", false);
      $("[value=\"performance\"]").prop("disabled", false);
      $("[value=\"persuasion\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      $("[value=\"sleightOfHand\"]").prop("disabled", false);
      $("[value=\"stealth\"]").prop("disabled", false);
      $("[value=\"survival\"]").prop("disabled", false);
      break;
    case "cleric":
      $("#maxNumProf").text(2);
      $("[value=\"history\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"medicine\"]").prop("disabled", false);
      $("[value=\"persuasion\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      break;
    case "druid":
      $("#maxNumProf").text(2);
      $("[value=\"arcana\"]").prop("disabled", false);
      $("[value=\"animalHandling\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"medicine\"]").prop("disabled", false);
      $("[value=\"nature\"]").prop("disabled", false);
      $("[value=\"perception\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      $("[value=\"survival\"]").prop("disabled", false);
      break;
    case "fighter":
      $("#maxNumProf").text(2);
      $("[value=\"acrobatics\"]").prop("disabled", false);
      $("[value=\"animalHandling\"]").prop("disabled", false);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"history\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"perception\"]").prop("disabled", false);
      $("[value=\"survival\"]").prop("disabled", false);
      break;
    case "monk":
      $("#maxNumProf").text(2);
      $("[value=\"acrobatics\"]").prop("disabled", false);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"history\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      $("[value=\"stealth\"]").prop("disabled", false);
      break;
    case "paladin":
      $("#maxNumProf").text(2);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"medicine\"]").prop("disabled", false);
      $("[value=\"persuasion\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      break;
    case "ranger":
      $("#maxNumProf").text(3);
      $("[value=\"animalHandling\"]").prop("disabled", false);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"investigation\"]").prop("disabled", false);
      $("[value=\"nature\"]").prop("disabled", false);
      $("[value=\"perception\"]").prop("disabled", false);
      $("[value=\"stealth\"]").prop("disabled", false);
      $("[value=\"survival\"]").prop("disabled", false);
      break;
    case "rogue":
      $("#maxNumProf").text(4);
      $("[value=\"acrobatics\"]").prop("disabled", false);
      $("[value=\"athletics\"]").prop("disabled", false);
      $("[value=\"deception\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"investigation\"]").prop("disabled", false);
      $("[value=\"perception\"]").prop("disabled", false);
      $("[value=\"performance\"]").prop("disabled", false);
      $("[value=\"persuasion\"]").prop("disabled", false);
      $("[value=\"sleightOfHand\"]").prop("disabled", false);
      $("[value=\"stealth\"]").prop("disabled", false);
      break;
    case "sorcerer":
      $("#maxNumProf").text(2);
      $("[value=\"arcana\"]").prop("disabled", false);
      $("[value=\"deception\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"persuasion\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      break;
    case "warlock":
      $("#maxNumProf").text(2);
      $("[value=\"arcana\"]").prop("disabled", false);
      $("[value=\"deception\"]").prop("disabled", false);
      $("[value=\"history\"]").prop("disabled", false);
      $("[value=\"intimidation\"]").prop("disabled", false);
      $("[value=\"investigation\"]").prop("disabled", false);
      $("[value=\"nature\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
      break;
    case "wizard":
      $("#maxNumProf").text(2);
      $("[value=\"arcana\"]").prop("disabled", false);
      $("[value=\"history\"]").prop("disabled", false);
      $("[value=\"insight\"]").prop("disabled", false);
      $("[value=\"investigation\"]").prop("disabled", false);
      $("[value=\"medicine\"]").prop("disabled", false);
      $("[value=\"religion\"]").prop("disabled", false);
  }
  
  // if a checkbox is enabled, highlight it so the user can see it better
  $(":checkbox").each(function(){
    // first clear out old colors if any exist
    $(this).parent().css("background-color", "#fff");
    
    // if NOT disabled
    if (!$(this).prop("disabled")) {
      $(this).parent().css("background-color", "#ccdeb4");
    }
  });
  
} // END editProficiency()

function isChecked(skillModCheckBox, profBonus) {
  
  console.log("checkbox clicked. isChecked() activated.");
  
  var maxProf, numChecked, currentMod, modNew, modTextBox;
  var i = 0;
  
  // how many boxes can be checked at once?
  maxProf = Number($("#maxNumProf").text());
  console.log("maxProf = " + maxProf);
  
  // how many boxes are checked so far?
  numChecked = $(":checkbox:checked").length;
  console.log("numChecked = " + numChecked);
  
  // grab the correct mod text box 
  if (skillModCheckBox.hasClass("column2")) {
    console.log("this.hasClass('column2') TRUE");
    modTextBox = skillModCheckBox.closest("tr").find(":text").first();
  } else {
    console.log("this.hasClass('column2') FALSE");
    modTextBox = skillModCheckBox.closest("tr").find(":text").last();
  }
  
  // grab current modifier
  currentMod = Number(modTextBox.val());  
  
  // only add profBonus if numChecked is less than maxProf!
  if (numChecked > maxProf) {
    alert("Please select only " + maxProf + " skills.");
    skillModCheckBox.prop("checked", false);
  } else if (numChecked <= maxProf && skillModCheckBox.prop("checked")) {
    modNew = currentMod + profBonus;
    // formatting conditional to show positive number symbol, bc users will ADD their modifier to their dice roll
    if (modNew > 0) {
      modNew = "+" + modNew;
    }
    modTextBox.val(modNew);
  } else {
    modNew = currentMod - profBonus;
    // formatting conditional to show positive number symbol, bc users will ADD their modifier to their dice roll
    if (modNew > 0) {
      modNew = "+" + modNew;
    }
    modTextBox.val(modNew);
  }
  
} // END isChecked()

$(document).ready(function(){
  
  // Max Number of Proficient Skills message is hidden on first page load.
  $("#maxProf").hide();
  
  $("#metaRace").change(function() {
    editBonus($(this).val());
  });
  $("#metaClass").change(function() {
    editProficiency($(this).val());
  });
	$("button").click(function() {
		editPoints($(this), $("#availablePts").val());
	});
  $(":checkbox").click(function() {
    isChecked($(this), Number($("#profBonus").val()));
  });
	
}); // END $(document).ready

/* 
  FEATURES TO ADD:
  - DOWNLOAD TO PDF
    > currently (May 2019) user has nothing to do with this information 
      other than copy it down by hand
*/
