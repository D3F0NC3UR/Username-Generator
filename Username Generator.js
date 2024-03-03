cfg.Portrait
cfg.Dark
cfg.MUI
cfg.Ligh

var lay = null;
var theme = "Default";

//app.Script("DSNav.js");
app.LoadScript( "adjectives.js");
app.LoadScript("Nouns.js")
app.Script( "Settings.js" );
app.Script( "About.js" );
//app.LoadPlugin("SlideUpPanel");
app.LoadPlugin("BottomSheet");
//app.Script( "Settings.js")
//include("getPublicIP.js")
//app.LoadScript("getPublicIP.js")
app.SetTheme( theme )
color = MUI.colors.purple.purple
colorGreen = MUI.colors.green.green
SetHackerTheme();

function CreateLayout() {
    if( lay ) app.DestroyLayout( lay );
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );
}
//_AddPermissions(
//   "Share, USB, Network, Camera, Location, SMS, WakeLock, Shortcut, Vibrate, License, Bluetooth, Storage, Contacts, SmartWatch2, Sounds, Vending, Record, Phone, Accounts, Boot,  Body,  DEVICE_ADMIN, BIND_DEVICE_ADMIN, Admin, Accessibility"
//)
var list = ["Device Admin", "Share", "Setting", "about", "Menu"];

function OnStart() {
//var Options = [ "Use ADB", "No Icons", "Use Soft Keys", "Use Yoyo", "Stay Awake", "Auto-Help", "Dark Theme", "Auto-Wifi", "Use Password" ];
 var theme = app.CreateTheme( theme )

   var listicon = ["Device Admin : security", "Share:share", "Settings:settings", "About:info_outline"];
   app.EnableBackKey(true);
   
   //QuickMenu = MUI.CreateMenuWithIcon( "Settings: settings, About: info_outline", null, null, "Top,Right" );
 QuickMenu = MUI.CreateMenuWithIcon( listicon, null, null, "Top,Right" );
   QuickMenu.SetOnSelect( QuickMenu_OnSelect );
  
   //LAYOUT
 lay = MUI.CreateLayout("Absolute");
 about = new About();
Settings = new Settings();
 
   btn = MUI.CreateButtonElegant("[fa-bars]", 0.15, 0.07, color, lay);
   btn.SetOnTouch(ShowMenu);
   btn.SetOnLongTouch(ShowMenu1);
   btn.SetPosition( 0.87,  0.9);
  btn.SetEnabled( true );
  btn.SetScale(0.8, 1);
  btn.SetTextSize( 30 );
  
  NavBar = MUI.CreateAppBarElegant( "Username Generator", "book", "menu", lay );
  NavBar.SetOnMenuTouch( NavBar_OnMenuTouch )
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

   btnGenerate = MUI.CreateButtonElegant("Generate Username", 0.4, 0.09, color, lay);
   btnGenerate.SetPosition(0.3, 0.1);
   btnGenerate.SetTextSize( 20)
   btnGenerate.SetBackAlpha(1)
   GeneratedUsernameResponse = MUI.CreateTextH2("", 0.8, 0.20, null, theme, "Bold", lay);
 // txt56 =  MUI.CreateTextParagraph(list, 1.0, 2.5, null, colorGreen , null, lay)
   GeneratedUsernameResponse.SetPosition(0.08, 0.20);
   
   btnGenerate.SetOnTouch(GenerateUsername);
   lst = MUI.CreateMenuWithIcon( listicon, null, null, "Right, Top");
   lst.SetOnSelect(OnSelect);
 
  // list.ShowMenu()
    lay.SetBackground( "Img/back.png", "repeat");

  getPublicIP();

  SettingsModal = MUI.CreateModal( "Settings", "", "Save", "Cancel", "True" );
    SettingsModalLayout = SettingsModal.GetLayout();
 SettingsModal_DeviceNameTextEdit = MUI.CreateTextEditOutline( 0.8, "Center", "Device Name", true, SettingsModalLayout, color, color);
  SettingsModal_DeviceNameTextEdit.SetText( app.GetModel() );
  AboutModal = UI.CreateModal( "About", "", "OK", null );
  AboutModalLayout = AboutModal.GetLayout();
  AboutModalLayout_InfoText4Paragraph = MUI.CreateTextParagraph( "Version: " + app.GetVersion() + "\n" + app.GetIPAddress(), 0.8, null, null, null, null, AboutModalLayout );
  
drawerWidth = 0.75
drawerScroll = app.CreateScroller( drawerWidth, -1, "FillY" )
    drawerScroll.SetBackColor( "White" )
	layDrawer = app.CreateLayout( "Linear", "Left" )
	drawerScroll.AddChild( layDrawer )
  app.AddDrawer( drawerScroll, "Left");
 drawerScroll.SetBackground( "Img/back.png", "repeat" );

//spinner1  = app. CreateSpinner("Item 1, Item 2, Item 3", 0.6, 0.1, null, layDrawer)

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
  
  
 function OnMenu( item ) {
    app.ShowPopup( item, "Short" );
    if(item === "Setting") { 
    Settings.Show();
    return;
   } else if(item === "Device Admin") {
         app.ShowPopup("Erreur lors de la demande d'administrateur de l'appareil");
      }
   else if( item =="about" ) {
        about.Show();
        //app.CloseDrawer( "Left" );
        return;
    } else if( item =="Share") {
    pge = MUI.CreatePage( "aa", null, null, null)
    alrt5.Show()
    }
    else if ( item =="Menu"){
      //  function tabhide() { 
       // tab.Hide()
        }
    }

 
 
function OnSelect(choice) {
   if(choice === "Settings") {
     Settings.Show();
      return;
 //   Settings.Show(); 
 //bottomSheet.AddLayout( layBS );
// MUI.AddTextH3( layBS, publicIP  )
   }
   else if(choice === "Device Admin") {
         app.ShowPopup("Erreur lors de la demande d'administrateur de l'appareil");
      }
   else if( choice=="About" ) {
        about.Show();
        //app.CloseDrawer( "Left" );
        return;
    }
    else if( choice =="Share") {
    alrt5 = MUI.CreateAlert("Share Menu", "share", color)
    alrt5.Show()
    }
    else if ( choice =="Menu"){
      //  function tabhide() { 
       // tab.Hide()
        }
    }
//}

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
function reply1(status, reply) {
	if( error ) alert( reply );
    else {
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
function GenerateUsername() {
  
   var adj = adjectives[Math.floor(Math.random() * adjectives.length)];
   var noun = nouns[Math.floor(Math.random() * nouns.length)];
   var randomNumber = Math.floor(Math.random() * (999 - 100 + 1) +
      100);
   var username = adj + noun + randomNumber;
   GeneratedUsernameResponse.SetText(username);
   app.SetClipboardText(username)
   notifyusername = app.CreateNotification( "FullScreen" );
    notifyusername.SetMessage( "", "", username );
    notifyusername.SetLargeImage( "logo.png" )
    notifyusername.Notify( "testID" );
}

function ShowMenu() {
   lst.Show()
}

function ShowMenu1() {
app.SetMenu( list )
   app.ShowMenu( list )
}
function ShowDeviceSettings() {
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
//app.AddLayout(  )




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

function spin_OnChange( item ) {
    themeName = item;
    var theme = app.CreateTheme( themeName );
    app.SetTheme( theme );
    CreateLayout();
}

function SetHackerTheme()
{
    var theme = app.CreateTheme("dark");
    theme.SetBtnTextColor( "green" );
    theme.SetTitleColor( "green" );
    theme.SetDialogBtnTxtColor( "green" );
    theme.SetTextColor( "green" );
    theme.AdjustColor( -76 );
    theme.SetBackColor("#00000")
    app.SetTheme( theme );
    MUI.AddButtonContained( lay )
    
}