$(document).ready(function() {
  let index = 0;
  let commInd = 0;
  let commands = [];

  const themes = {
    "normal": {"text": "#FFFFFF", "bg": "#000000"},
    "ubuntu": {"text": "#DADADA", "bg": "#300A24"},
    "white": {"text": "#000000", "bg": "#FFFFFF"},
    "matrix": {"text": "#0FFF00", "bg": "#000000"}
  };
  
  function printReply(text) {
    $(".input").after("<br>"+text);
  }
  
  function parseCmd(cmd) {
    cmd = cmd.split(" ");
    
    if (cmd[0] === "sudo") {

      if (cmd[1] !== undefined) {
        if (cmd[1] === "make") {
          if (cmd[2] === "me" && cmd[3] === "a" && cmd[4] === "sandwich") {
            printReply("Okay.");
          } else if (cmd[2] === "me" && cmd[3] === "a" && cmd[4] === "cake") {
            printReply("The cake is still a lie.");
          } else {
            printReply("sudo: make it yourself");
          }
        }

        else if (cmd[1] === "ls" || cmd[1] === "cd") {
          printReply("Listen, sudo is not going to help you here. There are still no files.")
        }

        else if (cmd[1] === "help") {
          printReply("List of useful commands:<br>make&nbsp;&nbsp;&nbsp;&nbsp;Makes something, I guess.")
        }

        else {
          printReply("sudo: "+cmd[1]+": command not found");
        }
      }

      else {
        printReply("sudo: no command specified");
      }
    } else {

      if (cmd[0] === "make") {
        if (cmd[1] === "me" && cmd[2] === "a" && cmd[3] === "sandwich") {
          printReply("What? Make it yourself.");
        } else if (cmd[1] === "me" && cmd[2] === "a" && cmd[3] === "cake") {
          printReply("The cake is a lie.");
        } else {
          printReply("make: make it yourself");
        }
      }

      else if (cmd[0] === "help") {
        printReply("List of useful commands:<br>load&nbsp;&nbsp;&nbsp;&nbsp;Loads something. Type \"load --help\" for help on loading.<br>make&nbsp;&nbsp;&nbsp;&nbsp;Makes something, I guess.<br>sudo&nbsp;&nbsp;&nbsp;&nbsp;Administrator privileges (for everyone). Type \"sudo help\" for help with sudo commands.<br>setbg&nbsp;&nbsp;&nbsp;Followed by a hex code. Sets the terminal background colour.<br>settext Followed by a hex code. Sets the terminal text colour.<br>theme&nbsp;&nbsp;&nbsp;Followed by a theme name. Sets the terminal colours according to chosen theme. Type \"theme --help\" for a list of themes.");
      }

      else if (cmd[0] === "load") {
        let loadThis = cmd[1];
        if (loadThis === "--help" || loadThis === "-h") {
          printReply("cats&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loads kittens. :3<br>about&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loads some stuff about me.<br>languages Loads info about my knowledge on programming languages.");
        } else if (loadThis === "cats") {
          printReply("Loading cats...");
          setTimeout(function() {
            window.location.href = "/cats.html";
          }, 500)
        } else if (loadThis === "about") {
          printReply("Hi. I'm a cat. I live in Estonia. Meow.");
        } else if (loadThis === "languages") {
          printReply("I have knowledge in HTML, CSS, Python, Ruby, JavaScript, PHP, C++ and Java. Please note knowledge does not mean I'm a professional in all of these languages. I probably write a lot of unclean code but oh well ¯\\_(ツ)_/¯");
        } else {
          printReply("Cannot load this. Please execute \"load --help\" for help on loading.")
        }
      }

      else if (cmd[0] === "ls" || cmd[0] === "cd") {
        printReply("Please. It's not a real terminal. There are no files here.")
      }

      else if (cmd[0] === "setbg") {
        if (/(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(cmd[1])) {
          $("body").css("background", cmd[1]);
        } else {
          printReply("Invalid hex code.");
        }
      }

      else if (cmd[0] === "settext") {
        if (/(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(cmd[1])) {
          $("body").css("color", cmd[1]);
        } else {
          printReply("Invalid hex code.");
        }
      }

      else if (cmd[0] === "theme") {
        alert(cmd[1]);
        if (cmd[1] !== "--help" || cmd[1] !== "-h") {
          if (cmd[1] in themes) {
            $("body").css("color", themes[cmd[1]]["text"]);
            $("body").css("background", themes[cmd[1]]["bg"]);
          } else {
            printReply("No such theme exists, please type \"theme --help\" to get a list of themes.");
          }
        } else {
          printReply("List of available themes:<br>normal&nbsp;&nbsp;The normal terminal look (white on black).<br>white&nbsp;&nbsp;&nbsp;Inverted terminal (black on white).<br>ubuntu&nbsp;&nbsp;Ubuntu terminal style (light grey on purple).<br>matrix&nbsp;&nbsp;Matrix terminal (light green on black).");
        }
      }

      else {
        printReply(""+cmd[0]+": command not found");
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
      let newCommands = commands.slice().reverse();
      if (newCommands[commInd] != undefined && commInd != -1) {
        $(".input").val(newCommands[commInd]);
        commInd += 1;
      } else {
        $(".input").val(newCommands[newCommands.length-1]);
      }
    } else if (e.keyCode == 40) {
      let newCommands = commands.slice().reverse();
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
