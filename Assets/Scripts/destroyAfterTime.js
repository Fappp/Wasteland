#pragma strict

var lifeTime : float = 0.5;
private var timeAlive : float;

function Update () {
	timeAlive += Time.deltaTime;
	if ( timeAlive >= lifeTime ){
		GameObject.Destroy(gameObject);
	}
}