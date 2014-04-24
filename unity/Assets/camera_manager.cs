using UnityEngine;
using System.Collections;

public class camera_manager : MonoBehaviour {
	
	public Camera cam1;
	public Camera cam2;
	public Camera cam4;

	public int activeCameras = 1;

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		switch (activeCameras) {
			case 1:
				cam1.enabled = true;
				cam2.enabled = false;
				cam4.enabled = false;
				break;
			case 2:
				cam1.enabled = false;
				cam2.enabled = true;
				cam4.enabled = false;
				break;
			case 4:
				cam1.enabled = false;
				cam2.enabled = false;
				cam4.enabled = true;
				break;
		}
	}
}
