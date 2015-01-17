$(document).ready(function() {
  var index = 0;
  var commInd = 0;
  var commands = [];

  function parseCmd(cmd) {
    if (cmd.split(" ")[0] === "sudo") {

      if (cmd.split(" ")[1] !== undefined) {
        if (cmd.split(" ")[1] === "make") {
          if (cmd.split(" ")[2] === "me" && cmd.split(" ")[3] === "a" && cmd.split(" ")[4] === "sandwich") {
            $(".input").after("<br>Okay.");
          } else if (cmd.split(" ")[2] === "me" && cmd.split(" ")[3] === "a" && cmd.split(" ")[4] === "cake") {
            $(".input").after("<br>The cake is still a lie.");
          } else {
            $(".input").after("<br>sudo: make it yourself");
          }
        }

        else if (cmd.split(" ")[1] === "ls" || cmd.split(" ")[1] === "cd") {
          $(".input").after("<br>Listen, sudo is not going to help you here. There is still no files.")
        }

        else if (cmd.split(" ")[1] === "help") {
          $(".input").after("<br>List of useful commands:<br>make&nbsp;&nbsp;&nbsp;&nbsp;Makes something, I guess.")
        }

        else {
          $(".input").after("<br>sudo: "+cmd.split(" ")[1]+": command not found");
        }
      }

      else {
        $(".input").after("<br>sudo: no command specified");
      }
    } else {

      if (cmd.split(" ")[0] === "make") {
        if (cmd.split(" ")[1] === "me" && cmd.split(" ")[2] === "a" && cmd.split(" ")[3] === "sandwich") {
          $(".input").after("<br>What? Make it yourself.");
        } else if (cmd.split(" ")[1] === "me" && cmd.split(" ")[2] === "a" && cmd.split(" ")[3] === "cake") {
          $(".input").after("<br>The cake is a lie.");
        } else {
          $(".input").after("<br>make: make it yourself");
        }
      }

      else if (cmd.split(" ")[0] === "help") {
        $(".input").after("<br>List of useful commands:<br>load&nbsp;&nbsp;&nbsp;&nbsp;Loads something. Try \"load --help\" for help on loading.<br>make&nbsp;&nbsp;&nbsp;&nbsp;Makes something, I guess.<br>sudo&nbsp;&nbsp;&nbsp;&nbsp;Administrator privileges (for everyone). Try \"sudo help\" for help with sudo commands.<br>setbg&nbsp;&nbsp;&nbsp;Followed by a hex code. Sets the terminal background color.<br>settext Followed by a hex code. Sets the terminal text color.")
      }

      else if (cmd.split(" ")[0] === "load") {
        var loadThis = cmd.split(" ")[1];
        if (loadThis === "--help") {
          $(".input").after("<br>cats&nbsp;&nbsp;&nbsp;&nbsp;Loads kittens. :3<br>about&nbsp;&nbsp;&nbsp;Loads some stuff about me.");
        } else if (loadThis === "cats") {
          $(".input").after("<br>Loading cats...");
          setTimeout(function() {
            window.location.href = "https://snowstormer.github.io/cats.html";
          }, 500)
        } else if (loadThis === "about") {
          $(".input").after("<br>Hi. My name is Snowstormer. I live in Estonia. Meow.");
        } else {
          $(".input").after("<br>Cannot load this. Please execute \"load --help\" for help on loading.")
        }
      }

      else if (cmd.split(" ")[0] === "ls" || cmd.split(" ")[0] === "cd") {
        $(".input").after("<br>I know, I know. This all is really interesting, but it's not a real terminal. There is no files here.")
      }

      else if (cmd.split(" ")[0] === "setbg") {
        if (/(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(cmd.split(" ")[1])) {
          $("body").css("background", cmd.split(" ")[1]);
          $(".input").after("<br>Done.");
        } else {
          $(".input").after("<br>Invalid hex code.");
        }
      }

      else if (cmd.split(" ")[0] === "settext") {
        if (/(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(cmd.split(" ")[1])) {
          $("body").css("color", cmd.split(" ")[1]);
          $(".input").after("<br>Done.");
        } else {
          $(".input").after("<br>Invalid hex code.");
        }
      }

      else {
        $(".input").after("<br>"+cmd.split(" ")[0]+": command not found");
      }
    }
  }

  function enterPressed() {
    if ($(".input").val() !== "") {
      parseCmd($(".input").val());
      commands.push($(".input").val());
      $(".input").replaceWith($(".input").val());
      $(".inptext"+index).after("<div class=\"inptext"+(index+1)+"\">> <input type=\"text\" class=\"input\" spellcheck=\"false\" />")
      index += 1;
      commInd = 0;
      $(".input").focus();
    }
  }

  $(".input").focus();

  $("html").click(function() {
    $(".input").focus();
  });

  $(document).keyup(function(e){
    if(e.keyCode == 13) {
      enterPressed();
    } else if (e.keyCode == 38) {
      var newCommands = commands.slice().reverse();
      if (newCommands[commInd] != undefined && commInd != -1) {
        $(".input").val(newCommands[commInd]);
        commInd += 1;
      } else {
        $(".input").val(newCommands[newCommands.length-1]);
      }
    } else if (e.keyCode == 40) {
      var newCommands = commands.slice().reverse();
      commInd -= 1;
      if (newCommands[commInd] != undefined && commInd != -1) {
        $(".input").val(newCommands[commInd]);
      } else {
        commInd = 0;
        $(".input").val("");
      }
    } else {
      commInd = 0;
    }
  });
});
