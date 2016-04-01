#pragma strict

var health : int = 100;
var dead : boolean;

var healthText : UI.Text;

var deadCanvas : GameObject;
var deadText : UI.Text;

var statsTracker : statsTracker;

function Start(){
	deadCanvas.SetActive(false);
	healthText.text = "Health: " + health.ToString();
}

function TakeDamage ( amount : int ) {
	health -= amount;
	healthText.text = "Health: " + health.ToString();
	if ( health <= 0 ){
		dead = true;
		var kills = statsTracker.kills;
		deadText.text = "You killed " + kills.ToString();
		deadCanvas.SetActive(true);
		Time.timeScale = 0.00001;
	}
}

function OnTriggerEnter( other : Collider ){
	if ( other.gameObject.CompareTag("MedPack")){
		health += 25;
		if ( health > 100 ){
			health = 100;
		}
		healthText.text = "Health: " + health.ToString();
		GameObject.Destroy( other.gameObject );
	}
}