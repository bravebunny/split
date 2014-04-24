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

	private player_behaviour llamaA;
	private player_behaviour llamaB;
	private player_behaviour llamaC;
	private player_behaviour llamaD;

	// public int activeCameras = 1;

	// Use this for initialization
	void Start () {
		llamaA = camA.GetComponentInChildren< player_behaviour > ();
		llamaB = camB.GetComponentInChildren< player_behaviour > ();
		llamaC = camC.GetComponentInChildren< player_behaviour > ();
		llamaD = camD.GetComponentInChildren< player_behaviour > ();
		
		camA.enabled = false;
		camB.enabled = false;
		camC.enabled = false;
		camD.enabled = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (llamaA.alive) {
			camA4.enabled = true;
		} else {
			camA4.enabled = false;
		}
		
		if (llamaB.alive) {
			camB4.enabled = true;
		} else {
			camB4.enabled = false;
		}
		
		if (llamaC.alive) {
			camC4.enabled = true;
		} else {
			camC4.enabled = false;
		}
		
		if (llamaD.alive) {
			camD4.enabled = true;
		} else {
			camD4.enabled = false;
		}
	}
}
