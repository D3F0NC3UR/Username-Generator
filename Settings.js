cfg.MUI
cfg.Dark
cfg.Light

"use strict"


function Settings() {
    //Show about dialog.
   this.Show = function(){
    dlgPub.Show();
    }
    
      var dlgPub = app.CreateDialog( "Settings" );
    layPub = app.CreateLayout( "linear", "VCenter,FillXY" );

    //txt = app.CreateText( "Theme" );
  //  txt.SetTextSize( 30 );
  //  lay.AddChild( txt );

    spin = app.CreateSpinner( "Default,Dark,Light", 0.4, 0.1 );
    spin.SetMargins( 0, 0.05, 0, 0.05 );
    spin.SetOnTouch( spin_OnChange );
    spin.SetText( theme );
    layPub.AddChild( spin );

    tgl = app.CreateButton( "Button", .3, .1 );
    layPub.AddChild( tgl );
dlgPub.AddLayout( layPub );
}


   // app.AddLayout( layPub );
function spin_OnChange( item ) {
    themeName = item;
    var theme = app.CreateTheme( themeName );
    app.SetTheme( theme );
    CreateLayout();

}

   // txt.SetPadding( 0.03, 0.03, 0.03, 0 );
  //  txt.SetTextSize( 18 );
  //  txt.SetTextColor( "white" );
    
 //ayPub.AddChild( spin1 );
   
    //Add dialog layout and show dialog.
  function SetHackerTheme()
{
    var theme = app.CreateTheme("dark");
    theme.SetBtnTextColor( "green" );
    theme.SetTitleColor( "green" );
    theme.SetDialogBtnTxtColor( "green" );
    theme.SetTextColor( "green" );
    theme.AdjustColor( -76 );
    app.SetTheme( theme );
}
  