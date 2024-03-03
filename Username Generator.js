//cfg.Portrait
cfg.Dark
cfg.MUI

//app.Script("DSNav.js");
//app.Script( "drawer.js");
//app.Script( "Setting.js" );
app.Script( "About.js" );
//app.LoadPlugin("SlideUpPanel");
app.LoadPlugin("BottomSheet");
//app.Script( "Settings.js")
//include("getPublicIP.js")
//app.LoadScript("getPublicIP.js")

color = MUI.colors.purple.purple
colorGreen = MUI.colors.green.green

//_AddPermissions(
//   "Share, USB, Network, Camera, Location, SMS, WakeLock, Shortcut, Vibrate, License, Bluetooth, Storage, Contacts, SmartWatch2, Sounds, Vending, Record, Phone, Accounts, Boot,  Body,  DEVICE_ADMIN, BIND_DEVICE_ADMIN, Admin, Accessibility"
//)

function OnStart()
{
//var Options = [ "Use ADB", "No Icons", "Use Soft Keys", "Use Yoyo", "Stay Awake", "Auto-Help", "Dark Theme", "Auto-Wifi", "Use Password" ];
 
   var list = ["Device Admin", "Share", "Setting", "about", "Menu"];
   var listicon = ["Device Admin : security", "Share:share", "Setting:settings", "about:info_outline"];
   app.EnableBackKey(true);
   
   QuickMenu = MUI.CreateMenuWithIcon( "Settings: settings, About: info_outline", null, null, "Top,Right" );
  QuickMenu.SetOnSelect( QuickMenu_OnSelect );
  
   //LAYOUT
 lay = MUI.CreateLayout("Absolute");
 about = new About();
// setting = new Setting();
 
   btn = MUI.CreateButtonElegant("[fa-bars]", 0.15, 0.07, color, lay);
   btn.SetOnTouch(ShowMenu);
   btn.SetPosition( 0.87,  0.9);
  btn.SetEnabled( true );
  btn.SetScale(0.8, 1);
  btn.SetTextSize( 30 );
 
  
  NavBar = MUI.CreateAppBarElegant( "Username Generator 2", "book", "menu", lay );
  NavBar.SetOnMenuTouch( NavBar_OnMenuTouch );
  NavBar.SetOnControlTouch( NavBar_OnControlTouch );
  
  //BOTTOM SHEET
bottomSheet = app.CreateBottomSheet();
bottomSheet.AddChild( lay );
app.AddLayout( bottomSheet );
     // Bottom Sheet content.
  layBS = app.CreateLayout( "Absolute" );
  layBS.SetBackground( "Img/back.png", "repeat" );
  layBS.SetBackColor( "#00000" );
//  IP = MUI.AddTextH3( layBS, txtip );

//  img = app.CreateImage( "/Sys/Img/Hello.png" )
//  layBS.AddChild( img )
//MUI.AddTextH3( layBS, getPublicIP(publicIP) )

   btnGenerate = MUI.CreateButtonElegant("Generate Username", 0.35, 0.07, color, lay);
   btnGenerate.SetPosition(0.3, 0.1);
   btnGenerate.SetBackAlpha(1)
   txt = MUI.CreateTextH3("", 0.8, 0.1, null, colorGreen, null, lay);
 // txt56 =  MUI.CreateTextParagraph(list, 1.0, 2.5, null, colorGreen , null, lay)
   txt.SetPosition(0.08, 0.18);
  
  // txt56.SetPosition(0.06, 0.2)
  // lay.AddChild(txt);
 //  lay.AddChild(btnGenerate);

   btnGenerate.SetOnTouch(GenerateUsername);
//   btnGenerate.SetOnLongTouch(ok);

   lst = MUI.CreateMenuWithIcon( listicon, null, null, "Right, Top");
   lst.SetOnSelect(OnSelect);
    lay.SetBackground( "Img/back.png", "repeat");
app.AddLayout(lay);
  
  getPublicIP();

  SettingsModal = UI.CreateModal( "Settings", "", "Save", "Cancel" );
  SettingsModalLayout = SettingsModal.GetLayout();
  SettingsModal_DeviceNameTextEdit = MUI.CreateTextEditOutline( 0.8, "Center", "Device Name", true, SettingsModalLayout );
  SettingsModal_DeviceNameTextEdit.SetText( app.GetModel() );
  AboutModal = UI.CreateModal( "About", "", "OK", null );
  AboutModalLayout = AboutModal.GetLayout();
  
  AboutModalLayout_InfoText4Paragraph = MUI.CreateTextParagraph( "Version: " + app.GetVersion() + "\n" + app.GetIPAddress(), 0.8, null, null, null, null, AboutModalLayout );
//    CreateDrawer();

drawerWidth = 0.75
drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" )
    drawerScroll.SetBackColor( "White" )
	layDrawer = app.CreateLayout( "Linear", "Left" )
	drawerScroll.AddChild( layDrawer )
  app.AddDrawer( drawerScroll, "Bottom");
 drawerScroll.SetBackground( "Img/back.png", "repeat" );

function NavBar_OnMenuTouch() {
  //app.OpenDrawer( "Left" );
//  Section = "Docs";
 bottomSheet.AddLayout( layBS );
}
function NavBar_OnControlTouch(  ) {
  QuickMenu.Show();
}

function QuickMenu_OnSelect( Option ) {
 // if ( Option == "New" ) NewAppModal.Show();
  if ( Option == "Settings" ) SettingsModal.Show();
  else if ( Option == "About" ) AboutModal.Show();
  else app.ShowPopup( Option, "Bottom,Short" );
}


function getPublicIP() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if( httpRequest.readyState == 4 && httpRequest.status == 200 ) {
         var  publicIP = httpRequest.responseText;
           // txtIp.SetText( "Public IP: " + httpRequest.responseText );
            IP =  MUI.AddTextH6( AboutModalLayout, "Public IP: " + publicIP );
       IP.SetPosition(0.01, 0.05 )
       IP.SetOnTouch( IPCopy);
       function IPCopy() {
app.SetClipboardText( publicIP );
app.ShowPopup("IP copied: " + publicIP);
}
        }
    };
   httpRequest.open( "GET", "https://api.ipify.org", true );
   httpRequest.send();
}
  }
 
function OnSelect(choice) {
   if(choice === "Setting") {
     // Settings.show();
    //  return;
 //   Settings.Show(); 
 bottomSheet.AddLayout( layBS );
// MUI.AddTextH3( layBS, publicIP  )
   }
   else if(choice === "Device Admin")
      {
         //app.Requestdeviceadmin();
         app.GetPermission( "Admin", null )
         app.ShowPopup("Erreur lors de la demande d'administrateur de l'appareil");
      }
   else if( choice=="about" ) {
        about.Show();
        //app.CloseDrawer( "Left" );
        return;
    }
    else if ( choice =="Share"){
    alrt5 = MUI.CreateAlert("Share Menu", "share", color)
    alrt5.Show()
    }
    else if ( choice =="Menu"){
    
        function tabhide() { 
        tab.Hide()
        }
        
    }
}



function txtIp_OnTouch() {
    // Check if the public IP has been fetched before attempting to copy
  if(publicIP !== ""){
        app.SetClipboardText(publicIP);
        app.ShowPopup("IP copied: " + publicIP);
    } else {
       app.ShowPopup("IP address not yet fetched");
    }
}

function Ok() {
    var apiUrl = "https://app.simplelogin.io/api/alias/random/new";
    var apiKey = "uuxpmudwokefjwelqvzkedjytpneiufunbxshkunkqmehgksqcrkumaurxhe";
    var headers = {
        "Content-Type": "application/json",
        "Authentication": apiKey
    };

    app.HttpRequest("POST", apiUrl, null, null,  headers, status) //function(response) {
      //if( status == 200 ) {
            // Process the successful response here
function reply1(status, reply)
{
	if( error ) alert( reply );
    else
    {
    console.log(response);
          app.AddText( response )
         //   lay.AddChild(mailgen)
            alr2 = MUI.CreateAlert(response)
           alr2.Show()
            }
         }
         
 }
  //   } else {
            // Handle error
         //  console.log("Error: " + status);
    //   }
//    });
//}

// The GenerateUsername function
function GenerateUsername()
{
   var adjectives = [
      "Fast", "Retro", "Acclaimed", "Valuable", "Interesting",
      "Incredible",
      "Unique", "Iconic", "Famous", "Lovable", "Hilarious",
      "Outstanding",
      "Fantastic", "Terrific", "Amazing", "Impressive",
      "Random", "Authentic",
      "Thrilling", "Stunning", "Awesome", "Beautiful", "Bold",
      "Elegant",
      "Fierce", "Gentle", "Happy", "Majestic", "Noble",
      "Optimistic",
      "Passionate", "Quirky", "Remarkable", "Spectacular",
      "Trendy", "Lucky",
      "Mystic", "Royal", "Ultimate", "Vibrant", "Wonderful",
      "Exquisite",
      "Zealous", "Adventurous", "Brilliant", "Charismatic",
      "Daring",
      "Enthusiastic", "Fabulous", "Graceful", "Innovative",
      "Joyful",
      "Knowledgeable", "Luxurious", "Nurturing", "Opulent",
      "Powerful",
      "Radiant", "Sophisticated", "Talented", "Versatile",
      "Witty", "Xenodochial",
      "Youthful", "Zestful", "Alluring", "Breathtaking",
      "Captivating",
      "Devoted", "Earnest", "Fearless", "Glowing", "Harmonious",
      "Ingenious",
      "Jubilant", "Kindhearted", "Luminous", "Motivated",
      "Nourishing",
      "Outgoing", "Pioneering", "Resilient", "Shimmering",
      "Triumphant",
      "Unwavering", "Visionary", "Wholesome", "Exuberant",
      "Yummy", "Zealful"
   ];
   var nouns = [
      "Panda", "Turtle", "Dolphin", "Kangaroo", "Giraffe",
      "Penguin", "Owl", "Flamingo",
      "Octopus", "Husky", "Elephant", "Butterfly",
      "Lion", "Zebra", "Cheetah", "Hippo", "Leopard",
      "Squirrel", "Goldfish", "Polar Bear",
      "Raccoon", "Sloth", "Chameleon", "Parrot", "Pheasant",
      "Jaguar", "Koala", "Peacock",
      "Raven", "Seahorse", "Starfish", "Toucan", "Walrus",
      "Yak", "Nightingale", "Narwhal",
      "Koala", "Meerkat", "Otter", "Panther", "Quokka", "Rhino",
      "Sunfish", "Tiger",
      "Vulture", "Whale", "Xerus", "Yabby", "Zebu", "Armadillo",
      "Buffalo", "Camel",
      "Dingo", "Fox", "Gazelle", "Hedgehog", "Iguana", "Jackal",
      "Kookaburra", "Llama",
      "Mongoose", "Numbat", "Ocelot", "Platypus", "Quail",
      "Rat", "Salamander", "Tasmanian Devil",
      "Uakari", "Vicuña", "Wombat", "Xenops", "Yak", "Zonkey"
   ];
   var adj = adjectives[Math.floor(Math.random() * adjectives.length)];
   var noun = nouns[Math.floor(Math.random() * nouns.length)];
   var randomNumber = Math.floor(Math.random() * (999 - 100 + 1) +
      100);
   var username = adj + noun + randomNumber;
   txt.SetText(username);
   app.SetClipboardText(username)
}

//function Okk()
//{
//   app.Alert("apop")
 //  var text = "This is a sample text for the popup."
 //  alr = MUI.CreateAlert(text)
//   alr.Show()
//}

function ShowMenu() {
   lst.Show()
}

function ShowSettings() {
   try {
      app.SendIntent(null, null, "android.settings.SETTINGS")
   }
   catch(e) {
      app.ShowPopup("Impossible d'ouvrir les paramètres");
   }

	}

function btnbot_OnTouch() {
   bottomSheet.AddLayout(layBS)
}




function ok() {
var apiUrl = "https://app.simplelogin.io/api/alias/random/new";
    // URL of the API endpoint you are calling
  //  var apiUrl = "https://app.simplelogin.io/api/alias/random/new";
    var apiKey = "uuxpmudwokefjwelqvzkedjytpneiufunbxshkunkqmehgksqcrkumaurxhe";

    var headers = {
        "Content-Type": "application/json",
        "Authentication": "bearer" + apiKey
    };
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function()
    {
        // Check if the request is complete and was successful.
        if( httpRequest.readyState == 0 && httpRequest.status == 200 )
        {
            // Set the IP address to the TextView.
            mail = httpRequest.responseText;
            txtmail.SetText( "mail: " + httpRequest.responseText );
        }
    };
    httpRequest.open( "POST", "https://app.simplelogin.io/api/alias/random/new", true, headers);
    httpRequest.send();
}