using UnityEngine;
using System.Collections;

public class camera_manager : MonoBehaviour {
	
	public Camera camA;
	public Camera camB;
	public Camera camC;
	public Camera camD;
	public Camera cam2;
	public Camera cam4;

	private player_behaviour llamaA;
	private player_behaviour llamaB;
	private player_behaviour llamaC;
	private player_behaviour llamaD;

	public int activeCameras = 1;

	// Use this for initialization
	void Start () {
		llamaA = camA.GetComponentInChildren< player_behaviour > ();
		llamaB = camB.GetComponentInChildren< player_behaviour > ();
		llamaC = camC.GetComponentInChildren< player_behaviour > ();
		llamaD = camD.GetComponentInChildren< player_behaviour > ();
	}
	
	// Update is called once per frame
	void Update () {
		if (llamaA.alive && llamaB.alive && llamaC.alive && llamaD.alive) {
			activeCameras = 4;
		} else {
			activeCameras = 1;
		}

		switch (activeCameras) {
			case 1:
				camA.enabled = true;
				cam2.enabled = false;
				cam4.enabled = false;
				break;
			case 2:
				camA.enabled = false;
				cam2.enabled = true;
				cam4.enabled = false;
				break;
			case 4:
				camA.enabled = false;
				cam2.enabled = false;
				cam4.enabled = true;
				break;
		}
	}
}
