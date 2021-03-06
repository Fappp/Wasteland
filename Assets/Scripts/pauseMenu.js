	#pragma strict

	var paused : boolean;
	var menuVisible : boolean;

	var canvas : GameObject;

	function Start(){
		canvas.SetActive(false);
	}

	function Update () {
		if ( Input.GetKeyDown(KeyCode.Escape)){
			paused = !paused;
			if ( paused ){
				if ( !menuVisible ){
					canvas.SetActive(true);
					Time.timeScale = 0.00001;
				}
			}
			else{
				canvas.SetActive(false);
				Time.timeScale = 1;
			}
		}
	}

	function QuitGame(){
		Application.LoadLevel("menu");
	}