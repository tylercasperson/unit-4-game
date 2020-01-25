$(document).ready(function(){

    var HP = [500, 900, 100, 10000, 50];
    
    function pickYourCharacter() {
      var iChooseYou = localStorage.getItem("player");
      if($('.enemy').length === 0 ) {
        $("#" + iChooseYou).appendTo(".yourCharacter");
        console.log('Character selected: ' + iChooseYou);
        var characterArray = ['player1', 'player2', 'player3', 'player4', 'player5'];    
        for (var i = 0; i < characterArray.length; i++) {
          if ( characterArray[i] === iChooseYou) {
            characterArray.splice(i, 1);
          } 
        }
        $(".characterSelection").children().appendTo(".enemySelection");
        $(".enemySelection").children().removeClass("player").addClass("enemy group");
        $(".enemy").attr("onclick", "").unbind("click");
      } //end of enemy if 
      function pickYourOpponent() {
        var enemy = localStorage.getItem("enemy");
        if($('.opponent').length === 0 ) {
          $("#" + enemy).appendTo(".defender");
          console.log('Enemy:' + enemy);
          console.log('Fight begin! ' + iChooseYou + ' vs ' + enemy);
          $(".defender").children().removeClass("enemy").addClass("opponent playerRound");
          var playerTitle = $(".player").find("h3").text();
          var enemyTitle = $(".opponent").find("h3").text();
          $(".messageBox").text("Fight begin! " + playerTitle + " vs " + enemyTitle);
      } //end of opponent if 
     } //end of pickYourOpponent
     if ($(".opponent").length === 0){
      pickYourOpponent();
     }
    } //end of pickYourCharacter
    
      $(".player").on("click", function(event) {
        var playerSelection = $(this).attr("id");
        var playerIndex = (playerSelection.charAt(6)-1);
        var playerHP = HP[playerIndex];
        localStorage.removeItem("enemy");
        localStorage.setItem("player", playerSelection);
        localStorage.setItem("playerHP", playerHP);
        pickYourCharacter();
    
        $(".enemy").on("click", function(event) {
          var enemySelected = $(this).attr("id");
          var enemyIndex = (enemySelected.charAt(6)-1);
          var enemyHP = HP[enemyIndex];
          localStorage.setItem("enemy", enemySelected);
          localStorage.setItem("enemyHP", enemyHP);
          pickYourCharacter();
        });  //end of enemy click
      });  //pickYourCharacter
    
      $('.attack').on("click", function() {
        console.log();
        if(($(".player").length === 5) && ($(".enemy").length === 0)){
          $(".messageBox").text("Please select a character.");
        } else if($(".opponent").length === 0) {
          $(".messageBox").text("Please select an opponent.");
        } else {
          kaPow();
        }
        });  //end of the attack click
    
      function kaPow(){
        var playerIndex = $(".yourCharacter").children().attr("id").charAt(6)-1;
        var enemyIndex = $(".defender").children().attr("id").charAt(6)-1;
          
        var playerHP = localStorage.getItem("playerHP");
        var enemyHP = localStorage.getItem("enemyHP");
        console.log('initial playerHP: ' + playerHP);
        
        var attackPower = [
          {
            name: 'Player1',
            attack: [5, 10, 20, 12, 15, 4, 2, 1, 30, 25, 26, 10, 18, 32, 60]
          },
          {
            name: 'Player2',
            attack: [50, 80, 100, 40, 60, 75, 82, 67, 68, 92, 65, 50, 2]
          },
          {
            name: 'Player3',
            attack: [50, 80, 100, 40, 60, 75, 82, 67, 68, 92, 65, 50, 2]
          },
          {
            name: 'Player4',
            attack: [50, 80, 100, 40, 60, 75, 82, 67, 68, 92, 65, 50, 2]
          },
          {
            name: 'Player5',
            attack: [50, 80, 100, 40, 60, 75, 82, 67, 68, 92, 65, 50, 2]
          }
        ]; 
    
        var attackPlan = attackPower[playerIndex].attack;
        var attackResults = attackPlan[Math.floor(Math.random()*attackPlan.length)];
        var counterPlan = attackPower[enemyIndex].attack;
        var counterAttack = counterPlan[Math.floor(Math.random()*counterPlan.length)];
        console.log('Attack: ' + attackResults);
        console.log('Counter Attack: ' + counterAttack);
        var playerHP = playerHP - counterAttack;
        var enemyHP = enemyHP - attackResults;
        $("#heathPoints" + (playerIndex+1)).text("HP: " + playerHP);
        $("#heathPoints" + (enemyIndex+1)).text("HP: " + enemyHP);
        localStorage.setItem("playerHP",playerHP);
        localStorage.setItem("enemyHP",enemyHP);
        console.log('playerHP: ' + playerHP); 
        console.log('enemyHP: ' + enemyHP); 
        if ($(".enemy").length === 0 ){
          $('.opponent').remove();
          $(".attack").hide();
          $(".messageBox").text("You won!!! Play again?");
          $(".messageBox").append("<button class='restart'>Restart</button>");
        } else if (playerHP<=0){
          $(".attack").hide();
          $(".messageBox").text("You lost. Try again next time.");
          $(".messageBox").append("<button class='restart'>Restart</button>");
          $(".restart").on("click", function(){
            location.reload(true);
          })
        } else if(enemyHP <=0) {  //( = <=0)
          $('.opponent').remove();
          $(".messageBox").text("You defeated the immediate enemy. Please select another enemy.");
          localStorage.removeItem("enemy");
          localStorage.removeItem("enemyHP");
          pickYourCharacter();
        }   
        console.log('PlayerHP: ' + playerHP);
        console.log('EnemyHP: ' +  enemyHP);
      } // end of kaPow function
    }); //end of document.ready    
    