	#pragma strict

	var health : int = 100;
	var inRange : boolean;

	var dead : boolean;
	var fly : boolean;
	var deadPos : Vector3;

	var _rb : Rigidbody;

	var player : GameObject;

	var attackCooldown : float = 1;

	var audioSource : AudioSource;

	var attackSounds : AudioClip[];
	private var amountOfSounds : int;

	var _agent : NavMeshAgent;

	var stats : statsTracker;

	var _drops : drops;

	function Start(){
		player = GameObject.FindGameObjectWithTag("Player");
		amountOfSounds = attackSounds.Length;
		var rndSpeed = Random.Range(2,4);
		_agent.speed = rndSpeed;
		stats = GameObject.FindGameObjectWithTag("GameController").GetComponent("statsTracker") as statsTracker;
	}

	function Update(){

		if ( !dead ){

			var dist = Vector3.Distance(transform.position, player.transform.position);

			if ( dist < 1 ){
				inRange = true;
			}
			else{
				inRange = false;
				_agent.SetDestination(player.transform.position);
			}

			if ( inRange ){
				if ( attackCooldown >= 1 ){
					Attack();
					attackCooldown = 0;
				}
			}

			attackCooldown += Time.deltaTime;
		}

	}

	function Attack(){
		if ( inRange && !dead){
			player.SendMessage("TakeDamage", 10);
			audioSource.PlayOneShot( attackSounds[Random.Range(0,amountOfSounds)]);
		}
	}

	function FixedUpdate(){
		if ( dead && !fly ){
			var dir : Vector3 = transform.position - deadPos;
			_rb.AddExplosionForce( 1000, deadPos, 1000, 0.3 );
			fly = true;				
		}
	}

	public function BulletHit ( pos : Vector3 ) {
		if ( !dead ){
			health -= 34;
			if ( health <= 0 ){
				_drops.Drop();
				GameObject.Destroy(_agent);
				deadPos = pos;
				dead = true;
				stats.AddKill(1);
			}
		}
		else{
			_rb.AddExplosionForce( 1000, deadPos, 1000, 0.1 );
		}

	}

	public function RocketHit ( ) {
		if ( !dead ){
			health -= 100;
			if ( health <= 0 ){
				_drops.Drop();
				GameObject.Destroy(_agent);
				dead = true;
				stats.AddKill(1);
			}
		}
	}