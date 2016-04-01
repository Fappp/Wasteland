#pragma strict

public var kills : int;

var infomsgobj : GameObject;
var infomsg : UI.Text;

var killsUI : UI.Text;

function Start(){
	Time.timeScale = 1;
	killsUI.text = "Kills: 0";
	yield WaitForSeconds(4);
	infomsgobj.SetActive(false);
	yield WaitForSeconds(4);
	infomsgobj.SetActive(true);
	infomsg.text = "Press LMB to shoot, WSAD to move";
	yield WaitForSeconds(4);
	infomsg.text = "Good luck and have fun";
	yield WaitForSeconds(2);
	infomsgobj.SetActive(false);
}

function AddKill ( amount : int ) {
	kills++;
	killsUI.text = "Kills: " + kills.ToString();
}