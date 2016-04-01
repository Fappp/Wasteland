#pragma strict

var speed = 25;

var wallImpact : GameObject;
var enemyImpact : GameObject;

function Update () {
	transform.Translate(Vector3.forward * speed * Time.deltaTime);
}

function OnTriggerEnter( other : Collider ){
	if ( other.gameObject.CompareTag("Enemy")){
		GameObject.Instantiate( enemyImpact, transform.position, Quaternion.identity );
		other.gameObject.SendMessage("BulletHit", transform.position);
		GameObject.Destroy( gameObject );
	}
	else{
		GameObject.Instantiate( wallImpact, transform.position, Quaternion.identity );
		GameObject.Destroy( gameObject );
	}
}