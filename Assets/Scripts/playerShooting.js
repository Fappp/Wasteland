#pragma strict

var weapon : Weapon;
var fireRate : float;

var bullet : GameObject;
var rocket : GameObject;

var _audio : AudioSource;

var emptySound : AudioClip;
var handgunSound : AudioClip;
var machinegunSound : AudioClip;
var reloadSound : AudioClip;
var switchSound : AudioClip;

var clipSize : int = 12;
var bulletsRemain : int;

private var cooldown : float;

var reloading : boolean;

var gunLight : GameObject;

var rocketsUnlocked : boolean;
var machineGunUnlocked : boolean;

var stats : statsTracker;
var kills : int;

var infoMsgObj : GameObject;
var infoMsg : UI.Text;

function Start(){
	gunLight.SetActive(false);
}

function UnlockRockets(){
	rocketsUnlocked = true;
	infoMsg.text = "Rockets unlocked, press 3 to equip";
	infoMsgObj.SetActive(true);
	yield WaitForSeconds(2);
	infoMsgObj.SetActive(false);
}

function UnlockMachineGun(){
	machineGunUnlocked = true;
	infoMsg.text = "Machine Gun Unlocked, press 2 to equip";
	infoMsgObj.SetActive(true);
	yield WaitForSeconds(2);
	infoMsgObj.SetActive(false);
}

function Update () {

	if ( !rocketsUnlocked ){
		kills = stats.kills;
		if ( kills > 4 && !machineGunUnlocked){
			UnlockMachineGun();
		}
		if ( kills > 199 && !rocketsUnlocked){
			UnlockRockets();
		}
	}

	ChangeWeapon();

	if ( Input.GetButton("Fire1") ){

		if ( weapon == Weapon.HandGun ){
			fireRate = 0.5;
			if ( cooldown >= fireRate ){
				Shoot();
				cooldown = 0;
			}
		}
		if ( weapon == Weapon.MachineGun ){
			fireRate = 0.1;
			if ( cooldown >= fireRate ){
				Shoot();
				cooldown = 0;
			}
		}
		if ( weapon == Weapon.Rocket ){
			fireRate = 2;
			if ( cooldown >= fireRate ){
				Shoot();
				cooldown = 0;
			}
		}

	}
	cooldown += Time.deltaTime;

	if ( Input.GetKeyDown(KeyCode.R) ){
		Reload();
	}

}

function ChangeWeapon(){
	if ( Input.GetKeyDown(KeyCode.Alpha1)){
		_audio.PlayOneShot(switchSound);
		reloading = true;
		weapon = Weapon.HandGun;
		clipSize = 12;
		bulletsRemain = 12;
		yield WaitForSeconds(2);
		_audio.PlayOneShot(switchSound);
		reloading = false;
	}
	if ( Input.GetKeyDown(KeyCode.Alpha2)){
		if ( machineGunUnlocked ){
			_audio.PlayOneShot(switchSound);
			reloading = true;
			weapon = Weapon.MachineGun;
			clipSize = 30;
			bulletsRemain = 30;
			yield WaitForSeconds(2);
			reloading = false;
			_audio.PlayOneShot(switchSound);
		}
	}
	if ( Input.GetKeyDown(KeyCode.Alpha3)){
		if ( rocketsUnlocked ){
			_audio.PlayOneShot(switchSound);
			reloading = true;
			weapon = Weapon.Rocket;
			clipSize = 1;
			bulletsRemain = 1;
			yield WaitForSeconds(2);
			reloading = false;
			_audio.PlayOneShot(switchSound);
		}
	}
}

function Shoot(){
		if (bulletsRemain > 0 && !reloading){
			if ( weapon == Weapon.HandGun ){
				_audio.PlayOneShot(handgunSound);
				var handBullet = GameObject.Instantiate( bullet, transform.position + transform.forward * 0.7, transform.rotation );
				bulletsRemain-- ;
			}
			if ( weapon == Weapon.MachineGun ){
				_audio.PlayOneShot(machinegunSound);
				bulletsRemain-- ;
				var machineBullet = GameObject.Instantiate( bullet, transform.position + transform.forward * 0.7, transform.rotation );
			}
			if ( weapon == Weapon.Rocket ){
				_audio.PlayOneShot(handgunSound);
				bulletsRemain-- ;
				var rocket = GameObject.Instantiate( rocket, transform.position + transform.forward * 0.7, transform.rotation );
			}
			gunLight.SetActive(true);
			yield WaitForSeconds(0.08);
			gunLight.SetActive(false);
		}
		else{
			if ( !reloading ){
				_audio.PlayOneShot(emptySound);
			}
		}
}

function Reload(){
	if ( !reloading ){
		reloading = true;

		if ( weapon == Weapon.HandGun ){
			_audio.PlayOneShot(reloadSound);
		}
		if ( weapon == Weapon.MachineGun ){
			_audio.PlayOneShot(reloadSound);
		}
		if ( weapon == Weapon.Rocket ){
			_audio.PlayOneShot(reloadSound);
			yield WaitForSeconds(1);
			_audio.PlayOneShot(reloadSound);
		}

		yield WaitForSeconds(2.3);
		if ( weapon != Weapon.Rocket ){
			bulletsRemain = clipSize;
			reloading = false;
		}
		else{
			bulletsRemain = clipSize;
			reloading = false;
		}
	}
}

enum Weapon{
	HandGun,
	MachineGun,
	Rocket
}