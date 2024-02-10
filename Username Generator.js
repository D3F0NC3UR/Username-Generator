cfg.Dark
cfg.MUI
// Setting up the layout of the app
function OnStart()
{
var rr =( "allo");
app.EnableBackKey( false  )
color = MUI.colors.lime
    lay = app.CreateLayout( "linear", "Vertical,FillXY" );
    btnGenerate = MUI.CreateButtonElegant(  "Generate Username", 0.3, 0.1, MUI.colors.purple.purple);
    txt = app.CreateText( "", 0.8, 0.1 );
    lay.AddChild( btnGenerate );
    lay.AddChild( txt );
    app.AddLayout( lay );
    btnGenerate.SetOnTouch( GenerateUsername );
    btnGenerate.SetOnLongTouch( Ok );
}

// The GenerateUsername function
function GenerateUsername()
{
    var adjectives = [
        "Fast","Retro","Acclaimed","Valuable","Interesting","Incredible",
        "Unique","Iconic","Famous","Lovable","Hilarious","Outstanding"
    ];
    var nouns = [
      "Panda", "Turtle","Dolphin","Kangaroo","Giraffe","Penguin","Owl","Flamingo",
      "Octopus","Husky","Elephant","Butterfly"
    ];
    var adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    var noun = nouns[Math.floor(Math.random() * nouns.length)];
    var randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    var username = adj + noun + randomNumber;
    txt.SetText( username );
    app.SetClipboardText( username )
}

function Ok()
{
	app.Alert( "apop" )
	var text = "This is a sample text for the popup."
   alr = MUI.CreateAlert(text)
   alr.Show()
}