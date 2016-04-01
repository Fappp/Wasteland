#pragma strict

var speed = 25;

public var radius : float = 20;
public var power : float = 500;

var wallImpact : GameObject;
var enemyImpact : GameObject;

var _audio : GameObject;

function Update () {
	transform.Translate(Vector3.forward * speed * Time.deltaTime);
}

function OnTriggerEnter( other : Collider ){
	if ( other.gameObject.CompareTag("Enemy")){
		Explode();
		GameObject.Instantiate( enemyImpact, transform.position, Quaternion.identity );
		other.gameObject.SendMessage("RocketHit", transform.position);
		GameObject.Destroy( gameObject );
	}
	else{
		Explode();
		GameObject.Instantiate( wallImpact, transform.position, Quaternion.identity );
		GameObject.Destroy( gameObject );
	}
}

function Explode(){
	GameObject.Instantiate( _audio, transform.position, Quaternion.identity );
	var explosionPos: Vector3 = transform.position;
	var colliders: Collider[] = Physics.OverlapSphere(explosionPos, radius);
	for (var hit: Collider in colliders) {
		var rb: Rigidbody = hit.GetComponent.<Rigidbody>();
		hit.gameObject.SendMessage("RocketHit", SendMessageOptions.DontRequireReceiver);
		if (rb != null){
			rb.AddExplosionForce(power, explosionPos, radius, 3.0F);
		}
	}
}