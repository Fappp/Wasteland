#pragma strict

var player : GameObject;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	transform.position = Vector3(player.transform.position.x,transform.position.y, player.transform.position.z );
}