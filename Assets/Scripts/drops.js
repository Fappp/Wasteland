#pragma strict

var _drops : GameObject[];

function Drop () {
	var rnd = Random.Range(0,100);
	if ( rnd <= 10 ){
		var rndDrop = Random.Range(0,_drops.Length);
		GameObject.Instantiate( _drops[rndDrop], transform.position, Quaternion.identity);
	}
}