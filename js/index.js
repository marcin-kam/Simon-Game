$(document).ready(function() {
  $("#reset").hide();
    var game = {
      gameMode: 'strict',
      sequence: [],
      round: 0,
      playNumber: 0,
      speed: 1000,
      clicked: 0
    }
    
    function animate(idx) {
        if (game.round > 5) {
            game.speed = 500
        }

        if (idx == "yellow") {
            $('#'+idx).addClass('act');
            $("#audio"+idx).trigger('play');
            setTimeout(function() {
              $('#'+idx).removeClass('act');
              $("#audio"+idx).trigger('pause');
              $("#audio"+idx).prop("currentTime",0);
            }, 300);
        } else if (idx == "green") {
            $('#'+idx).addClass('act'); 
            $("#audio"+idx).trigger('play');
            setTimeout(function() {
              $('#'+idx).removeClass('act');
              $("#audio"+idx).trigger('pause');
              $("#audio"+idx).prop("currentTime",0);
            }, 300);
        } else if (idx == "blue") {
            $('#'+idx).addClass('act'); 
            $("#audio"+idx).trigger('play');
            setTimeout(function() {
              $("#audio"+idx).trigger('pause');
              $("#audio"+idx).prop("currentTime",0);
              $('#'+idx).removeClass('act');
            }, 300);
        } else if (idx == "red") {
            $('#'+idx).addClass('act'); 
            $("#audio"+idx).trigger('play');
            setTimeout(function() {
              $("#audio"+idx).trigger('pause');
              $("#audio"+idx).prop("currentTime",0);
              $('#'+idx).removeClass('act');
            }, 300);
        }
    }

    function makeid() {
        var board = ['yellow','green','blue','red'];
        if(game.sequence.length === 20){
          $("#audiowin").trigger('play');
          setTimeout(function() {
            $("#audiowin").trigger('pause');
            $("#audiowin").prop("currentTime",0);
          }, 300);
          $("h2").html("YOU WIN");
          $("#panel").show();
        } else {
          game.sequence.push(board[Math.floor(Math.random() * 4)]);
          function loop(){
             setTimeout(function() {
                animate(game.sequence[game.playNumber]);
                game.playNumber++;
                if (game.playNumber < game.sequence.length) {
                  loop();
                } else {
                  game.playNumber = 0;
                  listen();
                }
             }, game.speed)
          }
        loop();
        }
    }

    function listen() {
        $("#yellow, #green, #blue, #red").on("mousedown", function() {
            if (this.id == game.sequence[game.clicked]) {
                if (game.clicked === game.sequence.length - 1) {
                    $("#yellow, #green, #blue, #red").off("mousedown");
                    game.clicked = 0;
                    $("#start").trigger("click");
                } else {
                    game.clicked++;
                }
            } else {
              if(game.gameMode === 'strict'){
                $("#board #yellow, #board #green, #board #blue, #board #red").css('pointer-events','none');
                $("#audiolose").trigger('play');
                setTimeout(function() {
                  $("#audiolose").trigger('pause');
                  $("#audiolose").prop("currentTime",0);
                }, 300);  
                $("h2").html("WRONG");
                $("#panel").show();
                $("#panel").css('height','250')
                game.clicked = 0;
                $("#reset").show();
              } else if (game.gameMode === 'soft'){
                var y=0;
                $("#audiolose").trigger('play');
                setTimeout(function(){
                  $("#audiolose").trigger('pause');
                  $("#audiolose").prop("currentTime",0);
                  for(var j=0 ; j<game.sequence.length ; j++){
                    setTimeout(function(){
                      animate(game.sequence[y]);
                      y++;
                    },600+500*j);
                  }
                },500);
                game.clicked = 0;
                console.log(game.clicked);
                
              }
            }
        });
    }
  
    $("#yellow, #green, #blue, #red").on("click", function() {
        animate(this.id)
    });
  
    $("#start").on("click", function() {
        game.gameMode=($("#strict").is(":checked") ? 'strict' : 'soft');
        $("#board #yellow, #board #green, #board #blue, #board #red").css('pointer-events','auto');
        game.round++;
        makeid();
        $("h2").html("");
        $("#round").html(game.round);
        $("#panel").hide();
        $("#start").hide();
    });

    $("#reset").on("click", function() {
        $("#reset").hide();
        game.sequence = [];
        game.round = 0;
        game.playNumber = 0,
        game.speed = 1000;
        game.clicked = 0;
        $("#start").trigger("click");
    });
});