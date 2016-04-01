#pragma strict

var spawnRate : float = 10;
var lastSpawn : float = 0;

var enemyPrefab : GameObject;

function Start(){
	lastSpawn = Random.Range(0,10);
}

function Update () {

	if ( lastSpawn >= spawnRate ){
		lastSpawn = 0;
		GameObject.Instantiate( enemyPrefab, transform.position, Quaternion.identity );
		if ( spawnRate > 0.5 ){
			spawnRate -= 0.1;
		}
	}
	else{
		lastSpawn += Time.deltaTime;
	}

}

function OnDrawGizmos(){
	Gizmos.color = Color.blue;
	Gizmos.DrawSphere (transform.position, 1);
}