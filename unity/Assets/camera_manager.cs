using UnityEngine;
using System.Collections;

public class camera_manager : MonoBehaviour {
	
	public Camera camA;
	public Camera camB;
	public Camera camC;
	public Camera camD;
	public Camera camA4;
	public Camera camB4;
	public Camera camC4;
	public Camera camD4;
	
	public GameObject text;

	private player_behaviour llamaA;
	private player_behaviour llamaB;
	private player_behaviour llamaC;
	private player_behaviour llamaD;

	public int activeCameras = 1;

	public int score = 0;

	// Use this for initialization
	void Start () {
		llamaA = camA.GetComponentInChildren< player_behaviour > ();
		llamaB = camB.GetComponentInChildren< player_behaviour > ();
		llamaC = camC.GetComponentInChildren< player_behaviour > ();
		llamaD = camD.GetComponentInChildren< player_behaviour > ();
		
		llamaA.alive = true;
		llamaB.alive = false;
		llamaC.alive = false;
		llamaD.alive = false;
	}
	
	// Update is called once per frame
	void Update () {
		activeCameras = 0;
		if (llamaA.alive) activeCameras++;
		if (llamaB.alive) activeCameras++;
		if (llamaC.alive) activeCameras++;
		if (llamaD.alive) activeCameras++;

		if (activeCameras == 1) {
			camA.enabled = llamaA.alive;
			camB.enabled = llamaB.alive;
			camC.enabled = llamaC.alive;
			camD.enabled = llamaD.alive;

			camA4.enabled = false;
			camB4.enabled = false;
			camC4.enabled = false;
			camD4.enabled = false;
		} else {
			camA4.enabled = llamaA.alive;
			camB4.enabled = llamaB.alive;
			camC4.enabled = llamaC.alive;
			camD4.enabled = llamaD.alive;
			
			camA.enabled = false;
			camB.enabled = false;
			camC.enabled = false;
			camD.enabled = false;
		}
		
		if (llamaA.woohoo || llamaB.woohoo || llamaC.woohoo || llamaD.woohoo) {

			if(!llamaA.alive) {
				llamaA.revive();
			} else if(!llamaB.alive) {
				llamaB.revive();
			} else if(!llamaC.alive) {
				llamaC.revive();
			} else if(!llamaD.alive) {
				llamaD.revive();
			} 

			llamaA.woohoo = false;
			llamaB.woohoo = false;
			llamaC.woohoo = false;
			llamaD.woohoo = false;
		}

		score += activeCameras*2;
		
		text.guiText.text = "Score: " + score/50;

		if (Input.GetButtonDown ("Restart")) {		
			llamaA.alive = true;
			llamaB.alive = false;
			llamaC.alive = false;
			llamaD.alive = false;

			score = 0;

			foreach(obstacle_generator og in GetComponents<obstacle_generator>())
				og.clean();
		}
	}
}
